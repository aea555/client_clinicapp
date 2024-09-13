import CreateRoleRequest from "apicalls/RoleRequest/CreateRoleRequest";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    role, firstName, lastName
  } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

  let result;
  result = await CreateRoleRequest(
    role, firstName, lastName, clientIp
  );

  if (result.success) {
    if (role && role === "patient")
      return NextResponse.redirect(new URL("/logout", request.url))

    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
