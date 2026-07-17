import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlog, getCmsPage, getServices } from "@/lib/api";
import { TourCard } from "@/components/TourCard";
import { BlogCard } from "@/components/BlogCard";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

type DynamicItem = {
  title?: string;
  description?: string;
  image?: string;
  icon?: string;
  question?: string;
  answer?: string;
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
  intro_image?: string;
  secondary_image?: string;
  thumbnail?: string;
  surprise_image?: string;
  hero_subtitle?: string;
  meta_description?: string;

  why_visit_title?: string;
  why_visit_text?: string;
  landmarks_title?: string;
  landmarks_text?: string;
  experiences_title?: string;
  experiences_text?: string;
  tours_title?: string;
  guides_title?: string;
  faq_title?: string;
  itinerary_text?: string;
  audience_text?: string;
  surprise_title?: string;
  surprise_text?: string;

  cta_title?: string;
  cta_text?: string;
  cta_button_text?: string;
  cta_button_url?: string;

  landmarks?: DynamicItem[];
  experiences?: DynamicItem[];
  faqs?: DynamicItem[];
  services?: any[];
  posts?: any[];
  style_sections?: Record<string, { title?: string; subtitle?: string; body?: string }>;
  style_items?: Record<string, DynamicItem[]>;
};

function getImage(page: AdminPage) {
  return (
    page.hero_image ||
    page.image ||
    page.featured_image ||
    page.intro_image ||
    page.secondary_image ||
    page.thumbnail ||
    ""
  );
}

