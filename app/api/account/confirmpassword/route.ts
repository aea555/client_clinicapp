import { ConfirmPassword } from "apicalls/Account/ConfirmPassword";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    accountId,
    password
  } = await request.json();

  let result;
  result = await ConfirmPassword(
    accountId,
    password
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
