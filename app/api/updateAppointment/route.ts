import { UpdateAppointment } from "apicalls/Appointment/UpdateAppointment";
import { NextResponse } from "next/server";
export async function PUT(request: Request) {
  const { appointmentId, notes, status, finishTime } = await request.json();

  let result;
  result = await UpdateAppointment(appointmentId, notes, status, finishTime);

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
