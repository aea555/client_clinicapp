import { CreateFeedback } from "apicalls/Feedback/CreateFeedback";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    patientId,
    doctorId,
    appointmentId,
    rating,
    comment,
  } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

  let result;
  result = await CreateFeedback(
    patientId,
    doctorId,
    appointmentId,
    rating,
    comment,
    clientIp
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
