const PHP_PUBLIC_BASE =
  process.env.PHP_PUBLIC_BASE ||
  process.env.NEXT_PUBLIC_PHP_PUBLIC_BASE ||
  (process.env.NEXT_PUBLIC_PHP_API_BASE || "https://desertbrise-travel.com/public/api").replace(/\/api\/?$/, "");

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const visitorId = url.searchParams.get("visitor_id") || "";
    const sessionId = url.searchParams.get("session_id") || "";

    const target = new URL(`${PHP_PUBLIC_BASE}/get-smart-profile.php`);
    if (visitorId) target.searchParams.set("visitor_id", visitorId);
    if (sessionId) target.searchParams.set("session_id", sessionId);

    const response = await fetch(target.toString(), {
      headers: { Accept: "application/json" },
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
    return Response.json({ ok: false, error: "Profile failed" }, { status: 500 });
  }
}
