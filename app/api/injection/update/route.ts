import { UpdateInjection } from "apicalls/Injection/UpdateInjection";
import { NextResponse } from "next/server";
export async function PUT(request: Request) {
  const { id, patientId, doctorId, drugId } = await request.json();

  let result;
  result = await UpdateInjection(
    id, patientId, doctorId, drugId 
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
