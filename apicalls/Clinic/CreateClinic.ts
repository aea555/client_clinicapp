"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { Clinic } from "types/Clinic.type";
import { ServiceResult } from "types/ServiceResult";

export async function CreateClinic(
  name: string,
  address: string,
  openTime: string,
  closeTime: string,
  breakStartTime: string,
  breakEndTime: string,
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

  const requestUrl = `${baseUrl}Clinic`;

  const reqBody = JSON.stringify({
    name,
    address,
    openTime,
    closeTime,
    breakStartTime,
    breakEndTime,
  });

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: reqHeaders,
    body: reqBody,
  });

  if (!response.ok) {
    var ErrRes: ServiceResult<Clinic> = {
      success: false,
      errorMessage: "Clinic Create Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: ServiceResult<Clinic> = await response.json();
  return result;
}
