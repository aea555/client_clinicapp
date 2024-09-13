import { ConfirmCode } from "apicalls/Auth/ConfirmCode";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    email, code
  } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");


  const result = await ConfirmCode(
    email,
    code,
    clientIp
  );

  if (result.success) {
    return NextResponse.json({ success: true, data: result});
  } else {
    return NextResponse.json({ success: false });
  }
}
