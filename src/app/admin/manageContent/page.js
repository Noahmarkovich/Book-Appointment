import { prisma } from "@/lib/prisma";
import { ManageContentCmp } from "./manage-content";

export const revalidate = 0;

export default async function ManageContent() {
  const data = await prisma.content.findMany({});
  const treatments = await prisma.treatment.findMany({});
  return <ManageContentCmp fetchedData={data} fetchedTreatments={treatments} />;
}
