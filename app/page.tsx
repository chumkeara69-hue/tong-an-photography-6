export const dynamic = "force-dynamic";
import { previewUrl } from "@/lib/media";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
export default async function Home(){
 const photos=await prisma.photo.findMany({where:{isPublished:true},orderBy:{createdAt:"desc"},take:4});
 const heroSrc = photos[0] ? await previewUrl(photos[0].previewKey) : null;
 const items = await Promise.all(photos.map(async p => ({...p, previewUrl: await previewUrl(p.previewKey)})));
 return <main><div className="container hero"><div><div className="eyebrow">Cinematic photography marketplace</div><h1>Stories of Cambodia, captured in light.</h1><p>Discover limited digital photographs by Tong An. Buy the original file and keep the full-resolution moment forever.</p><div className="actions" style={{marginTop:28}}><Link className="btn primary" href="/gallery">Explore Gallery</Link><Link className="btn ghost" href="/categories">Browse Categories</Link></div></div>{photos[0]&&<Image className="heroimg" src={heroSrc!} alt={photos[0].title} width={900} height={1100} priority unoptimized/>}</div><section className="section"><div className="container"><div className="sectionhead"><div><div className="eyebrow">Selected works</div><h2>Featured photographs</h2></div><Link className="muted" href="/gallery">View all →</Link></div><div className="grid">{items.map(p=><Link className="card" key={p.id} href={`/photo/${p.slug}`}><div className="thumb"><Image src={p.previewUrl} alt={p.title} width={700} height={520} unoptimized/></div><div className="cardbody"><div className="row"><h3 className="cardtitle">{p.title}</h3><span className="price">${p.price.toString()}</span></div><span className="tag">{p.category}</span></div></Link>)}</div></div></section></main>
}
