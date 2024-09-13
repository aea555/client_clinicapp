import { CreateAppointmentTest } from "apicalls/AppointmentTest/CreateAppointmentTest";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    appointmentId,
    testId
  } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

  let result;
  result = await CreateAppointmentTest(
    appointmentId,
    testId,
    clientIp
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
