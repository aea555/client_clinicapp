import { ConfirmEmail } from "apicalls/Account/ConfirmEmail";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    accountId,
    email
  } = await request.json();

  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

  let result;
  result = await ConfirmEmail(
    accountId,
    email,
    clientIp
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
