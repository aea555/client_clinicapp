import { GiveNewToken } from "apicalls/Auth/GiveNewToken";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const {
    accountId,
    role
  } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

  const result = await GiveNewToken(
    Number(accountId),
    role,
    clientIp
  );
  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, result: result });
  }
}
