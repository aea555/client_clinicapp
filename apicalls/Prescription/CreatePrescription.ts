"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { ServiceResult } from "types/ServiceResult";
import { Prescription } from "types/Prescription.type";

export async function CreatePrescription(
  doctorId: number, patientId: number, appointmentId: number, durationDays: number, notes?: string | null
): Promise<ServiceResult<Prescription>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes: ServiceResult<Prescription> = {
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

  const requestUrl = `${baseUrl}Prescription`;

  const reqBody = JSON.stringify({
    doctorId, patientId, appointmentId, durationDays, notes
  });

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: reqHeaders,
    body: reqBody,
  });

  if (!response.ok) {
    var ErrRes: ServiceResult<Prescription> = {
      success: false,
      errorMessage: "Prescription Create Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: ServiceResult<Prescription> = await response.json();
  return result;
}
