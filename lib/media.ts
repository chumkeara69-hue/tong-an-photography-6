import { signedDownload } from "@/lib/b2";

const FALLBACK_PREVIEW =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#eee"/><text x="600" y="450" text-anchor="middle" dominant-baseline="middle" font-family="Arial,sans-serif" font-size="34" fill="#777">Preview unavailable</text></svg>`,
  );

export async function previewUrl(key: string) {
  if (/^https?:\/\//i.test(key)) return key;
  try {
    return await signedDownload(key, 60 * 60);
  } catch {
    // Keep the storefront renderable when B2 is temporarily unavailable or
    // its environment variables have not been configured yet.
    return FALLBACK_PREVIEW;
  }
}
