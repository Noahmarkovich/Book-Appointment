import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const appointments = await prisma.appointment.findMany();
  console.log(appointments);

  return NextResponse.json(appointments);
}

export async function POST(request) {
  const data = await request.json();
  if (!data.start || !data.end || !data.title) {
    return new Response("Missing appointment information", {
      status: 401,
    });
  }
  await prisma.appointment.create({ data });
  const appointments = await prisma.appointment.findMany();
  return NextResponse.json(appointments);
}

export async function PUT(request) {
  const data = await request.json();
  if (!data.start || !data.end || !data.title) {
    return new Response("Missing appointment information", {
      status: 401,
    });
  }
  await prisma.appointment.update({
    where: {
      id: data.id,
    },
    data,
  });
  const appointments = await prisma.appointment.findMany();
  return NextResponse.json(appointments);
}

export async function DELETE(request) {
  const data = await request.json();
  await prisma.appointment.delete({
    where: {
      id: data.id,
    },
  });
  const appointments = await prisma.appointment.findMany();
  return NextResponse.json(appointments);
}
