import { NextResponse } from "next/server";
import { subscribe } from "@/lib/beehiiv";
import { allow, clientIp } from "@/lib/rate-limit";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  if (!allow(clientIp(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again in a minute." },
      { status: 429 },
    );
  }

  let body: { email?: string; source?: string; company?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }

  // Honeypot. Real people never fill this in.
  if (body.company) return NextResponse.json({ ok: true });

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email does not look right." },
      { status: 400 },
    );
  }

  const result = await subscribe({
    email,
    medium: body.source || "homepage",
    // The "Welcome, homepage signups" automation sends the first email, so
    // beehiiv's single preset welcome would arrive as a duplicate alongside it.
    sendWelcomeEmail: false,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. Try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
