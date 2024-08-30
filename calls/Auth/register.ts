import { ServiceResult } from "types/ServiceResult";
import { env } from "../../env";

export async function Register(email: string, passwordHash: string): Promise<ServiceResult> {
  const baseUrl = env.NEXT_PUBLIC_API_CON;
  console.log(baseUrl)
  const response = await fetch(`${baseUrl}Account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, passwordHash }),
  });

  if (!response.ok) {
    var ErrRes : ServiceResult<string> = {
      success: false,
      errorMessage: "Error",
      message: "",
      statusCode: response.status,
      data: ""
    }
    return ErrRes;
  }

  const result: ServiceResult = await response.json();
  return result;
}
