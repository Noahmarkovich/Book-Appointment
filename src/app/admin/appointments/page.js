import { prisma } from "@/lib/prisma";
import { AppointmentsCmp } from "./appointments";

export default async function Appointments() {
  const appointments = await prisma.appointment.findMany();

  return <AppointmentsCmp fetchedAppointments={appointments} />;
}
