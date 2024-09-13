"use server"

import { env } from "env";
import { cookies } from "next/headers";
import { Appointment } from "types/Appointment.type";
import { ServiceResult } from "types/ServiceResult";

interface Props {
  appointmentId: number,
  clientIp?: string | null,
}

export async function GetAppointment({appointmentId, clientIp} : Props) : Promise<ServiceResult<Appointment>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes : ServiceResult<Appointment> = {
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
  if (clientIp) {
    reqHeaders.append("X-Forwarded-For", clientIp);
  }
  const requestUrl = `${baseUrl}Appointment/${appointmentId}`
  
  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: reqHeaders,
  });

  if (!response.ok) {
    var ErrRes : ServiceResult<Appointment> = {
      success: false,
      errorMessage: "Fetch for Appointment Failed",
      message: "",
      statusCode: response.status,
      data: null
    }
    return ErrRes;
  }

  const result: ServiceResult<Appointment> = await response.json();
  return result
}