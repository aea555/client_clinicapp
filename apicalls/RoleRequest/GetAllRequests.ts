"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { RoleSignupResponse } from "types/RoleSignupResponseData.type";
import { getRequestUrl } from "utils/getRequestUrl";

export async function GetAllRequests(
  role: string,
  clientIp?: string | null,
): Promise<RoleSignupResponse> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes: RoleSignupResponse = {
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
  const requestUrl = getRequestUrl(baseUrl, role);

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: reqHeaders,
  });

  if (!response.ok) {
    var ErrRes: RoleSignupResponse = {
      success: false,
      errorMessage: "Fetch for Requests Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: RoleSignupResponse = await response.json();
  return result;
}
