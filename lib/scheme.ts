// Facts for the PM Fuel Relief Scheme 2026 (launched 13 Sep 2026).
// Registration and token requests both go to the same free shortcode.
export const SHORTCODE = "9771";
export const OFFICIAL_SITE = "pmfuelrelief.pk";
export const TOKEN_MESSAGE = "TOK";

export const PROVINCES = [
  { code: "P", en: "Punjab", ur: "پنجاب" },
  { code: "S", en: "Sindh", ur: "سندھ" },
  { code: "K", en: "Khyber Pakhtunkhwa", ur: "خیبر پختونخوا" },
  { code: "B", en: "Balochistan", ur: "بلوچستان" },
  { code: "I", en: "Islamabad", ur: "اسلام آباد" },
  { code: "A", en: "Azad Jammu & Kashmir", ur: "آزاد جموں و کشمیر" },
  { code: "G", en: "Gilgit-Baltistan", ur: "گلگت بلتستان" },
] as const;

export type ProvinceCode = (typeof PROVINCES)[number]["code"];

/** Urdu keyboards produce Arabic-Indic digits; 9771 only understands ASCII. */
export function toAsciiDigits(value: string): string {
  return value
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0));
}

export function cnicDigits(value: string): string {
  return toAsciiDigits(value).replace(/\D/g, "").slice(0, 13);
}

/** 1234512345671 -> 12345-1234567-1, for display only. */
export function formatCnic(value: string): string {
  const d = cnicDigits(value);
  const parts = [d.slice(0, 5), d.slice(5, 12), d.slice(12, 13)].filter(Boolean);
  return parts.join("-");
}

/**
 * Spaces separate the fields of the SMS, so a plate typed as "LEB 123" would
 * break parsing at 9771. Strip them and keep everything else as printed.
 */
export function normalisePlate(value: string): string {
  return toAsciiDigits(value)
    .replace(/[^A-Za-z0-9-]/g, "")
    .toUpperCase()
    .slice(0, 16);
}

export function dateDigits(value: string): string {
  return toAsciiDigits(value).replace(/\D/g, "").slice(0, 8);
}

/** 01012015 -> 01/01/2015, for display only. */
export function formatDate(value: string): string {
  const d = dateDigits(value);
  return [d.slice(0, 2), d.slice(2, 4), d.slice(4, 8)].filter(Boolean).join("/");
}

export function isValidDate(value: string): boolean {
  const d = dateDigits(value);
  if (d.length !== 8) return false;
  const day = Number(d.slice(0, 2));
  const month = Number(d.slice(2, 4));
  const year = Number(d.slice(4, 8));
  if (year < 1950 || year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export type Registration = {
  cnic: string;
  plate: string;
  province: string;
  date: string;
};

/** REG <CNIC> <PLATE> <PROVINCE> <DDMMYYYY> */
export function buildRegMessage(reg: Registration): string {
  return [
    "REG",
    cnicDigits(reg.cnic),
    normalisePlate(reg.plate),
    reg.province,
    dateDigits(reg.date),
  ].join(" ");
}
