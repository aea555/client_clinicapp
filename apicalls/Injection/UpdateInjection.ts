"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { Injection } from "types/Injection.type";
import { ServiceResult } from "types/ServiceResult";

export async function UpdateInjection(
  id: number,
  patientId: number | null,
  doctorId: number | null,
  drugId: number | null,
  clientIp?: string | null,
): Promise<ServiceResult<Injection>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes: ServiceResult<Injection> = {
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
  const requestUrl = `${baseUrl}Injection`;

  const reqBody = JSON.stringify({
    ...(id !== null && { id }),
    ...(patientId !== null && patientId !== undefined && patientId !== 0 && { patientId }),
    ...(doctorId !== null && doctorId !== undefined && doctorId !== 0 && { doctorId }),
    ...(drugId !== null && drugId !== undefined && drugId !== 0 && { drugId }),
  });

  const response = await fetch(requestUrl, {
    method: "PUT",
    headers: reqHeaders,
    body: reqBody
  });

  if (!response.ok) {
    var ErrRes: ServiceResult<Injection> = {
      success: false,
      errorMessage: "Injection Update Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: ServiceResult<Injection> = await response.json();
  return result;
}
