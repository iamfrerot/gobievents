import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function parseCookies(request: NextRequest) {
 const cookieHeader = request.headers.get("cookie") || "";
 const cookies = Object.fromEntries(
  cookieHeader.split("; ").map((cookie) => {
   const [name, ...rest] = cookie.split("=");
   return [name, decodeURIComponent(rest.join("="))];
  })
 );
 return cookies;
}

export async function middleware(request: NextRequest) {
 const cookies = parseCookies(request);
 const token =
  cookies["next-auth.session-token"] ||
  cookies["__Secure-next-auth.session-token"];

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
