import { CreatePrescription } from "apicalls/Prescription/CreatePrescription";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    doctorId, patientId, appointmentId, durationDays, notes
  } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

  let result;
  result = await CreatePrescription(
    doctorId, patientId, appointmentId, durationDays, notes, clientIp
  );

  if (result.success) {
    return NextResponse.json({ success: true, data: result });
  } else {
    return NextResponse.json({ success: false });
  }
}
