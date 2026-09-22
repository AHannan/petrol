"use client";

import Field, { inputClass } from "@/components/Field";
import { errors as errorText, type Dict, type Lang } from "@/lib/i18n";
import {
  formatCnic,
  formatDate,
  normalisePlate,
  PROVINCES,
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

export default function RegisterForm({
  t,
  lang,
  value,
  errors,
  touched,
  onChange,
  onBlur,
}: Props) {
  const errorFor = (field: FieldName) => {
    const key = errors[field];
    return key && touched[field] ? errorText[key][lang] : undefined;
  };

  return (
    <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <h2 className="text-base font-semibold text-foreground">{t.registerHeading}</h2>
      <p className="mt-1 text-sm leading-relaxed text-muted">{t.registerIntro}</p>

      <div className="mt-4 grid gap-4">
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

        <Field id="plate" label={t.plateLabel} hint={t.plateHint} error={errorFor("plate")}>
          <input
            id="plate"
            dir="ltr"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder="LEB-123"
            className={`${inputClass} latin-field uppercase tracking-wide`}
            value={value.plate}
            onChange={(e) => onChange({ plate: normalisePlate(e.target.value) })}
            onBlur={() => onBlur("plate")}
          />
        </Field>

        <Field id="province" label={t.provinceLabel} error={errorFor("province")}>
          <select
            id="province"
            className={`${inputClass} appearance-none bg-[length:1.1rem] pe-10`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235b6b62' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
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

        <Field id="date" label={t.dateLabel} hint={t.dateHint} error={errorFor("date")}>
          <input
            id="date"
            dir="ltr"
            inputMode="numeric"
            autoComplete="off"
            placeholder="01/01/2015"
            className={`${inputClass} latin-field tracking-wide`}
            value={formatDate(value.date)}
            onChange={(e) => onChange({ date: e.target.value })}
            onBlur={() => onBlur("date")}
          />
        </Field>
      </div>
    </section>
  );
}
