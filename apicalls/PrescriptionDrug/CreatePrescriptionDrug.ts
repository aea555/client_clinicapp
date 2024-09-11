"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { PrescriptionDrug } from "types/PrescriptionDrug.type";
import { ServiceResult } from "types/ServiceResult";

export async function CreatePrescriptionDrug(
  drugId: number,
  prescriptionId: number,
): Promise<ServiceResult<PrescriptionDrug>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes: ServiceResult<PrescriptionDrug> = {
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

  const requestUrl = `${baseUrl}PrescriptionDrug`;

  const reqBody = JSON.stringify({
    drugId,
    prescriptionId
  });

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: reqHeaders,
    body: reqBody,
  });

  if (!response.ok) {
    var ErrRes: ServiceResult<PrescriptionDrug> = {
      success: false,
      errorMessage: "PrescriptionDrug Create Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: ServiceResult<PrescriptionDrug> = await response.json();
  return result;
}
