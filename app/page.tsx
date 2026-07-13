import Link from "next/link";
import type { ReactElement } from "react";
import { BlogCard } from "@/components/BlogCard";
import { CTA } from "@/components/CTA";
import { TourCard } from "@/components/TourCard";
import { getHome } from "@/lib/api";
import type { ServiceCard } from "@/lib/types";
import { money } from "@/lib/format";

function pickImage(services: ServiceCard[] = [], words: string[] = []) {
  const match = services.find((item) => {
    const text = `${item.title} ${item.excerpt} ${item.location} ${item.journey_style}`.toLowerCase();
    return words.some((word) => text.includes(word));
  });
  return match?.image || services.find((item) => item.image)?.image || "https://www.desertbrise-travel.com/public/assets/uploads/services/service_1784452985_d210e015.webp";
}

function Icon({ name }: { name: "people" | "star" | "shield" | "calendar" | "heart" | "leaf" | "comfort" | "support" | "compass" | "secure" | "map" | "spark" }) {
  const common = "h-6 w-6";
  const icons: Record<string, ReactElement> = {
    people: <path d="M7 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2.8 20a5.2 5.2 0 0 1 10.4 0M10.8 20a5.2 5.2 0 0 1 10.4 0" />,
    star: <path d="m12 3 2.65 5.37 5.93.86-4.29 4.18 1.01 5.9L12 16.52l-5.3 2.79 1.01-5.9-4.29-4.18 5.93-.86L12 3Z" />,
    shield: <path d="M12 3 20 6v6c0 5-3.4 8.5-8 9-4.6-.5-8-4-8-9V6l8-3Z" />,
    calendar: <path d="M7 3v4M17 3v4M4 9h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />,
    heart: <path d="M20.8 7.7c0 5.1-8.8 10.3-8.8 10.3S3.2 12.8 3.2 7.7A4.6 4.6 0 0 1 12 5.8a4.6 4.6 0 0 1 8.8 1.9Z" />,
    leaf: <path d="M20 4c-7.5.4-12.6 3.2-15 8.3C2.8 17 6.2 21 11 19.6c4.8-1.4 7.9-6.5 9-15.6ZM5 20c2.6-5.1 6.4-8.6 11.4-10.5" />,
    comfort: <path d="M5 13h14l-1.5 6h-11L5 13ZM7 13V9a5 5 0 0 1 10 0v4" />,
    support: <path d="M4 12a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3h-2v-6h5M4 16a3 3 0 0 0 3 3h2v-6H4" />,
    compass: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM15.5 8.5l-2 5-5 2 2-5 5-2Z" />,
    secure: <path d="M6 11V8a6 6 0 0 1 12 0v3M5 11h14v10H5V11Zm7 4v2" />,
    map: <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15" />,
    spark: <path d="M12 2l1.4 5.1L18.5 8.5l-5.1 1.4L12 15l-1.4-5.1L5.5 8.5l5.1-1.4L12 2Zm6 11 .8 2.7 2.7.8-2.7.8L18 21l-.8-2.7-2.7-.8 2.7-.8L18 13Z" />,
  };
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

export default async function HomePage() {
  const data = await getHome();
  const services = data.services || [];
  const posts = data.posts || [];
  const heroImage = pickImage(services, ["desert", "sahara", "merzouga", "mhamid", "zagora"]);
  const storyImage = pickImage(services, ["marrakech", "riad", "culture", "family", "casablanca"]);
  const testimonialImage = pickImage(services, ["camp", "desert", "sahara", "trek"]);
  const featured = services.slice(0, 4);
  const mainPrice = featured[0]?.price ? money(featured[0].price) : "Tailor-made";

  return (
    <>
      <section className="premium-hero relative isolate min-h-[96vh] overflow-hidden bg-[#1d130c] text-white">
        <img src={heroImage} alt="Private Morocco travel with DesertBrise" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_74%_18%,rgba(216,154,77,.28),transparent_27%),linear-gradient(90deg,rgba(20,12,7,.92)_0%,rgba(20,12,7,.68)_43%,rgba(20,12,7,.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[#f9f2e7] to-transparent" />

        <div className="mx-auto flex min-h-[96vh] max-w-7xl items-center px-5 pb-40 pt-32 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.34em] text-[#f2c373] shadow-2xl backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f2c373]" />
              Tailor-made Morocco tours
            </div>
            <h1 className="display-font text-[4.2rem] font-semibold leading-[.92] tracking-[-.055em] text-white md:text-[6.7rem] lg:text-[7.4rem]">
              Private Journeys. <span className="block text-[#f6dfb8]">Timeless Memories.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-white/86 md:text-xl">
              We craft authentic, private Morocco experiences through desert silence, mountain villages, ancient cities, and warm human connection.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="premium-btn group bg-[#d79a44] text-[#1d130c] shadow-[0_22px_54px_rgba(215,154,68,.32)] hover:bg-[#efbd73]">
                Plan Your Journey
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/tours" className="premium-btn border border-white/26 bg-white/8 text-white backdrop-blur-md hover:bg-white/16">
                Explore Tours
                <span className="grid h-6 w-6 place-items-center rounded-full border border-white/25 text-[10px]">▷</span>
              </Link>
            </div>

            <div className="mt-11 flex flex-wrap items-center gap-5 text-sm text-white/78">
              <div className="flex -space-x-3">
                {["K", "S", "M"].map((item) => (
                  <span key={item} className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-[#f9f2e7] text-xs font-bold text-[#2a1a10] shadow-xl">{item}</span>
                ))}
              </div>
              <p><strong className="text-white">Loved by private travelers</strong><br />Families, couples, hikers and culture seekers.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-24 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-[2rem] border border-[#eadbc8] bg-white/94 p-4 shadow-[0_24px_80px_rgba(58,37,22,.12)] backdrop-blur-xl md:grid-cols-5">
          {[
            ["people", "100% Private", "Only for you and your group"],
            ["star", "Local Experts", "Born in Morocco, know the land"],
            ["shield", "Trusted & Safe", "Careful planning and quality service"],
            ["calendar", "Tailor-Made", "Every detail crafted around you"],
            ["heart", "5-Star Feeling", "Warm, human and memorable"],
          ].map(([icon, title, text]) => (
            <div key={title} className="group flex items-center gap-4 rounded-[1.35rem] p-4 transition hover:bg-[#fbf4ea]">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#eadbc8] bg-[#fbf4ea] text-[#9a5d24] transition group-hover:bg-white">
                <Icon name={icon as any} />
              </div>
              <div>
                <h3 className="font-bold tracking-[-.02em] text-[#2b1b11]">{title}</h3>
                <p className="mt-1 text-sm leading-5 text-[#75675d]">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f9f2e7] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-11 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="premium-eyebrow">Handpicked experiences</p>
              <h2 className="display-font mt-3 max-w-3xl text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
                Popular Morocco Tours
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#75675d]">
                Routes designed to make travelers feel safe, inspired, and emotionally connected from the first moment.
              </p>
            </div>
            <Link href="/tours" className="hidden items-center gap-3 rounded-full border border-[#dec9ae] bg-white px-6 py-3 text-sm font-bold text-[#7a4a1f] transition hover:border-[#c98f40] hover:bg-[#fffaf2] md:inline-flex">
              View all tours <span>→</span>
            </Link>
          </div>

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
            {featured.map((tour) => <TourCard key={tour.id} tour={tour} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.92fr_1.08fr]">
          <div className="relative overflow-hidden rounded-[2rem] shadow-[0_28px_90px_rgba(58,37,22,.18)]">
            <img src={storyImage} alt="Authentic Morocco private travel moment" className="h-[530px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d130c]/48 via-transparent to-transparent" />
            <div className="absolute bottom-7 left-7 max-w-[250px] rounded-[1.6rem] bg-[#3a2315]/90 p-6 text-white shadow-2xl backdrop-blur-md">
              <p className="display-font text-2xl leading-7">Authentic Morocco</p>
              <p className="mt-3 text-sm leading-6 text-white/80">Real people, real culture, real moments — not empty tourism.</p>
            </div>
          </div>

          <div>
            <p className="premium-eyebrow">Why travel with DesertBrise</p>
            <h2 className="display-font mt-4 max-w-2xl text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
              More Than a Tour, It’s a Connection
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-[#75675d]">
              You are not buying a route. You are entering Morocco through trusted local hands — with care, comfort, cultural respect, and the feeling that every detail was made for you.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                ["spark", "Authentic Experiences", "We show you the Morocco behind the postcard."],
                ["comfort", "Comfort & Quality", "Carefully selected riads, camps and transport."],
                ["leaf", "Sustainable Travel", "Respect for local families, places and traditions."],
                ["support", "24/7 Support", "We stay with you before, during and after the trip."],
              ].map(([icon, title, text]) => (
                <div key={title} className="flex gap-4 rounded-[1.4rem] border border-[#eadbc8] bg-white/70 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#fbf1e3] text-[#9a5d24]"><Icon name={icon as any} /></div>
                  <div>
                    <h3 className="font-bold text-[#2b1b11]">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#75675d]">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/contact" className="mt-9 inline-flex items-center gap-3 text-sm font-bold text-[#8b541f] hover:text-[#2b1b11]">
              Discover our story <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#160f0a] px-5 py-24 text-white sm:px-8 lg:px-10">
        <img src={testimonialImage} alt="Desert camp evening in Morocco" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(12,8,5,.92),rgba(12,8,5,.76),rgba(12,8,5,.48))]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div className="hidden h-[310px] rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-sm lg:block">
            <div className="flex h-full items-end rounded-[1.5rem] bg-gradient-to-t from-[#d79a44]/20 to-transparent p-6">
              <div>
                <p className="premium-eyebrow text-[#f2c373]">Human travel</p>
                <p className="display-font mt-2 text-4xl leading-tight">Warm nights. Quiet deserts. Stories you remember.</p>
              </div>
            </div>
          </div>
          <div>
            <p className="display-font text-4xl leading-tight md:text-6xl">“An unforgettable experience from start to finish.”</p>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-white/78">
              DesertBrise took care of every detail. The desert camp, the people, the views... everything felt personal, calm, and perfectly planned.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-[#f9f2e7] text-sm font-bold text-[#2b1b11]">SM</div>
              <div>
                <p className="font-bold">Sophie M.</p>
                <p className="text-sm text-white/58">France · Private Morocco tour</p>
              </div>
              <div className="ml-4 text-[#f2c373]">★★★★★</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f9f2e7] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-11 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="premium-eyebrow">How planning feels easy</p>
              <h2 className="display-font mt-3 max-w-3xl text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
                From Dream to Morocco, Without Stress
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[#75675d]">
              Every step is made to reduce uncertainty and help travelers feel confident before they book.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["01", "Tell us your travel dream", "Dates, comfort level, people, rhythm, special wishes."],
              ["02", "Receive a private itinerary", "We shape the route with real local knowledge and human care."],
              ["03", "Travel with confidence", "Your trip is supported from arrival until departure."],
            ].map(([num, title, text]) => (
              <div key={num} className="rounded-[2rem] border border-[#eadbc8] bg-white p-7 shadow-[0_18px_50px_rgba(58,37,22,.06)]">
                <div className="mb-12 flex items-center justify-between">
                  <span className="display-font text-6xl text-[#dfc49f]">{num}</span>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#fbf1e3] text-[#9a5d24]"><Icon name="compass" /></span>
                </div>
                <h3 className="text-xl font-bold text-[#2b1b11]">{title}</h3>
                <p className="mt-4 leading-7 text-[#75675d]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {posts.length ? (
        <section className="bg-[#fffaf2] px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-11 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="premium-eyebrow">Travel journal</p>
                <h2 className="display-font mt-3 max-w-3xl text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
                  Advice That Builds Trust
                </h2>
              </div>
              <Link href="/blog" className="hidden items-center gap-3 rounded-full border border-[#dec9ae] bg-white px-6 py-3 text-sm font-bold text-[#7a4a1f] transition hover:border-[#c98f40] hover:bg-[#fffaf2] md:inline-flex">
                Read the journal <span>→</span>
              </Link>
            </div>
            <div className="grid gap-7 md:grid-cols-3">
              {posts.slice(0, 3).map((post) => <BlogCard key={post.id} post={post} />)}
            </div>
          </div>
        </section>
      ) : null}

      <CTA eyebrow="Ready to experience Morocco?" title="Let us create the perfect private journey for you." text={`Start with a simple request. We will design a calm, beautiful Morocco itinerary around your dates, comfort level, and travel style. First trip idea: ${mainPrice}.`} />
    </>
  );
}
