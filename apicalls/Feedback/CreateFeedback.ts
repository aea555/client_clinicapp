"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { Feedback } from "types/Feedback.type";
import { ServiceResult } from "types/ServiceResult";

export async function CreateFeedback(
  patientId: number,
  doctorId: number,
  appointmentId: number,
  rating: number,
  comment: string | null,
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

  const requestUrl = `${baseUrl}Feedback`;

  const reqBody = JSON.stringify({
    patientId,
    doctorId,
    appointmentId,
    rating,
    comment,
  });

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: reqHeaders,
    body: reqBody,
  });

  if (!response.ok) {
    var ErrRes: ServiceResult<Feedback> = {
      success: false,
      errorMessage: "Feedback Create Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: ServiceResult<Feedback> = await response.json();
  return result;
}
