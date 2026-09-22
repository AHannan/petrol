"use client";

import { useEffect, useRef, useState } from "react";
import Field, { inputClass } from "@/components/Field";
import { errors as errorText, type Dict, type Lang } from "@/lib/i18n";
import {
  formatCnic,
  formatDate,
  fromIsoDate,
  litresFor,
  normalisePlate,
  plateExample,
  PROVINCES,
  toIsoDate,
  VEHICLES,
  type Registration,
} from "@/lib/scheme";
import type { Errors, Field as FieldName } from "@/lib/validate";

type Props = {
  t: Dict;
  lang: Lang;
  value: Registration;
  errors: Errors;
  touched: Partial<Record<FieldName, boolean>>;
  onChange: (patch: Partial<Registration>) => void;
  onBlur: (field: FieldName) => void;
};

export default function DetailsForm({
  t,
  lang,
  value,
  errors,
  touched,
  onChange,
  onBlur,
}: Props) {
  const dateRef = useRef<HTMLInputElement>(null);
  const [today, setToday] = useState("");

  // Set after mount: a date computed during SSR can disagree with the client.
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  const errorFor = (field: FieldName) => {
    const key = errors[field];
    return key && touched[field] ? errorText[key][lang] : undefined;
  };

  function openCalendar() {
    const el = dateRef.current;
    if (!el) return;
    try {
      el.showPicker();
    } catch {
      el.focus();
    }
  }

  return (
    <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <h2 className="text-base font-semibold text-foreground">{t.detailsHeading}</h2>
      <p className="mt-1 text-sm leading-relaxed text-muted">{t.detailsIntro}</p>

      <div className="mt-4 grid gap-4">
        <div>
          <span className="block text-sm font-semibold text-foreground">{t.vehicleLabel}</span>
          <div className="mt-1.5 grid grid-cols-3 gap-1 rounded-xl bg-surface-muted p-1">
            {VEHICLES.map((v) => (
              <button
                key={v.id}
                type="button"
                aria-pressed={value.vehicle === v.id}
                onClick={() => onChange({ vehicle: v.id })}
                className={`flex min-h-12 items-center justify-center rounded-lg px-1 text-center text-xs font-semibold leading-tight transition ${
                  value.vehicle === v.id
                    ? "bg-surface text-foreground shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {lang === "ur" ? v.ur : v.en}
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-xs font-medium text-brand">
            {litresFor(value.vehicle) === 30 ? t.quota30 : t.quota20}
          </p>
        </div>

        <Field id="cnic" label={t.cnicLabel} hint={t.cnicHint} error={errorFor("cnic")}>
          <input
            id="cnic"
            dir="ltr"
            inputMode="numeric"
            autoComplete="off"
            placeholder="12345-1234567-1"
            className={`${inputClass} latin-field tracking-wide`}
            value={formatCnic(value.cnic)}
            onChange={(e) => onChange({ cnic: e.target.value })}
            onBlur={() => onBlur("cnic")}
          />
        </Field>

        <Field id="province" label={t.provinceLabel} error={errorFor("province")}>
          <select
            id="province"
            className={`${inputClass} appearance-none bg-[length:1.1rem] pe-10`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2362766b' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: lang === "ur" ? "left 0.9rem center" : "right 0.9rem center",
            }}
            value={value.province}
            onChange={(e) => onChange({ province: e.target.value })}
            onBlur={() => onBlur("province")}
          >
            <option value="">{t.provincePlaceholder}</option>
            {PROVINCES.map((p) => (
              <option key={p.code} value={p.code}>
                {lang === "ur" ? p.ur : p.en} ({p.code})
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="plate"
          label={t.plateLabel}
          hint={value.vehicle === "car" ? t.plateHintCar : t.plateHintBike}
          error={errorFor("plate")}
        >
          <input
            id="plate"
            dir="ltr"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder={plateExample(value.vehicle, value.province)}
            className={`${inputClass} latin-field uppercase tracking-wide`}
            value={value.plate}
            onChange={(e) => onChange({ plate: normalisePlate(e.target.value) })}
            onBlur={() => onBlur("plate")}
          />
        </Field>

        <Field id="date" label={t.dateLabel} hint={t.dateHint} error={errorFor("date")}>
          <div className="relative">
            <input
              id="date"
              dir="ltr"
              inputMode="numeric"
              autoComplete="off"
              placeholder="01/01/2015"
              className={`${inputClass} latin-field pe-14 tracking-wide`}
              value={formatDate(value.date)}
              onChange={(e) => onChange({ date: e.target.value })}
              onBlur={() => onBlur("date")}
            />
            {/*
              The native picker sits transparent on top of the calendar button,
              so a tap opens it even where showPicker() is unavailable.
            */}
            <input
              ref={dateRef}
              type="date"
              aria-label={t.calendarLabel}
              min="1950-01-01"
              max={today || undefined}
              value={toIsoDate(value.date)}
              onClick={openCalendar}
              onChange={(e) => {
                const typed = fromIsoDate(e.target.value);
                if (typed) onChange({ date: typed });
                onBlur("date");
              }}
              className="date-overlay absolute end-1.5 top-1/2 h-11 w-11 -translate-y-1/2 cursor-pointer opacity-0"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-muted"
            >
              <CalendarIcon />
            </span>
          </div>
        </Field>
      </div>
    </section>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="15" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 10h17M8 3.5v4M16 3.5v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
