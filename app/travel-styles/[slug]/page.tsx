import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlog, getCmsPage, getServices } from "@/lib/api";
import { TourCard } from "@/components/TourCard";
import { BlogCard } from "@/components/BlogCard";

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
  hero_image?: string;
  featured_image?: string;
  secondary_image?: string;
  thumbnail?: string;
  hero_subtitle?: string;
  meta_description?: string;
};

function getImage(page: AdminPage) {
  return (
    page.image ||
    page.hero_image ||
    page.featured_image ||
    page.secondary_image ||
    page.thumbnail ||
    ""
  );
}

function plainText(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default async function TravelStyleDetailPage({ params }: Props) {
  const { slug } = await params;

  let page: AdminPage | null = null;

  try {
    const response = await getCmsPage(slug);
    page = response.page as AdminPage;
  } catch {
    page = null;
  }

  if (!page) notFound();

  const [servicesRes, blogRes] = await Promise.allSettled([
    getServices({ per_page: 3 }),
    getBlog({ per_page: 3 }),
  ]);

  const services =
    servicesRes.status === "fulfilled" ? servicesRes.value.items || [] : [];
  const posts = blogRes.status === "fulfilled" ? blogRes.value.items || [] : [];

  const image = getImage(page);
  const html = page.content || page.body || "";
  const intro =
    page.excerpt ||
    page.meta_description ||
    page.hero_subtitle ||
    plainText(html) ||
    "A Morocco destination page edited from your admin.";

  const highlights = [
    "Private local planning",
    "Authentic cultural encounters",
    "Comfortable route design",
    "Flexible pace and timing",
  ];

  return (
    <main className="bg-[#fff8ee] text-[#2b1b11]">
      <section className="px-5 pb-16 pt-28 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-stretch">
          <div className="flex min-h-[520px] flex-col justify-end rounded-[2.5rem] bg-[#2b1b11] p-7 text-white shadow-[0_30px_100px_rgba(58,37,22,.22)] md:p-12">
            <Link href="/travel-styles" className="text-sm font-bold text-[#f4c36e]">
              ← All travel styles
            </Link>
            <p className="mt-16 text-xs font-black uppercase tracking-[0.36em] text-[#f4c36e]">
              Morocco Travel Style
            </p>
            <h1 className="display-font mt-5 text-6xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-8xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              {intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="premium-btn bg-[#d79a44] text-[#1d130c]">
                Plan this style →
              </Link>
              <Link href="/tours" className="premium-btn border border-white/20 bg-white/10 text-white">
                View tours
              </Link>
            </div>
          </div>

          <div className="relative min-h-[520px] overflow-hidden rounded-[2.5rem] border border-[#eadbc8] bg-[#eadbc8]">
            {image ? (
              <img src={image} alt={page.title || "Travel Style"} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,#f0bd72,#8d5524_48%,#2b1b11)]" />
            )}
            <div className="absolute bottom-6 left-6 right-6 rounded-[1.8rem] bg-white/80 p-5 backdrop-blur">
              <p className="premium-eyebrow">Why it matters</p>
              <p className="mt-2 text-sm leading-6 text-[#75675d]">
                This style page is dynamic. Change the title, image, excerpt, and content from your PHP admin.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <article className="rounded-[2rem] border border-[#eadbc8] bg-white p-7 shadow-[0_22px_70px_rgba(58,37,22,.08)] md:p-12">
              <p className="premium-eyebrow">From the admin</p>
              {html ? (
                <div
                  className="prose prose-lg mt-5 max-w-none prose-headings:font-serif prose-headings:text-[#2b1b11] prose-p:leading-8 prose-p:text-[#75675d]"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : (
                <p className="mt-5 text-lg leading-8 text-[#75675d]">{intro}</p>
              )}
            </article>

            <section className="grid gap-4 md:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-[#eadbc8] bg-white p-6">
                  <div className="mb-4 h-10 w-10 rounded-full bg-[#f5eadb]" />
                  <h3 className="text-xl font-black">{item}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#75675d]">
                    We design every Morocco journey around comfort, timing, real local knowledge, and human attention.
                  </p>
                </div>
              ))}
            </section>

            {services.length ? (
              <section>
                <p className="premium-eyebrow">Suggested tours</p>
                <h2 className="display-font mt-3 text-5xl font-semibold">Tours matching {page.title}</h2>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  {services.map((service: any) => (
                    <TourCard key={service.id || service.slug} service={service} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2rem] border border-[#eadbc8] bg-white p-7 shadow-[0_22px_70px_rgba(58,37,22,.08)]">
              <p className="premium-eyebrow">Create your route</p>
              <h2 className="display-font mt-3 text-4xl font-semibold">Want this style of journey?</h2>
              <p className="mt-4 text-sm leading-7 text-[#75675d]">
                Send us your dates, travel style, and group size. We will shape the route around you.
              </p>
              <Link href="/contact" className="premium-btn mt-6 w-full justify-center bg-[#2b1b11] text-white">
                Start Planning
              </Link>
            </div>

            {posts.length ? (
              <div className="rounded-[2rem] border border-[#eadbc8] bg-white p-6">
                <p className="premium-eyebrow">Related guides</p>
                <div className="mt-5 space-y-4">
                  {posts.map((post: any) => (
                    <BlogCard key={post.id || post.slug} post={post} compact />
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </main>
  );
}
