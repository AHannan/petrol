export const LANGUAGES = ["en", "ur"] as const;
export type Lang = (typeof LANGUAGES)[number];

const en = {
  dir: "ltr",
  appName: "Petrol Relief Helper",
  tagline: "Fill the form once and we write the exact 9771 message for you.",
  facilitator: "Nothing is sent, submitted or saved here — you send the SMS yourself.",
  langSwitch: "اردو",

  stepDetails: "1. Sign-up message",
  stepToken: "2. Token message",

  detailsHeading: "Your vehicle details",
  detailsIntro:
    "We only write the message. You send it yourself, from the SIM registered in your own name.",

  vehicleLabel: "Vehicle type",
  quota20: "Rs 100 off a litre, up to 20 litres a month",
  quota30: "Rs 100 off a litre, up to 30 litres a month",

  cnicLabel: "CNIC number",
  cnicHint: "13 digits from your ID card",
  plateLabel: "Vehicle number plate",
  plateHintBike:
    "Copy it exactly from the registration book. Bike numbers carry four digits in Punjab and Sindh, three in KP and Islamabad.",
  plateHintCar: "Copy it exactly from the registration book.",
  provinceLabel: "Province of registration",
  provincePlaceholder: "Choose province",
  dateLabel: "Vehicle registration date",
  dateHint: "Type it, or tap the calendar. Day / Month / Year.",
  calendarLabel: "Pick the date from a calendar",

  messageHeading: "Your message",
  sendTo: "To",
  free: "Free SMS",
  openSms: "Open SMS app",
  copy: "Copy message",
  copied: "Copied",
  copyFailed: "Could not copy — select the message and copy it by hand.",
  incomplete: "Fill the form above to get your message.",
  smsHelp:
    "The SMS app opens with the message already written. You still have to press send.",
  altDashed: "Not accepted? Try it with the dash",
  altPlain: "Not accepted? Try it without the dash",

  tokenHeading: "Get your fuel token",
  tokenIntro:
    "Once 9771 confirms your sign-up, send TOK to get a 10-digit token. Show it at the pump before filling.",
  tokenValidity: "A token is valid for 10 days. Expired? Just send TOK again.",
  tokenReminder: "Not signed up yet? Do step 1 first and wait for the confirmation SMS.",

  clear: "Clear saved details",
  savedNote: "Your details are kept on this phone only, so you need not retype them.",

  benefitsHeading: "What you get",
  benefit1: "Rs 100 off every litre of petrol",
  benefit2: "Motorcycle, rickshaw or Qingqi: up to 20 litres a month",
  benefit3: "Car up to 800cc: up to 30 litres a month",

  rulesHeading: "Before you send",
  rule1: "Use a SIM registered in your own name — a borrowed number is rejected.",
  rule2: "One CNIC can sign up one vehicle, and one vehicle one CNIC.",
  rule3: "Details must match the excise record exactly, letter for letter.",
  rule4: "Sign-up and token messages to 9771 are free of charge.",

  troubleHeading: "If 9771 does not reply",
  trouble1:
    "The service has been busy since launch. Wait a while and send the same message again — do not keep changing your details.",
  trouble2:
    "If it says your vehicle was not found, use the link under the message to swap the dash in and out of your number.",
  trouble3: "Check that the province letter matches where the vehicle is registered.",

  disclaimer:
    "This is an unofficial helper. It has no server, collects nothing, and sends nothing on your behalf — your details stay on this phone. Official details:",
} as const;

