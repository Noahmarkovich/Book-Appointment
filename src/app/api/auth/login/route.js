import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const data = await request.json();

  if (!data.email || !data.password) {
    return new Response("Missing information", {
      status: 400,
    });
  }

  const patient = await prisma.patient.findUnique({
    where: {
      email: data.email,
    },
  });

  const match = await bcrypt.compare(data.password, patient.password);
  if (match) {
    delete patient.password;
    cookies().set("patient", JSON.stringify(patient), { secure: true });
    return Response.json(patient);
  } else
    return new Response("Wrong email or password", {
      status: 401,
    });
}
