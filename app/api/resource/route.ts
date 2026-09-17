import { NextResponse } from "next/server";
import { startJourney, subscribe } from "@/lib/beehiiv";
import { getResource } from "@/lib/content";
import { allow, clientIp } from "@/lib/rate-limit";
import { signResource } from "@/lib/signing";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  if (!allow(clientIp(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again in a minute." },
      { status: 429 },
    );
  }

  let body: { email?: string; slug?: string; company?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }

  if (body.company) return NextResponse.json({ ok: true, redirect: "/thank-you" });

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email does not look right." },
      { status: 400 },
    );
  }

  const resource = getResource(body.slug ?? "");
  if (!resource) {
    return NextResponse.json({ ok: false, error: "Unknown resource." }, { status: 404 });
  }

  const result = await subscribe({
    email,
    medium: "resource",
    campaign: resource.slug,
    // The resource automation sends the welcome, so beehiiv's own is suppressed
    // and nobody gets two emails in the same minute.
    sendWelcomeEmail: false,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. Try again shortly." },
      { status: 502 },
    );
  }

  if (resource.automationId) {
    await startJourney(resource.automationId, email);
  } else {
    console.warn(`resource ${resource.slug} has no automationId yet`);
  }

  const token = signResource(resource.slug);
  return NextResponse.json({
    ok: true,
    redirect: `/thank-you?resource=${resource.slug}&t=${token}`,
  });
}