const ur: Record<keyof typeof en, string> = {
  dir: "rtl",
  appName: "پٹرول ریلیف مددگار",
  tagline: "ایک بار فارم بھریں، ہم 9771 کے لیے بالکل درست پیغام لکھ دیں گے۔",
  facilitator: "یہاں کچھ بھیجا، جمع یا محفوظ نہیں کیا جاتا — ایس ایم ایس آپ نے خود بھیجنا ہے۔",
  langSwitch: "English",

  stepDetails: "۱۔ اندراج کا پیغام",
  stepToken: "۲۔ ٹوکن کا پیغام",

  detailsHeading: "آپ کی گاڑی کی تفصیلات",
  detailsIntro:
    "ہم صرف پیغام لکھ کر دیتے ہیں۔ بھیجنا آپ نے خود ہے، اُسی سم سے جو آپ کے نام پر رجسٹرڈ ہے۔",

  vehicleLabel: "گاڑی کی قسم",
  quota20: "فی لیٹر ۱۰۰ روپے رعایت، مہینے میں ۲۰ لیٹر تک",
  quota30: "فی لیٹر ۱۰۰ روپے رعایت، مہینے میں ۳۰ لیٹر تک",

  cnicLabel: "شناختی کارڈ نمبر",
  cnicHint: "شناختی کارڈ کے ۱۳ ہندسے",
  plateLabel: "گاڑی کا نمبر",
  plateHintBike:
    "رجسٹریشن بک سے بالکل ویسا ہی لکھیں۔ پنجاب اور سندھ میں موٹر سائیکل کے نمبر چار ہندسوں کے، خیبر پختونخوا اور اسلام آباد میں تین ہندسوں کے ہوتے ہیں۔",
  plateHintCar: "رجسٹریشن بک سے بالکل ویسا ہی لکھیں۔",
  provinceLabel: "رجسٹریشن کا صوبہ",
  provincePlaceholder: "صوبہ منتخب کریں",
  dateLabel: "گاڑی کی رجسٹریشن کی تاریخ",
  dateHint: "خود لکھیں یا کیلنڈر پر ٹیپ کریں۔ دن / مہینہ / سال۔",
  calendarLabel: "کیلنڈر سے تاریخ منتخب کریں",

  messageHeading: "آپ کا پیغام",
  sendTo: "نمبر",
  free: "مفت پیغام",
  openSms: "ایس ایم ایس ایپ کھولیں",
  copy: "پیغام کاپی کریں",
  copied: "کاپی ہو گیا",
  copyFailed: "کاپی نہیں ہو سکا — پیغام منتخب کر کے خود کاپی کر لیں۔",
  incomplete: "پیغام حاصل کرنے کے لیے اوپر فارم مکمل کریں۔",
  smsHelp:
    "ایس ایم ایس ایپ کھلے گی اور پیغام پہلے سے لکھا ہوا ہو گا۔ بھیجنے کا بٹن آپ کو دبانا ہے۔",
  altDashed: "قبول نہ ہو؟ ڈیش کے ساتھ آزمائیں",
  altPlain: "قبول نہ ہو؟ ڈیش کے بغیر آزمائیں",

  tokenHeading: "اپنا فیول ٹوکن حاصل کریں",
  tokenIntro:
    "جب 9771 سے اندراج کی تصدیق آ جائے تو TOK بھیجیں اور ۱۰ ہندسوں کا ٹوکن حاصل کریں۔ پٹرول ڈلوانے سے پہلے پمپ پر دکھائیں۔",
  tokenValidity: "ٹوکن ۱۰ دن کے لیے کارآمد ہے۔ میعاد ختم ہو جائے تو دوبارہ TOK بھیج دیں۔",
  tokenReminder: "ابھی اندراج نہیں ہوا؟ پہلے مرحلہ ۱ مکمل کریں اور تصدیقی پیغام کا انتظار کریں۔",

  clear: "محفوظ معلومات مٹا دیں",
  savedNote: "آپ کی معلومات صرف اسی فون میں محفوظ ہیں، تاکہ بار بار لکھنا نہ پڑے۔",

  benefitsHeading: "آپ کو کیا ملے گا",
  benefit1: "پٹرول کے ہر لیٹر پر ۱۰۰ روپے رعایت",
  benefit2: "موٹر سائیکل، رکشہ یا چنگچی: مہینے میں ۲۰ لیٹر تک",
  benefit3: "۸۰۰ سی سی تک گاڑی: مہینے میں ۳۰ لیٹر تک",

  rulesHeading: "بھیجنے سے پہلے",
  rule1: "سم آپ کے اپنے نام پر ہونی چاہیے — کسی اور کا نمبر قبول نہیں ہوتا۔",
  rule2: "ایک شناختی کارڈ پر ایک گاڑی، اور ایک گاڑی پر ایک ہی شناختی کارڈ۔",
  rule3: "تمام تفصیلات ایکسائز ریکارڈ کے عین مطابق، حرف بہ حرف درست ہوں۔",
  rule4: "9771 پر اندراج اور ٹوکن کے پیغامات بالکل مفت ہیں۔",

  troubleHeading: "اگر 9771 سے جواب نہ آئے",
  trouble1:
    "شروع دن سے سسٹم پر رش ہے۔ کچھ دیر بعد وہی پیغام دوبارہ بھیجیں — اپنی تفصیلات بار بار نہ بدلیں۔",
  trouble2:
    "اگر گاڑی نہ ملنے کا پیغام آئے تو پیغام کے نیچے دیے گئے لنک سے نمبر میں ڈیش لگا کر یا ہٹا کر آزمائیں۔",
  trouble3: "صوبے کا حرف وہی ہو جہاں گاڑی رجسٹرڈ ہے، اس کی تصدیق کر لیں۔",

  disclaimer:
    "یہ غیر سرکاری مددگار صفحہ ہے۔ اس کا کوئی سرور نہیں، یہ کوئی معلومات جمع نہیں کرتا اور آپ کی طرف سے کچھ نہیں بھیجتا — تفصیلات صرف آپ کے فون میں رہتی ہیں۔ سرکاری معلومات:",
};

export const errors = {
  cnicRequired: { en: "Enter your CNIC number", ur: "شناختی کارڈ نمبر درج کریں" },
  cnicLength: { en: "CNIC must be 13 digits", ur: "شناختی کارڈ ۱۳ ہندسوں کا ہونا چاہیے" },
  plateRequired: { en: "Enter your vehicle number", ur: "گاڑی کا نمبر درج کریں" },
  provinceRequired: { en: "Choose a province", ur: "صوبہ منتخب کریں" },
  dateRequired: { en: "Enter the registration date", ur: "رجسٹریشن کی تاریخ درج کریں" },
  dateInvalid: {
    en: "Enter a real date, e.g. 01/01/2015",
    ur: "درست تاریخ درج کریں، مثلاً ۰۱/۰۱/۲۰۱۵",
  },
} as const;

export type ErrorKey = keyof typeof errors;

export const dictionaries: Record<Lang, typeof en> = { en, ur: ur as typeof en };

export type Dict = typeof en;
