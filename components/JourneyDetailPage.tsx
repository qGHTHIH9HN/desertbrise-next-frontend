import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingPanel } from "@/components/BookingPanel";
import { BlogCard } from "@/components/BlogCard";
import { CTA } from "@/components/CTA";
import { TourCard } from "@/components/TourCard";
import { getBlog, getService, getServices } from "@/lib/api";
import { dateLabel, money, plainText, stars } from "@/lib/format";
import type { BlogCard as BlogCardType, ServiceCard, ServiceDetail, ServiceInclude } from "@/lib/types";

function clean(value?: string | number | null) {
  return String(value || "").trim();
}

function uniqueTexts(values: Array<string | undefined | null>) {
  return Array.from(new Set(values.map((v) => clean(v)).filter(Boolean)));
}

function buildIncludeFallback(service: ServiceDetail): ServiceInclude[] {
  const items: ServiceInclude[] = [];
  const dayIncluded = uniqueTexts((service.itinerary || []).map((day) => day.included));
  const meals = uniqueTexts((service.itinerary || []).map((day) => day.meals));
  const stays = uniqueTexts([(service.stay_info || ""), ...(service.itinerary || []).map((day) => day.accommodation)]);

  if (dayIncluded.length) {
    items.push({ title: "Included experiences by day", details: dayIncluded.join("\n") });
  }
  if (meals.length) {
    items.push({ title: "Meals mentioned in the itinerary", details: meals.join("\n") });
  }
  if (stays.length) {
    items.push({ title: "Accommodation / stay notes", details: stays.join("\n") });
  }
  if (service.transport_info) {
    items.push({ title: "Transport", details: service.transport_info });
  }

  return items;
}

function InfoChip({ label, value }: { label: string; value?: string | number | null }) {
  if (!clean(value)) return null;
  return (
    <span className="rounded-full border border-white/16 bg-white/12 px-4 py-2 text-sm font-bold text-white/92 backdrop-blur">
      {label}
    </span>
  );
}

