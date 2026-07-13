import { BlogCard } from "@/components/BlogCard";
import { TourCard } from "@/components/TourCard";
import { CTA } from "@/components/CTA";
import { getBlog, getServices } from "@/lib/api";

export const metadata = {
  title: "Morocco Travel Journal | DesertBrise Travel",
  description: "Practical Morocco travel guides, desert trek advice, and local insights from DesertBrise Travel.",
};

export default async function BlogPage() {
  const [{ items, pagination }, toursData] = await Promise.all([
    getBlog({ per_page: 24 }),
    getServices({ per_page: 3 }).catch(() => null),
  ]);

  const featuredPosts = items.slice(0, 3);
  const restPosts = items.slice(3);
  const tours = toursData?.items || [];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#1d130c] px-5 py-24 text-white sm:px-8 lg:px-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_0%,rgba(215,154,68,.22),transparent_40%),linear-gradient(135deg,#1d130c,#3a2415)]" />
        <div className="mx-auto max-w-7xl">
          <p className="premium-eyebrow text-[#efbd73]">Travel Journal</p>
          <h1 className="display-font mt-5 max-w-4xl text-6xl font-semibold leading-[.94] tracking-[-.055em] md:text-8xl">Human Morocco advice before you travel.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">Desert, trekking, private tours, packing, timing, and cultural travel insights from real local experience.</p>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="premium-eyebrow">Featured guides</p>
          <h2 className="display-font mt-3 text-5xl font-semibold tracking-[-.04em] text-[#2b1b11]">Start with the most useful reads.</h2>
          {featuredPosts.length ? (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {featuredPosts.map((post) => <BlogCard key={post.id} post={post} />)}
            </div>
          ) : (
            <div className="premium-card mt-8 rounded-[2rem] p-10 text-[#75675d]">No articles found yet.</div>
          )}
        </div>
      </section>

      {tours.length ? (
        <section className="bg-[#f9f2e7] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="premium-eyebrow">Travel ideas connected to the journal</p>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="display-font max-w-3xl text-5xl font-semibold tracking-[-.04em] text-[#2b1b11]">Turn reading into a private Morocco journey.</h2>
              <a href="/tours" className="text-sm font-extrabold text-[#8b541f]">View all tours →</a>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="premium-eyebrow">All articles</p>
          <h2 className="display-font mt-3 text-5xl font-semibold tracking-[-.04em] text-[#2b1b11]">{pagination.total} guides and stories.</h2>
          {restPosts.length ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {restPosts.map((post) => <BlogCard key={post.id} post={post} />)}
            </div>
          ) : null}
        </div>
      </section>

      <CTA eyebrow="Need a route, not only advice?" title="Tell us what kind of Morocco experience you want." text="We can turn your travel questions into a private itinerary with clear timing, comfort, and route advice." />
    </>
  );
}
