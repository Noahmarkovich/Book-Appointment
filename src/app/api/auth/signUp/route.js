import { prisma } from "@/lib/prisma";
import { makeAnAvatar } from "@/app/services/service";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
const nameRegex = /^[A-Za-z ]+$/;
const phoneNumberRegex =
  /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;
const patientSchema = yup
  .object({
    fullName: yup
      .string()
      .matches(nameRegex, "Only English letters")
      .required(),
    email: yup.string().email("Must be a valid email").required(),
    password: yup
      .string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .matches(/(?=.*[A-Z])/, "Password must consist of one Capital letter.")
      .matches(/(?=.*\d)/, "Password must consist of one digit.")
      .required("No password provided."),

    phoneNumber: yup
      .string()
      .matches(phoneNumberRegex, "Must be a valid phone number")
      .required(),
  })
  .required();

const SIGN_UP_ERROR_CODE = {
  EXISTING_PATIENT: "existing_patient",
};

export async function POST(request, res) {
  const data = await request.json();
  try {
    await patientSchema.validate(data);
  } catch (error) {
    return new Response(error.errors, {
      status: 400,
    });
  }

  const existingPatient = await prisma.patient.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingPatient) {
    return new Response(SIGN_UP_ERROR_CODE.EXISTING_PATIENT, {
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
