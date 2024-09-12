import { Register } from "apicalls/Auth/register";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    email, passwordHash, gender, birthDate
  } = await request.json();

  let result;
  result = await Register(
    email, passwordHash, gender, birthDate
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
