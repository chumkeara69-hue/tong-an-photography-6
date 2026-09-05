import { previewUrl } from "@/lib/media";
import { prisma } from "@/lib/db"; import GalleryClient from "./GalleryClient";
export default async function Gallery(){const photos=await prisma.photo.findMany({where:{isPublished:true},orderBy:{createdAt:"desc"}}); const items = await Promise.all(photos.map(async p => ({...p, price:Number(p.price), previewUrl:await previewUrl(p.previewKey)}))); return <GalleryClient photos={items}/> }
