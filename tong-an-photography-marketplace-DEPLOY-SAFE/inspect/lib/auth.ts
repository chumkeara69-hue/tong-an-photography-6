import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
const secret = new TextEncoder().encode(process.env.AUTH_SECRET || "dev-only-secret-change-me");
const COOKIE = "tong_admin";
export async function createAdminSession(adminId:string) {
  const token = await new SignJWT({sub:adminId,role:"admin"}).setProtectedHeader({alg:"HS256"}).setIssuedAt().setExpirationTime("7d").sign(secret);
  (await cookies()).set(COOKIE, token, {httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:60*60*24*7});
}
export async function getAdminId() {
  const token=(await cookies()).get(COOKIE)?.value;
  if(!token) return null;
  try { const {payload}=await jwtVerify(token,secret); return typeof payload.sub==="string"?payload.sub:null; } catch { return null; }
}
export async function clearAdminSession(){ (await cookies()).delete(COOKIE); }
