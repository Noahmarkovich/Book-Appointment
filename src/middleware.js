import { NextResponse } from "next/server";

export function middleware(request) {
  let currentCookie = request.cookies.get("user");
  let currentUser;
  if (currentCookie) {
    currentUser = JSON.parse(currentCookie.value);
  }
  if (!currentCookie) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (!currentUser.role === "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/admin", "/admin/appointments", "/admin/manageContent"],
};
