import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const resourceId = req.nextUrl.searchParams.get("resource_id");
  const startDate = req.nextUrl.searchParams.get("start_date");
  const endDate = req.nextUrl.searchParams.get("end_date");

  if (!resourceId || !startDate || !endDate) {
    return NextResponse.json({ error: "resource_id, start_date, end_date are required" }, { status: 400 });
  }

  const url = new URL(req.nextUrl.origin + "/api/planyo/rest");
  url.searchParams.set("method", "can_make_reservation");
  url.searchParams.set("resource_id", resourceId);
  url.searchParams.set("start_date", startDate);
  url.searchParams.set("end_date", endDate);

  const res = await fetch(url.toString(), { cache: "no-store" });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
