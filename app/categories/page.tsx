export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function Categories() {
  let ps: any[] = [];
  try { ps = await prisma.photo.findMany({ where: { isPublished: true } }); } catch { ps = []; }
  const cats = [...new Set(ps.map((p) => p.category))];
  return <main><div className="container gallerytop"><div className="eyebrow">Curated collections</div><h1>Categories</h1>{cats.length === 0 ? <div className="summary"><p className="muted">No published categories yet.</p></div> : <div className="grid">{cats.map((c) => <Link className="card" key={c} href={`/gallery?category=${encodeURIComponent(c)}`}><div className="cardbody"><h3 className="cardtitle">{c}</h3><p className="muted">{ps.filter((p) => p.category === c).length} photographs</p><span className="price">Explore →</span></div></Link>)}</div>}</div></main>;
}
