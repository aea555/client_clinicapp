import { CreateDrug } from "apicalls/Drug/CreateDrug";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    name,
  } = await request.json();

  let result;
  result = await CreateDrug(
    name,
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
