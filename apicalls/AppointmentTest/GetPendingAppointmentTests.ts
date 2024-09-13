"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { AppointmentTest } from "types/AppointmentTest.type";
import { ServiceResult } from "types/ServiceResult";

export async function GetPendingAppointmentTests(
  clientIp?: string | null,
): Promise<ServiceResult<AppointmentTest[]>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes: ServiceResult<AppointmentTest[]> = {
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
  const requestUrl = `${baseUrl}AppointmentTest/GetPending`;

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: reqHeaders,
  });

  if (!response.ok) {
    var ErrRes: ServiceResult<AppointmentTest[]> = {
      success: false,
      errorMessage: "Fetch for Pending tests Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: ServiceResult<AppointmentTest[]> = await response.json();
  return result;
}
