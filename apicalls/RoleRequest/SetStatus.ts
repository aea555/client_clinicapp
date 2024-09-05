"use server"

import { env } from "env";
import { cookies } from "next/headers";
import { RoleSignupResponseData } from "types/RoleSignupResponseData.type";
import { ServiceResult } from "types/ServiceResult";
import { getRequestUrl } from "utils/getRequestUrl";

export async function SetStatus(requestId: string | number, role: string, type: number) : Promise<ServiceResult<RoleSignupResponseData>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes : ServiceResult<RoleSignupResponseData> = {
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

  const requestUrl = getRequestUrl(baseUrl, role);

  const reqBody = JSON.stringify({
    "id": Number(requestId),
    "signUpRequest": type,
  })
  
  const response = await fetch(requestUrl, {
    method: 'PUT',
    headers: reqHeaders,
    body: reqBody,
    redirect: "follow"
  });

  if (!response.ok) {
    var ErrRes : ServiceResult<RoleSignupResponseData> = {
      success: false,
      errorMessage: "Process failed.",
      message: "",
      statusCode: response.status,
      data: null
    }
    return ErrRes;
  }

  const result: ServiceResult<RoleSignupResponseData> = await response.json();
  return result
}