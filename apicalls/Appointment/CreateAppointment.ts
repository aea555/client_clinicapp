"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { Appointment } from "types/Appointment.type";
import { ServiceResult } from "types/ServiceResult";

export async function CreateAppointment(
  clinicId: number,
  doctorId: number,
  patientId: number,
  startTime: string
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

  const requestUrl = `${baseUrl}Appointment`;

  const reqBody = JSON.stringify({
    clinicId,
    doctorId,
    patientId,
    startTime
  });

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: reqHeaders,
    body: reqBody,
  });

  if (!response.ok) {
    var ErrRes: ServiceResult<Appointment> = {
      success: false,
      errorMessage: "Appointment Create Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: ServiceResult<Appointment> = await response.json();
  return result;
}
