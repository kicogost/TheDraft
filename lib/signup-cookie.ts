import type { NextResponse } from "next/server";
import { signSignup } from "@/lib/signing";

export const SIGNUP_COOKIE = "fg_signup";

/**
 * Remembers who just signed up so the thank you page can attach their answers
 * to the right subscriber. httpOnly so no script can read it, sameSite lax so
 * it survives the redirect, and an hour long so it cannot linger.
 */
export function setSignupCookie(response: NextResponse, email: string): NextResponse {
  response.cookies.set(SIGNUP_COOKIE, signSignup(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });
  return response;
}
