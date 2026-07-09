import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { TourCard } from "@/components/TourCard";
import { getHome } from "@/lib/api";

export default async function HomePage() {
  const data = await getHome();

  return (
    <>
      <Hero slide={data.hero_slides?.[0]} />

      <section className="bg-white px-5 py-8 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm md:grid-cols-4">
          {["Local Moroccan Experts", "Tailor-Made Tours", "Flexible Planning", "Secure Booking"].map((item) => (
            <div key={item} className="rounded-2xl bg-[#f8f1e7] px-5 py-4 text-center text-sm font-semibold text-stone-800">{item}</div>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Travel styles" title="Choose how you want to travel Morocco." text="Different routes, comfort levels, and experience styles designed around your travel intention." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Sahara Desert Tours", "Imperial Cities", "Atlas Mountains", "Coastal Escapes", "Family Trips", "Honeymoon Journeys", "Cultural Tours", "Food Experiences"].map((style) => (
              <div key={style} className="rounded-[1.5rem] border border-stone-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-amber-100 text-xl">✦</div>
                <h3 className="font-bold text-stone-950">{style}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Featured tours" title="Private journeys across Morocco." text="A selection from your PHP CMS, rendered by Next.js and Tailwind." />
            <Link href="/tours" className="mx-auto rounded-full border border-stone-300 px-6 py-3 text-sm font-bold text-stone-900 transition hover:bg-stone-950 hover:text-white md:mx-0">View all tours</Link>
          </div>
          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {data.services?.map((tour) => <TourCard key={tour.id} tour={tour} />)}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Travel journal" title="Morocco advice that helps travelers decide." text="Blog content stays managed by your PHP admin and appears in the new frontend." />
          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {data.posts?.map((post) => <BlogCard key={post.id} post={post} />)}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
