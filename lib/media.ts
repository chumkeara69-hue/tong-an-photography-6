import { signedDownload } from "@/lib/b2";

export async function previewUrl(key: string) {
  if (/^https?:\/\//i.test(key)) return key;
  return signedDownload(key, 60 * 60);
}
