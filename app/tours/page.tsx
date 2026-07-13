import Link from "next/link";
import { CTA } from "@/components/CTA";
import { TourCard } from "@/components/TourCard";
import { getServices } from "@/lib/api";

export const metadata = {
  title: "Private Morocco Tours | DesertBrise Travel",
  description:
    "Explore private Morocco tours, desert treks, imperial cities, Atlas villages, and tailor-made journeys crafted by local experts.",
};

const filters = ["Desert journeys", "Imperial cities", "Atlas mountains", "Family trips", "Luxury escapes"];

export default async function ToursPage() {
  const data = await getServices({ per_page: 36 });
  const tours = data.items || [];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#2b1b11] px-5 pb-24 pt-24 text-white sm:px-8 lg:px-10">
        <div className="absolute inset-0 -z-20">
          <img
            src={tours[0]?.image || "/hero-morocco.jpg"}
            alt="Private Morocco journeys"
            className="h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1d130c] via-[#1d130c]/85 to-[#1d130c]/35" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#fffaf2] to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl">
          <p className="premium-eyebrow text-[#efbd73]">Handpicked Morocco experiences</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <h1 className="display-font max-w-4xl text-6xl font-semibold leading-[.95] tracking-[-.05em] md:text-8xl">
                Private tours made for real memories.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
                From quiet desert nights to imperial cities and mountain roads, every itinerary is shaped around your rhythm, comfort, and feeling of connection.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
              <p className="text-sm font-bold uppercase tracking-[.22em] text-[#efbd73]">Why travelers stay longer</p>
              <div className="mt-5 grid gap-4 text-sm leading-6 text-white/82 sm:grid-cols-2 lg:grid-cols-1">
                <p><strong className="text-white">Private planning:</strong> routes adapted to you, not copied from everyone.</p>
                <p><strong className="text-white">Local care:</strong> real people, real places, and smooth logistics.</p>
                <p><strong className="text-white">Emotional moments:</strong> sunrise, tea, silence, music, and human connection.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {filters.map((filter) => (
              <span key={filter} className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-bold text-white/90 backdrop-blur">
                {filter}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 pb-24 pt-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="premium-eyebrow">Explore the collection</p>
              <h2 className="display-font mt-3 max-w-3xl text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
                Choose the journey that feels like you.
              </h2>
            </div>
            <Link href="/contact" className="premium-btn border border-[#eadbc8] bg-white text-[#2b1b11] shadow-[0_18px_45px_rgba(58,37,22,.08)] hover:border-[#d79a44]">
              Ask for advice <span>→</span>
            </Link>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Need a route made around you?"
        title="Tell us your dates. We shape the feeling."
        text="Share your travel style, group size, comfort level, and dreams. We will suggest the most beautiful private Morocco journey for you."
      />
    </>
  );
}
