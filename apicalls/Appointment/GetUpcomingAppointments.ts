"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { UpcomingAppointment } from "types/UpcomingAppointment.type";
import { ServiceResult } from "types/ServiceResult";

export async function GetUpcomingAppointments(
  userId: number,
  clientIp?: string | null,
): Promise<ServiceResult<UpcomingAppointment[], UpcomingAppointment[]>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes: ServiceResult<UpcomingAppointment[], UpcomingAppointment[]> = {
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
  const requestUrl = `${baseUrl}GetUpcomingAppointments/${userId}`;

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: reqHeaders,
  });

  if (!response.ok) {
    var ErrRes: ServiceResult<UpcomingAppointment[], UpcomingAppointment[]> = {
      success: false,
      errorMessage: "Fetch for Possible Appointments Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: ServiceResult<UpcomingAppointment[], UpcomingAppointment[]> =
    await response.json();
  return result;
}
