"use client";

import { useState } from "react";

type CopyBlockProps = {
  text: string;
  label: string;
  copiedLabel: string;
};

export function CopyBlock({ text, label, copiedLabel }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard is blocked in some browsers and every insecure context, so
      // fall back to selecting the text and letting the reader copy it.
      const node = document.getElementById("scorer-prompt");
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  }

  return (
    <div>
      <button
        type="button"
        onClick={copy}
        className="group flex items-center gap-2.5 border-2 border-ink bg-ink px-6 py-3.5 font-semibold text-paper transition-transform duration-150 hover:-translate-y-0.5 hover:bg-ink-soft"
      >
        {copied ? copiedLabel : label}
        <span
          aria-hidden="true"
          className="transition-transform duration-150 group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </button>
      <pre
        id="scorer-prompt"
        className="mt-6 max-h-[28rem] overflow-auto border-2 border-line bg-paper-dim p-5 font-mono text-[0.78rem] leading-relaxed whitespace-pre-wrap text-ink-soft"
      >
        {text}
      </pre>
    </div>
  );
}
