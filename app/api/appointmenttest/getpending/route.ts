import { GetPendingAppointmentTests } from "apicalls/AppointmentTest/GetPendingAppointmentTests";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  let result;
  result = await GetPendingAppointmentTests();

  if (result.success) {
    return NextResponse.json({ success: true, data: result });
  } else {
    return NextResponse.json({ success: false });
  }
}
