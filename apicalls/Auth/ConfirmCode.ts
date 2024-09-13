"use server";

import { ServiceResult } from "types/ServiceResult";
import { env } from "../../env";

export async function ConfirmCode(
  email: string,
  code: string,
  clientIp?: string | null,
): Promise<ServiceResult<string>> {
  const baseUrl = env.API_CON;
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  if (clientIp) {
    reqHeaders.append("X-Forwarded-For", clientIp);
  }
  const response = await fetch(`${baseUrl}Auth/confirm-code`, {
    method: "POST",
    headers: reqHeaders,
    body: JSON.stringify({ email, code }),
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

  const result: ServiceResult<string> = await response.json();
  return result;
}
