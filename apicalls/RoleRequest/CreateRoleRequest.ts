"use server"

import { cookies } from "next/headers";
import { env } from "../../env";
import { ServiceResult } from "types/ServiceResult";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "types/Jwt.type";

export default async function CreateRoleRequest(role: string, firstName: string, lastName: string) : Promise<ServiceResult>{
  function getRequestUrl(role: string): string {
    const urlMap: { [key: string]: string } = {
      doctor: `${baseUrl}DoctorSignupRequest`,
      patient: `${baseUrl}Patient`,
      biochemist: `${baseUrl}BiochemistSignupRequest`,
    };
  
    return urlMap[role.toLowerCase()] || ""; 
  }
  
  const token = cookies().get("token");

  if (!token) {
    var ErrRes : ServiceResult<string> = {
      success: false,
      errorMessage: "Request creation failed. Unauthorized (401)",
      message: "",
      statusCode: 401,
      data: ""
    }
    return ErrRes;
  }

  const accountId = jwtDecode<CustomJwtPayload>(token.value).nameid;

  const reqBody = JSON.stringify({
    "accountId": Number(accountId),
    "firstName": firstName,
    "lastName": lastName,
  })

  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  reqHeaders.append("Authorization", `Bearer ${token?.value}`);

  
  const baseUrl = env.API_CON;
  const requestUrl = getRequestUrl(role);

  const response = await fetch(requestUrl, {
    method: 'POST',
    headers: reqHeaders,
    body: reqBody,
    redirect: "follow"
  })


  if (!response.ok) {
    var ErrRes : ServiceResult<string> = {
      success: false,
      errorMessage: "Request creation failed.",
      message: "",
      statusCode: response.status,
      data: ""
    }
    return ErrRes;
  }

  const result: ServiceResult = await response.json();
  return result
}