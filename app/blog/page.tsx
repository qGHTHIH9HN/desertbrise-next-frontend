import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { CTA } from "@/components/CTA";
import { getBlog } from "@/lib/api";

export const metadata = {
  title: "Morocco Travel Journal | DesertBrise Travel",
  description:
    "Read local Morocco travel advice, desert trekking guides, cultural tips, and private tour inspiration from DesertBrise Travel.",
};

export default async function BlogPage() {
  const data = await getBlog({ per_page: 24 });
  const posts = data.items || [];
  const lead = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#2b1b11] px-5 pb-24 pt-24 text-white sm:px-8 lg:px-10">
        {lead?.image ? <img src={lead.image} alt={lead.title} className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40" /> : null}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1d130c] via-[#1d130c]/88 to-[#1d130c]/45" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[#fffaf2] to-transparent" />

        <div className="mx-auto max-w-7xl">
          <p className="premium-eyebrow text-[#efbd73]">Travel journal</p>
          <h1 className="display-font mt-5 max-w-5xl text-6xl font-semibold leading-[.95] tracking-[-.055em] md:text-8xl">
            Local stories that help you feel Morocco before you arrive.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
            Practical guides, honest advice, and emotional travel inspiration written to help you choose the journey that truly fits you.
          </p>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 pb-24 pt-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {lead ? (
            <Link href={lead.url || `/blog/${lead.slug}`} className="group grid overflow-hidden rounded-[2.4rem] border border-[#eadbc8] bg-white shadow-[0_28px_90px_rgba(58,37,22,.12)] md:grid-cols-[1.05fr_.95fr]">
              <div className="relative min-h-[24rem] overflow-hidden bg-[#dac9b7]">
                {lead.image ? <img src={lead.image} alt={lead.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /> : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-7 md:p-12">
                <p className="premium-eyebrow">Featured insight</p>
                <h2 className="display-font mt-4 text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">
                  {lead.title}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-[#75675d]">{lead.excerpt}</p>
                <span className="premium-btn mt-8 w-fit bg-[#2b1b11] text-white group-hover:bg-[#d79a44] group-hover:text-[#1d130c]">
                  Read the story <span>→</span>
                </span>
              </div>
            </Link>
          ) : null}

          <div className="mt-16 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="premium-eyebrow">Latest guides</p>
              <h2 className="display-font mt-3 max-w-3xl text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
                Travel advice with human detail.
              </h2>
            </div>
            <Link href="/contact" className="premium-btn border border-[#eadbc8] bg-white text-[#2b1b11] hover:border-[#d79a44]">
              Ask a local expert <span>→</span>
            </Link>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Need local guidance?"
        title="We help you choose the right route, not just any route."
        text="Tell us what you like, what you avoid, and how you want the journey to feel. We will guide you with real local knowledge."
      />
    </>
  );
}
