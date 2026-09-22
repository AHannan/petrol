"use client";

import { useId, useState } from "react";
import type { Dict } from "@/lib/i18n";
import { OFFICIAL_SITE } from "@/lib/scheme";

export function Benefits({ t }: { t: Dict }) {
  return (
    <section className="rounded-2xl border border-border bg-brand-soft p-4">
      <h2 className="text-sm font-semibold text-brand">{t.benefitsHeading}</h2>
      <ul className="mt-2 grid gap-1.5 text-sm leading-relaxed text-foreground">
        {[t.benefit1, t.benefit2, t.benefit3].map((line) => (
          <li key={line} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Rules({ t }: { t: Dict }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-foreground">{t.rulesHeading}</h2>
      <ul className="mt-2 grid gap-2 text-sm leading-relaxed text-muted">
        {[t.rule1, t.rule2, t.rule3, t.rule4].map((line) => (
          <li key={line} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-border" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Troubleshooting({ t }: { t: Dict }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section className="rounded-2xl border border-border bg-surface shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-3 p-4 text-start text-sm font-semibold text-foreground"
      >
        {t.troubleHeading}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <ul id={panelId} className="grid gap-2 px-4 pb-4 text-sm leading-relaxed text-muted">
          {[t.trouble1, t.trouble2, t.trouble3].map((line) => (
            <li key={line} className="rounded-xl bg-surface-muted px-3 py-2.5">
              {line}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function Disclaimer({ t }: { t: Dict }) {
  return (
    <p className="px-1 pb-2 text-xs leading-relaxed text-muted">
      {t.disclaimer}{" "}
      <a
        href={`https://${OFFICIAL_SITE}`}
        target="_blank"
        rel="noreferrer noopener"
        dir="ltr"
        className="font-semibold text-brand underline underline-offset-2"
      >
        {OFFICIAL_SITE}
      </a>
    </p>
  );
}
