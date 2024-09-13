import { UpdateClinic } from "apicalls/Clinic/UpdateClinic";
import { NextResponse } from "next/server";
export async function PUT(request: Request) {
  const {
    id,
    name,
    address,
    openTime,
    closeTime,
    breakStartTime,
    breakEndTime,
  } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

  let result;
  result = await UpdateClinic(
    id,
    name,
    address,
    openTime,
    closeTime,
    breakStartTime,
    breakEndTime,
    clientIp
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
