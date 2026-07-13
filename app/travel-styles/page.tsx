import Link from "next/link";
import { CTA } from "@/components/CTA";
import { TourCard } from "@/components/TourCard";
import { getServices } from "@/lib/api";
import { travelStyles } from "@/lib/travel-content";

export const metadata = {
  title: "Morocco Travel Styles | DesertBrise Travel",
  description: "Choose your Morocco travel style: private luxury, desert trekking, family travel, culture and food, romantic escape, and adventure nature routes.",
};

export default async function TravelStylesPage() {
  const tours = await getServices({ per_page: 6 }).catch(() => null);
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#1d130c] px-5 py-28 text-white sm:px-8 lg:px-10">
        <img src={travelStyles[0].image} alt="Morocco travel styles" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-58" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#160e09] via-[#1d130c]/82 to-[#1d130c]/28" />
        <div className="mx-auto max-w-7xl">
          <p className="premium-eyebrow text-[#efbd73]">Travel styles</p>
          <h1 className="display-font mt-5 max-w-5xl text-6xl font-semibold leading-[.92] tracking-[-.055em] md:text-8xl">
            Choose Morocco by feeling, comfort and rhythm.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-9 text-white/82">
            The best itinerary is not only about where you go. It is about how the journey feels: private, adventurous, romantic, cultural, family-friendly or deeply quiet.
          </p>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-2 xl:grid-cols-3">
          {travelStyles.map((style) => (
            <Link key={style.slug} href={`/travel-styles/${style.slug}`} className="group overflow-hidden rounded-[2rem] border border-[#eadbc8] bg-white shadow-[0_18px_54px_rgba(58,37,22,.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(58,37,22,.14)]">
              <div className="relative h-72 overflow-hidden bg-[#dac9b7]">
                <img src={style.image} alt={style.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d130c]/68 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs font-black uppercase tracking-[.28em] text-[#f2c373]">{style.eyebrow}</p>
                  <h2 className="display-font mt-2 text-4xl font-semibold leading-none tracking-[-.04em]">{style.name}</h2>
                </div>
              </div>
              <div className="p-7">
                <p className="text-sm leading-7 text-[#75675d]">{style.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {style.highlights.slice(0, 3).map((item) => <span key={item} className="rounded-full bg-[#f9f2e7] px-3 py-1.5 text-xs font-bold text-[#7a4a1f]">{item}</span>)}
                </div>
                <span className="mt-6 inline-flex text-sm font-extrabold text-[#8b541f]">Explore style →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {tours?.items?.length ? (
        <section className="bg-[#f9f2e7] px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="premium-eyebrow">Start with a route</p>
            <h2 className="display-font mt-3 max-w-3xl text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">Journeys that can be shaped around your style.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {tours.items.slice(0, 3).map((tour) => <TourCard key={tour.id} tour={tour} />)}
            </div>
          </div>
        </section>
      ) : null}

      <CTA eyebrow="Your style matters" title="Tell us how you want Morocco to feel." text="We will recommend the right route, pace, stays, and experiences for your travel style." />
    </>
  );
}
