import { CreateAppointment } from "apicalls/Appointment/CreateAppointment";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    clinicId,
    doctorId,
    patientId,
    startTime
  } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");


  let result;
  result = await CreateAppointment(
    clinicId,
    doctorId,
    patientId,
    startTime,
    clientIp
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
