import Link from "next/link";
import { TourCard } from "@/components/TourCard";
import type { ServiceCard } from "@/lib/types";

export type LandingConfig = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta?: string;
  secondaryCta?: string;
  pillars: string[][];
  faq: string[][];
  routes: string[][];
};

export function SeoLandingPage({
  config,
  tours,
}: {
  config: LandingConfig;
  tours: ServiceCard[];
}) {
  const heroImage =
    tours.find((tour) => tour.image)?.image ||
    "https://www.desertbrise-travel.com/public/assets/uploads/services/service_1784452985_d210e015.webp";

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#1d130c] px-5 py-24 text-white sm:px-8 lg:px-10">
        <img src={heroImage} alt={config.title} className="absolute inset-0 -z-20 h-full w-full object-cover opacity-68" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_5%,rgba(215,154,68,.28),transparent_32%),linear-gradient(90deg,rgba(20,12,7,.94),rgba(20,12,7,.76),rgba(20,12,7,.42))]" />
        <div className="mx-auto max-w-7xl">
          <p className="premium-eyebrow text-[#efbd73]">{config.eyebrow}</p>
          <h1 className="display-font mt-5 max-w-5xl text-6xl font-semibold leading-[.92] tracking-[-.055em] md:text-8xl">{config.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-9 text-white/82 md:text-xl">{config.subtitle}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/contact" className="premium-btn bg-[#d79a44] text-[#1d130c] hover:bg-[#efbd73]">
              {config.primaryCta || "Plan This Journey"} <span>→</span>
            </Link>
            <Link href="/trip-match" className="premium-btn border border-white/24 bg-white/10 text-white backdrop-blur-md hover:bg-white/16">
              {config.secondaryCta || "Find My Best Trip"} <span>▷</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {config.pillars.map(([title, text]) => (
            <div key={title} className="premium-card rounded-[2rem] p-8">
              <h2 className="display-font text-4xl font-semibold tracking-[-.04em] text-[#2b1b11]">{title}</h2>
              <p className="mt-4 leading-8 text-[#75675d]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f9f2e7] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="premium-eyebrow">Suggested private routes</p>
              <h2 className="display-font mt-3 max-w-3xl text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
                Tours that match this travel style
              </h2>
            </div>
            <Link href="/tours" className="hidden text-sm font-black text-[#8b541f] md:inline-flex">View all tours →</Link>
          </div>

          {tours.length ? (
            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
              {tours.slice(0, 4).map((tour) => <TourCard key={tour.id} tour={tour} />)}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-[#eadbc8] bg-white p-10 text-[#75675d]">Add matching published tours in your PHP admin.</div>
          )}
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="premium-eyebrow">Route logic</p>
            <h2 className="display-font mt-3 text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
              How this journey is usually shaped
            </h2>
          </div>
          <div className="grid gap-4">
            {config.routes.map(([title, text], index) => (
              <div key={title} className="rounded-[1.6rem] border border-[#eadbc8] bg-white p-6 shadow-[0_14px_44px_rgba(58,37,22,.05)]">
                <p className="text-xs font-black uppercase tracking-[.24em] text-[#b98a52]">Step {index + 1}</p>
                <h3 className="mt-2 text-xl font-black tracking-[-.02em] text-[#2b1b11]">{title}</h3>
                <p className="mt-3 leading-7 text-[#75675d]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f9f2e7] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="premium-eyebrow">Questions travelers ask</p>
          <h2 className="display-font mt-3 max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
            Clear answers before the request
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {config.faq.map(([question, answer]) => (
              <div key={question} className="rounded-[1.6rem] border border-[#eadbc8] bg-white p-6 shadow-[0_14px_44px_rgba(58,37,22,.05)]">
                <h3 className="font-black text-[#2b1b11]">{question}</h3>
                <p className="mt-3 leading-7 text-[#75675d]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#1d130c] px-5 py-20 text-white sm:px-8 lg:px-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_0%,rgba(215,154,68,.22),transparent_34%),linear-gradient(135deg,#1d130c,#3a2415)]" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="premium-eyebrow text-[#efbd73]">Private planning</p>
            <h2 className="display-font mt-3 max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.04em] md:text-7xl">
              Want this route shaped around your dates?
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
              Send your month, arrival city, comfort level, and travel feeling. DesertBrise will shape the journey around you.
            </p>
          </div>
          <Link href="/contact" className="premium-btn bg-[#d79a44] text-[#1d130c] hover:bg-[#efbd73]">
            Request Private Itinerary <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
