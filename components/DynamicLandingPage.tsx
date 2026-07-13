import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { CTA } from "@/components/CTA";
import { SafeImage } from "@/components/SafeImage";
import { TourCard } from "@/components/TourCard";
import type { CmsPage } from "@/lib/types";

function html(value?: string | null) {
  return { __html: value || "" };
}

function strip(value?: string | null) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sectionItems(page: CmsPage) {
  const items = [
    ...(page.experiences || []).map((item) => ({
      title: item.title,
      text: item.description,
      image: item.image,
    })),
    ...Object.values(page.style_items || {})
      .flat()
      .map((item) => ({ title: item.title, text: item.description, image: item.image })),
  ];

  return items.filter((item) => item.title || item.text || item.image).slice(0, 8);
}

function snapshotRows(page: CmsPage) {
  const rows = [
    ["Page type", page.page_type === "style" ? "Travel style" : page.page_type === "hub" ? "Destination" : "Page"],
    ["Best for", strip(page.audience_text || page.style_sections?.audience?.body || page.excerpt).slice(0, 130)],
    ["Experience", strip(page.experiences_text || page.style_sections?.special?.body || page.hero_subtitle).slice(0, 130)],
    ["Planning note", strip(page.itinerary_text || page.style_sections?.season?.body || page.meta_description).slice(0, 130)],
  ].filter(([, value]) => value);

  return rows;
}

function MiniArticle({ post }: { post: NonNullable<CmsPage["posts"]>[number] }) {
  return (
    <Link href={post.url || `/blog/${post.slug}`} className="group grid grid-cols-[88px_1fr] gap-3 rounded-2xl bg-[#fffaf2] p-3 transition hover:bg-white hover:shadow-[0_12px_34px_rgba(58,37,22,.08)]">
      <SafeImage src={post.image} alt={post.title} fallbackLabel="Guide" className="h-20 overflow-hidden rounded-xl" imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="min-w-0">
        <h3 className="clamp-2 text-sm font-extrabold leading-5 text-[#2b1b11] group-hover:text-[#8b541f]">{post.title}</h3>
        <p className="mt-1 clamp-2 text-xs leading-5 text-[#75675d]">{post.excerpt || post.category}</p>
      </div>
    </Link>
  );
}

function MiniTour({ tour }: { tour: NonNullable<CmsPage["services"]>[number] }) {
  return (
    <Link href={tour.url || `/tour/${tour.slug}`} className="group grid grid-cols-[88px_1fr] gap-3 rounded-2xl bg-[#fffaf2] p-3 transition hover:bg-white hover:shadow-[0_12px_34px_rgba(58,37,22,.08)]">
      <SafeImage src={tour.image} alt={tour.title} fallbackLabel="Tour" className="h-20 overflow-hidden rounded-xl" imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="min-w-0">
        <h3 className="clamp-2 text-sm font-extrabold leading-5 text-[#2b1b11] group-hover:text-[#8b541f]">{tour.title}</h3>
        <p className="mt-1 text-xs font-semibold text-[#75675d]">{tour.duration || tour.location || "Private journey"}</p>
      </div>
    </Link>
  );
}

