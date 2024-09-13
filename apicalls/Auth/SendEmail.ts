"use server";

import { ServiceResult } from "types/ServiceResult";
import { env } from "../../env";

export async function SendEmail(
  email: string,
  clientIp?: string | null,
): Promise<ServiceResult> {
  const baseUrl = env.API_CON;
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  if (clientIp) {
    reqHeaders.append("X-Forwarded-For", clientIp);
  }
  const response = await fetch(`${baseUrl}Auth/send-email`, {
    method: "POST",
    headers: reqHeaders,
    body: JSON.stringify({ email }),
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
