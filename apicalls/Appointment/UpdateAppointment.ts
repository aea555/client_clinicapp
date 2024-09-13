"use server";

import { env } from "env";
import { cookies } from "next/headers";
import {
  Appointment,
  GetAllAppointmentsResponse,
} from "types/AllAppointmentsResponseData.type";
import { ServiceResult } from "types/ServiceResult";

export async function UpdateAppointment(
  appointmentId: number | string,
  notes: string | null,
  status: number | null,
  finishTime: string | null,
  clientIp?: string | null,
): Promise<ServiceResult<Appointment>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes: ServiceResult<Appointment> = {
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
  const requestUrl = `${baseUrl}Appointment`;

  const reqBody = JSON.stringify({
    id: Number(appointmentId),
    ...(finishTime !== null && finishTime !== '' && { finishTime }),  
    ...(notes !== null && notes !== '' && { notes }),  
    ...(status !== null && { appointmentStatus: status }),  
  });

  const response = await fetch(requestUrl, {
    method: "PUT",
    headers: reqHeaders,
    body: reqBody
  });

  if (!response.ok) {
    var ErrRes: ServiceResult<Appointment> = {
      success: false,
      errorMessage: "Appointment Update Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: ServiceResult<Appointment> = await response.json();
  return result;
}
