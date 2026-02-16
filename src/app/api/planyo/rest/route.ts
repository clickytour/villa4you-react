import { NextRequest, NextResponse } from "next/server";

const PLANYO_REST = "https://www.planyo.com/rest/";
const ALLOW_METHODS = new Set([
  "api_test",
  "get_site_info",
  "can_make_reservation",
]);

function buildUrl(method: string, params: URLSearchParams) {
  const apiKey = process.env.PLANYO_API_KEY || process.env.PLANYO_SANDBOX_API_KEY;
  if (!apiKey) throw new Error("Missing PLANYO API key env var");

  const url = new URL(PLANYO_REST);
  url.searchParams.set("method", method);
  url.searchParams.set("api_key", apiKey);

  params.forEach((value, key) => {
    if (key === "method") return;
    url.searchParams.set(key, value);
  });

  return url;
}

async function run(method: string, params: URLSearchParams) {
  if (!ALLOW_METHODS.has(method)) {
    return NextResponse.json({ error: `Method not allowed: ${method}` }, { status: 400 });
  }

  try {
    const url = buildUrl(method, params);
    const res = await fetch(url.toString(), { method: "GET", cache: "no-store" });
    const text = await res.text();

    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return NextResponse.json({ ok: res.ok, method, data }, { status: res.ok ? 200 : 502 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const method = req.nextUrl.searchParams.get("method") || "api_test";
  return run(method, req.nextUrl.searchParams);
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Record<string, string>;
  const method = body.method || "api_test";
  const params = new URLSearchParams();
  Object.entries(body).forEach(([k, v]) => {
    if (typeof v === "string") params.set(k, v);
  });
  return run(method, params);
}
