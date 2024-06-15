"use server";
import { cookies } from "next/headers";

export async function cookieCheck(cName) {
  const cookieStore = cookies();
  const theme = cookieStore.get(cName);
  return theme ? theme.value : theme;
}
