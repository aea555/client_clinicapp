"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { Clinic } from "types/Clinic.type";
import { ServiceResult } from "types/ServiceResult";

export async function UpdateClinic(
  id: number,
  name: string | null,
  address: string | null,
  openTime: string | null,
  closeTime: string | null,
  breakStartTime: string | null,
  breakEndTime: string | null,
  clientIp?: string | null,
): Promise<ServiceResult<Clinic>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes: ServiceResult<Clinic> = {
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
  const requestUrl = `${baseUrl}Clinic`;

  const reqBody = JSON.stringify({
    ...(id !== null && { id }),
    ...(name !== null && name !== '' && { name }),
    ...(address !== null && address !== '' && { address }),
    ...(openTime !== null && openTime !== '' && { openTime }),
    ...(closeTime !== null && closeTime !== '' && { closeTime }),
    ...(breakStartTime !== null && breakStartTime !== '' && { breakStartTime }),
    ...(breakEndTime !== null && breakEndTime !== '' && { breakEndTime }),
  });

  const response = await fetch(requestUrl, {
    method: "PUT",
    headers: reqHeaders,
    body: reqBody
  });

  if (!response.ok) {
    var ErrRes: ServiceResult<Clinic> = {
      success: false,
      errorMessage: "Clinic Update Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: ServiceResult<Clinic> = await response.json();
  return result;
}
