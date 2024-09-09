import { CreateAppointmentWithAccountId } from "apicalls/Appointment/CreateAppointmentWithAccountId";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    clinicId,
    doctorId,
    accountId,
    startTime
  } = await request.json();

  let result;
  result = await CreateAppointmentWithAccountId(
    clinicId,
    doctorId,
    accountId,
    startTime
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
