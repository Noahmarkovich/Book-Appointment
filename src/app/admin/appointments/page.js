import { prisma } from "@/lib/prisma";
import { AppointmentsCmp } from "./appointments";

export default async function Appointments() {
  const appointments = await prisma.appointment.findMany({});

  const patients = await prisma.patient.findMany({
    include: {
      treatments: true,
    },
  });

  const treatments = await prisma.treatment.findMany({});

  return (
    <AppointmentsCmp
      fetchedAppointments={appointments}
      fetchedPatients={patients}
      treatments={treatments}
    />
  );
}
