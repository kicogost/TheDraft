import { NextResponse } from "next/server";
import { setSignupCookie } from "@/lib/signup-cookie";
import { startJourney, subscribe } from "@/lib/beehiiv";
import { getResource, getSite } from "@/lib/content";
import { allow, clientIp } from "@/lib/rate-limit";
import { signResource } from "@/lib/signing";
import { cleanPath, cleanUtm } from "@/lib/utm";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Where the form was. Held to an allowlist so a caller cannot write arbitrary
 * text into the beehiiv utm_medium field, and so the homepage offer stays
 * separable from the resource pages in acquisition reporting. Anything
 * unrecognised falls back to "resource", which is what every form sent before
 * this existed.
 */
const SOURCES = new Set(["resource", "homepage", "hero", "newsletter"]);

export async function POST(request: Request) {
  if (!allow(clientIp(request), "resource")) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again in a minute." },
      { status: 429 },
    );
  }

  let body: {
    email?: string;
    slug?: string;
    company?: string;
    stage?: string;
    source?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    path?: string;
  };
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

  const medium = SOURCES.has(body.source ?? "") ? body.source! : "resource";

  const result = await subscribe({
    email,
    medium,
    campaign: resource.slug,
    utm: cleanUtm(body),
    path: cleanPath(body.path),
    // Every request gets exactly one email from our own automations: the
    // resource's own if it has one, otherwise the website welcome below.
    sendWelcomeEmail: false,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. Try again shortly." },
      { status: 502 },
    );
  }

  // Automation slots are capped, so only the busiest resources get their own
  // email. The rest fall back to the website welcome, and the download itself
  // is on the thank-you page either way.
  await startJourney(resource.automationId || getSite().newsletter.welcomeAutomationId, email);

  const token = signResource(resource.slug);
  return setSignupCookie(
    NextResponse.json({
      ok: true,
      redirect: `/thank-you?resource=${resource.slug}&t=${token}`,
    }),
    email,
  );
}
