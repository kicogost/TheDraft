import { NextResponse } from "next/server";
import { subscribe } from "@/lib/beehiiv";
import { validStage } from "@/lib/content";
import { allow, clientIp } from "@/lib/rate-limit";
import { verifySignup } from "@/lib/signing";
import { SIGNUP_COOKIE } from "@/lib/signup-cookie";

const TRIED_LIMIT = 2000;

/**
 * Records the follow up answers from the thank you page against the subscriber
 * who just signed up. The email is never posted by the client: it comes from a
 * signed httpOnly cookie set at signup, so answers cannot be written onto
 * somebody else's record.
 */
export async function POST(request: Request) {
  if (!allow(clientIp(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again in a minute." },
      { status: 429 },
    );
  }

  const email = verifySignup(
    request.headers
      .get("cookie")
      ?.split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${SIGNUP_COOKIE}=`))
      ?.slice(SIGNUP_COOKIE.length + 1),
  );

  if (!email) {
    return NextResponse.json(
      { ok: false, error: "That link has expired. Sign up again and it will work." },
      { status: 401 },
    );
  }

  let body: { stage?: string; tried?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }

  const stage = validStage(body.stage);
  if (!stage) {
    return NextResponse.json({ ok: false, error: "Pick one of the options." }, { status: 400 });
  }

  const tried = (body.tried ?? "").trim().slice(0, TRIED_LIMIT);

  // Re-posting the same email updates the record rather than creating a second
  // one, so the answers land on the subscriber created moments earlier. The
  // welcome is suppressed because they have already had theirs.
  const result = await subscribe({
    email,
    medium: "thank-you",
    sendWelcomeEmail: false,
    customFields: { stage, ...(tried ? { tried } : {}) },
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. The scorer is below anyway." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
