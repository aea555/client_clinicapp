"use server"

import { env } from "env";
import { cookies } from "next/headers";
import { PossibleAppointment } from "types/PossibleAppointment.type";
import { ServiceResult } from "types/ServiceResult";

interface Props {
  clinicId: number,
  clientIp?: string | null,
}

export async function GetAllPossibleAppointments({clinicId, clientIp} : Props) : Promise<ServiceResult<PossibleAppointment[]>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes : ServiceResult<PossibleAppointment[]> = {
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
  const requestUrl = `${baseUrl}Appointment/GetPossibleAppointments/${clinicId}`
  
  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: reqHeaders,
  });

  if (!response.ok) {
    var ErrRes : ServiceResult<PossibleAppointment[]> = {
      success: false,
      errorMessage: "Fetch for Possible Appointments Failed",
      message: "",
      statusCode: response.status,
      data: null
    }
    return ErrRes;
  }

  const result: ServiceResult<PossibleAppointment[]> = await response.json();
  return result
}