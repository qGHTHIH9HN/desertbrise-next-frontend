import Image from "next/image";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { getService } from "@/lib/api";
import { money } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const { service } = await getService(slug);
    return {
      title: service.meta_title || `${service.title} | DesertBrise Travel`,
      description: service.meta_description || service.excerpt,
    };
  } catch {
    return {};
  }
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;
  let data;
  try {
    data = await getService(slug);
  } catch {
    notFound();
  }
  const service = data.service;
  const hero = service.images?.[0]?.image || service.image;
  const highlights = [service.highlight_1, service.highlight_2, service.highlight_3].filter(Boolean);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-stone-950 px-5 py-24 text-white lg:px-8">
        {hero ? <Image src={hero} alt={service.title} fill priority className="-z-20 object-cover" sizes="100vw" /> : null}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-stone-950/90 via-stone-950/65 to-stone-950/20" />
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-amber-300">{service.location || "Morocco"}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">{service.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-100">{service.hero_intro || service.excerpt}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[service.duration, service.availability_text, money(service.price)].filter(Boolean).map((item) => (
              <span key={item} className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_360px]">
          <article className="rounded-[2rem] bg-white p-6 shadow-sm md:p-10">
            {highlights.length ? (
              <div className="mb-10 grid gap-4 md:grid-cols-3">
                {highlights.map((h) => <div key={h} className="rounded-2xl bg-[#f8f1e7] p-5 text-sm font-semibold leading-6 text-stone-800">{h}</div>)}
              </div>
            ) : null}

            <div className="prose-travel max-w-none" dangerouslySetInnerHTML={{ __html: service.content || service.excerpt }} />

            {service.itinerary?.length ? (
              <div className="mt-12">
                <h2 className="text-3xl font-bold text-stone-950">Day by day itinerary</h2>
                <div className="mt-6 grid gap-4">
                  {service.itinerary.map((day, idx) => (
                    <div key={`${day.day_number}-${day.title}-${idx}`} className="rounded-2xl border border-stone-200 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">Day {day.day_number || idx + 1}</p>
                      <h3 className="mt-2 text-xl font-bold text-stone-950">{day.title}</h3>
                      <div className="mt-3 text-sm leading-7 text-stone-600" dangerouslySetInnerHTML={{ __html: day.details }} />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {service.faqs?.length ? (
              <div className="mt-12">
                <h2 className="text-3xl font-bold text-stone-950">Questions before booking</h2>
                <div className="mt-6 grid gap-4">
                  {service.faqs.map((faq) => (
                    <details key={faq.question} className="rounded-2xl border border-stone-200 bg-white p-5">
                      <summary className="cursor-pointer font-bold text-stone-950">{faq.question}</summary>
                      <p className="mt-3 text-sm leading-7 text-stone-600">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            ) : null}
          </article>

          <aside className="h-fit rounded-[2rem] bg-stone-950 p-6 text-white shadow-xl lg:sticky lg:top-24">
            <p className="text-sm uppercase tracking-[0.22em] text-amber-300">Plan this journey</p>
            <h2 className="mt-3 text-2xl font-bold">Request a private quote</h2>
            <p className="mt-4 text-sm leading-7 text-stone-300">Share your dates, number of travelers, and style. We will shape the best route for you.</p>
            <a href="/contact" className="mt-6 inline-flex w-full justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-stone-950 transition hover:bg-amber-100">Send request</a>
            <div className="mt-6 grid gap-3 border-t border-white/10 pt-6 text-sm text-stone-300">
              {service.stay_info ? <p><strong className="text-white">Stay:</strong> {service.stay_info}</p> : null}
              {service.transport_info ? <p><strong className="text-white">Transport:</strong> {service.transport_info}</p> : null}
              {service.best_for ? <p><strong className="text-white">Best for:</strong> {service.best_for}</p> : null}
            </div>
          </aside>
        </div>
      </section>
      <CTA />
    </>
  );
}
