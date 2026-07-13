import Link from "next/link";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { TourCard } from "@/components/TourCard";
import { getServices } from "@/lib/api";
import { destinations, findDestination } from "@/lib/travel-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const destination = findDestination(slug);
  if (!destination) return {};
  return { title: `${destination.name} Morocco Tours | DesertBrise Travel`, description: destination.description };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const destination = findDestination(slug);
  if (!destination) notFound();

  const tours = await getServices({ location: destination.query, q: destination.query, per_page: 9 }).catch(() => null);
  const items = tours?.items?.length ? tours.items : (await getServices({ per_page: 6 }).catch(() => null))?.items || [];

  return (
    <>
      <section className="relative isolate min-h-[78vh] overflow-hidden bg-[#1d130c] px-5 py-28 text-white sm:px-8 lg:px-10">
        <img src={destination.image} alt={destination.name} className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#160e09] via-[#1d130c]/78 to-[#1d130c]/20" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#fffaf2] to-transparent" />
        <div className="mx-auto max-w-7xl">
          <Link href="/destinations" className="text-sm font-bold text-[#efbd73]">← All destinations</Link>
          <p className="premium-eyebrow mt-10 text-[#efbd73]">{destination.eyebrow}</p>
          <h1 className="display-font mt-5 max-w-5xl text-6xl font-semibold leading-[.92] tracking-[-.055em] md:text-8xl">{destination.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-9 text-white/84">{destination.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {destination.highlights.map((item) => <span key={item} className="rounded-full border border-white/18 bg-white/12 px-4 py-2 text-sm font-bold text-white/88 backdrop-blur">{item}</span>)}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div className="premium-card rounded-[2rem] p-8">
            <p className="premium-eyebrow">How it feels</p>
            <h2 className="display-font mt-3 text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11]">{destination.name}</h2>
            <p className="mt-5 text-lg leading-9 text-[#75675d]">{destination.mood}</p>
          </div>
          <div className="premium-card rounded-[2rem] p-8">
            <p className="premium-eyebrow">Best for</p>
            <p className="mt-5 text-lg leading-9 text-[#75675d]">{destination.bestFor}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f9f2e7] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="premium-eyebrow">Related journeys</p>
          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="display-font max-w-3xl text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">Tours connected to {destination.name}.</h2>
            <Link href="/tours" className="text-sm font-extrabold text-[#8b541f]">View all tours →</Link>
          </div>
          {items.length ? <div className="mt-10 grid gap-6 md:grid-cols-3">{items.slice(0, 6).map((tour) => <TourCard key={tour.id} tour={tour} />)}</div> : <div className="premium-card mt-8 rounded-[2rem] p-8 text-[#75675d]">No tours found yet.</div>}
        </div>
      </section>

      <CTA eyebrow="Build this destination into your route" title={`Want ${destination.name} in your Morocco journey?`} text="Send us your dates and travel style. We will shape a route that feels natural, beautiful, and comfortable." />
    </>
  );
}
