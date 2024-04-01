import { NextResponse } from "next/server";

export function middleware(request) {
  let currentCookie = request.cookies.get("admin");
  let currentUser;
  if (currentCookie) {
    currentUser = JSON.parse(currentCookie.value);
    console.log(currentUser);
  }
  if (!currentCookie) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (!currentUser.isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin", "/admin/appointments"],
};
