import { CreatePrescriptionDrug } from "apicalls/PrescriptionDrug/CreatePrescriptionDrug";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    drugId, prescriptionId
  } = await request.json();

  let result;
  result = await CreatePrescriptionDrug(
    drugId, prescriptionId
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
