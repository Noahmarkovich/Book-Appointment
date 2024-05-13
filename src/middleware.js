import { NextResponse } from "next/server";

export function middleware(request) {
  let userCookie = request.cookies.get("user");
  let currentUser;

  if (request.nextUrl.pathname.startsWith("/appointments")) {
    let patientCookie = request.cookies.get("patient");
    let currentPatient;
    if (patientCookie) {
      currentPatient = JSON.parse(patientCookie.value);
    }
    if (!currentPatient) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (userCookie) {
    currentUser = JSON.parse(userCookie.value);
  }

  if (!userCookie) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (!currentUser.role === "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/admin",
    "/admin/appointments",
    "/admin/manageContent",
    "/appointments",
  ],
};
