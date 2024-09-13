import { GetTestResultsAppointmentScreen } from "apicalls/Appointment/GetTestResultsAppointmentScreen";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const pathSegments = url.pathname.split('/').filter(segment => segment.length > 0);
  const appointmentId = Number(pathSegments[pathSegments.length - 1]);
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

  let result;
  result = await GetTestResultsAppointmentScreen(appointmentId, clientIp);

  if (result.success) {
    return NextResponse.json({ success: true, data: result });
  } else {
    return NextResponse.json({ success: false });
  }
}
