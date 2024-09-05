import { SetStatus } from "apicalls/RoleRequest/SetStatus";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { requestId, type, role } = await request.json();

  let result;
  switch (role) {
    case "biochemist":
      result = await SetStatus(requestId, "biochemist", type);
      break;
    case "doctor":
      result = await SetStatus(requestId, "doctor", type);
      break;
    default:
      return NextResponse.json({ success: false, error: "Invalid role" });
  }

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