export async function JourneyDetail({ slug }: { slug: string }) {
  let data;
  try {
    data = await getService(slug);
  } catch {
    notFound();
  }

  const service = data.service;
  const hero = service.images?.[0]?.image || service.image;
  const gallery = service.images?.slice(0, 6) || [];
  const highlights = [service.highlight_1, service.highlight_2, service.highlight_3, ...(service.highlights || [])]
    .filter(Boolean)
    .slice(0, 6);

  const summary = [
    ["Destination", service.location],
    ["Duration", service.duration],
    ["Price", money(service.price)],
    ["Availability", service.availability_text],
    ["Style", service.journey_style],
    ["Best for", service.best_for],
  ].filter(([, value]) => Boolean(value));

  const [blogData, toursFallback] = await Promise.all([
    getBlog({ per_page: 6 }).catch(() => null),
    getServices({ per_page: 8 }).catch(() => null),
  ]);

  const includeItems = (service.includes || []).filter((item) => clean(item.title));
  const finalIncludes = includeItems.length ? includeItems : buildIncludeFallback(service);

  const relatedTours: ServiceCard[] = (service.related_services?.length ? service.related_services : toursFallback?.items || [])
    .filter((tour) => tour.id !== service.id)
    .slice(0, 3);

  const relatedArticles: BlogCardType[] = (service.related_posts?.length ? service.related_posts : blogData?.items || []).slice(0, 3);

  return (
    <>
      <section className="relative isolate min-h-[82vh] overflow-hidden bg-[#1d130c] px-5 py-24 text-white sm:px-8 lg:px-10">
        {hero ? <img src={hero} alt={service.title} className="absolute inset-0 -z-20 h-full w-full object-cover opacity-58" /> : null}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#160e09] via-[#1d130c]/88 to-[#1d130c]/22" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-52 bg-gradient-to-t from-[#fffaf2] to-transparent" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <Link href="/tours" className="text-sm font-bold text-[#efbd73]">← Back to tours</Link>
            <p className="premium-eyebrow mt-10 text-[#efbd73]">Private Morocco journey</p>
            <h1 className="display-font mt-5 max-w-5xl text-6xl font-semibold leading-[.92] tracking-[-.055em] md:text-8xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/84">{service.hero_intro || service.excerpt}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <InfoChip label="Private planning" value="yes" />
              <InfoChip label="Local expertise" value="yes" />
              <InfoChip label="Tailor-made pace" value="yes" />
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#booking" className="premium-btn bg-[#d79a44] text-[#1d130c] shadow-[0_20px_54px_rgba(215,154,68,.3)] hover:bg-[#efbd73]">
                Request availability <span>→</span>
              </a>
              <a href="#itinerary" className="premium-btn border border-white/22 bg-white/8 text-white backdrop-blur hover:bg-white/14">
                View itinerary
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/14 bg-white/12 p-6 shadow-2xl backdrop-blur-md">
            <p className="premium-eyebrow text-[#efbd73]">Journey summary</p>
            <div className="mt-5 grid gap-4 text-sm leading-6 text-white/78">
              {summary.map(([label, value]) => (
                <div key={label} className="flex gap-3 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                  <strong className="min-w-24 text-white">{label}</strong>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 pb-24 pt-8 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_390px]">
          <main>
            {highlights.length ? (
              <div className="grid gap-5 md:grid-cols-3">
                {highlights.slice(0, 3).map((highlight, index) => (
                  <div key={`${highlight}-${index}`} className="premium-card rounded-[1.6rem] p-6">
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

            <section id="itinerary" className="mt-12 scroll-mt-24">
              <p className="premium-eyebrow">Day by day</p>
              <h2 className="display-font mt-3 text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">Itinerary with real images and details.</h2>
              {service.itinerary?.length ? (
                <div className="mt-8 grid gap-7">
                  {service.itinerary.map((day, index) => {
                    const dayImage = day.image || gallery[index % Math.max(gallery.length, 1)]?.image || "";
                    return (
                      <article key={`${day.day_number}-${day.title}-${index}`} className="premium-card overflow-hidden rounded-[1.8rem] p-5 md:p-8">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div>
                            <span className="inline-flex rounded-full bg-[#2b1b11] px-4 py-2 text-xs font-black text-white shadow-lg">Day {day.day_number || index + 1}</span>
                            <h3 className="display-font mt-4 text-3xl font-semibold leading-tight tracking-[-.03em] text-[#2b1b11] md:text-4xl">{day.title}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2 text-xs font-bold text-[#75675d] md:max-w-sm md:justify-end">
                            {day.location ? <span className="rounded-full bg-[#f9f2e7] px-3 py-1.5">{day.location}</span> : null}
                            {day.meals ? <span className="rounded-full bg-[#f9f2e7] px-3 py-1.5">Meals: {plainText(day.meals)}</span> : null}
                            {day.included ? <span className="rounded-full bg-[#f9f2e7] px-3 py-1.5">Included: {plainText(day.included)}</span> : null}
                            {day.accommodation ? <span className="rounded-full bg-[#f9f2e7] px-3 py-1.5">Stay: {plainText(day.accommodation)}</span> : null}
                          </div>
                        </div>
                        <div className="prose-travel mt-5 max-w-none" dangerouslySetInnerHTML={{ __html: day.details || "" }} />
                        {dayImage ? (
                          <div className="mt-6 overflow-hidden rounded-[1.4rem] border border-[#eadbc8] bg-[#dac9b7] shadow-[0_18px_45px_rgba(58,37,22,.10)]">
                            <img src={dayImage} alt={day.title || `Day ${day.day_number}`} className="max-h-[360px] min-h-[220px] w-full object-cover" />
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="premium-card mt-8 rounded-[1.8rem] p-8 text-[#75675d]">No itinerary added yet.</div>
              )}
            </section>

            {finalIncludes.length ? (
              <section className="mt-12">
                <p className="premium-eyebrow">What is included</p>
                <h2 className="display-font mt-3 text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">Everything important, clearly explained.</h2>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {finalIncludes.map((item, index) => (
                    <details key={`${item.title}-${index}`} className="group rounded-[1.4rem] border border-[#eadbc8] bg-white p-0 shadow-[0_18px_54px_rgba(58,37,22,.07)] open:bg-[#fffaf2]">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-extrabold text-[#2b1b11]">
                        <span className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#d79a44]/18 text-[#9a5d24]">✓</span>{item.title}</span>
                        <span className="text-2xl leading-none text-[#9a5d24] group-open:rotate-45">+</span>
                      </summary>
                      {item.details ? <p className="border-t border-[#eadbc8] px-6 pb-6 pt-4 whitespace-pre-line text-sm leading-7 text-[#75675d]">{item.details}</p> : null}
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            {service.reviews?.length ? (
              <section className="mt-12">
                <p className="premium-eyebrow">Guest reviews</p>
                <h2 className="display-font mt-3 text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">Trusted by travelers.</h2>
                <div className="mt-8 rounded-[2rem] bg-[#2b1b11] p-6 text-white md:p-8">
                  <div className="flex flex-wrap items-end gap-4 border-b border-white/10 pb-6">
                    <div className="display-font text-6xl font-semibold">{service.review_summary?.average || 5}</div>
                    <div>
                      <div className="text-[#efbd73]">{stars(service.review_summary?.average || 5)}</div>
                      <p className="text-sm text-white/62">{service.review_summary?.total || service.reviews.length} reviews</p>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {service.reviews.slice(0, 6).map((review, index) => (
                      <article key={`${review.name}-${index}`} className="rounded-[1.5rem] bg-white/8 p-5">
                        <div className="flex items-center justify-between gap-4">
                          <strong>{review.name}</strong>
                          <span className="text-[#efbd73]">{stars(review.rating)}</span>
                        </div>
                        {review.title ? <h3 className="mt-3 font-bold">{review.title}</h3> : null}
                        <p className="mt-3 text-sm leading-7 text-white/74">{review.content}</p>
                        {review.operator_reply ? <p className="mt-4 rounded-xl bg-black/18 p-4 text-sm leading-7 text-white/70"><strong>DesertBrise reply:</strong> {review.operator_reply}</p> : null}
                        {review.created_at ? <p className="mt-3 text-xs text-white/40">{dateLabel(review.created_at)}</p> : null}
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            {service.faqs?.length ? (
              <section className="mt-12">
                <p className="premium-eyebrow">FAQ</p>
                <h2 className="display-font mt-3 text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">Questions before booking.</h2>
                <div className="mt-8 grid gap-4">
                  {service.faqs.filter((faq) => clean(faq.question) && clean(faq.answer)).map((faq) => (
                    <details key={faq.question} className="premium-card rounded-[1.4rem] p-6 open:bg-white">
                      <summary className="cursor-pointer text-base font-extrabold text-[#2b1b11]">{faq.question}</summary>
                      <p className="mt-4 text-sm leading-7 text-[#75675d]">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </main>

          <div id="booking" className="scroll-mt-24">
            <BookingPanel service={service} />
          </div>
        </div>
      </section>

      {relatedTours.length ? (
        <section className="bg-[#f9f2e7] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="premium-eyebrow">Continue exploring</p>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="display-font max-w-2xl text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">You may also like these journeys.</h2>
              <Link href="/tours" className="text-sm font-extrabold text-[#8b541f]">View all tours →</Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {relatedTours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
            </div>
          </div>
        </section>
      ) : null}

      {relatedArticles.length ? (
        <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="premium-eyebrow">Travel journal</p>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="display-font max-w-2xl text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">Helpful guides before you go.</h2>
              <Link href="/blog" className="text-sm font-extrabold text-[#8b541f]">Read more →</Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {relatedArticles.map((post) => <BlogCard key={post.id} post={post} />)}
            </div>
          </div>
        </section>
      ) : null}

      <CTA eyebrow="Ready when you are" title="Let us shape the route around your feeling, pace, and comfort." text="Send us your dates and travel dream. We will create a private itinerary that feels personal from the first reply." />
    </>
  );
}
