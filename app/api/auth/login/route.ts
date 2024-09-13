import { Login } from "apicalls/Auth/login";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    email,
    password
  } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");


  let result;
  result = await Login(
    email,
    password,
    clientIp
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
