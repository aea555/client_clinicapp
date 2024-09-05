"use server"

import { env } from "env";
import { cookies } from "next/headers";
import { GetAllAppointmentsResponse } from "types/AllAppointmentsResponseData.type";

export async function GetAllAppointments() : Promise<GetAllAppointmentsResponse> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes : GetAllAppointmentsResponse = {
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

  const requestUrl = `${baseUrl}Appointment`
  
  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: reqHeaders,
  });

  if (!response.ok) {
    var ErrRes : GetAllAppointmentsResponse = {
      success: false,
      errorMessage: "Fetch for All Appointments Failed",
      message: "",
      statusCode: response.status,
      data: null
    }
    return ErrRes;
  }

  const result: GetAllAppointmentsResponse = await response.json();
  return result
}