import Link from "next/link";
import { CTA } from "@/components/CTA";
import { TourCard } from "@/components/TourCard";
import { getServices } from "@/lib/api";
import { destinations } from "@/lib/travel-content";

export const metadata = {
  title: "Morocco Destinations | DesertBrise Travel",
  description:
    "Explore Morocco by feeling: Sahara Desert, Marrakech, Atlas Mountains, Chefchaouen, Fes, Essaouira, Casablanca and Rabat with private DesertBrise routes.",
};

export default async function DestinationsPage() {
  const tours = await getServices({ per_page: 6 }).catch(() => null);
  const featured = tours?.items || [];
  const hero = destinations[0];

  return (
    <>
      <section className="relative isolate min-h-[88vh] overflow-hidden bg-[#1d130c] px-5 pb-24 pt-36 text-white sm:px-8 lg:px-10">
        <img src={hero.image} alt="Morocco destinations" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_20%,rgba(215,154,68,.34),transparent_27%),linear-gradient(90deg,rgba(18,10,6,.96),rgba(18,10,6,.78),rgba(18,10,6,.25))]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-52 bg-gradient-to-t from-[#fffaf2] to-transparent" />

        <div className="mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <p className="premium-eyebrow text-[#f2c373]">Morocco destinations</p>
            <h1 className="display-font mt-5 max-w-5xl text-6xl font-semibold leading-[.9] tracking-[-.055em] md:text-8xl">
              Choose the place that changes the feeling of your journey.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-9 text-white/84">
              Morocco is not one emotion. It is desert silence, mountain air, red city intensity, blue streets, ocean wind and ancient medinas. Start with the feeling you want.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="premium-btn bg-[#d79a44] text-[#1d130c] shadow-[0_22px_54px_rgba(215,154,68,.32)] hover:bg-[#efbd73]">
                Build My Route →
              </Link>
              <Link href="/tours" className="premium-btn border border-white/22 bg-white/10 text-white backdrop-blur-md hover:bg-white/16">
                See Tours
              </Link>
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-white/16 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
            <div className="grid gap-3 sm:grid-cols-2">
              {destinations.slice(0, 4).map((item) => (
                <Link key={item.slug} href={`/destinations/${item.slug}`} className="group rounded-[1.4rem] border border-white/10 bg-white/10 p-4 transition hover:bg-white/16">
                  <p className="text-[10px] font-black uppercase tracking-[.28em] text-[#f2c373]">{item.eyebrow}</p>
                  <h2 className="display-font mt-2 text-2xl font-semibold leading-none text-white">{item.name}</h2>
                  <p className="mt-2 clamp-2 text-xs leading-5 text-white/70">{item.routeMood}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <p className="premium-eyebrow">Destination map</p>
              <h2 className="display-font mt-3 text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
                Every region has its own rhythm.
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-9 text-[#75675d]">
              These pages are designed like emotional entry points. Each destination explains when to go, how it feels, what to experience and which private journeys fit best.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {destinations.map((destination, index) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className={`${index === 0 ? "xl:col-span-2" : ""} group overflow-hidden rounded-[2.2rem] border border-[#eadbc8] bg-white shadow-[0_18px_54px_rgba(58,37,22,.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(58,37,22,.14)]`}
              >
                <div className={`${index === 0 ? "h-[430px]" : "h-72"} relative overflow-hidden bg-[#d8c4aa]`}>
                  <img src={destination.image} alt={destination.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d130c]/86 via-[#1d130c]/24 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <p className="text-xs font-black uppercase tracking-[.28em] text-[#f2c373]">{destination.eyebrow}</p>
                    <h3 className="display-font mt-3 text-4xl font-semibold leading-none tracking-[-.04em] md:text-5xl">{destination.name}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-white/78">{destination.subtitle}</p>
                  </div>
                </div>
                <div className="p-7">
                  <p className="text-sm leading-7 text-[#75675d]">{destination.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {destination.highlights.slice(0, 4).map((item) => (
                      <span key={item} className="rounded-full bg-[#f9f2e7] px-3 py-1.5 text-xs font-extrabold text-[#7a4a1f]">{item}</span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex text-sm font-extrabold text-[#8b541f]">Explore {destination.name} →</span>
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
                <p className="premium-eyebrow">Start with a journey</p>
                <h2 className="display-font mt-3 max-w-3xl text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">
                  Private routes that connect the places beautifully.
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

      <CTA eyebrow="Private Morocco design" title="Tell us what kind of Morocco you want to feel." text="We will connect the right destinations into one comfortable, emotional and realistic private itinerary." />
    </>
  );
}
