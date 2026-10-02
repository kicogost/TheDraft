"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type StageOption = { value: string; label: string };

type EmailFormProps = {
  endpoint: "/api/subscribe" | "/api/resource";
  payload: Record<string, string>;
  submitLabel: string;
  /**
   * The segmentation question. Asked at the moment of highest intent, which is
   * the only place a complete answer set is possible. Omit it to render the
   * plain email form.
   */
  stage?: { label: string; options: StageOption[] };
  /** Inline puts the field and button on one row from sm up. */
  layout?: "inline" | "stacked";
  buttonTone?: "accent" | "ink";
};

export function EmailForm({
  endpoint,
  payload,
  submitLabel,
  layout = "stacked",
  buttonTone = "ink",
  stage,
}: EmailFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [stageValue, setStageValue] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, email, company, stage: stageValue }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setState("error");
        setMessage(data.error ?? "Something went wrong. Try again shortly.");
        return;
      }

      if (data.redirect) {
        router.push(data.redirect);
        return;
      }
      setState("done");
    } catch {
      setState("error");
      setMessage("Something went wrong. Try again shortly.");
    }
  }

  if (state === "done") {
    return (
      <p className="border-2 border-ink bg-paper px-4 py-3.5 font-semibold text-ink">
        You are in. Check your inbox.
      </p>
    );
  }

  const button =
    buttonTone === "accent"
      ? "border-accent bg-accent hover:bg-accent-deep"
      : "border-ink bg-ink hover:bg-ink-soft";

  return (
    <form onSubmit={onSubmit} noValidate>
      {stage ? (
        <fieldset className="mb-5">
          <legend className="label mb-3">{stage.label}</legend>
          <div className="space-y-2">
            {stage.options.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-start gap-3 text-ink-soft transition-colors hover:text-ink"
              >
                <input
                  type="radio"
                  name={`stage-${endpoint}`}
                  value={option.value}
                  checked={stageValue === option.value}
                  onChange={(event) => setStageValue(event.target.value)}
                  className="mt-1.5 h-3.5 w-3.5 shrink-0 accent-[var(--color-accent)]"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}
      <div className={layout === "inline" ? "flex flex-col gap-3 sm:flex-row" : ""}>
        <label htmlFor={`email-${endpoint}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${endpoint}`}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full border-2 border-ink bg-paper px-4 py-3.5 text-ink outline-none placeholder:text-ash focus:ring-2 focus:ring-accent"
        />
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`company-${endpoint}`}>Company</label>
          <input
            id={`company-${endpoint}`}
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={state === "sending"}
          className={`group mt-3 flex w-full shrink-0 items-center justify-center gap-2.5 border-2 px-6 py-3.5 font-semibold text-paper transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-0 ${button} ${
            layout === "inline" ? "sm:w-auto" : "mt-3 sm:mt-3 sm:w-full"
          }`}
        >
          {state === "sending" ? "Sending" : submitLabel}
          <span
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </button>
      </div>
      {state === "error" ? (
        <p role="alert" className="mt-3 text-sm text-accent-deep">
          {message}
        </p>
      ) : null}
    </form>
  );
}
