type ResourceFormProps = {
  eyebrow: string;
  submitLabel: string;
  disclosure?: string;
};

/**
 * Presentation only for now. The POST to /api/resource and the beehiiv call
 * land with the newsletter wiring, along with the honeypot and rate limit.
 */
export function ResourceForm({
  eyebrow,
  submitLabel,
  disclosure,
}: ResourceFormProps) {
  return (
    <div>
      <p className="label">
        {eyebrow} <span aria-hidden="true">&#128071;</span>
      </p>
      <form className="mt-4">
        <label htmlFor="resource-email" className="sr-only">
          Email address
        </label>
        <input
          id="resource-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          className="w-full border-2 border-ink bg-paper px-4 py-3.5 text-ink outline-none placeholder:text-ash focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          className="group mt-3 flex w-full items-center justify-center gap-2.5 border-2 border-ink bg-ink px-6 py-4 font-semibold text-paper transition-transform duration-150 hover:-translate-y-0.5"
        >
          {submitLabel}
          <span
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </button>
      </form>
      {disclosure ? (
        <p className="mt-3 text-sm text-ash">{disclosure}</p>
      ) : null}
    </div>
  );
}
