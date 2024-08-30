import { ServiceResult } from "types/ServiceResult";
import { env } from "../../env";

export async function Login(email: string, password: string): Promise<ServiceResult> {
  const baseUrl = env.NEXT_PUBLIC_API_CON;
  console.log(baseUrl)
  const response = await fetch(`${baseUrl}Auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    var ErrRes : ServiceResult<string> = {
      success: false,
      errorMessage: "Login request failed.",
      message: "",
      statusCode: response.status,
      data: ""
    }
    return ErrRes;
  }

  const result: ServiceResult = await response.json();
  return result;
}
