import { EmailForm } from "@/components/EmailForm";

type ResourceFormProps = {
  slug: string;
  /** Omitted where the surrounding section already carries the label, as on
   * the homepage, so the same words do not appear twice side by side. */
  eyebrow?: string;
  submitLabel: string;
  disclosure?: string;
  /**
   * Where this form sits. Carried through to the beehiiv utm_medium so
   * homepage signups stay separable from resource page signups in
   * acquisition reporting. Must match the allowlist in /api/resource.
   */
  source?: string;
};

export function ResourceForm({
  slug,
  eyebrow,
  submitLabel,
  disclosure,
  source,
}: ResourceFormProps) {
  return (
    <div>
      {eyebrow ? (
        <p className="label">
          {eyebrow} <span aria-hidden="true">&#128071;</span>
        </p>
      ) : null}
      <div className={eyebrow ? "mt-4" : ""}>
        <EmailForm
          endpoint="/api/resource"
          payload={{ slug, ...(source ? { source } : {}) }}
          submitLabel={submitLabel}
        />
      </div>
      {disclosure ? <p className="mt-3 text-sm text-ash">{disclosure}</p> : null}
    </div>
  );
}
