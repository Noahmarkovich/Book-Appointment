import { getSession } from "next-auth/react";

export async function verifyAuth(request) {
  const session = await getSession({ req: request });
  console.log(session);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  return session;
}
