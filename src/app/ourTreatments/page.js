import { prisma } from "@/lib/prisma";
import { OurTreatmentsCmp } from "./our-treatments";

export default async function OurTreatments() {
  const data = await prisma.content.findUnique({
    where: {
      id: "our-treatments",
    },
  });
  return <OurTreatmentsCmp data={data} />;
}
