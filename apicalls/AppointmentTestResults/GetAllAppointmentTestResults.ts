"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { AppointmentTestResult } from "types/AppointmentTestResult.type";
import { ServiceResult } from "types/ServiceResult";

export async function GetAllAppointmentTestResults(
  clientIp?: string | null,
): Promise<ServiceResult<AppointmentTestResult[]>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes: ServiceResult<AppointmentTestResult[]> = {
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
  const requestUrl = `${baseUrl}AppointmentTestResult`;

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: reqHeaders,
  });

  if (!response.ok) {
    var ErrRes: ServiceResult<AppointmentTestResult[]> = {
      success: false,
      errorMessage: "Fetch for TestResults Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: ServiceResult<AppointmentTestResult[]> = await response.json();
  return result;
}
