"use server"

import { ServiceResult } from "types/ServiceResult";
import { env } from "../../env";

export async function Register(email: string, passwordHash: string, gender: Number, birthDate: string): Promise<ServiceResult> {
  const baseUrl = env.API_CON;
  const response = await fetch(`${baseUrl}Account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, passwordHash, gender, birthDate }),
  });

  if (!response.ok) {
    var ErrRes : ServiceResult<string> = {
      success: false,
      errorMessage: "Error",
      message: "",
      statusCode: response.status,
      data: ""
    }
    return ErrRes;
  }

  const result: ServiceResult = await response.json();
  return result;
}
