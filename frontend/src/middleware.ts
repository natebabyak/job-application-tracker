import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  if (!isLoggedIn && pathname !== "/") {
    return Response.redirect(new URL("/", req.nextUrl.origin));
  }

  if (isLoggedIn && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  return NextResponse.next();
});
