# Petrol Relief Helper

A small mobile-first Next.js app that writes the SMS for Pakistan's **PM Fuel Relief
Scheme 2026** so people don't have to get the format right by hand. Fill the form, tap
once, and the phone's SMS app opens with the message already typed and addressed
to **9771**. English and Urdu, with full RTL.

## What the scheme needs

| | |
|---|---|
| Shortcode | `9771` (SMS is free) |
| Register | `REG <CNIC> <PLATE> <PROVINCE> <DDMMYYYY>` |
| Example | `REG 3520112345678 LEB-123 P 01012015` |
| Token | `TOK` — returns a 10-digit token, valid 10 days |
| Province codes | `P` Punjab · `S` Sindh · `K` Khyber Pakhtunkhwa · `B` Balochistan · `I` Islamabad · `A` AJK · `G` Gilgit-Baltistan |
| Relief | Rs 100/litre — 20 L/month for bikes and rickshaws, 30 L/month for cars up to 800cc |

Rules that trip people up: the SIM must be registered in the sender's own name, one
CNIC maps to one vehicle, and the details must match the provincial excise record.

Official information: [pmfuelrelief.pk](https://pmfuelrelief.pk)

## What the app does about the fiddly parts

- **CNIC** is typed with dashes for readability and sent as 13 bare digits.
- **Plate** has spaces stripped — a space would split the SMS into an extra field and
  break parsing at 9771. Dashes are kept as printed on the registration book.
- **Date** is typed as `DD/MM/YYYY`, sent as `DDMMYYYY`, and checked for real calendar
  dates (`31/02/2015` is rejected).
- **Urdu digits** (۰۱۲۳) typed on an Urdu keyboard are converted to ASCII.
- **SMS links** use `?body=` on Android and `&body=` on iOS, which is the only form
  iOS honours.
- **Copy** falls back to the legacy `execCommand` path for older Android browsers and
  non-HTTPS origins.
- Details are kept in `localStorage` only — nothing leaves the phone, there is no
  backend, and the app never sends anything by itself.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Layout

```
app/           layout, global theme, page shell
components/    Helper (state + tabs), RegisterForm, MessageCard, TokenPanel, InfoSections
lib/scheme.ts  shortcode, province codes, formatters, message builders
lib/i18n.ts    English and Urdu strings
lib/sms.ts     sms: deep link + clipboard
lib/validate.ts
```

This is an unofficial helper and is not affiliated with the Government of Pakistan.
