import { EmailForm } from "@/components/EmailForm";

type NewsletterFormProps = {
  source: string;
  reassurance: string;
};

export function NewsletterForm({ source, reassurance }: NewsletterFormProps) {
  return (
    <div className="w-full max-w-lg">
      <EmailForm
        endpoint="/api/subscribe"
        payload={{ source }}
        submitLabel="Subscribe"
        layout="inline"
        buttonTone="accent"
      />
      <p className="mt-3 text-sm text-ash">{reassurance}</p>
    </div>
  );
}
