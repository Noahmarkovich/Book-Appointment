import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export async function POST(request) {
  const data = await request.json();

  if (!data.email || !data.password) {
    return new Response("Missing information", {
      status: 400,
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  console.log(user);
  const match = await bcrypt.compare(data.password, user.password);
  if (match) {
    delete user.password;
    console.log(user);
    cookies().set("user", JSON.stringify(user), { secure: true });
    return Response.json(user);
  } else
    return new Response("Wrong email or password", {
      status: 401,
    });
}
