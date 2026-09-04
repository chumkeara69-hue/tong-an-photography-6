import { prisma } from "@/lib/db"; import GalleryClient from "./GalleryClient";
export default async function Gallery(){const photos=await prisma.photo.findMany({where:{isPublished:true},orderBy:{createdAt:"desc"}}); return <GalleryClient photos={photos.map(p=>({...p,price:Number(p.price)}))}/> }
