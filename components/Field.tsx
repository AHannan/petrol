"use client";

import type { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
};

export default function Field({ id, label, hint, error, children }: Props) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-foreground">
        {label}
      </label>
      {hint && <p className="mt-0.5 text-xs leading-relaxed text-muted">{hint}</p>}
      <div className="mt-1.5">{children}</div>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass =
  "w-full rounded-xl border border-border bg-surface h-13 px-3.5 text-base text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/25";
