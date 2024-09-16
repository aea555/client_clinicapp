"use server";

import { ServiceResult } from "types/ServiceResult";
import { env } from "../../env";
import { cookies } from "next/headers";

export async function GiveNewToken(
  accountId: number,
  role: string,
  clientIp?: string | null,
): Promise<ServiceResult<string>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  reqHeaders.append("Authorization", `Bearer ${token?.value}`);
  if (clientIp) {
    reqHeaders.append("X-Forwarded-For", clientIp);
  }
  const response = await fetch(`${baseUrl}Auth/generateToken/${accountId}`, {
    method: "POST",
    headers: reqHeaders,
    body: JSON.stringify({
      role
    })
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
  if (result.data){
    cookies().has("token") && cookies().delete("token");
    cookies().set("token", result.data, { secure: true });
  }
  return result;
}
