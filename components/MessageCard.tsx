"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";
import { SHORTCODE } from "@/lib/scheme";
import { copyText, smsHref } from "@/lib/sms";

type Props = {
  t: Dict;
  message: string;
  ready: boolean;
  isApple: boolean;
  /** Offers the other plate spelling when 9771 rejects the first one. */
  alt?: { label: string; onClick: () => void };
};

export default function MessageCard({ t, message, ready, isApple, alt }: Props) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setStatus("idle");
  }, [message]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function handleCopy() {
    const ok = await copyText(message);
    setStatus(ok ? "copied" : "failed");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-semibold text-muted">{t.messageHeading}</h2>
        <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand">
          {t.free}
        </span>
      </div>

      <div className="mt-3 rounded-xl bg-surface-muted p-3" dir="ltr">
        <div className="latin-field text-xs text-muted">
          {t.sendTo}: <span className="font-semibold text-foreground">{SHORTCODE}</span>
        </div>
        <p className="latin-field mt-1.5 text-base font-semibold break-all text-foreground select-all">
          {ready ? message : <span className="font-normal text-muted">— — —</span>}
        </p>
      </div>

      {!ready && <p className="mt-3 text-sm text-muted">{t.incomplete}</p>}

      <div className="mt-4 grid gap-2.5">
        <a
          href={ready ? smsHref(SHORTCODE, message, isApple) : undefined}
          aria-disabled={!ready}
          onClick={(e) => {
            if (!ready) e.preventDefault();
          }}
          className={`flex h-14 items-center justify-center gap-2 rounded-xl px-4 text-base font-semibold transition active:scale-[0.99] ${
            ready
              ? "bg-brand text-white shadow-sm hover:bg-brand-strong"
              : "pointer-events-none bg-surface-muted text-muted"
          }`}
        >
          <SendIcon />
          {t.openSms}
        </a>

        <button
          type="button"
          onClick={handleCopy}
          disabled={!ready}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition active:scale-[0.99] hover:bg-surface-muted disabled:pointer-events-none disabled:text-muted"
        >
          {status === "copied" ? <TickIcon /> : <CopyIcon />}
          {status === "copied" ? t.copied : t.copy}
        </button>
      </div>

      {alt && ready && (
        <button
          type="button"
          onClick={alt.onClick}
          className="mt-3 w-full rounded-lg py-1 text-xs font-semibold text-brand underline underline-offset-2"
        >
          {alt.label}
        </button>
      )}

      <p aria-live="polite" className="mt-3 text-xs leading-relaxed text-muted">
        {status === "failed" ? t.copyFailed : t.smsHelp}
      </p>
    </section>
  );
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 11.5 20 4l-7.5 16-2-6.5-6.5-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15 5.5A2.5 2.5 0 0 0 12.5 4h-6A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 5.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TickIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
