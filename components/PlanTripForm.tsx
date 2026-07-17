"use client";

import { useMemo, useState } from "react";

type ServiceOption = {
  id: number;
  title: string;
  duration?: string;
  location?: string;
  price?: number;
};

type FormState = {
  service_id: string;
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  adults: string;
  children: string;
  pickup_place: string;
  travel_style: string;
  budget_range: string;
  message: string;
};

const initialState: FormState = {
  service_id: "",
  name: "",
  email: "",
  phone: "",
  preferred_date: "",
  adults: "2",
  children: "0",
  pickup_place: "",
  travel_style: "",
  budget_range: "",
  message: "",
};

const styles = [
  "Private luxury",
  "Desert trekking",
  "Family friendly",
  "Culture & food",
  "Romantic escape",
  "Adventure & nature",
  "Yoga / retreat",
  "Not sure yet",
];

const budgets = [
  "I need advice",
  "Comfort",
  "Premium",
  "Luxury",
  "Ultra-luxury",
];

export function PlanTripForm({ services = [] }: { services: ServiceOption[] }) {
  const firstServiceId = services[0]?.id ? String(services[0].id) : "";
  const [form, setForm] = useState<FormState>({
    ...initialState,
    service_id: firstServiceId,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const selectedService = useMemo(
    () => services.find((service) => String(service.id) === String(form.service_id)),
    [services, form.service_id]
  );

  const whatsappText = encodeURIComponent(
    `Hello DesertBrise, I want to plan a Morocco trip.\n\nName: ${form.name || ""}\nTrip: ${selectedService?.title || "Not sure yet"}\nDate: ${form.preferred_date || "Flexible"}\nTravelers: ${form.adults || "2"} adults, ${form.children || "0"} children\nStyle: ${form.travel_style || "Not sure yet"}\nBudget: ${form.budget_range || "Need advice"}\nPickup: ${form.pickup_place || ""}\nMessage: ${form.message || ""}`
  );

  function update(name: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setError("Please add your name, email, and a short message.");
      return;
    }

    if (!form.service_id) {
      setStatus("error");
      setError("Please choose a trip or select the first option.");
      return;
    }

    const fullMessage = [
      form.message,
      "",
      "--- Planning details ---",
      `Budget range: ${form.budget_range || "Not specified"}`,
      `Preferred style: ${form.travel_style || "Not specified"}`,
      `Pickup place: ${form.pickup_place || "Not specified"}`,
    ].join("\n");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: Number(form.service_id),
          name: form.name,
          email: form.email,
          phone: form.phone,
          adults: Number(form.adults || 1),
          children: Number(form.children || 0),
          preferred_date: form.preferred_date,
          pickup_place: form.pickup_place,
          travel_style: form.travel_style,
          message: fullMessage,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || data?.message || "Request could not be sent.");
      }

      setStatus("success");
      setForm({ ...initialState, service_id: firstServiceId });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Request could not be sent.");
    }
  }

  return (
    <div className="overflow-hidden rounded-[2.4rem] border border-[#eadbc8] bg-white shadow-[0_28px_90px_rgba(58,37,22,.12)]">
      <div className="relative h-72 bg-[#dac9b7]">
        <img
          src="https://www.desertbrise-travel.com/public/assets/uploads/services/service_1782507486_bd3cd0d5.webp"
          alt="Private Morocco trip planning"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <p className="premium-eyebrow text-[#efbd73]">Smart trip request</p>
          <h3 className="display-font mt-2 text-4xl font-semibold leading-none tracking-[-.04em]">
            Give us the essentials. We shape the route.
          </h3>
        </div>
      </div>

      <form onSubmit={submit} className="grid gap-5 p-6 md:p-9">
        {status === "success" ? (
          <div className="rounded-[1.5rem] border border-green-200 bg-green-50 p-5 text-green-900">
            <h3 className="text-lg font-black">Request received.</h3>
            <p className="mt-2 text-sm leading-7">
              Thank you. Your request was sent to DesertBrise. We will reply soon with a personal Morocco trip proposal.
            </p>
          </div>
        ) : null}

        {status === "error" ? (
          <div className="rounded-[1.5rem] border border-red-200 bg-red-50 p-5 text-red-900">
            <h3 className="text-lg font-black">Please check the form.</h3>
            <p className="mt-2 text-sm leading-7">{error}</p>
          </div>
        ) : null}

        <div>
          <label className="text-xs font-black uppercase tracking-[.22em] text-[#8b541f]">
            Choose a trip
          </label>
          <select
            value={form.service_id}
            onChange={(e) => update("service_id", e.target.value)}
            className="mt-2 w-full rounded-2xl border border-[#eadbc8] bg-[#fffaf2] px-4 py-4 text-sm font-bold outline-none focus:border-[#d79a44]"
          >
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
          {selectedService ? (
            <p className="mt-2 text-xs font-bold text-[#9b8a7e]">
              {selectedService.duration || "Private itinerary"} {selectedService.location ? `• ${selectedService.location}` : ""}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Your name" value={form.name} onChange={(v) => update("name", v)} required />
          <Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} required />
          <Field label="WhatsApp / phone" value={form.phone} onChange={(v) => update("phone", v)} />
          <Field label="Preferred date" type="date" value={form.preferred_date} onChange={(v) => update("preferred_date", v)} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Adults" type="number" min="1" value={form.adults} onChange={(v) => update("adults", v)} />
          <Field label="Children" type="number" min="0" value={form.children} onChange={(v) => update("children", v)} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs font-black uppercase tracking-[.22em] text-[#8b541f]">
              Travel style
            </label>
            <select
              value={form.travel_style}
              onChange={(e) => update("travel_style", e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#eadbc8] bg-[#fffaf2] px-4 py-4 text-sm font-bold outline-none focus:border-[#d79a44]"
            >
              <option value="">Select style</option>
              {styles.map((style) => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-[.22em] text-[#8b541f]">
              Budget feeling
            </label>
            <select
              value={form.budget_range}
              onChange={(e) => update("budget_range", e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#eadbc8] bg-[#fffaf2] px-4 py-4 text-sm font-bold outline-none focus:border-[#d79a44]"
            >
              <option value="">Select budget</option>
              {budgets.map((budget) => (
                <option key={budget} value={budget}>{budget}</option>
              ))}
            </select>
          </div>
        </div>

        <Field label="Pickup city / hotel" value={form.pickup_place} onChange={(v) => update("pickup_place", v)} />

        <div>
          <label className="text-xs font-black uppercase tracking-[.22em] text-[#8b541f]">
            What do you want to feel in Morocco?
          </label>
          <textarea
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={5}
            placeholder="Example: We want desert, culture, comfort, and something authentic but not rushed..."
            className="mt-2 w-full rounded-2xl border border-[#eadbc8] bg-[#fffaf2] px-4 py-4 text-sm font-bold leading-7 outline-none focus:border-[#d79a44]"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <button
            disabled={status === "sending"}
            className="premium-btn justify-center bg-[#2b1b11] text-white disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send trip request"}
          </button>

          <a
            href={`https://wa.me/212600454881?text=${whatsappText}`}
            className="premium-btn justify-center border border-[#eadbc8] bg-white text-[#2b1b11]"
            target="_blank"
            rel="noreferrer"
          >
            Send by WhatsApp
          </a>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  min,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  min?: string;
}) {
  return (
    <div>
      <label className="text-xs font-black uppercase tracking-[.22em] text-[#8b541f]">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        required={required}
        min={min}
        className="mt-2 w-full rounded-2xl border border-[#eadbc8] bg-[#fffaf2] px-4 py-4 text-sm font-bold outline-none focus:border-[#d79a44]"
      />
    </div>
  );
}
