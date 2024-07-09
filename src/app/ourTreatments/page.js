import { prisma } from "@/lib/prisma";
import { OurTreatmentsCmp } from "./our-treatments";

export const revalidate = 0;

export default async function OurTreatments() {
  const data = await prisma.content.findUnique({
    where: {
      id: "our-treatments",
    },
  });
  const treatments = await prisma.treatment.findMany();
  return <OurTreatmentsCmp data={data} treatments={treatments} />;
}
