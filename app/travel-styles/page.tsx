import Link from "next/link";
import { CTA } from "@/components/CTA";
import { TourCard } from "@/components/TourCard";
import { getServices } from "@/lib/api";
import { travelStyles } from "@/lib/travel-content";

export const metadata = {
  title: "Morocco Travel Styles | DesertBrise Travel",
  description:
    "Choose your Morocco travel style: private luxury, desert trekking, family travel, culture and food, romantic escapes and adventure nature routes.",
};

export default async function TravelStylesPage() {
  const tours = await getServices({ per_page: 6 }).catch(() => null);
  const featured = tours?.items || [];
  const hero = travelStyles[0];

  return (
    <>
      <section className="relative isolate min-h-[88vh] overflow-hidden bg-[#1d130c] px-5 pb-24 pt-36 text-white sm:px-8 lg:px-10">
        <img src={hero.image} alt="Private Morocco travel styles" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-72" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_18%,rgba(215,154,68,.34),transparent_26%),linear-gradient(90deg,rgba(18,10,6,.96),rgba(18,10,6,.78),rgba(18,10,6,.23))]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-52 bg-gradient-to-t from-[#fffaf2] to-transparent" />

        <div className="mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="premium-eyebrow text-[#f2c373]">Travel styles</p>
            <h1 className="display-font mt-5 max-w-5xl text-6xl font-semibold leading-[.9] tracking-[-.055em] md:text-8xl">
              Design Morocco around how you want to feel.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-9 text-white/84">
              The same country can feel romantic, adventurous, spiritual, luxurious, family-friendly or deeply cultural. Choose the rhythm first — then we build the route.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="premium-btn bg-[#d79a44] text-[#1d130c] shadow-[0_22px_54px_rgba(215,154,68,.32)] hover:bg-[#efbd73]">
                Find My Style →
              </Link>
              <Link href="/destinations" className="premium-btn border border-white/22 bg-white/10 text-white backdrop-blur-md hover:bg-white/16">
                Explore Destinations
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {travelStyles.slice(0, 4).map((style) => (
              <Link key={style.slug} href={`/travel-styles/${style.slug}`} className="group overflow-hidden rounded-[1.6rem] border border-white/12 bg-white/10 p-4 shadow-2xl backdrop-blur-xl transition hover:bg-white/16">
                <div className="h-32 overflow-hidden rounded-[1.2rem] bg-[#d8c4aa]">
                  <img src={style.image} alt={style.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-4 text-[10px] font-black uppercase tracking-[.24em] text-[#f2c373]">{style.eyebrow}</p>
                <h2 className="display-font mt-2 text-2xl font-semibold leading-none text-white">{style.name}</h2>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="premium-eyebrow">Choose your rhythm</p>
              <h2 className="display-font mt-3 text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
                Different travelers need different Morocco.
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-9 text-[#75675d]">
              This section helps visitors immediately recognize themselves. It is built for conversion: when a traveler feels understood, they are more likely to ask for a custom itinerary.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {travelStyles.map((style) => (
              <Link key={style.slug} href={`/travel-styles/${style.slug}`} className="group overflow-hidden rounded-[2.2rem] border border-[#eadbc8] bg-white shadow-[0_18px_54px_rgba(58,37,22,.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(58,37,22,.14)]">
                <div className="relative h-80 overflow-hidden bg-[#d8c4aa]">
                  <img src={style.image} alt={style.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d130c]/84 via-[#1d130c]/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-xs font-black uppercase tracking-[.28em] text-[#f2c373]">{style.eyebrow}</p>
                    <h3 className="display-font mt-2 text-4xl font-semibold leading-none tracking-[-.04em]">{style.name}</h3>
                  </div>
                </div>
                <div className="p-7">
                  <p className="text-sm leading-7 text-[#75675d]">{style.subtitle}</p>
                  <div className="mt-6 grid gap-3 text-sm">
                    <div className="rounded-[1rem] bg-[#f9f2e7] p-4"><strong className="text-[#2b1b11]">Pace:</strong> <span className="text-[#75675d]">{style.pace}</span></div>
                    <div className="rounded-[1rem] bg-[#f9f2e7] p-4"><strong className="text-[#2b1b11]">Best for:</strong> <span className="text-[#75675d]">{style.bestFor}</span></div>
                  </div>
                  <span className="mt-6 inline-flex text-sm font-extrabold text-[#8b541f]">Explore this style →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featured.length ? (
        <section className="bg-[#f9f2e7] px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="premium-eyebrow">Real journeys</p>
                <h2 className="display-font mt-3 max-w-3xl text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">
                  Every tour can be reshaped around your style.
                </h2>
              </div>
              <Link href="/tours" className="text-sm font-extrabold text-[#8b541f]">View all tours →</Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {featured.slice(0, 3).map((tour) => <TourCard key={tour.id} tour={tour} />)}
            </div>
          </div>
        </section>
      ) : null}

      <CTA eyebrow="Not sure which style fits?" title="Tell us what you want to feel — we will choose the route." text="Comfort, silence, culture, food, family ease, romance or adventure. We will translate your feeling into a private Morocco itinerary." />
    </>
  );
}
