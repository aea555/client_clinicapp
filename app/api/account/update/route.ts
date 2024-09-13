import { UpdateAccount } from "apicalls/Account/UpdateAccount";
import { NextResponse } from "next/server";
export async function PUT(request: Request) {
  const { id, email, passwordHash, gender, birthDate, role } =
    await request.json();

  const clientIp =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("remote-addr");

  let result;
  result = await UpdateAccount(
    id,
    email,
    passwordHash,
    gender,
    birthDate,
    role,
    clientIp
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, error: result.errorMessage });
  }
}