export function DynamicLandingPage({ page, backHref, backLabel }: { page: CmsPage; backHref: string; backLabel: string }) {
  const items = sectionItems(page);
  const rows = snapshotRows(page);
  const landmarks = (page.landmarks || []).filter((item) => item.title || item.description || item.image);
  const tours = page.services || [];
  const posts = page.posts || [];
  const faqs = page.faqs || [];
  const ctaTitle = page.cta_title || `Plan your ${page.title} journey with DesertBrise`;
  const ctaText = page.cta_text || "Tell us your dates, travel rhythm and interests. We will shape a private Morocco itinerary around you.";

  return (
    <>
      <section className="relative isolate min-h-[92vh] overflow-hidden bg-[#1d130c] px-5 pb-28 pt-36 text-white sm:px-8 lg:px-10">
        <SafeImage src={page.hero_image || page.image} alt={page.title} fallbackLabel={page.page_type} className="absolute inset-0 -z-20 h-full w-full" imgClassName="h-full w-full object-cover opacity-75" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,rgba(215,154,68,.34),transparent_26%),linear-gradient(90deg,rgba(18,10,6,.96),rgba(18,10,6,.76),rgba(18,10,6,.22))]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-52 bg-gradient-to-t from-[#fffaf2] to-transparent" />

        <div className="mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <Link href={backHref} className="text-sm font-bold text-[#efbd73]">← {backLabel}</Link>
            <p className="premium-eyebrow mt-10 text-[#efbd73]">{page.hero_subtitle || (page.page_type === "style" ? "Private travel style" : "Morocco destination")}</p>
            <h1 className="display-font mt-5 max-w-5xl text-6xl font-semibold leading-[.9] tracking-[-.055em] md:text-8xl">{page.title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-9 text-white/84">{page.excerpt || page.meta_description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={page.cta_button_url || "/contact"} className="premium-btn bg-[#d79a44] text-[#1d130c] shadow-[0_22px_54px_rgba(215,154,68,.32)] hover:bg-[#efbd73]">
                {page.cta_button_text || "Start Planning"} →
              </Link>
              {tours.length ? (
                <a href="#matching-tours" className="premium-btn border border-white/22 bg-white/10 text-white backdrop-blur-md hover:bg-white/16">See Matching Tours</a>
              ) : null}
            </div>
          </div>

          <div className="rounded-[2.4rem] border border-white/16 bg-white/12 p-6 shadow-2xl backdrop-blur-xl">
            <p className="premium-eyebrow text-[#efbd73]">Editable page snapshot</p>
            <div className="mt-6 space-y-5">
              {rows.map(([label, value]) => (
                <div key={label} className="border-b border-white/12 pb-5 last:border-0 last:pb-0">
                  <div className="text-xs font-black uppercase tracking-[.22em] text-white/48">{label}</div>
                  <div className="mt-2 text-sm leading-7 text-white/82">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="space-y-14">
            <div className="grid gap-10 lg:grid-cols-[.88fr_1.12fr] lg:items-center">
              <SafeImage src={page.intro_image || page.secondary_image || page.hero_image} alt={`${page.title} intro`} fallbackLabel={page.title} className="h-[520px] overflow-hidden rounded-[2.2rem] border border-[#eadbc8] shadow-[0_24px_80px_rgba(58,37,22,.13)]" imgClassName="h-full w-full object-cover" />
              <div>
                <p className="premium-eyebrow">{page.why_visit_title || "Why this page matters"}</p>
                <h2 className="display-font mt-4 text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
                  {page.surprise_title || page.title}
                </h2>
                {page.content || page.why_visit_text ? (
                  <div className="prose prose-lg mt-6 max-w-none text-[#5f5046]" dangerouslySetInnerHTML={html(page.why_visit_text || page.content)} />
                ) : (
                  <p className="mt-6 text-lg leading-9 text-[#75675d]">{page.excerpt}</p>
                )}
              </div>
            </div>

            {items.length ? (
              <section>
                <p className="premium-eyebrow">{page.experiences_title || "Signature experiences"}</p>
                <h2 className="display-font mt-4 max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">What travelers feel here.</h2>
                <div className="mt-10 grid gap-5 md:grid-cols-2">
                  {items.map((item, index) => (
                    <div key={`${item.title}-${index}`} className="overflow-hidden rounded-[1.8rem] border border-[#eadbc8] bg-white shadow-[0_16px_50px_rgba(58,37,22,.07)]">
                      {item.image ? <SafeImage src={item.image} alt={item.title || page.title} className="h-56" imgClassName="h-full w-full object-cover" /> : null}
                      <div className="p-6">
                        <h3 className="display-font text-3xl font-semibold tracking-[-.035em] text-[#2b1b11]">{item.title || `Experience ${index + 1}`}</h3>
                        <p className="mt-3 text-sm leading-7 text-[#75675d]">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {landmarks.length ? (
              <section>
                <p className="premium-eyebrow">{page.landmarks_title || "Places and moments"}</p>
                <div className="mt-8 grid gap-5 md:grid-cols-3">
                  {landmarks.slice(0, 6).map((item, index) => (
                    <div key={`${item.title}-${index}`} className="rounded-[1.6rem] border border-[#eadbc8] bg-white p-5 shadow-[0_14px_44px_rgba(58,37,22,.06)]">
                      {item.image ? <SafeImage src={item.image} alt={item.title} className="mb-5 h-40 overflow-hidden rounded-[1.2rem]" imgClassName="h-full w-full object-cover" /> : null}
                      <h3 className="text-lg font-extrabold text-[#2b1b11]">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#75675d]">{item.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {tours.length ? (
              <section id="matching-tours">
                <p className="premium-eyebrow">{page.tours_title || "Matching private tours"}</p>
                <h2 className="display-font mt-4 text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">Journeys connected to this page.</h2>
                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                  {tours.slice(0, 4).map((tour) => <TourCard key={tour.id} tour={tour} />)}
                </div>
              </section>
            ) : null}

            {faqs.length ? (
              <section>
                <p className="premium-eyebrow">{page.faq_title || "Questions"}</p>
                <h2 className="display-font mt-4 text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">Helpful answers before planning.</h2>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {faqs.map((faq, index) => (
                    <details key={`${faq.question}-${index}`} className="rounded-[1.5rem] border border-[#eadbc8] bg-white p-6 shadow-[0_12px_34px_rgba(58,37,22,.05)]">
                      <summary className="cursor-pointer text-base font-extrabold text-[#2b1b11]">{faq.question}</summary>
                      <div className="mt-4 text-sm leading-7 text-[#75675d]" dangerouslySetInnerHTML={html(faq.answer)} />
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-[2rem] border border-[#eadbc8] bg-white p-6 shadow-[0_20px_70px_rgba(58,37,22,.10)]">
              <p className="premium-eyebrow">Plan this experience</p>
              <h2 className="display-font mt-3 text-4xl font-semibold leading-none tracking-[-.04em] text-[#2b1b11]">{ctaTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-[#75675d]">{ctaText}</p>
              <Link href={page.cta_button_url || "/contact"} className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#2b1b11] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#8b541f]">
                {page.cta_button_text || "Ask for a custom plan"}
              </Link>
            </div>

            {tours.length ? (
              <div className="rounded-[2rem] border border-[#eadbc8] bg-white p-6 shadow-[0_20px_70px_rgba(58,37,22,.10)]">
                <p className="premium-eyebrow">Featured tours</p>
                <div className="mt-5 space-y-3">{tours.slice(0, 3).map((tour) => <MiniTour key={tour.id} tour={tour} />)}</div>
              </div>
            ) : null}

            {posts.length ? (
              <div className="rounded-[2rem] border border-[#eadbc8] bg-white p-6 shadow-[0_20px_70px_rgba(58,37,22,.10)]">
                <p className="premium-eyebrow">Related guides</p>
                <div className="mt-5 space-y-3">{posts.slice(0, 3).map((post) => <MiniArticle key={post.id} post={post} />)}</div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      {posts.length ? (
        <section className="bg-[#f6ecdd] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="premium-eyebrow">{page.guides_title || "Continue reading"}</p>
            <h2 className="display-font mt-4 text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">Guides connected to this experience.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">{posts.slice(0, 3).map((post) => <BlogCard key={post.id} post={post} />)}</div>
          </div>
        </section>
      ) : null}

      <CTA eyebrow="Private Morocco planning" title={ctaTitle} text={ctaText} />
    </>
  );
}
