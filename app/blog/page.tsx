import { BlogCard } from "@/components/BlogCard";
import { getBlog } from "@/lib/api";

export const metadata = {
  title: "Morocco Travel Journal | DesertBrise Travel",
  description: "Practical Morocco travel guides, desert trek advice, and local insights from DesertBrise Travel.",
};

export default async function BlogPage() {
  const { items, pagination } = await getBlog({ per_page: 24 });
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
          <p className="premium-eyebrow">Latest articles</p>
          <h2 className="display-font mt-3 text-5xl font-semibold tracking-[-.04em] text-[#2b1b11]">{pagination.total} guides and stories.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((post) => <BlogCard key={post.id} post={post} />)}
          </div>
        </div>
      </section>
    </>
  );
}
