import { GetAppointment } from "apicalls/Appointment/GetAppointment";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const pathSegments = url.pathname.split('/').filter(segment => segment.length > 0);
  const appointmentId = Number(pathSegments[pathSegments.length - 1]);

  if (isNaN(appointmentId)) {
    return NextResponse.json({ success: false, error: 'Invalid appointmentId' });
  }

  const result = await GetAppointment({appointmentId});

  if (result.success) {
    return NextResponse.json({ success: true, data: result });
  } else {
    return NextResponse.json({ success: false });
  }
}
