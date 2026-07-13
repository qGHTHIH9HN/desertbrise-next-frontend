import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingPanel } from "@/components/BookingPanel";
import { CTA } from "@/components/CTA";
import { TourCard } from "@/components/TourCard";
import { getBlog, getService, getServices } from "@/lib/api";
import { dateLabel, money, plainText, stars } from "@/lib/format";
import type { BlogCard as BlogCardType, ServiceCard, ServiceDetail, ServiceInclude } from "@/lib/types";

function clean(value?: string | number | null) {
  return String(value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function short(value?: string | null, max = 85) {
  const text = clean(value);
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max).trim()}…` : text;
}

function uniqueTexts(values: Array<string | undefined | null>) {
  return Array.from(new Set(values.map((v) => clean(v)).filter(Boolean)));
}

function buildIncludeFallback(service: ServiceDetail): ServiceInclude[] {
  const items: ServiceInclude[] = [];
  const dayIncluded = uniqueTexts((service.itinerary || []).map((day) => day.included));
  const meals = uniqueTexts((service.itinerary || []).map((day) => day.meals));
  const stays = uniqueTexts([(service.stay_info || ""), ...(service.itinerary || []).map((day) => day.accommodation)]);

  if (dayIncluded.length) items.push({ title: "Included experiences", details: dayIncluded.join("\n") });
  if (meals.length) items.push({ title: "Meals", details: meals.join("\n") });
  if (stays.length) items.push({ title: "Accommodation", details: stays.join("\n") });
  if (service.transport_info) items.push({ title: "Transport", details: service.transport_info });
  return items;
}

function InfoChip({ label }: { label: string }) {
  return <span className="rounded-full border border-white/16 bg-white/12 px-4 py-2 text-sm font-bold text-white/92 backdrop-blur">{label}</span>;
}

function RelatedTourMini({ tour }: { tour: ServiceCard }) {
  return (
    <Link href={tour.url || `/tour/${tour.slug}`} className="group grid grid-cols-[92px_1fr] gap-3 rounded-2xl bg-[#fffaf2] p-3 transition hover:bg-white">
      <div className="h-20 overflow-hidden rounded-xl bg-[#dac9b7]">
        {tour.image ? (
          <img src={tour.image} alt={tour.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="grid h-full w-full place-items-center bg-[#eadbc8] text-[10px] font-black uppercase tracking-[.18em] text-[#8b6b52]">DB</div>
        )}
      </div>
      <div>
        <h3 className="clamp-2 text-sm font-extrabold leading-5 text-[#2b1b11] group-hover:text-[#8b541f]">{tour.title}</h3>
        <p className="mt-1 text-xs font-semibold text-[#75675d]">{tour.duration || tour.location || "Private journey"}</p>
      </div>
    </Link>
  );
}

function RelatedArticleMini({ post }: { post: BlogCardType }) {
  return (
    <Link href={post.url || `/blog/${post.slug}`} className="group grid grid-cols-[92px_1fr] gap-3 rounded-2xl bg-[#fffaf2] p-3 transition hover:bg-white">
      <div className="h-20 overflow-hidden rounded-xl bg-[#dac9b7]">
        {post.image ? (
          <img src={post.image} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#eadbc8] to-[#fffaf2] text-center text-[10px] font-black uppercase tracking-[.18em] text-[#8b6b52]">Guide</div>
        )}
      </div>
      <div>
        <h3 className="clamp-2 text-sm font-extrabold leading-5 text-[#2b1b11] group-hover:text-[#8b541f]">{post.title}</h3>
        <p className="mt-1 clamp-2 text-xs leading-5 text-[#75675d]">{post.excerpt}</p>
      </div>
    </Link>
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
            <h1 className="display-font mt-5 max-w-5xl text-6xl font-semibold leading-[.92] tracking-[-.055em] md:text-8xl">{service.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/84">{service.hero_intro || service.excerpt}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <InfoChip label="Private planning" />
              <InfoChip label="Local expertise" />
              <InfoChip label="Tailor-made pace" />
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#booking" className="premium-btn bg-[#d79a44] text-[#1d130c] shadow-[0_20px_54px_rgba(215,154,68,.3)] hover:bg-[#efbd73]">Request availability <span>→</span></a>
              <a href="#itinerary" className="premium-btn border border-white/22 bg-white/8 text-white backdrop-blur hover:bg-white/14">View itinerary</a>
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
              <h2 className="display-font mt-3 text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">Itinerary with calm text and compact images.</h2>
              {service.itinerary?.length ? (
                <div className="mt-8 grid gap-7">
                  {service.itinerary.map((day, index) => {
                    const dayImage = day.image || gallery[index % Math.max(gallery.length, 1)]?.image || "";
                    return (
                      <article key={`${day.day_number}-${day.title}-${index}`} className="premium-card overflow-hidden rounded-[1.8rem] p-5 md:p-8">
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                          <div>
                            <span className="inline-flex rounded-full bg-[#2b1b11] px-4 py-2 text-xs font-black text-white shadow-lg">Day {day.day_number || index + 1}</span>
                            <h3 className="display-font mt-4 text-3xl font-semibold leading-tight tracking-[-.03em] text-[#2b1b11] md:text-4xl">{day.title}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2 text-xs font-bold text-[#75675d] md:max-w-xs md:justify-end">
                            {day.location ? <span className="rounded-full bg-[#f9f2e7] px-3 py-1.5">{day.location}</span> : null}
                            {day.meals ? <span className="rounded-full bg-[#f9f2e7] px-3 py-1.5">Meals: {short(day.meals, 42)}</span> : null}
                          </div>
                        </div>

                        <div className="prose-travel mt-5 max-w-none" dangerouslySetInnerHTML={{ __html: day.details || "" }} />

                        {(day.accommodation || day.included) ? (
                          <div className="mt-5 grid gap-3 md:grid-cols-2">
                            {day.accommodation ? <div className="rounded-2xl border border-[#eadbc8] bg-[#fffaf2] p-4 text-sm leading-6 text-[#75675d]"><strong className="block text-[#2b1b11]">Stay</strong>{short(day.accommodation, 140)}</div> : null}
                            {day.included ? <div className="rounded-2xl border border-[#eadbc8] bg-[#fffaf2] p-4 text-sm leading-6 text-[#75675d]"><strong className="block text-[#2b1b11]">Day notes</strong>{short(day.included, 160)}</div> : null}
                          </div>
                        ) : null}

                        {dayImage ? (
                          <div className="mt-6 overflow-hidden rounded-[1.4rem] border border-[#eadbc8] bg-[#dac9b7] shadow-[0_18px_45px_rgba(58,37,22,.10)]">
                            <img src={dayImage} alt={day.title || `Day ${day.day_number}`} className="h-56 w-full object-cover md:h-72" />
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              ) : <div className="premium-card mt-8 rounded-[1.8rem] p-8 text-[#75675d]">No itinerary added yet.</div>}
            </section>

            {finalIncludes.length ? (
              <section className="mt-12">
                <p className="premium-eyebrow">What is included</p>
                <h2 className="display-font mt-3 text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-6xl">Everything important, clearly explained.</h2>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {finalIncludes.map((item, index) => (
                    <article key={`${item.title}-${index}`} className="rounded-[1.4rem] border border-[#eadbc8] bg-white p-6 shadow-[0_18px_54px_rgba(58,37,22,.07)]">
                      <div className="flex gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#d79a44]/18 text-sm font-black text-[#9a5d24]">✓</span>
                        <div>
                          <h3 className="font-extrabold text-[#2b1b11]">{item.title}</h3>
                          {item.details ? <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#75675d]">{item.details}</p> : null}
                        </div>
                      </div>
                    </article>
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
                    <div><div className="text-[#efbd73]">{stars(service.review_summary?.average || 5)}</div><p className="text-sm text-white/62">{service.review_summary?.total || service.reviews.length} reviews</p></div>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {service.reviews.slice(0, 6).map((review, index) => (
                      <article key={`${review.name}-${index}`} className="rounded-[1.5rem] bg-white/8 p-5">
                        <div className="flex items-center justify-between gap-4"><strong>{review.name}</strong><span className="text-[#efbd73]">{stars(review.rating)}</span></div>
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

          <aside id="booking" className="h-fit scroll-mt-24 space-y-5 lg:sticky lg:top-24">
            <BookingPanel service={service} />

            {relatedTours.length ? (
              <div className="premium-card rounded-[1.6rem] p-6">
                <p className="premium-eyebrow">Featured tours</p>
                <div className="mt-5 grid gap-4">{relatedTours.map((tour) => <RelatedTourMini key={tour.id} tour={tour} />)}</div>
                <Link href="/tours" className="mt-5 inline-flex text-sm font-extrabold text-[#8b541f]">View all tours →</Link>
              </div>
            ) : null}

            {relatedArticles.length ? (
              <div className="premium-card rounded-[1.6rem] p-6">
                <p className="premium-eyebrow">Related articles</p>
                <div className="mt-5 grid gap-4">{relatedArticles.map((post) => <RelatedArticleMini key={post.id} post={post} />)}</div>
                <Link href="/blog" className="mt-5 inline-flex text-sm font-extrabold text-[#8b541f]">Read more guides →</Link>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      <CTA eyebrow="Ready when you are" title="Let us shape the route around your feeling, pace, and comfort." text="Send us your dates and travel dream. We will create a private itinerary that feels personal from the first reply." />
    </>
  );
}
