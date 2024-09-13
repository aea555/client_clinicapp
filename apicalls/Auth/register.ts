"use server";

import { ServiceResult } from "types/ServiceResult";
import { env } from "../../env";

export async function Register(
  email: string,
  passwordHash: string,
  gender: Number,
  birthDate: string,
  clientIp?: string | null,
): Promise<ServiceResult> {
  const baseUrl = env.API_CON;
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  if (clientIp) {
    reqHeaders.append("X-Forwarded-For", clientIp);
  }
  const response = await fetch(`${baseUrl}Account`, {
    method: "POST",
    headers: reqHeaders,
    body: JSON.stringify({ email, passwordHash, gender, birthDate }),
  });

  if (!response.ok) {
    var ErrRes: ServiceResult<string> = {
      success: false,
      errorMessage: "Error",
      message: "",
      statusCode: response.status,
      data: "",
    };
    return ErrRes;
  }

  const result: ServiceResult = await response.json();
  return result;
}
