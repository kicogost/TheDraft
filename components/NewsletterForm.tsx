import { EmailForm } from "@/components/EmailForm";
import { getStageQuestion } from "@/lib/content";

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
        submitLabel="Send me The Draft"
        layout="inline"
        buttonTone="accent"
        stage={getStageQuestion()}
      />
      <p className="mt-3 text-sm text-ash">{reassurance}</p>
    </div>
  );
}
