import { prisma } from "@/lib/prisma";
import { makeAnAvatar } from "@/app/services/service";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export async function POST(request, res) {
  const data = await request.json();

  if (!data.email || !data.password || !data.phoneNumber || !data.fullName) {
    return new Response("Missing information", {
      status: 401,
    });
  }

  const isPatientExist = await prisma.patient.findUnique({
    where: {
      email: data.email,
    },
  });

  if (isPatientExist) {
    return new Response("Patient exists", {
      status: 400,
    });
  }

  const avatar = makeAnAvatar(data.fullName);
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const patient = await prisma.patient.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: hashedPassword,
      avatar,
    },
  });

  const patientTreatment = await prisma.patientTreatment.create({
    data: {
      patientId: patient.id,
      treatmentId: "ed5d5ba0-0fe9-4413-bef2-fb2a55529c24",
    },
  });

  delete patient.password;
  cookies().set("patient", JSON.stringify(patient), { secure: true });

  console.log(patientTreatment);
  return Response.json(patient);
}
