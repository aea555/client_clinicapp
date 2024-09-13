"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { Feedback } from "types/Feedback.type";
import { ServiceResult } from "types/ServiceResult";

export async function UpdateFeedback(
  id?: number,
  patientId?: number | null,
  doctorId?: number | null,
  appointmentId?: number | null,
  rating?: number | null,
  comment?: string | null,
  isDeleted?: boolean | null,
  clientIp?: string | null,
): Promise<ServiceResult<Feedback>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes: ServiceResult<Feedback> = {
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
  const requestUrl = `${baseUrl}Feedback`;

  const reqBody = JSON.stringify({
    ...(id !== null && { id }),
    ...(patientId !== null && patientId !== undefined && patientId !== 0 && { patientId }),
    ...(doctorId !== null && doctorId !== undefined && doctorId !== 0 && { doctorId }),
    ...(appointmentId !== null && appointmentId !== undefined && appointmentId !== 0 && { appointmentId }),
    ...(rating !== null && rating !== undefined && rating !== 0 && { rating }),
    ...(comment !== null && comment !== '' && { comment }),
    ...(isDeleted !== null && { isDeleted }),
  });

  const response = await fetch(requestUrl, {
    method: "PUT",
    headers: reqHeaders,
    body: reqBody
  });

  if (!response.ok) {
    var ErrRes: ServiceResult<Feedback> = {
      success: false,
      errorMessage: "Feedback Update Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: ServiceResult<Feedback> = await response.json();
  return result;
}
