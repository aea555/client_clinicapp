import { CancelAppointment } from "apicalls/Appointment/CancelAppointment";
import { NextResponse } from "next/server";
export async function PUT(request: Request) {
  const { appointmentId } = await request.json();

  let result;
  result = await CancelAppointment(appointmentId);

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
