import Link from "next/link";

export const metadata = {
  title: "Plan a Private Morocco Trip | DesertBrise Travel",
  description:
    "Contact DesertBrise Travel to plan a private Morocco tour, desert journey, trekking route, or tailor-made cultural experience.",
};

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

const fields = ["Travel dates", "Number of travelers", "Preferred comfort", "Main places you dream of"];

export default function ContactPage() {
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
            <p className="text-sm font-bold uppercase tracking-[.22em] text-[#efbd73]">Before contacting us</p>
            <div className="mt-5 grid gap-3">
              {fields.map((field) => (
                <div key={field} className="rounded-full bg-white/10 px-4 py-3 text-sm font-bold text-white/86">
                  {field}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 pb-24 pt-8 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.86fr_1.14fr]">
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
          </div>

          <div className="overflow-hidden rounded-[2.4rem] border border-[#eadbc8] bg-white shadow-[0_28px_90px_rgba(58,37,22,.12)]">
            <div className="relative h-72 bg-[#dac9b7]">
              <img
                src="https://www.desertbrise-travel.com/public/assets/uploads/services/service_1782507486_bd3cd0d5.webp"
                alt="Morocco private travel consultation"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="premium-eyebrow text-[#efbd73]">Human planning</p>
                <h3 className="display-font mt-2 text-4xl font-semibold leading-none tracking-[-.04em]">
                  We answer like real local planners, not machines.
                </h3>
              </div>
            </div>

            <div className="p-7 md:p-10">
              <div className="rounded-[1.7rem] bg-[#f9f2e7] p-6">
                <p className="text-sm font-extrabold uppercase tracking-[.2em] text-[#8b541f]">Message example</p>
                <p className="mt-4 text-base leading-8 text-[#5d4b3e]">
                  “Hello DesertBrise, we are 2 travelers coming in October for 7 days. We want desert, culture, comfort, and something authentic but not rushed. What do you recommend?”
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Link href="https://wa.me/212600454881" className="premium-btn bg-[#d79a44] text-[#1d130c] hover:bg-[#efbd73]">
                  Message on WhatsApp <span>→</span>
                </Link>
                <Link href="mailto:Desertbrise@gmail.com" className="premium-btn border border-[#eadbc8] bg-white text-[#2b1b11] hover:border-[#d79a44]">
                  Send email
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
