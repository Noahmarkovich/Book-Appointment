import { prisma } from "@/lib/prisma";
import { makeAnAvatar } from "@/app/services/service";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

// TODO: Add schema validation

// const signUpSchema = Joi.schema({
//   email: Joi.string().required(),
// })

const SIGN_UP_ERROR_CODE = {
  VALIDATION_FAILED: "validation_failed",
  EXISTING_PATIENT: "existing_patient",
};

export async function POST(request, res) {
  const data = await request.json();

  // if(!signUpSchema.validate(data)){
  //   return new Response("Missing information", {
  //     status: 400,
  //   });
  // }

  if (!data.email || !data.password || !data.phoneNumber || !data.fullName) {
    return new Response(SIGN_UP_ERROR_CODE.VALIDATION_FAILED, {
      status: 400,
    });
  }

  const existingPatient = await prisma.patient.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingPatient) {
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

  return Response.json(patient);
}
