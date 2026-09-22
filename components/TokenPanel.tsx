"use client";

import type { Dict } from "@/lib/i18n";

export default function TokenPanel({ t }: { t: Dict }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <h2 className="text-base font-semibold text-foreground">{t.tokenHeading}</h2>
      <p className="mt-1 text-sm leading-relaxed text-muted">{t.tokenIntro}</p>
      <ul className="mt-3 grid gap-2">
        <Note>{t.tokenValidity}</Note>
        <Note>{t.tokenReminder}</Note>
      </ul>
    </section>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-xl bg-surface-muted px-3 py-2.5 text-sm leading-relaxed text-muted">
      {children}
    </li>
  );
}
