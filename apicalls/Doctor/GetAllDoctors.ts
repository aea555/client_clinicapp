"use server"

import { env } from "env";
import { cookies } from "next/headers";
import { Doctor } from "types/Doctor.type";
import { ServiceResult } from "types/ServiceResult";

export async function GetAllDoctors() : Promise<ServiceResult<Doctor[]>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes : ServiceResult<Doctor[]> = {
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

  const requestUrl = `${baseUrl}Doctor`
  
  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: reqHeaders,
  });

  if (!response.ok) {
    var ErrRes : ServiceResult<Doctor[]> = {
      success: false,
      errorMessage: "Fetch for Doctors Failed",
      message: "",
      statusCode: response.status,
      data: null
    }
    return ErrRes;
  }

  const result: ServiceResult<Doctor[]> = await response.json();
  return result
}