import { prisma } from "@/lib/prisma";
import { HomePage } from "./home-page";

const metadata = {
  title: "Home page",
  description: "Presents the clinic and the features of the site",
};
export default async function Home() {
  const data = await prisma.content.findUnique({
    where: {
      id: "home-page",
    },
  });

  return <HomePage data={data} />;
}
