import { UpdateDrug } from "apicalls/Drug/UpdateDrug";
import { NextResponse } from "next/server";
export async function PUT(request: Request) {
  const {
    id,
    name,
  } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

  let result;
  result = await UpdateDrug(
    id,
    name,
    clientIp
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
