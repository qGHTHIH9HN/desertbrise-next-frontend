import { BlogCard } from "@/components/BlogCard";
import { CTA } from "@/components/CTA";
import { SectionHeading } from "@/components/SectionHeading";
import { getBlog } from "@/lib/api";

export const metadata = {
  title: "Morocco Travel Blog | DesertBrise Travel",
  description: "Morocco travel guides, desert trip advice, cultural insights, trekking tips, and private tour inspiration.",
};

export default async function BlogPage() {
  const data = await getBlog({ per_page: 18 });

  return (
    <>
      <section className="px-5 py-20 lg:px-8">
        <SectionHeading eyebrow="Travel journal" title="Morocco travel advice for better decisions." text="Human, practical travel content from your existing PHP blog system, displayed through Next.js." />
        <div className="mx-auto mt-12 grid max-w-7xl gap-7 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((post) => <BlogCard key={post.id} post={post} />)}
        </div>
      </section>
      <CTA />
    </>
  );
}
