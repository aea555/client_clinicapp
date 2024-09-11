"use server"

import { env } from "env";
import { cookies } from "next/headers";
import { AppointmentScreenResults } from "types/AppointmentScreenResults.type";
import { ServiceResult } from "types/ServiceResult";

export async function GetTestResultsAppointmentScreen(appointmentId: number) : Promise<ServiceResult<AppointmentScreenResults[], AppointmentScreenResults[]>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes : ServiceResult<AppointmentScreenResults[], AppointmentScreenResults[]> = {
      success: false,
      errorMessage: "Unauthorized (401)",
      message: "",
      statusCode: 401,
      data: null
    }
    return ErrRes;
  }

  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  reqHeaders.append("Authorization", `Bearer ${token?.value}`);

  const requestUrl = `${baseUrl}AppointmentTest/GetTestResultsOfAppointment/${appointmentId}`
  
  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: reqHeaders,
  });

  if (!response.ok) {
    var ErrRes : ServiceResult<AppointmentScreenResults[], AppointmentScreenResults[]> = {
      success: false,
      errorMessage: "Fetch Failed",
      message: "",
      statusCode: response.status,
      data: null
    }
    return ErrRes;
  }

  const result: ServiceResult<AppointmentScreenResults[], AppointmentScreenResults[]> = await response.json();
  return result
}