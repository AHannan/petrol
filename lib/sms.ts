/**
 * RFC 5724 says `sms:<number>?body=`, and that is what Android honours.
 * iOS has long needed `&body=` instead, so pick per platform.
 */
export function smsHref(number: string, body: string, isApple: boolean): string {
  const separator = isApple ? "&" : "?";
  return `sms:${number}${separator}body=${encodeURIComponent(body)}`;
}

export function detectApple(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  // iPadOS 13+ reports itself as a Mac, hence the touch check.
  return /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }

  // Older Android browsers, and anything served over plain http.
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-1000px";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    area.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}
