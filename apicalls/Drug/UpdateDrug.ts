"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { Drug } from "types/Drug.type";
import { ServiceResult } from "types/ServiceResult";

export async function UpdateDrug(
  id: number,
  name: string | null,
  clientIp?: string | null,
): Promise<ServiceResult<Drug>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes: ServiceResult<Drug> = {
      success: false,
      errorMessage: "Unauthorized (401)",
      message: "",
      statusCode: 401,
      data: null,
    };
    return ErrRes;
  }

  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  reqHeaders.append("Authorization", `Bearer ${token?.value}`);
  if (clientIp) {
    reqHeaders.append("X-Forwarded-For", clientIp);
  }
  const requestUrl = `${baseUrl}Drug`;

  const reqBody = JSON.stringify({
    ...(id !== null && { id }), 
    ...(name !== null && name !== '' && { name }),
  });

  const response = await fetch(requestUrl, {
    method: "PUT",
    headers: reqHeaders,
    body: reqBody,
  });

  if (!response.ok) {
    var ErrRes: ServiceResult<Drug> = {
      success: false,
      errorMessage: "Drug Update Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: ServiceResult<Drug> = await response.json();
  return result;
}
