"use server"

import { env } from "env";
import { cookies } from "next/headers";
import { Account } from "types/Account.type";
import { ServiceResult } from "types/ServiceResult";

export async function GetAllAccounts() : Promise<ServiceResult<Account[]>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes : ServiceResult<Account[]> = {
      success: false,
      errorMessage: "Unauthorized (401)",
      message: "",
      statusCode: 401,
      data: []
    }
    return ErrRes;
  }

  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");
  reqHeaders.append("Authorization", `Bearer ${token?.value}`);

  const requestUrl = `${baseUrl}Account`
  
  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: reqHeaders,
  });

  if (!response.ok) {
    var ErrRes : ServiceResult<Account[]> = {
      success: false,
      errorMessage: "Fetch for Accounts Failed",
      message: "",
      statusCode: response.status,
      data: []
    }
    return ErrRes;
  }

  const result: ServiceResult<Account[]> = await response.json();
  return result
}