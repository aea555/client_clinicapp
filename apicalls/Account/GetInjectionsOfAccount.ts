"use server"

import { ServiceResult } from "types/ServiceResult";
import { env } from "env";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "types/Jwt.type";
import { InjectionsOfAccount } from "types/InjectionsOfAccount.type";

export async function GetInjectionsOfAccount(clientIp?: string | null,) : Promise<ServiceResult<InjectionsOfAccount[], InjectionsOfAccount[]>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes : ServiceResult<InjectionsOfAccount[]> = {
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
  const requestUrl = `${baseUrl}GetInjectionsOfAccount/${accountId}`;
  
  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: reqHeaders,
  });

  if (!response.ok) {
    var ErrRes : ServiceResult<InjectionsOfAccount[]> = {
      success: false,
      errorMessage: "Fetch failed.",
      message: "",
      statusCode: response.status,
      data: null
    }
    return ErrRes;
  }

  const result: ServiceResult<InjectionsOfAccount[]> = await response.json();
  return result
}