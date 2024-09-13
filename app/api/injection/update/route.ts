import { UpdateInjection } from "apicalls/Injection/UpdateInjection";
import { NextResponse } from "next/server";
export async function PUT(request: Request) {
  const { id, patientId, doctorId, drugId } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

  let result;
  result = await UpdateInjection(
    id, patientId, doctorId, drugId, clientIp
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
