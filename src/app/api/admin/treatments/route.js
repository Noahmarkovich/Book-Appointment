import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const treatments = await prisma.treatment.findMany({});

  return NextResponse.json(treatments);
}
