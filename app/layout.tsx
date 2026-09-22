import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const urdu = Noto_Nastaliq_Urdu({
  variable: "--font-urdu",
  subsets: ["arabic"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Petrol Relief Helper — 9771 SMS",
  description:
    "Fill one form and get the exact SMS for Pakistan's PM Fuel Relief Scheme, ready to send to 9771. Works in English and Urdu.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f5faf7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  /*
    Extensions stamp attributes onto <html> and <body> before React hydrates
    (data-headlessui-focus-visible, isolation: isolate, and similar), and the
    language toggle later sets lang/dir here itself. suppressHydrationWarning
    covers each element's own attributes only, one level deep, so mismatches
    inside the app still report normally.
  */
  return (
    <html
      suppressHydrationWarning
      lang="ur"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} ${urdu.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
