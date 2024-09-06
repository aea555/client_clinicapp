"use server"

import { env } from "env";
import { cookies } from "next/headers";
import { Feedback } from "types/Feedback.type";
import { ServiceResult } from "types/ServiceResult";

export async function GetAllFeedbacks() : Promise<ServiceResult<Feedback[]>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes : ServiceResult<Feedback[]> = {
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

  const requestUrl = `${baseUrl}Feedback`
  
  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: reqHeaders,
  });

  if (!response.ok) {
    var ErrRes : ServiceResult<Feedback[]> = {
      success: false,
      errorMessage: "Fetch for Feedbacks Failed",
      message: "",
      statusCode: response.status,
      data: null
    }
    return ErrRes;
  }

  const result: ServiceResult<Feedback[]> = await response.json();
  return result
}