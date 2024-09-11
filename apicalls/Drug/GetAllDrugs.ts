"use server"

import { env } from "env";
import { cookies } from "next/headers";
import { Drug } from "types/Drug.type";
import { ServiceResult } from "types/ServiceResult";

export async function GetAllDrugs() : Promise<ServiceResult<Drug[]>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes : ServiceResult<Drug[]> = {
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

  const requestUrl = `${baseUrl}Drug`
  
  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: reqHeaders,
  });

  if (!response.ok) {
    var ErrRes : ServiceResult<Drug[]> = {
      success: false,
      errorMessage: "Fetch for Drugs Failed",
      message: "",
      statusCode: response.status,
      data: null
    }
    return ErrRes;
  }

  const result: ServiceResult<Drug[]> = await response.json();
  return result
}