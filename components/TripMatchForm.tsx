"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

type Answers = {
  name: string;
  contact: string;
  month: string;
  travelers: string;
  feeling: string;
  comfort: string;
  pace: string;
  budget: string;
  message: string;
  website: string;
};

const initial: Answers = {
  name: "",
  contact: "",
  month: "",
  travelers: "",
  feeling: "",
  comfort: "",
  pace: "",
  budget: "",
  message: "",
  website: "",
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

function recommendation(answers: Answers) {
  const text = `${answers.feeling} ${answers.comfort} ${answers.pace}`.toLowerCase();

  if (text.includes("trek") || text.includes("active")) {
    return {
      title: "Sahara Trekking Journey",
      text: "A route with walking, silence, desert camps, local guides, and a deeper connection with the landscape.",
      href: "/tours?q=trek",
    };
  }

  if (text.includes("luxury") || text.includes("premium")) {
    return {
      title: "Luxury Private Morocco Escape",
      text: "A refined route with premium stays, private driver, calm pacing, and carefully selected experiences.",
      href: "/tours?budget_class=luxury",
    };
  }

  if (text.includes("family")) {
    return {
      title: "Family Morocco Journey",
      text: "A safe, comfortable, balanced route with enough discovery and enough rest for everyone.",
      href: "/tours?q=family",
    };
  }

  if (text.includes("city") || text.includes("culture")) {
    return {
      title: "Imperial Cities & Culture Route",
      text: "A rich Morocco journey through medinas, history, food, architecture, artisans, and warm local moments.",
      href: "/tours?q=culture",
    };
  }

  return {
    title: "Private Sahara & Morocco Journey",
    text: "A balanced private route combining desert, culture, comfort, and authentic human connection.",
    href: "/tours",
  };
}

export function TripMatchForm() {
  const [answers, setAnswers] = useState<Answers>(initial);
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const result = useMemo(() => recommendation(answers), [answers]);

  function update(key: keyof Answers, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const visitorId = getStored("dbt_visitor_id", "visitor");
    const sessionId = getStored("dbt_session_id", "session");

    try {
      const response = await fetch("/api/smart-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitor_id: visitorId,
          session_id: sessionId,
          name: answers.name,
          contact: answers.contact,
          travel_month: answers.month,
          travelers: answers.travelers,
          travel_style: answers.feeling,
          budget_range: answers.budget,
          website: answers.website,
          capture_type: "trip_match",
          popup_title: "Trip Match Result",
          tour_requested: result.title,
          message: [
            `Recommended route: ${result.title}`,
            `Feeling: ${answers.feeling}`,
            `Comfort: ${answers.comfort}`,
            `Pace: ${answers.pace}`,
            `Budget: ${answers.budget}`,
            `Message: ${answers.message}`,
          ].join("\n"),
          page_url: window.location.href,
          page_path: window.location.pathname,
          page_title: document.title,
          screen_size: `${window.innerWidth}x${window.innerHeight}`,
        }),
      });

      if (!response.ok) throw new Error("Save failed");
      setSent(true);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-[#eadbc8] bg-white p-5 shadow-[0_24px_80px_rgba(58,37,22,.10)] md:p-8">
      <div className="rounded-[1.6rem] bg-[#fffaf2] p-6">
        <p className="premium-eyebrow">Your current match</p>
        <h2 className="display-font mt-3 text-4xl font-semibold leading-none tracking-[-.04em] text-[#2b1b11]">
          {result.title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-[#75675d]">{result.text}</p>
      </div>

      <input
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={answers.website}
        onChange={(event) => update("website", event.target.value)}
      />

      <div className="mt-6 grid gap-5">
        <Choice
          label="What kind of Morocco feeling do you want?"
          value={answers.feeling}
          onChange={(value) => update("feeling", value)}
          options={["Desert silence", "Trekking adventure", "Luxury comfort", "Family discovery", "Culture and cities", "Yoga and retreat"]}
        />

        <Choice
          label="Your comfort level"
          value={answers.comfort}
          onChange={(value) => update("comfort", value)}
          options={["Simple and authentic", "Comfort", "Premium", "Luxury"]}
        />

        <Choice
          label="Travel pace"
          value={answers.pace}
          onChange={(value) => update("pace", value)}
          options={["Slow and calm", "Balanced", "Active", "Deep adventure"]}
        />

        <Choice
          label="Budget direction"
          value={answers.budget}
          onChange={(value) => update("budget", value)}
          options={["I want value", "Comfort budget", "Premium budget", "Luxury budget"]}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Travel month" value={answers.month} onChange={(value) => update("month", value)} placeholder="October, December..." />
          <Field label="Travelers" value={answers.travelers} onChange={(value) => update("travelers", value)} placeholder="2 adults, family of 4..." />
          <Field label="Your name" value={answers.name} onChange={(value) => update("name", value)} placeholder="Name" />
          <Field label="Email or WhatsApp" required value={answers.contact} onChange={(value) => update("contact", value)} placeholder="Where should we reply?" />
        </div>

        <label className="grid gap-2 text-sm font-black text-[#2b1b11]">
          Anything important?
          <textarea
            rows={4}
            value={answers.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="Tell us about dates, hotel level, dream places, special needs..."
            className="rounded-2xl border border-[#eadbc8] bg-[#fffaf2] px-4 py-3 text-sm font-bold text-[#2b1b11] outline-none focus:border-[#d79a44]"
          />
        </label>

        {status === "error" ? (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            The request was not saved. You can still contact us by WhatsApp.
          </p>
        ) : null}

        {sent ? (
          <div className="rounded-[1.4rem] border border-[#d7e8c6] bg-[#f5fff0] p-5">
            <h3 className="font-black text-[#2b1b11]">Your Trip Match was sent.</h3>
            <p className="mt-2 text-sm leading-7 text-[#66765a]">
              We will use your answers to suggest a private Morocco route.
            </p>
            <Link href={result.href} className="mt-4 inline-flex text-sm font-black text-[#8b541f]">
              View matching tours →
            </Link>
          </div>
        ) : (
          <button disabled={status === "sending"} className="rounded-full bg-[#2b1b11] px-6 py-4 text-sm font-black text-white transition hover:bg-[#7a4a1f] disabled:opacity-60">
            {status === "sending" ? "Sending..." : "Send my Trip Match"}
          </button>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-[#2b1b11]">
      {label}
      <input
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="rounded-2xl border border-[#eadbc8] bg-[#fffaf2] px-4 py-3 text-sm font-bold text-[#2b1b11] outline-none focus:border-[#d79a44]"
      />
    </label>
  );
}

function Choice({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <p className="text-sm font-black text-[#2b1b11]">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-full border px-4 py-2 text-xs font-black transition ${
                active
                  ? "border-[#2b1b11] bg-[#2b1b11] text-white"
                  : "border-[#eadbc8] bg-[#fffaf2] text-[#75675d] hover:border-[#d79a44] hover:text-[#2b1b11]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
