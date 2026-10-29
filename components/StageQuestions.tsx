"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import type { StageQuestion } from "@/lib/content";

type Download = { href: string; label: string };

const STEPS = 2;

/**
 * One question per screen, asked on the thank you page, with the download held
 * behind it. The file arrives by email either way, so this gates the instant
 * copy rather than the thing itself, and nobody who declines goes away empty
 * handed.
 *
 * Both answers are required. The role advances on tap with no confirm
 * button, and the company submits the form, so it stays two short screens.
 *
 * The employer field posts as `companyName`, not `company`. `company` is the
 * honeypot on the signup form, where a filled value means bot.
 */
export function StageQuestions({
  question,
  confirmLine,
  download,
  children,
}: {
  question: StageQuestion;
  confirmLine: string;
  download?: Download;
  children?: ReactNode;
}) {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const advance = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(advance.current), []);

  // The chosen option stays lit for a beat before the screen changes, so the
  // tap is acknowledged rather than swallowed.
  function pickRole(value: string) {
    setRole(value);
    clearTimeout(advance.current);
    advance.current = setTimeout(() => setStep(1), 220);
  }

  async function submit() {
    if (state === "sending") return;
    if (!companyName.trim()) {
      setMessage("Add a company name to carry on.");
      return;
    }
    setState("sending");
    setMessage("");

    try {
      const response = await fetch("/api/stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, companyName }),
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

  const heading = "font-display uppercase leading-[1.08] tracking-[0.01em] text-ink";

  /*
    Both endings release the download. A failed write is my problem, not
    theirs, and the file is already in their inbox, so holding it back would
    punish them for an outage.
  */
  if (state === "done" || state === "error") {
    return (
      <Section width="prose" space="generous" grid="sm">
        <p className="label text-ash">Confirmed</p>
        <h1 className="display-2 mt-4">{question.doneHeading}</h1>
        <p className="lead mt-5">
          {state === "error"
            ? "Your answer did not reach me, but nothing else is affected."
            : question.doneBody}
        </p>
        {download ? (
          <div className="mt-9">
            <Button href={download.href} size="lg" variant="accent" arrow>
              {download.label}
            </Button>
          </div>
        ) : (
          <p className="mt-5 text-ink">{confirmLine}</p>
        )}
        {children}
      </Section>
    );
  }

  return (
    <div className="flex min-h-[calc(100svh-4rem)] flex-col px-5 pb-8 pt-7 sm:px-8 sm:pb-14 sm:pt-12">
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
        <header>
          <p className="label text-ash">Confirmed</p>
          <h1 className={`mt-3 text-[clamp(1.75rem,5vw,2.5rem)] ${heading}`}>
            {question.heading}
          </h1>
          {step === 0 ? (
            <p className="mt-3 text-ink-soft">{question.trade}</p>
          ) : null}

          <div className="mt-6 flex items-center gap-4">
            <div className="flex flex-1 gap-1.5" aria-hidden="true">
              {Array.from({ length: STEPS }, (_, i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 transition-colors duration-300 ${
                    i <= step ? "bg-accent" : "bg-line"
                  }`}
                />
              ))}
            </div>
            <p className="label-micro shrink-0" aria-live="polite">
              {step + 1} of {STEPS}
            </p>
          </div>
        </header>

        {/*
          The question sits in the space between the header and the actions and
          is centred in it, so a six option list and a one line label both look
          deliberate rather than stranded at the top.
        */}
        <div key={step} className="step-in flex flex-1 flex-col justify-center py-7">
          {step === 0 ? (
            <fieldset>
              <legend className={`text-[clamp(1.25rem,3vw,1.75rem)] ${heading}`}>
                {question.roleLabel}
              </legend>
              <div className="mt-5 grid gap-2">
                {question.roleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={role === option.value}
                    onClick={() => pickRole(option.value)}
                    className={`min-h-12 w-full border-2 px-5 py-3 text-left text-base transition-colors duration-150 sm:min-h-14 sm:py-3.5 ${
                      role === option.value
                        ? "border-accent bg-accent text-paper"
                        : "border-line bg-paper text-ink hover:border-ink"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          {step === 1 ? (
            <div>
              <label
                htmlFor="companyName"
                className={`block text-[clamp(1.25rem,3vw,1.75rem)] ${heading}`}
              >
                {question.companyLabel}
              </label>
              <p className="mt-3 text-ink-soft">{question.companyHint}</p>
              <input
                id="companyName"
                name="companyName"
                type="text"
                autoFocus
                autoComplete="organization"
                required
                maxLength={120}
                value={companyName}
                onChange={(event) => {
                  setCompanyName(event.target.value);
                  setMessage("");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    submit();
                  }
                }}
                placeholder={question.companyPlaceholder}
                className="mt-6 min-h-14 w-full border-2 border-ink bg-paper px-4 py-3.5 text-base text-ink outline-none placeholder:text-ash focus:border-accent"
              />
            </div>
          ) : null}
        </div>

        {/*
          The actions are pinned to the bottom of the screen rather than sat
          under the question, so the thumb finds them in the same place on
          every step and nothing jumps between screens.
        */}
        <div className="mt-auto">
          {message ? (
            <p role="alert" className="mb-4 text-sm text-accent-deep">
              {message}
            </p>
          ) : null}

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {step === 0 ? (
              <p className="text-sm text-ash">Pick one to carry on.</p>
            ) : (
              <button
                type="button"
                disabled={state === "sending"}
                onClick={submit}
                className="group inline-flex min-h-14 w-full items-center justify-center gap-2.5 border-2 border-ink bg-ink px-7 py-3.5 font-semibold text-paper transition-transform duration-150 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60 sm:w-auto"
              >
                {state === "sending" ? "Sending" : question.submitLabel}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </button>
            )}

            {step > 0 ? (
              <button
                type="button"
                disabled={state === "sending"}
                onClick={() => setStep(step - 1)}
                className="text-sm text-ash underline underline-offset-4 transition-colors hover:text-ink disabled:opacity-60"
              >
                Back
              </button>
            ) : null}
          </div>

          <p className="mt-5 text-sm text-ash">{confirmLine}</p>
        </div>
      </div>
    </div>
  );
}
