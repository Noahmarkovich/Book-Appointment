import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const patients = await prisma.patient.findMany({
    include: {
      treatments: true,
    },
  });

  return NextResponse.json(patients);
}

export async function PUT(request) {
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
  const patientId = await request.json();
  console.log(patientId);
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
