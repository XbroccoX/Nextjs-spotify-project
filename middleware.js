import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  //Si el Token existira si el usuario esta logueado
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("TOKEN", token);
  const { pathname } = req.nextUrl;
  console.log("parthname", pathname);

  // This logic is only applied to /about
  // permite hacer la solicitud si el token existe.
  // 1. es la solicitud para next-auth y provider
  // 2. si el token existe

  if (token || pathname.includes("/api/auth")) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
  }
}

export const config = {
  matcher: ["/", "/login"],
};
