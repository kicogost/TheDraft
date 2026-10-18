import { NextResponse } from "next/server";
import { subscribe } from "@/lib/beehiiv";
import { validRole } from "@/lib/content";
import { allow, clientIp } from "@/lib/rate-limit";
import { verifySignup } from "@/lib/signing";
import { SIGNUP_COOKIE } from "@/lib/signup-cookie";

const TRIED_LIMIT = 2000;
const COMPANY_LIMIT = 120;

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

  let body: { role?: string; companyName?: string; tried?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }

  const role = validRole(body.role);
  if (!role) {
    return NextResponse.json(
      { ok: false, error: "Pick the closest one." },
      { status: 400 },
    );
  }

  // Posted as companyName, never company: `company` is the honeypot on the
  // signup form, where a filled value means bot.
  const company = (body.companyName ?? "").trim().slice(0, COMPANY_LIMIT);

  const tried = (body.tried ?? "").trim().slice(0, TRIED_LIMIT);

  // Re-posting the same email updates the record rather than creating a second
  // one, so the answers land on the subscriber created moments earlier. The
  // welcome is suppressed because they have already had theirs.
  const result = await subscribe({
    email,
    medium: "thank-you",
    sendWelcomeEmail: false,
    customFields: { role, ...(company ? { company } : {}), ...(tried ? { tried } : {}) },
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. Try again in a moment." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
