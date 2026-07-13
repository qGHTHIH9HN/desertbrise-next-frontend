import Link from "next/link";
import { notFound } from "next/navigation";
import { getCmsPage } from "@/lib/api";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

type AdminPage = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  body?: string;
  image?: string;
  secondary_image?: string;
  hero_subtitle?: string;
  meta_description?: string;
  updated_at?: string;
};

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;

  let page: AdminPage | null = null;

  try {
    const response = await getCmsPage(slug);
    page = response.page as AdminPage;
  } catch {
    page = null;
  }

  if (!page) {
    notFound();
  }

  const image = page.image || page.secondary_image || "";
  const intro = page.excerpt || page.meta_description || page.hero_subtitle || "";
  const html = page.content || page.body || "";

  return (
    <main className="bg-[#fff8ee] text-[#2b1b11]">
      <section className="relative min-h-[72vh] overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:px-10">
        {image ? (
          <img src={image} alt={page.title || "Destination"} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#d79a44] via-[#81502e] to-[#2b1b11]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />

        <div className="relative mx-auto max-w-7xl">
          <Link href="/destinations" className="text-sm font-bold text-[#f4c36e]">
            ← All destinations
          </Link>
          <p className="mt-14 text-xs font-black uppercase tracking-[0.36em] text-[#f4c36e]">
            Morocco Destination
          </p>
          <h1 className="display-font mt-5 max-w-4xl text-6xl font-semibold leading-[0.95] tracking-[-0.05em] text-white md:text-8xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
            {intro}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact" className="premium-btn bg-[#d79a44] text-[#1d130c]">
              Plan a trip here →
            </Link>
            <Link href="/tours" className="premium-btn border border-white/30 bg-white/10 text-white backdrop-blur">
              View Morocco tours
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_360px]">
          <article className="rounded-[2rem] border border-[#eadbc8] bg-white p-7 shadow-[0_22px_70px_rgba(58,37,22,.08)] md:p-12">
            <p className="premium-eyebrow">From the admin</p>
            {html ? (
              <div
                className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#2b1b11] prose-p:leading-8 prose-p:text-[#75675d]"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <p className="mt-5 text-lg leading-8 text-[#75675d]">{intro}</p>
            )}
          </article>

          <aside className="space-y-5">
            <div className="rounded-[2rem] border border-[#eadbc8] bg-white p-7 shadow-[0_22px_70px_rgba(58,37,22,.08)]">
              <p className="premium-eyebrow">Create your route</p>
              <h2 className="display-font mt-3 text-4xl font-semibold">Want this destination in your trip?</h2>
              <p className="mt-4 text-sm leading-7 text-[#75675d]">
                Send us your dates, travel style, and group size. We will shape the route around you.
              </p>
              <Link href="/contact" className="premium-btn mt-6 w-full justify-center bg-[#2b1b11] text-white">
                Start Planning
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
