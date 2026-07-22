import Link from "next/link";

const promises = [
  ["Private, not mass tourism", "Every route is shaped around your pace, comfort, timing, and emotional goal."],
  ["Local human knowledge", "We connect desert, mountains, cities, families, guides, riads, and drivers with care."],
  ["Clear planning before booking", "Travelers understand route logic, distances, comfort level, and what each day feels like."],
  ["Designed for trust", "The site guides people from inspiration to a concrete request without pressure."],
];

const travelers = [
  ["Couples", "Romantic desert nights, quiet riads, slow scenic routes."],
  ["Families", "Safe pacing, comfortable transport, child-friendly days."],
  ["Adventurers", "Trekking, camel trails, Atlas passes, remote Sahara."],
  ["Luxury travelers", "Premium riads, private drivers, refined camps."],
  ["Cultural travelers", "Imperial cities, local life, artisans, food, history."],
  ["Retreat seekers", "Silence, yoga, desert space, mindset and renewal."],
];

const objections = [
  ["Is Morocco safe?", "We plan with trusted drivers, clear timing, known routes, and local support."],
  ["Will the trip feel too touristy?", "We balance famous places with authentic pauses, human contact, and flexible rhythm."],
  ["I do not know what to choose.", "The Trip Match page turns your travel feeling into a clear route direction."],
  ["Can it fit my budget?", "We shape comfort, route length, hotels, and transport around your range."],
];

export function SignaturePromise() {
  return (
    <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="premium-eyebrow">The DesertBrise promise</p>
            <h2 className="display-font mt-3 max-w-3xl text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
              A website that sells the feeling before the itinerary.
            </h2>
          </div>
          <p className="text-lg leading-9 text-[#75675d]">
            This upgrade changes the site from a simple travel catalog into a premium decision journey:
            trust first, emotion second, route clarity third, booking action always visible.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {promises.map(([title, text], index) => (
            <div key={title} className="premium-card rounded-[2rem] p-7">
              <span className="display-font text-6xl font-semibold text-[#dfc49f]">0{index + 1}</span>
              <h3 className="mt-7 text-xl font-black tracking-[-.03em] text-[#2b1b11]">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#75675d]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TripMatchStrip() {
  return (
    <section className="relative isolate overflow-hidden bg-[#1d130c] px-5 py-20 text-white sm:px-8 lg:px-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_0%,rgba(215,154,68,.26),transparent_34%),linear-gradient(135deg,#1d130c,#3a2415)]" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="premium-eyebrow text-[#efbd73]">New conversion path</p>
          <h2 className="display-font mt-3 max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.04em] md:text-7xl">
            Not sure where to start? Let the visitor find their best Morocco journey.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
            The new Trip Match page captures intent and sends the lead into your PHP GuestMind system.
          </p>
        </div>
        <Link
          href="/trip-match"
          className="premium-btn bg-[#d79a44] text-[#1d130c] shadow-[0_22px_60px_rgba(215,154,68,.30)] hover:bg-[#efbd73]"
        >
          Open Trip Match <span>→</span>
        </Link>
      </div>
    </section>
  );
}

export function IdealTravelerMatrix() {
  return (
    <section className="bg-[#f9f2e7] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="premium-eyebrow">Traveler segmentation</p>
        <h2 className="display-font mt-3 max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
          Every visitor sees themselves in the offer.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {travelers.map(([title, text]) => (
            <div key={title} className="group rounded-[2rem] border border-[#eadbc8] bg-white p-7 shadow-[0_18px_54px_rgba(58,37,22,.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(58,37,22,.12)]">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="display-font text-3xl font-semibold tracking-[-.03em] text-[#2b1b11]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#75675d]">{text}</p>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#fff3df] text-[#8b541f] transition group-hover:bg-[#2b1b11] group-hover:text-white">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ObjectionCrusher() {
  return (
    <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="premium-eyebrow">Trust architecture</p>
            <h2 className="display-font mt-3 text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
              Answer doubts before they stop the booking.
            </h2>
          </div>
          <div className="grid gap-4">
            {objections.map(([question, answer]) => (
              <div key={question} className="rounded-[1.6rem] border border-[#eadbc8] bg-white p-6 shadow-[0_14px_44px_rgba(58,37,22,.05)]">
                <h3 className="text-lg font-black tracking-[-.02em] text-[#2b1b11]">{question}</h3>
                <p className="mt-3 leading-7 text-[#75675d]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FounderStory() {
  return (
    <section className="bg-[#f9f2e7] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div className="overflow-hidden rounded-[2rem] border border-[#eadbc8] bg-[#2b1b11] shadow-[0_28px_90px_rgba(58,37,22,.16)]">
          <div className="min-h-[430px] bg-[radial-gradient(circle_at_35%_20%,#e5aa5d,#7b4a22_45%,#24150c)] p-8 text-white">
            <p className="premium-eyebrow text-[#f2c373]">Born from the desert</p>
            <h3 className="display-font mt-4 max-w-lg text-5xl font-semibold leading-none tracking-[-.04em]">
              A Saharan origin story gives the brand a soul.
            </h3>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/76">
              DesertBrise is not only selling Morocco. The brand is rooted in nomadic desert life,
              hospitality, silence, route knowledge, and real human connection.
            </p>
          </div>
        </div>
        <div>
          <p className="premium-eyebrow">Brand depth</p>
          <h2 className="display-font mt-3 max-w-3xl text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
            Premium does not mean cold. It means trust with emotion.
          </h2>
          <p className="mt-6 text-lg leading-9 text-[#75675d]">
            The upgraded structure gives DesertBrise a more memorable voice: private planning,
            warm authority, Saharan identity, and calm confidence.
          </p>
          <Link href="/why-travel-with-us" className="mt-8 inline-flex items-center gap-3 text-sm font-black text-[#8b541f]">
            Read why travelers choose us <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PlanningSteps() {
  return (
    <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="premium-eyebrow">Simple booking journey</p>
        <h2 className="display-font mt-3 max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
          The visitor always knows the next step.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {[
            ["01", "Choose a feeling"],
            ["02", "Send dates"],
            ["03", "Receive route"],
            ["04", "Travel with support"],
          ].map(([num, title]) => (
            <div key={num} className="rounded-[2rem] border border-[#eadbc8] bg-white p-7 shadow-[0_18px_54px_rgba(58,37,22,.06)]">
              <span className="display-font text-6xl text-[#dfc49f]">{num}</span>
              <h3 className="mt-8 text-xl font-black text-[#2b1b11]">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
