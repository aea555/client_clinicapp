"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { ServiceResult } from "types/ServiceResult";
import { Test } from "types/Test.type";

export async function GetAllTests(
  clientIp?: string | null,
): Promise<ServiceResult<Test[]>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes: ServiceResult<Test[]> = {
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
  const requestUrl = `${baseUrl}Test`;

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: reqHeaders,
  });

  if (!response.ok) {
    var ErrRes: ServiceResult<Test[]> = {
      success: false,
      errorMessage: "Fetch for Tests Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: ServiceResult<Test[]> = await response.json();
  return result;
}
