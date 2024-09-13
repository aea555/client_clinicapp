import { CreatePrescriptionDrug } from "apicalls/PrescriptionDrug/CreatePrescriptionDrug";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    drugId, prescriptionId
  } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

  let result;
  result = await CreatePrescriptionDrug(
    drugId, prescriptionId, clientIp
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
