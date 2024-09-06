import { UpdateDrug } from "apicalls/Drug/UpdateDrug";
import { NextResponse } from "next/server";
export async function PUT(request: Request) {
  const {
    id,
    name,
  } = await request.json();

  let result;
  result = await UpdateDrug(
    id,
    name,
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
