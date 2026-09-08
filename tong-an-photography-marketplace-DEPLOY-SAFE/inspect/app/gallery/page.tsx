export const dynamic = "force-dynamic";
import { previewUrl } from "@/lib/media";
import { prisma } from "@/lib/db";
import GalleryClient from "./GalleryClient";

export default async function Gallery() {
  let photos: any[] = [];
  try {
    photos = await prisma.photo.findMany({ where: { isPublished: true }, orderBy: { createdAt: "desc" } });
  } catch {
    photos = [];
  }
  const items = await Promise.all(photos.map(async (p) => ({ ...p, price: Number(p.price), previewUrl: await previewUrl(p.previewKey) })));
  return <GalleryClient photos={items} />;
}
