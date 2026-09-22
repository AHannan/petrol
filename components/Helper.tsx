"use client";

import { useEffect, useMemo, useState } from "react";
import { Benefits, Disclaimer, Rules, Troubleshooting } from "@/components/InfoSections";
import MessageCard from "@/components/MessageCard";
import RegisterForm from "@/components/RegisterForm";
import TokenPanel from "@/components/TokenPanel";
import { dictionaries, LANGUAGES, type Lang } from "@/lib/i18n";
import { buildRegMessage, TOKEN_MESSAGE, type Registration } from "@/lib/scheme";
import { detectApple } from "@/lib/sms";
import { validate, type Field as FieldName } from "@/lib/validate";

const STORAGE_KEY = "petrol-relief:v1";
const EMPTY: Registration = { cnic: "", plate: "", province: "", date: "" };

type Step = "register" | "token";

export default function Helper() {
  const [lang, setLang] = useState<Lang>("en");
  const [step, setStep] = useState<Step>("register");
  const [reg, setReg] = useState<Registration>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [isApple, setIsApple] = useState(false);

  // Restore after mount so the server and the first client render agree.
  useEffect(() => {
    setIsApple(detectApple());
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { lang?: Lang; reg?: Registration };
      if (saved.lang && LANGUAGES.includes(saved.lang)) setLang(saved.lang);
      if (saved.reg) setReg({ ...EMPTY, ...saved.reg });
    } catch {
      // A corrupt entry is not worth bothering the user about.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ lang, reg }));
    } catch {
      // Private mode or a full quota — the form still works this session.
    }
  }, [lang, reg]);

  const t = dictionaries[lang];
  const dir = lang === "ur" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const errors = useMemo(() => validate(reg), [reg]);
  const ready = Object.keys(errors).length === 0;
  const message = ready ? buildRegMessage(reg) : "";

  function update(patch: Partial<Registration>) {
    setReg((current) => ({ ...current, ...patch }));
  }

  function clearSaved() {
    setReg(EMPTY);
    setTouched({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 px-4 pt-4 pb-10">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">{t.appName}</h1>
          <p className="mt-1 text-sm leading-relaxed text-muted">{t.tagline}</p>
        </div>
        <button
          type="button"
          onClick={() => setLang(lang === "en" ? "ur" : "en")}
          className="shrink-0 rounded-full border border-border bg-surface px-3.5 py-2 text-sm font-semibold text-foreground shadow-sm transition active:scale-[0.97] hover:bg-surface-muted"
          lang={lang === "en" ? "ur" : "en"}
        >
          {t.langSwitch}
        </button>
      </header>

      <div role="tablist" aria-label={t.appName} className="grid grid-cols-2 gap-1 rounded-xl bg-surface-muted p-1">
        {(["register", "token"] as const).map((key) => (
          <button
            key={key}
            role="tab"
            type="button"
            aria-selected={step === key}
            onClick={() => setStep(key)}
            className={`h-11 rounded-lg px-2 text-sm font-semibold transition ${
              step === key
                ? "bg-surface text-foreground shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            {key === "register" ? t.stepRegister : t.stepToken}
          </button>
        ))}
      </div>

      {step === "register" ? (
        <>
          <RegisterForm
            t={t}
            lang={lang}
            value={reg}
            errors={errors}
            touched={touched}
            onChange={update}
            onBlur={(field) => setTouched((current) => ({ ...current, [field]: true }))}
          />
          <MessageCard t={t} message={message} ready={ready} isApple={isApple} />
          <p className="px-1 text-xs leading-relaxed text-muted">{t.savedNote}</p>
          <Benefits t={t} />
          <Rules t={t} />
          <Troubleshooting t={t} />
          <button
            type="button"
            onClick={clearSaved}
            className="mx-auto rounded-lg px-3 py-2 text-xs font-semibold text-muted underline underline-offset-2"
          >
            {t.clear}
          </button>
        </>
      ) : (
        <>
          <TokenPanel t={t} />
          <MessageCard t={t} message={TOKEN_MESSAGE} ready isApple={isApple} />
          <Troubleshooting t={t} />
        </>
      )}

      <Disclaimer t={t} />
    </div>
  );
}
