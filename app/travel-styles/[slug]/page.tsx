import Link from "next/link";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { TourCard } from "@/components/TourCard";
import { getServices } from "@/lib/api";
import { findTravelStyle, travelStyles } from "@/lib/travel-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return travelStyles.map((style) => ({ slug: style.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const style = findTravelStyle(slug);
  if (!style) return {};
  return {
    title: `${style.name} Morocco Tours | DesertBrise Travel`,
    description: style.description,
  };
}

export default async function TravelStyleDetailPage({ params }: Props) {
  const { slug } = await params;
  const style = findTravelStyle(slug);
  if (!style) notFound();

  const related = await getServices({ q: style.query, per_page: 9 }).catch(() => null);
  const fallback = related?.items?.length ? null : await getServices({ per_page: 6 }).catch(() => null);
  const tours = related?.items?.length ? related.items : fallback?.items || [];

  return (
    <>
      <section className="relative isolate min-h-[92vh] overflow-hidden bg-[#1d130c] px-5 pb-28 pt-36 text-white sm:px-8 lg:px-10">
        <img src={style.image} alt={style.name} className="absolute inset-0 -z-20 h-full w-full object-cover opacity-76" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_18%,rgba(215,154,68,.35),transparent_25%),linear-gradient(90deg,rgba(18,10,6,.96),rgba(18,10,6,.76),rgba(18,10,6,.22))]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-[#fffaf2] to-transparent" />

        <div className="mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <Link href="/travel-styles" className="text-sm font-bold text-[#efbd73]">← All travel styles</Link>
            <p className="premium-eyebrow mt-10 text-[#efbd73]">{style.eyebrow}</p>
            <h1 className="display-font mt-5 max-w-5xl text-6xl font-semibold leading-[.9] tracking-[-.055em] md:text-8xl">
              {style.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-9 text-white/84">{style.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="premium-btn bg-[#d79a44] text-[#1d130c] shadow-[0_22px_54px_rgba(215,154,68,.32)] hover:bg-[#efbd73]">
                Plan This Style →
              </Link>
              <a href="#matching-tours" className="premium-btn border border-white/22 bg-white/10 text-white backdrop-blur-md hover:bg-white/16">
                Matching Tours
              </a>
            </div>
          </div>

          <div className="rounded-[2.4rem] border border-white/16 bg-white/12 p-6 shadow-2xl backdrop-blur-xl">
            <p className="premium-eyebrow text-[#efbd73]">Style snapshot</p>
            <div className="mt-6 space-y-5">
              {[
                ["Feeling", style.feeling],
                ["Pace", style.pace],
                ["Comfort", style.comfortLevel],
                ["Ideal duration", style.idealDuration],
              ].map(([label, value]) => (
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
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="premium-eyebrow">Who this is for</p>
            <h2 className="display-font mt-4 max-w-3xl text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
              {style.subtitle}
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-[#75675d]">{style.bestFor}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {style.highlights.map((item) => (
                <span key={item} className="rounded-full border border-[#eadbc8] bg-white px-4 py-2 text-sm font-extrabold text-[#7a4a1f] shadow-sm">{item}</span>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2.4rem] border border-[#eadbc8] shadow-[0_28px_90px_rgba(58,37,22,.16)]">
            <img src={style.secondaryImage} alt={`${style.name} private Morocco travel`} className="h-[560px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d130c]/62 via-transparent to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 rounded-[1.6rem] bg-[#1d130c]/72 p-6 text-white backdrop-blur-md">
              <p className="premium-eyebrow text-[#f2c373]">The feeling</p>
              <p className="display-font mt-2 text-3xl leading-tight">{style.feeling}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f9f2e7] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
            <div>
              <p className="premium-eyebrow">Journey flow</p>
              <h2 className="display-font mt-3 text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">
                How this travel style unfolds.
              </h2>
            </div>
            <p className="text-lg leading-9 text-[#75675d]">
              These moments help travelers imagine themselves in the trip before they ever contact you. That is what turns a page into a conversion page.
            </p>
          </div>

          <div className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {style.moments.map((item, index) => (
              <div key={item.title} className="premium-card rounded-[2rem] p-7">
                <div className="display-font text-5xl font-semibold leading-none text-[#d79a44]">0{index + 1}</div>
                <h3 className="mt-5 text-xl font-extrabold tracking-[-.03em] text-[#2b1b11]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#75675d]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <div className="rounded-[2.2rem] bg-[#2b1b11] p-8 text-white shadow-[0_28px_90px_rgba(58,37,22,.18)]">
            <p className="premium-eyebrow text-[#f2c373]">What we shape</p>
            <h2 className="display-font mt-4 text-5xl font-semibold leading-[1] tracking-[-.04em]">The details that make this style work.</h2>
            <p className="mt-5 text-sm leading-7 text-white/72">Travel style is not decoration. It controls pace, accommodation, route distance, guiding, privacy and emotional comfort.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {style.includedFeeling.map((item) => (
              <div key={item.label} className="rounded-[1.5rem] border border-[#eadbc8] bg-white p-6 shadow-[0_12px_36px_rgba(58,37,22,.06)]">
                <div className="text-xs font-black uppercase tracking-[.24em] text-[#9a5d24]">{item.label}</div>
                <p className="mt-2 text-sm leading-7 text-[#75675d]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="matching-tours" className="bg-[#f9f2e7] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="premium-eyebrow">Matching journeys</p>
              <h2 className="display-font mt-3 max-w-3xl text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">
                Tours for {style.name.toLowerCase()}.
              </h2>
            </div>
            <Link href="/tours" className="text-sm font-extrabold text-[#8b541f]">View all tours →</Link>
          </div>
          {tours.length ? (
            <div className="grid gap-6 md:grid-cols-3">
              {tours.slice(0, 6).map((tour) => <TourCard key={tour.id} tour={tour} />)}
            </div>
          ) : (
            <div className="premium-card rounded-[2rem] p-8 text-[#75675d]">No matching tours found yet.</div>
          )}
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="premium-eyebrow">Questions travelers ask</p>
          <h2 className="display-font mt-3 text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">
            Before choosing {style.name.toLowerCase()}.
          </h2>
          <div className="mt-10 grid gap-4">
            {style.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-[1.5rem] border border-[#eadbc8] bg-white p-6 shadow-[0_12px_36px_rgba(58,37,22,.06)]">
                <summary className="cursor-pointer list-none text-lg font-extrabold tracking-[-.03em] text-[#2b1b11]">
                  {faq.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-[#75675d]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTA eyebrow="Build this style around you" title={`Want a ${style.name.toLowerCase()} Morocco journey?`} text="Tell us your travel dates, group size and comfort level. We will shape the route, stays and experiences around the exact feeling you want." />
    </>
  );
}
