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
  const currentUser = JSON.parse(userCookie.value);
  if (!currentUser.role === "ADMIN") {
    return new Response("Unauthorized user", {
      status: 401,
    });
  }
  let data = await request.json();
  const fullData = JSON.parse(JSON.stringify(data));
  if (data.id === "our-treatments") {
    const treatments = data.content.treatments.treatments;
    delete data.content.treatments.treatments;
    for (const treatment of treatments) {
      await prisma.treatment.upsert({
        where: { id: treatment.id },
        update: {
          price: treatment.price,
          title: treatment.title,
          duration: treatment.duration,
        },
        create: {
          id: treatment.id,
          price: treatment.price,
          title: treatment.title,
          duration: treatment.duration,
        },
      });
    }
  }
  let content = await prisma.content.update({
    where: {
      id: data.id,
    },
    data: {
      content: data.content,
    },
  });

  return NextResponse.json(fullData);
}
