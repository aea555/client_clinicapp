import { GetAllDrugs } from "apicalls/Drug/GetAllDrugs";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");
  let result;
  result = await GetAllDrugs(clientIp);

  if (result.success) {
    return NextResponse.json({ success: true, data: result });
  } else {
    return NextResponse.json({ success: false });
  }
}
