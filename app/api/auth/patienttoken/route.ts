import { GivePatientToken } from "apicalls/Auth/GivePatientToken";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    accountId
  } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");


  let result;
  result = await GivePatientToken(
    Number(accountId),
    clientIp
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, result: result });
  }
}
