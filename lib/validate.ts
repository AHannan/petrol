import type { ErrorKey } from "@/lib/i18n";
import { cnicDigits, dateDigits, isValidDate, normalisePlate, type Registration } from "@/lib/scheme";

export type Field = keyof Registration;
export type Errors = Partial<Record<Field, ErrorKey>>;

export function validate(reg: Registration): Errors {
  const errors: Errors = {};
  const cnic = cnicDigits(reg.cnic);
  if (!cnic) errors.cnic = "cnicRequired";
  else if (cnic.length !== 13) errors.cnic = "cnicLength";

  if (!normalisePlate(reg.plate)) errors.plate = "plateRequired";
  if (!reg.province) errors.province = "provinceRequired";

  const date = dateDigits(reg.date);
  if (!date) errors.date = "dateRequired";
  else if (!isValidDate(date)) errors.date = "dateInvalid";

  return errors;
}
