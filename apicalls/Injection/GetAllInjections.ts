"use server"

import { env } from "env";
import { cookies } from "next/headers";
import { Injection } from "types/Injection.type";
import { ServiceResult } from "types/ServiceResult";

export async function GetAllInjections() : Promise<ServiceResult<Injection[]>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes : ServiceResult<Injection[]> = {
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

  const requestUrl = `${baseUrl}Injection`
  
  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: reqHeaders,
  });

  if (!response.ok) {
    var ErrRes : ServiceResult<Injection[]> = {
      success: false,
      errorMessage: "Fetch for Injections Failed",
      message: "",
      statusCode: response.status,
      data: null
    }
    return ErrRes;
  }

  const result: ServiceResult<Injection[]> = await response.json();
  return result
}