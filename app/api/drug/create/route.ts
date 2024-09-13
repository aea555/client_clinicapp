import { CreateDrug } from "apicalls/Drug/CreateDrug";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    name,
  } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

  let result;
  result = await CreateDrug(
    name,
    clientIp
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
