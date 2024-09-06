import { UpdateAccount } from "apicalls/Account/UpdateAccount";
import { NextResponse } from "next/server";
export async function PUT(request: Request) {
  const { id, email, passwordHash, gender, birthDate, role } =
    await request.json();

  let result;
  result = await UpdateAccount(id, email, passwordHash, gender, birthDate, role);

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
