import { ConfirmEmail } from "apicalls/Account/ConfirmEmail";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    accountId,
    email
  } = await request.json();

  let result;
  result = await ConfirmEmail(
    accountId,
    email
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
