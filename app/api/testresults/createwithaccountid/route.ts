import { CreateAppointmentTestResultWithAccountId } from "apicalls/AppointmentTestResults/CreateAppointmentTestResult";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    appointmentTestId,
    value,
    accountId,
    resultFlag
  } = await request.json();

  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

  let result;
  result = await CreateAppointmentTestResultWithAccountId(
    appointmentTestId,
    value,
    accountId,
    resultFlag,
    clientIp
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
