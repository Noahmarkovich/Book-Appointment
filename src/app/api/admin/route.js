import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  if (!userCookie) {
    return new Response("Unauthorized ", {
      status: 401,
    });
  }
  const currentUser = JSON.parse(userCookie.value);
  if (!currentUser.role === "ADMIN") {
    return new Response("Unauthorized user", {
      status: 401,
    });
  }
  const patients = await prisma.patient.findMany({
    include: {
      treatments: true,
    },
  });

  return NextResponse.json(patients);
}

export async function PUT(request) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  if (!userCookie) {
    return new Response("Unauthorized ", {
      status: 401,
    });
  }
  const currentUser = JSON.parse(userCookie.value);
  if (!currentUser.role === "ADMIN") {
    return new Response("Unauthorized user", {
      status: 401,
    });
  }
  const data = await request.json();
  await prisma.patientTreatment.deleteMany({
    where: {
      patientId: data.id,
    },
  });

  const updatedTreatments = data.treatments.map((treatment) => {
    return { patientId: data.id, treatmentId: treatment.id };
  });

  await prisma.patientTreatment.createMany({
    data: updatedTreatments,
  });

  const patients = await prisma.patient.findMany({
    include: {
      treatments: true,
    },
  });

  return NextResponse.json(patients);
}

export async function DELETE(request) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  if (!userCookie) {
    return new Response("Unauthorized ", {
      status: 401,
    });
  }
  const currentUser = JSON.parse(userCookie.value);
  if (!currentUser.role === "ADMIN") {
    return new Response("Unauthorized user", {
      status: 401,
    });
  }
  const patientId = await request.json();
  await prisma.patient.delete({
    where: {
      id: patientId,
    },
  });

  const patients = await prisma.patient.findMany({
    include: {
      treatments: true,
    },
  });

  return NextResponse.json(patients);
}
