"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function randomId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function getOrCreate(key: string, prefix: string) {
  try {
    const existing = window.localStorage.getItem(key);
    if (existing) return existing;
    const created = randomId(prefix);
    window.localStorage.setItem(key, created);
    return created;
  } catch {
    return randomId(prefix);
  }
}

function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1100) return "tablet";
  return "desktop";
}

function getBrowser() {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  return "Browser";
}

function getInterestCategory(pathname: string) {
  const path = pathname.toLowerCase();
  if (path.includes("trek")) return "trekking";
  if (path.includes("desert") || path.includes("sahara") || path.includes("merzouga") || path.includes("mhamid")) return "desert";
  if (path.includes("luxury")) return "luxury";
  if (path.includes("family")) return "family";
  if (path.includes("blog")) return "research";
  if (path.includes("contact") || path.includes("trip-match")) return "booking";
  if (path.includes("destinations")) return "destination";
  if (path.includes("travel-styles")) return "travel_style";
  return "morocco_travel";
}

async function sendEvent(payload: Record<string, unknown>) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify(payload),
    });
  } catch {
    // Silent by design: analytics must never disturb visitors.
  }
}

export function VisitorTracker() {
  const pathname = usePathname();
  const startRef = useRef<number>(Date.now());
  const sent50Ref = useRef(false);
  const sent90Ref = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const visitorId = getOrCreate("dbt_visitor_id", "visitor");
    const sessionId = getOrCreate("dbt_session_id", "session");
    const returning = Boolean(window.localStorage.getItem("dbt_seen_before"));
    window.localStorage.setItem("dbt_seen_before", "1");

    const params = new URLSearchParams(window.location.search);

    const basePayload = () => ({
      visitor_id: visitorId,
      session_id: sessionId,
      page_url: window.location.href,
      page_path: pathname || window.location.pathname,
      page_title: document.title,
      referrer: document.referrer,
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      device_type: getDeviceType(),
      browser: getBrowser(),
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen_size: `${window.innerWidth}x${window.innerHeight}`,
      interest_category: getInterestCategory(pathname || window.location.pathname),
      is_returning: returning,
    });

    startRef.current = Date.now();
    sent50Ref.current = false;
    sent90Ref.current = false;

    sendEvent({
      ...basePayload(),
      event_name: pathname?.includes("/tour/") || pathname?.includes("/trek/") || pathname?.includes("/daytrip/")
        ? "tour_view"
        : "page_view",
    });

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const percent = (window.scrollY / max) * 100;

      if (percent >= 50 && !sent50Ref.current) {
        sent50Ref.current = true;
        sendEvent({ ...basePayload(), event_name: "scroll_50", time_on_page_seconds: Math.round((Date.now() - startRef.current) / 1000) });
      }

      if (percent >= 90 && !sent90Ref.current) {
        sent90Ref.current = true;
        sendEvent({ ...basePayload(), event_name: "scroll_90", time_on_page_seconds: Math.round((Date.now() - startRef.current) / 1000) });
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a") as HTMLAnchorElement | null;
      const href = link?.getAttribute("href") || "";
      const text = link?.textContent?.trim().slice(0, 120) || "";

      if (!href && !text) return;

      const isWhatsapp = href.includes("wa.me") || href.includes("whatsapp");
      const isConversion =
        isWhatsapp ||
        href.includes("/contact") ||
        href.includes("/trip-match") ||
        href.includes("mailto:") ||
        href.includes("tel:");

      if (isConversion) {
        sendEvent({
          ...basePayload(),
          event_name: isWhatsapp ? "whatsapp_click" : "cta_click",
          event_value: text || href,
          time_on_page_seconds: Math.round((Date.now() - startRef.current) / 1000),
        });
      }
    };

    const onExit = () => {
      const payload = {
        ...basePayload(),
        event_name: "page_exit",
        time_on_page_seconds: Math.round((Date.now() - startRef.current) / 1000),
      };

      try {
        const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
        navigator.sendBeacon("/api/track", blob);
      } catch {
        sendEvent(payload);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick, true);
    window.addEventListener("pagehide", onExit);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("pagehide", onExit);
    };
  }, [pathname]);

  return null;
}
