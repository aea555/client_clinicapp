import { CancelAppointment } from "apicalls/Appointment/CancelAppointment";
import { NextResponse } from "next/server";
export async function PUT(request: Request) {
  const { appointmentId } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

  let result;
  result = await CancelAppointment(appointmentId, clientIp);

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
