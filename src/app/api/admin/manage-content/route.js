import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(request) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  if (!userCookie) {
    return new Response("Unauthorized ", {
      status: 401,
    });
  }
  currentUser = JSON.parse(userCookie.value);
  if (!currentUser.role === "ADMIN") {
    return new Response("Unauthorized user", {
      status: 401,
    });
  }
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
