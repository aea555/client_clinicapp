import { GetAllPossibleAppointments } from "apicalls/Appointment/GetPossibleAppointments";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const pathSegments = url.pathname.split('/').filter(segment => segment.length > 0);
  const clinicId = Number(pathSegments[pathSegments.length - 1]);

  if (isNaN(clinicId)) {
    return NextResponse.json({ success: false, error: 'Invalid clinicId' });
  }

  const result = await GetAllPossibleAppointments({clinicId});

  if (result.success) {
    return NextResponse.json({ success: true, data: result });
  } else {
    return NextResponse.json({ success: false });
  }
}
