import Link from "next/link";
import { PlanTripForm } from "@/components/PlanTripForm";
import { getServices } from "@/lib/api";

export const metadata = {
  title: "Plan a Private Morocco Trip | DesertBrise Travel",
  description:
    "Contact DesertBrise Travel to plan a private Morocco tour, desert journey, trekking route, or tailor-made cultural experience.",
};

export const revalidate = 300;

const contactCards = [
  {
    title: "WhatsApp",
    text: "Fastest way to start planning and share your dates.",
    value: "+212600454881",
    href: "https://wa.me/212600454881",
  },
  {
    title: "Email",
    text: "Best for detailed requests, agencies, and partnerships.",
    value: "Desertbrise@gmail.com",
    href: "mailto:Desertbrise@gmail.com",
  },
  {
    title: "Base",
    text: "Rooted in the Sahara, serving private journeys across Morocco.",
    value: "M’Hamid El Ghizlane, Zagora",
    href: "#",
  },
];

const trustSteps = [
  "You send your dates and travel feeling",
  "We understand your rhythm and comfort level",
  "We shape a private Morocco route",
  "You receive a clear proposal",
];

export default async function ContactPage() {
  let services = [];

  try {
    const response = await getServices({ per_page: 80 });
    services = response.items || [];
  } catch {
    services = [];
  }

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#2b1b11] px-5 py-24 text-white sm:px-8 lg:px-10">
        <img
          src="https://www.desertbrise-travel.com/public/assets/uploads/services/service_1782485439_cbd91aa5.webp"
          alt="Morocco desert private travel planning"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1d130c] via-[#1d130c]/88 to-[#1d130c]/35" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[#fffaf2] to-transparent" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <div>
            <p className="premium-eyebrow text-[#efbd73]">Plan your journey</p>
            <h1 className="display-font mt-5 max-w-5xl text-6xl font-semibold leading-[.92] tracking-[-.055em] md:text-8xl">
              Tell us what you want to feel in Morocco.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/84">
              A good private trip begins with listening. Send us your dates, rhythm, comfort level, and the moments you imagine. We will shape the route around you.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/14 bg-white/12 p-6 shadow-2xl backdrop-blur-md">
            <p className="text-sm font-bold uppercase tracking-[.22em] text-[#efbd73]">How planning works</p>
            <div className="mt-5 grid gap-3">
              {trustSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-3 text-sm font-bold text-white/86">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#d79a44] text-xs text-[#1d130c]">
                    {index + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 pb-24 pt-8 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.82fr_1.18fr]">
          <div>
            <p className="premium-eyebrow">Direct contact</p>
            <h2 className="display-font mt-3 text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
              Start with a simple message.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#75675d]">
              You do not need to know every detail. Tell us the feeling you want: quiet desert, luxury comfort, culture, family adventure, trekking, or a deep Saharan escape.
            </p>

            <div className="mt-8 grid gap-5">
              {contactCards.map((card) => (
                <Link key={card.title} href={card.href} className="premium-card group rounded-[1.8rem] p-6 transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(58,37,22,.14)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="display-font text-3xl font-semibold tracking-[-.03em] text-[#2b1b11]">{card.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#75675d]">{card.text}</p>
                      <p className="mt-4 text-sm font-extrabold text-[#8b541f]">{card.value}</p>
                    </div>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#f9f2e7] text-[#8b541f] transition group-hover:bg-[#2b1b11] group-hover:text-white">→</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 rounded-[1.8rem] border border-[#eadbc8] bg-white p-6 shadow-[0_18px_54px_rgba(58,37,22,.06)]">
              <p className="premium-eyebrow">Conversion upgrade</p>
              <p className="mt-3 text-sm leading-7 text-[#75675d]">
                This form sends requests into your PHP booking system, so leads can appear in your existing admin instead of being lost in messages.
              </p>
            </div>
          </div>

          <PlanTripForm services={services} />
        </div>
      </section>
    </>
  );
}
