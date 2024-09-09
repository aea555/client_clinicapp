"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { Appointment } from "types/Appointment.type";
import { ServiceResult } from "types/ServiceResult";

export async function CreateAppointmentWithAccountId(
  clinicId: number,
  doctorId: number,
  accountId: number,
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

  const requestUrl = `${baseUrl}Appointment/CreateWithAccountId`;

  const reqBody = JSON.stringify({
    clinicId,
    doctorId,
    accountId,
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
