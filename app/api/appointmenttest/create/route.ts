import { CreateAppointmentTest } from "apicalls/AppointmentTest/CreateAppointmentTest";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    appointmentId,
    testId
  } = await request.json();

  let result;
  result = await CreateAppointmentTest(
    appointmentId,
    testId
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
