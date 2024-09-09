import { CreateAppointment } from "apicalls/Appointment/CreateAppointment";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    clinicId,
    doctorId,
    patientId,
    startTime
  } = await request.json();

  let result;
  result = await CreateAppointment(
    clinicId,
    doctorId,
    patientId,
    startTime
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
