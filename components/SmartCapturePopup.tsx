"use client";

import { FormEvent, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Copy = {
  title?: string;
  text?: string;
  cta?: string;
  question?: string;
};

function randomId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function getStored(key: string, prefix: string) {
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

export function SmartCapturePopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [copy, setCopy] = useState<Copy>({
    title: "Planning a Morocco journey?",
    text: "Tell us your travel month and style. We will send you a private route suggestion.",
    cta: "Send my request",
    question: "What month are you planning to travel?",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname?.startsWith("/contact")) return;
    if (pathname?.startsWith("/trip-match")) return;

    const dismissedUntil = Number(window.localStorage.getItem("dbt_capture_dismissed_until") || "0");
    if (dismissedUntil > Date.now()) return;

    const visitorId = getStored("dbt_visitor_id", "visitor");
    const sessionId = getStored("dbt_session_id", "session");

    fetch(`/api/smart-profile?visitor_id=${encodeURIComponent(visitorId)}&session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.copy) setCopy(data.copy);
      })
      .catch(() => null);

    const timer = window.setTimeout(() => setOpen(true), 22000);

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.62) {
        setOpen(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  function closeForNow() {
    try {
      window.localStorage.setItem("dbt_capture_dismissed_until", String(Date.now() + 1000 * 60 * 60 * 24 * 3));
    } catch {}
    setOpen(false);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = new FormData(event.currentTarget);
    const visitorId = getStored("dbt_visitor_id", "visitor");
    const sessionId = getStored("dbt_session_id", "session");

    try {
      const response = await fetch("/api/smart-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitor_id: visitorId,
          session_id: sessionId,
          name: String(form.get("name") || ""),
          contact: String(form.get("contact") || ""),
          travel_month: String(form.get("travel_month") || ""),
          travelers: String(form.get("travelers") || ""),
          travel_style: String(form.get("travel_style") || ""),
          message: String(form.get("message") || ""),
          website: String(form.get("website") || ""),
          capture_type: "smart_popup",
          popup_title: copy.title,
          page_url: window.location.href,
          page_path: pathname || window.location.pathname,
          page_title: document.title,
          screen_size: `${window.innerWidth}x${window.innerHeight}`,
        }),
      });

      if (!response.ok) throw new Error("Save failed");

      setStatus("sent");
      try {
        window.localStorage.setItem("dbt_capture_dismissed_until", String(Date.now() + 1000 * 60 * 60 * 24 * 30));
      } catch {}
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-x-4 bottom-24 z-[75] mx-auto max-w-md md:bottom-6 md:left-6 md:right-auto md:mx-0">
      <div className="overflow-hidden rounded-[2rem] border border-[#eadbc8] bg-white shadow-[0_30px_90px_rgba(43,27,17,.22)]">
        {status === "sent" ? (
          <div className="p-7">
            <p className="premium-eyebrow">Request received</p>
            <h3 className="display-font mt-3 text-4xl font-semibold leading-none tracking-[-.04em] text-[#2b1b11]">
              Thank you. We will reply soon.
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#75675d]">
              Your travel request was sent into the DesertBrise planning system.
            </p>
            <button
              onClick={closeForNow}
              className="mt-6 rounded-full bg-[#2b1b11] px-5 py-3 text-sm font-black text-white"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-5">
            <div className="flex items-start justify-between gap-4 rounded-[1.5rem] bg-[#fffaf2] p-5">
              <div>
                <p className="premium-eyebrow">Private route help</p>
                <h3 className="display-font mt-2 text-3xl font-semibold leading-none tracking-[-.04em] text-[#2b1b11]">
                  {copy.title || "Planning a Morocco journey?"}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#75675d]">
                  {copy.text || "Tell us your travel month and style. We will send you a private route suggestion."}
                </p>
              </div>
              <button
                type="button"
                onClick={closeForNow}
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-sm font-black text-[#75675d]"
              >
                ×
              </button>
            </div>

            <div className="mt-4 grid gap-3">
              <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
              <input name="name" placeholder="Your name" className="rounded-2xl border border-[#eadbc8] bg-[#fffaf2] px-4 py-3 text-sm font-bold text-[#2b1b11] outline-none focus:border-[#d79a44]" />
              <input name="contact" required placeholder="Email or WhatsApp" className="rounded-2xl border border-[#eadbc8] bg-[#fffaf2] px-4 py-3 text-sm font-bold text-[#2b1b11] outline-none focus:border-[#d79a44]" />
              <div className="grid grid-cols-2 gap-3">
                <input name="travel_month" placeholder="Travel month" className="rounded-2xl border border-[#eadbc8] bg-[#fffaf2] px-4 py-3 text-sm font-bold text-[#2b1b11] outline-none focus:border-[#d79a44]" />
                <input name="travelers" placeholder="Travelers" className="rounded-2xl border border-[#eadbc8] bg-[#fffaf2] px-4 py-3 text-sm font-bold text-[#2b1b11] outline-none focus:border-[#d79a44]" />
              </div>
              <select name="travel_style" className="rounded-2xl border border-[#eadbc8] bg-[#fffaf2] px-4 py-3 text-sm font-bold text-[#2b1b11] outline-none focus:border-[#d79a44]">
                <option value="">Choose travel feeling</option>
                <option>Luxury desert escape</option>
                <option>Family Morocco journey</option>
                <option>Trekking and adventure</option>
                <option>Culture and imperial cities</option>
                <option>Yoga, retreat and silence</option>
              </select>
              <textarea name="message" rows={3} placeholder={copy.question || "What month are you planning to travel?"} className="rounded-2xl border border-[#eadbc8] bg-[#fffaf2] px-4 py-3 text-sm font-bold text-[#2b1b11] outline-none focus:border-[#d79a44]" />
            </div>

            {status === "error" ? (
              <p className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                Something went wrong. Please use WhatsApp or try again.
              </p>
            ) : null}

            <button
              disabled={status === "sending"}
              className="mt-4 w-full rounded-full bg-[#2b1b11] px-5 py-4 text-sm font-black text-white transition hover:bg-[#7a4a1f] disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : copy.cta || "Send my request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
