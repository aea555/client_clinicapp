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

  let result;
  result = await CreateTest(
    name,
    unitType,
    rangeStartMale,
    rangeEndMale,
    rangeStartFemale,
    rangeEndFemale,
    desc,
  );

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
