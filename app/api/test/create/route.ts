import { CreateTest } from "apicalls/Test/CreateTest";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const {
    name,
    unitType,
    rangeStartMale,
    rangeEndMale,
    rangeStartFemale,
    rangeEndFemale,
    desc,
  } = await request.json();
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("remote-addr");

  let result;
  result = await CreateTest(
    name,
    unitType,
    rangeStartMale,
    rangeEndMale,
    rangeStartFemale,
    rangeEndFemale,
    desc,
    clientIp
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
