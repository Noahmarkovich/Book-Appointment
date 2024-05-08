import { prisma } from "@/lib/prisma";
import { AppointmentsClient } from "./appointments";
import { cookies } from "next/headers";

export default async function Appointments() {
  const theme = cookies().get("patient");
  const patient = JSON.parse(theme?.value);

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

  const patientAppointments = await prisma.appointment.findMany({
    where: {
      patientId: patient.id,
    },
  });

  const appointments = await prisma.appointment.findMany({});

  return (
    <AppointmentsClient
      patientTreatments={patientTreatments}
      appointmentsFromServer={appointments}
    />
  );
}
