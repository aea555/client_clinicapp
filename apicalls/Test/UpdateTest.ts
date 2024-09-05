"use server";

import { env } from "env";
import { cookies } from "next/headers";
import { ServiceResult } from "types/ServiceResult";
import { Test } from "types/Test.type";

export async function UpdateTest(
  id: number | null,
  name: string | null,
  unitType: string | null,
  rangeStartMale: number | null,
  rangeEndMale: number | null,
  rangeStartFemale: number | null,
  rangeEndFemale: number | null,
  desc: string | null,
): Promise<ServiceResult<Test>> {
  const baseUrl = env.API_CON;
  const token = cookies().get("token");

  if (!token) {
    var ErrRes: ServiceResult<Test> = {
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

  const requestUrl = `${baseUrl}Test`;

  const reqBody = JSON.stringify({
    ...(id !== null && { id }),
    ...(name !== null && name !== '' && { name }),
    ...(unitType !== null && unitType !== '' && { unitType }),
    ...(rangeStartMale !== null && rangeStartMale !== 0 && { rangeStartMale }),
    ...(rangeEndMale !== null && rangeEndMale !== 0 && { rangeEndMale }),
    ...(rangeStartFemale !== null && rangeStartFemale !== 0 && { rangeStartFemale }),
    ...(rangeEndFemale !== null && rangeEndFemale !== 0 && { rangeEndFemale }),
    ...(desc !== null && desc !== '' && { desc }),
  });

  const response = await fetch(requestUrl, {
    method: "PUT",
    headers: reqHeaders,
    body: reqBody
  });

  if (!response.ok) {
    var ErrRes: ServiceResult<Test> = {
      success: false,
      errorMessage: "Test Update Failed",
      message: "",
      statusCode: response.status,
      data: null,
    };
    return ErrRes;
  }

  const result: ServiceResult<Test> = await response.json();
  return result;
}
