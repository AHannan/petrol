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

/**
 * The SMS is identical for every vehicle; the type only decides the monthly
 * quota and which plate shape we show as an example. Motorcycles are by far
 * the largest eligible group, so they lead.
 */
export const VEHICLES = [
  { id: "bike", en: "Motorcycle", ur: "موٹر سائیکل", litres: 20 },
  { id: "rickshaw", en: "Rickshaw", ur: "رکشہ", litres: 20 },
  { id: "car", en: "Car up to 800cc", ur: "۸۰۰ سی سی تک گاڑی", litres: 30 },
] as const;

export type VehicleId = (typeof VEHICLES)[number]["id"];

/**
 * Plate shapes per province, from the provincial excise formats. Bikes carry
 * four digits in Punjab and Sindh but three in KP and Islamabad, which is why
 * a single car-shaped example misleads most users of this scheme.
 */
const PLATE_SHAPES: Record<"bike" | "car", Record<ProvinceCode, string>> = {
  bike: {
    P: "LEB-1234",
    S: "ABC-1234",
    K: "AB-123",
    B: "AB-1234",
    I: "AB-123",
    A: "ABCD-123",
    G: "ABC-12",
  },
  car: {
    P: "LEA-123",
    S: "ABC-123",
    K: "AB-123",
    B: "AB-1234",
    I: "AB-123",
    A: "ABCD-123",
    G: "ABC-12",
  },
};

export function plateExample(vehicle: VehicleId, province: string): string {
  // Rickshaws are plated like the other small vehicles in each province.
  const table = PLATE_SHAPES[vehicle === "car" ? "car" : "bike"];
  return table[province as ProvinceCode] ?? (vehicle === "car" ? "ABC-123" : "ABC-1234");
}

export function litresFor(vehicle: VehicleId): number {
  return VEHICLES.find((v) => v.id === vehicle)?.litres ?? 20;
}

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

/** The native date input speaks ISO; the SMS and the typed field speak DDMMYYYY. */
export function toIsoDate(value: string): string {
  const d = dateDigits(value);
  if (!isValidDate(d)) return "";
  return `${d.slice(4, 8)}-${d.slice(2, 4)}-${d.slice(0, 2)}`;
}

export function fromIsoDate(iso: string): string {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match ? `${match[3]}${match[2]}${match[1]}` : "";
}

export type Registration = {
  vehicle: VehicleId;
  cnic: string;
  plate: string;
  province: string;
  date: string;
};

/**
 * Guidance on dashes conflicts: most sources say to send the plate with no
 * dashes, one says to copy the registration book character for character.
 * Plain is the default and the UI offers the dashed form as a second try.
 */
export type PlateStyle = "plain" | "dashed";

export function plateForMessage(plate: string, style: PlateStyle): string {
  const bare = normalisePlate(plate).replace(/-/g, "");
  if (style === "plain") return bare;
  const split = bare.match(/^([A-Z]+)(\d+)$/);
  return split ? `${split[1]}-${split[2]}` : bare;
}

/** REG <CNIC> <PLATE> <PROVINCE> <DDMMYYYY> */
export function buildRegMessage(reg: Registration, style: PlateStyle = "plain"): string {
  return [
    "REG",
    cnicDigits(reg.cnic),
    plateForMessage(reg.plate, style),
    reg.province,
    dateDigits(reg.date),
  ].join(" ");
}
