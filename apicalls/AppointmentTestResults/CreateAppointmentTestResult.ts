"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { AppointmentTestResult } from "types/AppointmentTestResult.type";
import { ServiceResult } from "types/ServiceResult";

export async function CreateAppointmentTestResultWithAccountId(
  appointmentTestId : number,
  value: number,
  accountId: number,
  resultFlag: number,
  clientIp?: string | null,
): Promise<ServiceResult<AppointmentTestResult>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes: ServiceResult<AppointmentTestResult> = {
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
  const requestUrl = `${baseUrl}AppointmentTestResult/CreateWithAccountId`;

  const reqBody = JSON.stringify({
    appointmentTestId,
    value,
    accountId,
    resultFlag
  });

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: reqHeaders,
    body: reqBody,
  });

  if (!response.ok) {
    var ErrRes: ServiceResult<AppointmentTestResult> = {
      success: false,
      errorMessage: "AppointmentTestResult Create Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: ServiceResult<AppointmentTestResult> = await response.json();
  return result;
}
