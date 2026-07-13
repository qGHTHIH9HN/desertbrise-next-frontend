import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_PHP_API_BASE || "";

export async function POST(request: Request) {
  if (!API_BASE) {
    return NextResponse.json({ ok: false, error: "Missing API base URL" }, { status: 500 });
  }

  const payload = await request.json();

  const res = await fetch(`${API_BASE}/booking.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({ ok: false, error: "Invalid booking response" }));
  return NextResponse.json(data, { status: res.status });
}
