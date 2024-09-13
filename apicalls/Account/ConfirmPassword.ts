"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { Account } from "types/Account.type";
import { ServiceResult } from "types/ServiceResult";

export async function ConfirmPassword(
  accountId: number,
  password: string,
  clientIp?: string | null,
): Promise<ServiceResult<Account>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes: ServiceResult<Account> = {
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
  const requestUrl = `${baseUrl}Account/ConfirmPassword`;

  const reqBody = JSON.stringify({
    accountId,
    password
  });

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: reqHeaders,
    body: reqBody,
  });

  if (!response.ok) {
    var ErrRes: ServiceResult<Account> = {
      success: false,
      errorMessage: "Password confirmation Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: ServiceResult<Account> = await response.json();
  return result;
}
