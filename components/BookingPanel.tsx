"use client";

import { useMemo, useState } from "react";
import type { ServiceDeparture, ServiceDetail } from "@/lib/types";
import { money } from "@/lib/format";

export function BookingPanel({ service }: { service: ServiceDetail }) {
  const adultPrice = service.price || 0;
  const childRate = service.child_rate || 0.5;
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [preferredDate, setPreferredDate] = useState("");
  const [departureId, setDepartureId] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const selectedDeparture: ServiceDeparture | undefined = (service.departures || []).find((d) => String(d.id) === departureId);
  const total = useMemo(() => {
    const base = selectedDeparture?.price && selectedDeparture.price > 0 ? selectedDeparture.price : adultPrice;
    return Math.max(0, adults * base + children * base * childRate);
  }, [adults, children, adultPrice, childRate, selectedDeparture]);

  async function onSubmit(formData: FormData) {
    setStatus("sending");
    setMessage("");

    const payload = {
      service_id: service.id,
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      adults,
      children,
      total_price: total,
      preferred_date: String(formData.get("preferred_date") || preferredDate),
      pickup_place: String(formData.get("pickup_place") || ""),
      travel_style: String(formData.get("travel_style") || ""),
      message: String(formData.get("message") || ""),
      departure_id: departureId,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Request failed");
      setStatus("success");
      setMessage(data.message || "Request received. We will reply soon.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <aside className="h-fit rounded-[2rem] border border-[#eadbc8] bg-[#2b1b11] p-6 text-white shadow-[0_28px_80px_rgba(58,37,22,.22)] lg:sticky lg:top-24">
      <p className="premium-eyebrow text-[#efbd73]">Request & availability</p>
      <h2 className="display-font mt-4 text-4xl font-semibold leading-[1] tracking-[-.04em]">Plan this private trip</h2>
      <p className="mt-4 text-sm leading-7 text-white/72">No payment required now. Send your dates and we will reply with availability, final price, and custom options.</p>

      <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-white/8 p-5">
        {service.original_price && service.original_price > service.price ? <p className="text-sm text-white/45 line-through">Was {money(service.original_price)}</p> : null}
        {service.discount_percent && service.discount_percent > 0 ? <span className="mt-2 inline-flex rounded-full bg-[#efbd73] px-3 py-1 text-xs font-black text-[#1d130c]">Save {Math.round(service.discount_percent)}%</span> : null}
        <p className="mt-3 text-sm text-white/62">From</p>
        <p className="display-font text-5xl font-semibold tracking-[-.04em] text-white">{money(service.price)}</p>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-white/45">per person</p>
      </div>

      <div className="mt-5 grid gap-3">
        <Stepper label="Adults" value={adults} min={1} onChange={setAdults} />
        <Stepper label="Children" value={children} min={0} onChange={setChildren} />
      </div>

      <div className="mt-5 rounded-[1.2rem] bg-white px-5 py-4 text-[#2b1b11]">
        <div className="flex items-center justify-between text-sm font-bold">
          <span>Estimated total</span>
          <strong>{total > 0 ? money(total) : "Custom quote"}</strong>
        </div>
        <p className="mt-1 text-xs text-[#75675d]">Child rate: {childRate} × adult price</p>
      </div>

      <form action={onSubmit} className="mt-5 grid gap-3">
        {service.departures?.length ? (
          <select value={departureId} onChange={(e) => setDepartureId(e.target.value)} className="booking-input">
            <option value="">Choose available departure</option>
            {service.departures.map((departure) => (
              <option key={departure.id} value={departure.id}>
                {departure.start_date} {departure.end_date ? `→ ${departure.end_date}` : ""} {departure.price > 0 ? `· ${money(departure.price)}` : ""}
              </option>
            ))}
          </select>
        ) : null}

        <input className="booking-input" name="name" placeholder="Your name" required />
        <input className="booking-input" name="email" type="email" placeholder="Email address" required />
        <input className="booking-input" name="phone" placeholder="WhatsApp / phone number" />
        <input className="booking-input" name="preferred_date" type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} required />
        <input className="booking-input" name="pickup_place" placeholder="Pickup city or hotel" />
        <select className="booking-input" name="travel_style">
          <option value="">Travel style</option>
          <option value="Private comfortable tour">Private comfortable tour</option>
          <option value="Luxury experience">Luxury experience</option>
          <option value="Family friendly">Family friendly</option>
          <option value="Desert adventure">Desert adventure</option>
          <option value="Custom itinerary">Custom itinerary</option>
        </select>
        <textarea className="booking-input min-h-32 resize-y" name="message" placeholder="Tell us your dates, group details, hotel preference, or special request..." required />

        <button disabled={status === "sending"} className="premium-btn w-full bg-[#d79a44] text-[#1d130c] hover:bg-[#efbd73] disabled:cursor-not-allowed disabled:opacity-70">
          {status === "sending" ? "Sending..." : "Request Availability"} <span>→</span>
        </button>
      </form>

      {message ? (
        <div className={`mt-4 rounded-2xl p-4 text-sm leading-6 ${status === "success" ? "bg-[#d79a44]/20 text-[#ffe8c5]" : "bg-red-500/15 text-red-100"}`}>
          {message}
        </div>
      ) : null}

      <div className="mt-6 grid gap-2 border-t border-white/10 pt-6 text-sm text-white/68">
        <div>✓ Free custom quote</div>
        <div>✓ Private itinerary possible</div>
        <div>✓ Reply within 24 hours</div>
        <div>✓ Local Morocco travel expert</div>
      </div>
    </aside>
  );
}

function Stepper({ label, value, min, onChange }: { label: string; value: number; min: number; onChange: (value: number) => void }) {
  return (
    <div className="flex items-center justify-between rounded-[1.1rem] border border-white/10 bg-white/8 px-4 py-3">
      <span className="text-sm font-bold text-white/86">{label}</span>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-lg font-black text-white hover:bg-white/18">−</button>
        <span className="w-6 text-center text-sm font-black">{value}</span>
        <button type="button" onClick={() => onChange(value + 1)} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-lg font-black text-white hover:bg-white/18">+</button>
      </div>
    </div>
  );
}
