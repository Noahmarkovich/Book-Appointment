import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const data = await request.json();
  const content = await prisma.content.update({
    where: {
      id: data.id,
    },
    data: {
      content: data.content,
    },
  });
  //TODO: check how I can update treatments.

  //   if (data.id === "our-treatments") {
  //     await data.content.treatments.treatments.map((treatment) => {
  //       console.log(treatment);
  //       prisma.treatment.upsert({
  //         where: { id: treatment.id },
  //         update: {
  //           title: treatment.title,
  //           duration: treatment.duration,
  //           price: treatment.price,
  //         },
  //         create: {
  //           title: treatment.title,
  //           duration: treatment.duration,
  //           price: treatment.price,
  //         },
  //       });
  //     });
  //   }

  return NextResponse.json(content);
}
