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

  let result;
  result = await UpdateClinic(
    id,
    name,
    address,
    openTime,
    closeTime,
    breakStartTime,
    breakEndTime,
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
