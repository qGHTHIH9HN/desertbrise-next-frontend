import { TourCard } from "@/components/TourCard";
import { SectionHeading } from "@/components/SectionHeading";
import { CTA } from "@/components/CTA";
import { getServices } from "@/lib/api";

export const metadata = {
  title: "Morocco Tours | DesertBrise Travel",
  description: "Explore private Morocco tours, desert trips, trekking routes, cultural journeys, and tailor-made travel services.",
};

export default async function ToursPage() {
  const data = await getServices({ per_page: 24 });

  return (
    <>
      <section className="px-5 py-20 lg:px-8">
        <SectionHeading eyebrow="Morocco tours" title="Private tours, treks, and desert journeys." text="Every card below is pulled from your existing PHP/MySQL CMS and rendered with Next.js + Tailwind." />
        <div className="mx-auto mt-12 grid max-w-7xl gap-7 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((tour) => <TourCard key={tour.id} tour={tour} />)}
        </div>
      </section>
      <CTA />
    </>
  );
}
