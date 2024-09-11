import { CreateAppointmentTestResultWithAccountId } from "apicalls/AppointmentTestResults/CreateAppointmentTestResult";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    appointmentTestId,
    value,
    accountId,
    resultFlag
  } = await request.json();

  let result;
  result = await CreateAppointmentTestResultWithAccountId(
    appointmentTestId,
    value,
    accountId,
    resultFlag
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
