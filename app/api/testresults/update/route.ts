import { UpdateAppointmentTestResult } from "apicalls/AppointmentTestResults/UpdateAppointmentTestResult";
import { NextResponse } from "next/server";
export async function PUT(request: Request) {
  const { id, appointmentTestId, resultDate, value, biochemistId, resultFlag } =
    await request.json();

  const clientIp =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("remote-addr");

  let result;
  result = await UpdateAppointmentTestResult(
    id,
    appointmentTestId,
    resultDate,
    value,
    biochemistId,
    resultFlag,
    clientIp
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({
      success: false,
      error: result.errorMessage,
      statusCode: result.statusCode,
    });
  }
}
