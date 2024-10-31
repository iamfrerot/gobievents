import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
 const token = await getToken({
  req: request,
  secret: process.env.NEXTAUTH_SECRET,
 });

 const PUBLIC_PATHS = ["/login", "/register", "/events", "/"];
 const isPublicPath = PUBLIC_PATHS.includes(request.nextUrl.pathname);

 console.log("Token:", token);
 console.log("Requested Path:", request.nextUrl.pathname);
 console.log("Is Public Path:", isPublicPath);

 if (token && isPublicPath) {
  console.log("Authenticated user redirected to /dashboard");
  return NextResponse.redirect(new URL("/dashboard", request.url));
 }

 if (!token && !isPublicPath) {
  console.log("Unauthenticated user redirected to /");
  return NextResponse.redirect(new URL("/", request.url));
 }

 return NextResponse.next();
}

export const config = {
 matcher: [
  "/dashboard/:path*", // Protect all routes under /dashboard
  "/login", // Allow public access to /login
  "/register", // Allow public access to /register
  "/", // Allow public access to the home page
 ],
};
