"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import type { StageQuestion } from "@/lib/content";

/**
 * Asked on the thank you page rather than the signup form. By this point the
 * reader already has what they came for, so the question is a fair trade
 * rather than a toll, and there is room to say why it is being asked.
 */
export function StageQuestions({ question }: { question: StageQuestion }) {
  const [stage, setStage] = useState("");
  const [tried, setTried] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (state === "sending") return;

    if (!stage) {
      setState("error");
      setMessage("Pick the one that sounds most like you.");
      return;
    }

    setState("sending");
    setMessage("");

    try {
      const response = await fetch("/api/stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage, tried }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setState("error");
        setMessage(data.error ?? "Something went wrong. The scorer is below anyway.");
        return;
      }
      setState("done");
    } catch {
      setState("error");
      setMessage("Something went wrong. The scorer is below anyway.");
    }
  }

  if (state === "done") {
    return (
      <div className="mt-16 border-t-2 border-ink pt-10">
        <h2 className="display-2">{question.doneHeading}</h2>
        <p className="mt-5 max-w-xl text-ink-soft">{question.doneBody}</p>
        <div className="mt-8">
          <Button href="/scorer" size="lg" arrow>
            {question.doneCta}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 border-t-2 border-ink pt-10">
      <h2 className="text-xl font-medium">{question.heading}</h2>
      <p className="mt-4 max-w-xl text-ink-soft">{question.intro}</p>
      <p className="mt-3 max-w-xl text-ink-soft">{question.trade}</p>

      <form onSubmit={onSubmit} className="mt-8 max-w-xl" noValidate>
        <fieldset>
          <legend className="label mb-3">{question.label}</legend>
          <div className="space-y-2">
            {question.options.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-start gap-3 text-ink-soft transition-colors hover:text-ink"
              >
                <input
                  type="radio"
                  name="stage"
                  value={option.value}
                  checked={stage === option.value}
                  onChange={(event) => {
                    setStage(event.target.value);
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
          <label htmlFor="tried" className="label">
            {question.triedLabel}
          </label>
          <p className="mt-2 text-sm text-ash">{question.triedHint}</p>
          <textarea
            id="tried"
            name="tried"
            rows={4}
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
