"use server"

import { ServiceResult } from "types/ServiceResult";
import { env } from "env";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "types/Jwt.type";
import { PrescriptionsOfAccount } from "types/PrescriptionsOfAccount.type";

export async function GetPrescriptionsOfAccount(clientIp?: string | null,) : Promise<ServiceResult<PrescriptionsOfAccount[], PrescriptionsOfAccount[]>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes : ServiceResult<PrescriptionsOfAccount[]> = {
      success: false,
      errorMessage: "Unauthorized",
      message: "",
      statusCode: 401,
      data: null
    }
    return ErrRes;
  }

  const accountId = jwtDecode<CustomJwtPayload>(token.value).nameid;
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  reqHeaders.append("Authorization", `Bearer ${token?.value}`);
  if (clientIp) {
    reqHeaders.append("X-Forwarded-For", clientIp);
  }
  const requestUrl = `${baseUrl}GetPrescriptionsOfAccount/${accountId}`;
  
  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: reqHeaders,
  });

  if (!response.ok) {
    var ErrRes : ServiceResult<PrescriptionsOfAccount[]> = {
      success: false,
      errorMessage: "Fetch failed.",
      message: "",
      statusCode: response.status,
      data: null
    }
    return ErrRes;
  }

  const result: ServiceResult<PrescriptionsOfAccount[]> = await response.json();
  return result
}