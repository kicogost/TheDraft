import { EmailForm } from "@/components/EmailForm";

type ResourceFormProps = {
  slug: string;
  eyebrow: string;
  submitLabel: string;
  disclosure?: string;
};

export function ResourceForm({
  slug,
  eyebrow,
  submitLabel,
  disclosure,
}: ResourceFormProps) {
  return (
    <div>
      <p className="label">
        {eyebrow} <span aria-hidden="true">&#128071;</span>
      </p>
      <div className="mt-4">
        <EmailForm
          endpoint="/api/resource"
          payload={{ slug }}
          submitLabel={submitLabel}
        />
      </div>
      {disclosure ? <p className="mt-3 text-sm text-ash">{disclosure}</p> : null}
    </div>
  );
}
