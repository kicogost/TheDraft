"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import type { StageQuestion } from "@/lib/content";

type Download = { href: string; label: string };

/**
 * Asked on the thank you page, and the download is held behind it. The file
 * still arrives by email either way, so this gates the instant copy rather
 * than the thing itself, and nobody who declines goes away empty handed.
 *
 * The employer field is posted as `companyName`, not `company`. `company` is
 * the honeypot on the signup form and a filled one there means bot.
 */
export function StageQuestions({
  question,
  download,
}: {
  question: StageQuestion;
  download?: Download;
}) {
  const [role, setRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [tried, setTried] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (state === "sending") return;

    if (!role) {
      setState("error");
      setMessage("Pick the closest one. It is a single click.");
      return;
    }

    setState("sending");
    setMessage("");

    try {
      const response = await fetch("/api/stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, companyName, tried }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setState("error");
        setMessage(data.error ?? "Something went wrong on our end.");
        return;
      }
      setState("done");
    } catch {
      setState("error");
      setMessage("Something went wrong on our end.");
    }
  }

  if (state === "done") {
    return (
      <div className="mt-16 border-t-2 border-ink pt-10">
        <h2 className="display-2">{question.doneHeading}</h2>
        <p className="mt-5 max-w-xl text-ink-soft">{question.doneBody}</p>
        {download ? (
          <div className="mt-8">
            <Button href={download.href} size="lg" arrow>
              {download.label}
            </Button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mt-14 border-t-2 border-ink pt-12">
      <h2 className="display-2">{question.heading}</h2>
      <p className="lead mt-5 max-w-xl">{question.intro}</p>
      <p className="mt-4 max-w-xl text-ink-soft">{question.trade}</p>

      <form onSubmit={onSubmit} className="mt-8 max-w-xl" noValidate>
        <fieldset>
          <legend className="label mb-3">{question.roleLabel}</legend>
          <div className="space-y-2">
            {question.roleOptions.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-start gap-3 text-ink-soft transition-colors hover:text-ink"
              >
                <input
                  type="radio"
                  name="role"
                  value={option.value}
                  checked={role === option.value}
                  onChange={(event) => {
                    setRole(event.target.value);
                    if (state === "error") setState("idle");
                  }}
                  className="mt-1.5 h-3.5 w-3.5 shrink-0 accent-[var(--color-accent)]"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-8">
          <label htmlFor="companyName" className="label">
            {question.companyLabel}
          </label>
          <p className="mt-2 text-sm text-ash">{question.companyHint}</p>
          <input
            id="companyName"
            name="companyName"
            type="text"
            maxLength={120}
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            placeholder={question.companyPlaceholder}
            className="mt-3 w-full border-2 border-ink bg-paper px-4 py-3.5 text-ink outline-none placeholder:text-ash focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="mt-8">
          <label htmlFor="tried" className="label">
            {question.triedLabel}
          </label>
          <p className="mt-2 text-sm text-ash">{question.triedHint}</p>
          <textarea
            id="tried"
            name="tried"
            rows={5}
            maxLength={2000}
            value={tried}
            onChange={(event) => setTried(event.target.value)}
            placeholder={question.triedPlaceholder}
            className="mt-3 w-full border-2 border-ink bg-paper px-4 py-3.5 text-ink outline-none placeholder:text-ash focus:ring-2 focus:ring-accent"
          />
        </div>

        <button
          type="submit"
          disabled={state === "sending"}
          className="group mt-6 flex w-full items-center justify-center gap-2.5 border-2 border-accent bg-accent px-6 py-3.5 font-semibold text-paper transition-transform duration-150 hover:-translate-y-0.5 hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {state === "sending" ? "Sending" : question.submitLabel}
          <span
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </button>

        {state === "error" ? (
          <p role="alert" className="mt-3 text-sm text-accent-deep">
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
