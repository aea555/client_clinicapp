import { CreateClinic } from "apicalls/Clinic/CreateClinic";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    name,
    address,
    openTime,
    closeTime,
    breakStartTime,
    breakEndTime,
  } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

  let result;
  result = await CreateClinic(
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