function plainText(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function htmlBlock(html?: string) {
  if (!html) return null;
  return (
    <div
      className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#2b1b11] prose-p:leading-8 prose-p:text-[#75675d] prose-li:text-[#75675d]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function TextSection({
  eyebrow,
  title,
  html,
  text,
}: {
  eyebrow: string;
  title?: string;
  html?: string;
  text?: string;
}) {
  if (!title && !html && !text) return null;

  return (
    <section className="rounded-[2rem] border border-[#eadbc8] bg-white p-7 shadow-[0_22px_70px_rgba(58,37,22,.08)] md:p-10">
      <p className="premium-eyebrow">{eyebrow}</p>
      {title ? (
        <h2 className="display-font mt-3 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
          {title}
        </h2>
      ) : null}
      <div className="mt-5">
        {html ? htmlBlock(html) : <p className="text-lg leading-8 text-[#75675d]">{text}</p>}
      </div>
    </section>
  );
}

function ItemGrid({
  eyebrow,
  title,
  intro,
  items,
}: {
  eyebrow: string;
  title?: string;
  intro?: string;
  items?: DynamicItem[];
}) {
  const clean = (items || []).filter((item) => item.title || item.description || item.image);
  if (!clean.length && !title && !intro) return null;

  return (
    <section>
      <p className="premium-eyebrow">{eyebrow}</p>
      {title ? (
        <h2 className="display-font mt-3 max-w-3xl text-5xl font-semibold tracking-[-0.05em]">
          {title}
        </h2>
      ) : null}
      {intro ? <p className="mt-4 max-w-3xl text-lg leading-8 text-[#75675d]">{intro}</p> : null}

      {clean.length ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {clean.map((item, index) => (
            <article
              key={`${item.title || "item"}-${index}`}
              className="overflow-hidden rounded-[1.8rem] border border-[#eadbc8] bg-white shadow-[0_18px_54px_rgba(58,37,22,.07)]"
            >
              {item.image ? (
                <img src={item.image} alt={item.title || ""} className="h-56 w-full object-cover" />
              ) : null}
              <div className="p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f5eadb] text-sm font-black text-[#8d5524]">
                  {item.icon || index + 1}
                </div>
                {item.title ? <h3 className="text-xl font-black text-[#2b1b11]">{item.title}</h3> : null}
                {item.description ? (
                  <p className="mt-3 text-sm leading-7 text-[#75675d]">{item.description}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function FAQSection({ title, items }: { title?: string; items?: DynamicItem[] }) {
  const clean = (items || []).filter((item) => item.question && item.answer);
  if (!clean.length) return null;

  return (
    <section className="rounded-[2rem] border border-[#eadbc8] bg-white p-7 shadow-[0_22px_70px_rgba(58,37,22,.08)] md:p-10">
      <p className="premium-eyebrow">Questions</p>
      <h2 className="display-font mt-3 text-5xl font-semibold tracking-[-0.05em]">
        {title || "Frequently asked questions"}
      </h2>
      <div className="mt-8 grid gap-4">
        {clean.map((item, index) => (
          <details key={`${item.question}-${index}`} className="rounded-[1.4rem] border border-[#eadbc8] bg-[#fff8ee] p-5">
            <summary className="cursor-pointer text-lg font-black text-[#2b1b11]">
              {item.question}
            </summary>
            <div className="mt-4 text-sm leading-7 text-[#75675d]" dangerouslySetInnerHTML={{ __html: item.answer || "" }} />
          </details>
        ))}
      </div>
    </section>
  );
}

function Sidebar({
  page,
  posts,
}: {
  page: AdminPage;
  posts: any[];
}) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-[2rem] border border-[#eadbc8] bg-white p-7 shadow-[0_22px_70px_rgba(58,37,22,.08)]">
        <p className="premium-eyebrow">Plan your trip</p>
        <h2 className="display-font mt-3 text-4xl font-semibold">
          {page.cta_title || "Want this in your journey?"}
        </h2>
        <p className="mt-4 text-sm leading-7 text-[#75675d]">
          {page.cta_text || "Tell us your dates, travel style, and group size. We will shape a private Morocco route around you."}
        </p>
        <Link
          href={page.cta_button_url || "/contact"}
          className="premium-btn mt-6 w-full justify-center bg-[#2b1b11] text-white"
        >
          {page.cta_button_text || "Start Planning"}
        </Link>
      </div>

      {posts.length ? (
        <div className="rounded-[2rem] border border-[#eadbc8] bg-white p-6 shadow-[0_18px_54px_rgba(58,37,22,.06)]">
          <p className="premium-eyebrow">{page.guides_title || "Selected guides"}</p>
          <div className="mt-5 grid gap-5">
            {posts.map((post) => (
              <BlogCard key={post.id || post.slug} post={post} />
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}

export default async function DynamicDetailPage({ params }: Props) {
  const { slug } = await params;

  let page: AdminPage | null = null;

  try {
    const response = await getCmsPage(slug);
    page = response.page as AdminPage;
  } catch {
    page = null;
  }

  if (!page) notFound();

  const fallbackData = await Promise.allSettled([
    getServices({ per_page: 3 }),
    getBlog({ per_page: 3 }),
  ]);

  const fallbackServices =
    fallbackData[0].status === "fulfilled" ? fallbackData[0].value.items || [] : [];
  const fallbackPosts =
    fallbackData[1].status === "fulfilled" ? fallbackData[1].value.items || [] : [];

  // These come from PHP admin checkboxes in page_edit.php:
  // Selected tours = page.services
  // Selected blog guides = page.posts
  const selectedServices = (page.services && page.services.length ? page.services : fallbackServices).slice(0, 6);
  const selectedPosts = (page.posts && page.posts.length ? page.posts : fallbackPosts).slice(0, 3);

  const image = getImage(page);
  const html = page.content || page.body || "";
  const intro =
    page.excerpt ||
    page.meta_description ||
    page.hero_subtitle ||
    plainText(html) ||
    "This page is editable from your PHP admin.";

  const styleSections = page.style_sections || {};
  const styleItems = page.style_items || {};

  const specialItems = [
    ...(page.experiences || []),
    ...(styleItems.special || []),
  ].filter((item) => item.title || item.description || item.image);

  const includedItems = styleItems.included || [];
  const audienceItems = styleItems.audience || [];
  const routeItems = styleItems.routes || [];
  const seasonItems = styleItems.season || [];

  return (
    <main className="bg-[#fff8ee] text-[#2b1b11]">
      <section className="px-5 pb-16 pt-28 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.02fr_.98fr] lg:items-stretch">
          <div className="flex min-h-[560px] flex-col justify-end rounded-[2.5rem] bg-[#2b1b11] p-7 text-white shadow-[0_30px_100px_rgba(58,37,22,.22)] md:p-12">
            <Link href={"/destinations"} className="text-sm font-bold text-[#f4c36e]">
              ← All destinations
            </Link>
            <p className="mt-16 text-xs font-black uppercase tracking-[0.36em] text-[#f4c36e]">
              Morocco Destination
            </p>
            <h1 className="display-font mt-5 text-6xl font-semibold leading-[0.95] tracking-[-0.05em] text-white md:text-8xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              {intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={page.cta_button_url || "/contact"} className="premium-btn bg-[#d79a44] text-[#1d130c]">
                {page.cta_button_text || "Plan this journey"} →
              </Link>
              <Link href="/tours" className="premium-btn border border-white/20 bg-white/10 text-white">
                View tours
              </Link>
            </div>
          </div>

          <div className="relative min-h-[560px] overflow-hidden rounded-[2.5rem] border border-[#eadbc8] bg-[#eadbc8]">
            {image ? (
              <img src={image} alt={page.title || ""} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,#f0bd72,#8d5524_48%,#2b1b11)]" />
            )}
            <div className="absolute bottom-6 left-6 right-6 rounded-[1.8rem] bg-white/85 p-5 backdrop-blur">
              <p className="premium-eyebrow">Controlled from admin</p>
              <p className="mt-2 text-sm leading-6 text-[#75675d]">
                Hero image, title, subtitle, intro, tours, guides, FAQ, CTA and sections are loaded from your PHP CMS.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_390px]">
          <div className="space-y-12">
            <TextSection
              eyebrow="Main content"
              title={page.why_visit_title || styleSections.why_style?.title || ""}
              html={page.why_visit_text || styleSections.why_style?.body || html}
              text={intro}
            />

            <ItemGrid
              eyebrow="Experiences"
              title={page.experiences_title || styleSections.special?.title || "What you can experience"}
              intro={page.experiences_text || styleSections.special?.subtitle || ""}
              items={specialItems.length ? specialItems : page.landmarks}
            />

            <TextSection
              eyebrow="Route feeling"
              title={page.landmarks_title || styleSections.routes?.title || ""}
              html={page.landmarks_text || styleSections.routes?.body || page.itinerary_text}
            />

            <ItemGrid
              eyebrow="Routes & details"
              title={styleSections.routes?.title || ""}
              intro={styleSections.routes?.subtitle || ""}
              items={routeItems}
            />

            <ItemGrid
              eyebrow="Included feeling"
              title={styleSections.included?.title || ""}
              intro={styleSections.included?.body || ""}
              items={includedItems}
            />

            <ItemGrid
              eyebrow="Who it is for"
              title={styleSections.audience?.title || ""}
              intro={page.audience_text || styleSections.audience?.body || ""}
              items={audienceItems}
            />

            <ItemGrid
              eyebrow="Best time"
              title={styleSections.season?.title || ""}
              intro={styleSections.season?.body || ""}
              items={seasonItems}
            />

            {selectedServices.length ? (
              <section>
                <p className="premium-eyebrow">{page.tours_title || "Selected tours"}</p>
                <h2 className="display-font mt-3 max-w-3xl text-5xl font-semibold tracking-[-0.05em]">
                  Tours chosen for this page
                </h2>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  {selectedServices.map((service) => (
                    <TourCard key={service.id || service.slug} tour={service} />
                  ))}
                </div>
              </section>
            ) : null}

            <FAQSection title={page.faq_title} items={page.faqs} />

            <TextSection
              eyebrow="Final note"
              title={page.surprise_title}
              html={page.surprise_text}
            />
          </div>

          <Sidebar page={page} posts={selectedPosts} />
        </div>
      </section>
    </main>
  );
}
