"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { AppointmentTestResult } from "types/AppointmentTestResult.type";
import { ServiceResult } from "types/ServiceResult";

export async function UpdateAppointmentTestResult(
  id: number,
  appointmentTestId: number,
  resultDate: string | null,
  value: number | null,
  biochemistId: number,
  resultFlag: number | null,
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

  const requestUrl = `${baseUrl}AppointmentTestResult`;

  const reqBody = JSON.stringify({
    ...(id !== null && { id }),  
    ...(appointmentTestId !== null && { appointmentTestId }),  
    ...(resultDate !== null && resultDate !== '' && { resultDate }),  
    ...(value !== null && value !== 0 && { value }),  
    ...(biochemistId !== null && { biochemistId }), 
    ...(resultFlag !== null && { resultFlag }),  
  });

  const response = await fetch(requestUrl, {
    method: "PUT",
    headers: reqHeaders,
    body: reqBody
  });
  

  if (!response.ok) {
    var ErrRes: ServiceResult<AppointmentTestResult> = {
      success: false,
      errorMessage: "Result Update Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: ServiceResult<AppointmentTestResult> = await response.json();
  return result;
}
