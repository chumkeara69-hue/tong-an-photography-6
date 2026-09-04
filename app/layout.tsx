import "./globals.css";
import Link from "next/link";
export const metadata={title:"Tong An Photography",description:"Premium photography marketplace"};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <><header className="header"><div className="container nav"><Link className="brand" href="/">Tong An Photography</Link><nav className="navlinks"><Link href="/gallery">Gallery</Link><Link href="/categories">Categories</Link><Link href="/about">About</Link></nav><div className="actions"><Link className="iconbtn" href="/cart">Cart</Link><Link className="btn primary" href="/admin/login">Admin</Link><span className="mobilemenu">☰</span></div></div></header>{children}<footer className="footer"><div className="container row"><span>© {new Date().getFullYear()} Tong An Photography</span><span>Original photography · Cambodia</span></div></footer></>
}
