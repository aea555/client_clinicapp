import CreateRoleRequest from "apicalls/RoleRequest/CreateRoleRequest";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    role, firstName, lastName
  } = await request.json();

  let result;
  result = await CreateRoleRequest(
    role, firstName, lastName
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
