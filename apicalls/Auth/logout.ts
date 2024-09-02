"use server";

import { cookies } from "next/headers";

export function LogOut(){
  const tokenExists = cookies().has("token");

  if (tokenExists) {
    cookies().delete("token");
  }
}