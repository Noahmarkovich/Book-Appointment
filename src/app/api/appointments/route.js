import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {
  const cookieStore = cookies();
  const patient = cookieStore.get("patient");
  const user = cookieStore.get("user");
  if (!patient && !user) {
    return new Response("Unauthorized ", {
      status: 401,
    });
  }
  const appointments = await prisma.appointment.findMany();

  return NextResponse.json(appointments);
}

export async function POST(request) {
  const cookieStore = cookies();
  const patient = cookieStore.get("patient");
  const user = cookieStore.get("user");
  if (!patient && !user) {
    return new Response("Unauthorized ", {
      status: 401,
    });
  }
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
  const cookieStore = cookies();
  const patient = cookieStore.get("patient");
  const user = cookieStore.get("user");
  if (!patient && !user) {
    return new Response("Unauthorized ", {
      status: 401,
    });
  }
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
  const cookieStore = cookies();
  const patient = cookieStore.get("patient");
  const user = cookieStore.get("user");
  if (!patient && !user) {
    return new Response("Unauthorized ", {
      status: 401,
    });
  }
  const data = await request.json();
  await prisma.appointment.delete({
    where: {
      id: data.id,
    },
  });
  const appointments = await prisma.appointment.findMany();
  return NextResponse.json(appointments);
}
