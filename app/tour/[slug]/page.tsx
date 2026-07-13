import Link from "next/link";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { getService } from "@/lib/api";
import { money, plainText } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

type DetailItem = {
  label: string;
  value: string;
};

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
  const gallery = service.images?.slice(0, 4) || [];
  const highlights = [service.highlight_1, service.highlight_2, service.highlight_3].filter(Boolean);
  const details: DetailItem[] = [
    { label: "Duration", value: service.duration },
    { label: "Location", value: service.location },
    { label: "Style", value: service.journey_style },
    { label: "Price", value: money(service.price) },
  ].filter((item) => Boolean(item.value));

  return (
    <>
      <section className="relative isolate min-h-[78vh] overflow-hidden bg-[#1d130c] px-5 py-24 text-white sm:px-8 lg:px-10">
        {hero ? <img src={hero} alt={service.title} className="absolute inset-0 -z-20 h-full w-full object-cover opacity-55" /> : null}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1d130c] via-[#1d130c]/82 to-[#1d130c]/25" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#fffaf2] to-transparent" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="premium-eyebrow text-[#efbd73]">Private Morocco journey</p>
            <h1 className="display-font mt-5 max-w-5xl text-6xl font-semibold leading-[.92] tracking-[-.055em] md:text-8xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/84">
              {service.hero_intro || service.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {details.map((detail) => (
                <span key={detail.label} className="rounded-full border border-white/16 bg-white/12 px-4 py-2 text-sm font-bold text-white/92 backdrop-blur">
                  {detail.label}: {detail.value}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contact" className="premium-btn bg-[#d79a44] text-[#1d130c] shadow-[0_20px_54px_rgba(215,154,68,.3)] hover:bg-[#efbd73]">
                Plan this journey <span>→</span>
              </Link>
              <Link href="/tours" className="premium-btn border border-white/22 bg-white/8 text-white backdrop-blur hover:bg-white/14">
                Explore all tours
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/14 bg-white/12 p-5 shadow-2xl backdrop-blur-md">
            <p className="text-sm font-bold uppercase tracking-[.22em] text-[#efbd73]">Best for</p>
            <p className="mt-3 text-lg leading-8 text-white/88">{service.best_for || "Travelers who want comfort, authenticity, and a private Morocco experience."}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 pb-24 pt-8 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_380px]">
          <main>
            {highlights.length ? (
              <div className="grid gap-5 md:grid-cols-3">
                {highlights.map((highlight, index) => (
                  <div key={highlight} className="premium-card rounded-[1.6rem] p-6">
                    <span className="display-font text-4xl font-semibold text-[#d79a44]">0{index + 1}</span>
                    <p className="mt-4 text-sm font-bold leading-6 text-[#2b1b11]">{highlight}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {gallery.length ? (
              <div className="mt-12 grid gap-5 md:grid-cols-4">
                {gallery.map((image, index) => (
                  <div key={`${image.id}-${image.image}`} className={`${index === 0 ? "md:col-span-2 md:row-span-2 md:h-[34rem]" : "h-64"} overflow-hidden rounded-[1.8rem] border border-[#eadbc8] bg-[#dac9b7] shadow-[0_18px_54px_rgba(58,37,22,.08)]`}>
                    <img src={image.image} alt={image.alt || service.title} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            ) : null}

            <article className="premium-card mt-12 rounded-[2.2rem] p-6 md:p-10">
              <p className="premium-eyebrow">Journey overview</p>
              <div className="prose-travel mt-6 max-w-none" dangerouslySetInnerHTML={{ __html: service.content || service.excerpt || "" }} />
            </article>

            {service.itinerary?.length ? (
              <section className="mt-12">
                <p className="premium-eyebrow">Day by day</p>
                <h2 className="display-font mt-3 text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">
                  A journey that unfolds naturally.
                </h2>
                <div className="mt-8 grid gap-5">
                  {service.itinerary.map((day, index) => (
                    <div key={`${day.day_number}-${day.title}-${index}`} className="premium-card rounded-[1.8rem] p-6 md:p-8">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
                        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#2b1b11] text-sm font-black text-white">
                          Day {day.day_number || index + 1}
                        </div>
                        <div>
                          <h3 className="display-font text-3xl font-semibold leading-tight tracking-[-.03em] text-[#2b1b11]">{day.title}</h3>
                          <div className="prose-travel mt-4 max-w-none" dangerouslySetInnerHTML={{ __html: day.details || "" }} />
                          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-[#75675d]">
                            {day.location ? <span className="rounded-full bg-[#f9f2e7] px-3 py-1.5">{day.location}</span> : null}
                            {day.meals ? <span className="rounded-full bg-[#f9f2e7] px-3 py-1.5">Meals: {plainText(day.meals)}</span> : null}
                            {day.accommodation ? <span className="rounded-full bg-[#f9f2e7] px-3 py-1.5">Stay: {plainText(day.accommodation)}</span> : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {service.faqs?.length ? (
              <section className="mt-12">
                <p className="premium-eyebrow">Good to know</p>
                <h2 className="display-font mt-3 text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">
                  Questions before booking.
                </h2>
                <div className="mt-8 grid gap-4">
                  {service.faqs.map((faq) => (
                    <details key={faq.question} className="premium-card rounded-[1.4rem] p-6 open:bg-white">
                      <summary className="cursor-pointer text-base font-extrabold text-[#2b1b11]">{faq.question}</summary>
                      <p className="mt-4 text-sm leading-7 text-[#75675d]">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </main>

          <aside className="h-fit rounded-[2rem] border border-[#eadbc8] bg-[#2b1b11] p-6 text-white shadow-[0_28px_80px_rgba(58,37,22,.2)] lg:sticky lg:top-24">
            <p className="premium-eyebrow text-[#efbd73]">Plan this trip</p>
            <h2 className="display-font mt-4 text-4xl font-semibold leading-[1] tracking-[-.04em]">Request a private quote</h2>
            <p className="mt-4 text-sm leading-7 text-white/72">
              Send us your dates, comfort level, number of travelers, and dream feeling. We will shape a route that fits you.
            </p>
            <Link href="/contact" className="premium-btn mt-6 w-full bg-[#d79a44] text-[#1d130c] hover:bg-[#efbd73]">
              Start planning <span>→</span>
            </Link>
            <div className="mt-6 grid gap-4 border-t border-white/10 pt-6 text-sm leading-6 text-white/72">
              {service.stay_info ? <p><strong className="text-white">Stay:</strong> {service.stay_info}</p> : null}
              {service.transport_info ? <p><strong className="text-white">Transport:</strong> {service.transport_info}</p> : null}
              {service.departure_type ? <p><strong className="text-white">Departure:</strong> {service.departure_type}</p> : null}
              <p><strong className="text-white">Booking style:</strong> Private and tailor-made.</p>
            </div>
          </aside>
        </div>
      </section>

      <CTA
        eyebrow="This journey can be yours"
        title="Let us make it personal, smooth, and unforgettable."
        text="We will adapt the route, accommodation, pace, and experiences around the way you want to feel in Morocco."
      />
    </>
  );
}
