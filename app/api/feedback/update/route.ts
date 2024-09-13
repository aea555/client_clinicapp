import { UpdateFeedback } from "apicalls/Feedback/UpdateFeedback";
import { NextResponse } from "next/server";
export async function PUT(request: Request) {
  const {
    id,
    patientId,
    doctorId,
    appointmentId,
    rating,
    comment,
    isDeleted,
  } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

  let result;
  result = await UpdateFeedback(
    id,
    patientId,
    doctorId,
    appointmentId,
    rating,
    comment,
    isDeleted,
    clientIp
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
