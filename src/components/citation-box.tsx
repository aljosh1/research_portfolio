"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export type CitationMap = Record<string, string>;

export function CitationBox({ citations }: { citations: CitationMap }) {
  const styles = Object.keys(citations);
  const [style, setStyle] = useState(styles[0]);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(citations[style]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="citation-box">
      <div className="tabs" role="group" aria-label="Citation style">
        {styles.map((s) => (
          <button key={s} type="button" className="tab" aria-pressed={s === style} onClick={() => setStyle(s)}>
            {s}
          </button>
        ))}
      </div>
      <p className="citation-text">{citations[style]}</p>
      <button type="button" className="btn btn-outline btn-sm" onClick={copy}>
        {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy citation"}
      </button>
      <span className="hint" role="status" aria-live="polite" style={{ marginLeft: 10 }}>
        {copied ? "Citation copied to clipboard" : ""}
      </span>
    </div>
  );
}