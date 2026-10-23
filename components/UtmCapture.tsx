"use client";

import { useEffect } from "react";
import { readUtm } from "@/lib/utm-client";

/**
 * Saves the campaign tags on whatever page a tracked link lands on, so the
 * signup form can send them even when it sits on a different page.
 */
export function UtmCapture() {
  useEffect(() => {
    readUtm();
  }, []);
  return null;
}
