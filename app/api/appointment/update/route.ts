import { UpdateAppointment } from "apicalls/Appointment/UpdateAppointment";
import { NextResponse } from "next/server";
export async function PUT(request: Request) {
  const { appointmentId, notes, status, finishTime } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

  let result;
  result = await UpdateAppointment(appointmentId, notes, status, finishTime, clientIp);

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
