const PHP_PUBLIC_BASE =
  process.env.PHP_PUBLIC_BASE ||
  process.env.NEXT_PUBLIC_PHP_PUBLIC_BASE ||
  (process.env.NEXT_PUBLIC_PHP_API_BASE || "https://desertbrise-travel.com/public/api").replace(/\/api\/?$/, "");

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${PHP_PUBLIC_BASE}/track-visitor.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const text = await response.text();

    return new Response(text || JSON.stringify({ ok: response.ok }), {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch {
    return Response.json({ ok: false, error: "Tracking failed" }, { status: 500 });
  }
}
