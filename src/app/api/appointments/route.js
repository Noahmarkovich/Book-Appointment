import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const appointments = await prisma.appointment.findMany();
  console.log(appointments);

  return NextResponse.json(appointments);
}
