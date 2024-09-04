"use server";

import { ServiceResult } from "types/ServiceResult";
import { env } from "../../env";
import { cookies } from "next/headers";

export async function Login(email: string, password: string): Promise<ServiceResult> {
  const baseUrl = env.API_CON;
  const response = await fetch(`${baseUrl}Auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    var ErrRes : ServiceResult<string> = {
      success: false,
      errorMessage: "Login request failed.",
      message: "",
      statusCode: response.status,
      data: ""
    }
    return ErrRes;
  }

  const result: ServiceResult = await response.json();
  if (result.data) cookies().set("token", result.data, {secure: true});
  
  return result;
}
