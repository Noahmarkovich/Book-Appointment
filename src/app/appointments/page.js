import { prisma } from "@/lib/prisma";
import { AppointmentsClient } from "./appointments";
import { cookies } from "next/headers";

export default async function Appointments() {
  const patientCookie = cookies().get("patient");
  const patient = JSON.parse(patientCookie?.value);

  const patientTreatments = await prisma.patient
    .findUnique({
      where: {
        id: patient.id,
      },
    })
    .treatments({
      select: {
        patientId: true,
        treatmentId: true,
        treatment: {
          select: {
            id: true,
            title: true,
            duration: true,
            price: true,
          },
        },
      },
    });

  const appointments = await prisma.appointment.findMany({});

  const data = await prisma.content.findUnique({
    where: {
      id: "appointments",
    },
  });

  return (
    <AppointmentsClient
      patientTreatments={patientTreatments}
      appointmentsFromServer={appointments}
      data={data}
    />
  );
}
