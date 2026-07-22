import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { CTA } from "@/components/CTA";
import {
  FounderStory,
  IdealTravelerMatrix,
  ObjectionCrusher,
  PlanningSteps,
  SignaturePromise,
  TripMatchStrip,
} from "@/components/ConversionSections";
import { StructuredData } from "@/components/StructuredData";
import { TourCard } from "@/components/TourCard";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/structured-data";
import { getBlog, getHome, getPages, getServices } from "@/lib/api";
import type { CmsPageCard, ServiceCard } from "@/lib/types";
import { money } from "@/lib/format";

export const revalidate = 60;

function pickImage(services: ServiceCard[] = [], words: string[] = []) {
  const match = services.find((item) => {
    const text = `${item.title} ${item.excerpt} ${item.location} ${item.journey_style}`.toLowerCase();
    return words.some((word) => text.includes(word));
  });

  return (
    match?.image ||
    services.find((item) => item.image)?.image ||
    "https://www.desertbrise-travel.com/public/assets/uploads/services/service_1784452985_d210e015.webp"
  );
}

function pageHref(page: CmsPageCard, base: "/destinations" | "/travel-styles") {
  return page.url || `${base}/${page.slug}`;
}

function FeatureCard({
  page,
  base,
  label,
}: {
  page: CmsPageCard;
  base: "/destinations" | "/travel-styles";
  label: string;
}) {
  return (
    <Link
      href={pageHref(page, base)}
      className="group relative min-h-[340px] overflow-hidden rounded-[2rem] border border-[#eadbc8] bg-[#2b1b11] shadow-[0_20px_60px_rgba(58,37,22,.12)]"
    >
      {page.image ? (
        <img src={page.image} alt={page.title} className="absolute inset-0 h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#f0bd72,#8d5524_48%,#2b1b11)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1d130c]/90 via-[#1d130c]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-7 text-white">
        <p className="text-xs font-black uppercase tracking-[.28em] text-[#f2c373]">{label}</p>
        <h3 className="display-font mt-3 text-4xl font-semibold leading-none tracking-[-.04em]">{page.title}</h3>
        <p className="mt-3 clamp-3 text-sm leading-6 text-white/80">
          {page.excerpt || page.hero_subtitle || page.meta_description || "A private Morocco experience shaped with care."}
        </p>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const [homeResult, servicesResult, blogResult, destinationResult, styleResult] = await Promise.allSettled([
    getHome(),
    getServices({ per_page: 8 }),
    getBlog({ per_page: 6 }),
    getPages({ type: "hub", per_page: 6 }),
    getPages({ type: "style", per_page: 6 }),
  ]);

  const home =
    homeResult.status === "fulfilled"
      ? homeResult.value
      : {
          ok: false,
          brand: "DesertBrise Travel",
          tagline: "",
          phone: "",
          email: "",
          whatsapp: "",
          hero_slides: [],
          services: [],
          posts: [],
        };

  const services =
    servicesResult.status === "fulfilled"
      ? servicesResult.value.items || []
      : home.services || [];
  const posts = blogResult.status === "fulfilled" ? blogResult.value.items || [] : home.posts || [];
  const destinations =
    destinationResult.status === "fulfilled" ? destinationResult.value.items || [] : [];
  const travelStyles = styleResult.status === "fulfilled" ? styleResult.value.items || [] : [];

  const heroSlide = home.hero_slides?.[0];
  const heroImage =
    heroSlide?.image ||
    pickImage(services, ["desert", "sahara", "merzouga", "mhamid", "zagora"]);

  const firstPrice = services[0]?.price ? money(services[0].price) : "custom quote";

  return (
    <>
      <StructuredData data={[buildOrganizationSchema(), buildWebsiteSchema()]} />

      <section className="premium-hero relative isolate min-h-[96vh] overflow-hidden bg-[#1d130c] text-white">
        <img
          src={heroImage}
          alt={heroSlide?.title || "Private Morocco travel with DesertBrise"}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_74%_18%,rgba(216,154,77,.28),transparent_27%),linear-gradient(90deg,rgba(20,12,7,.93)_0%,rgba(20,12,7,.70)_43%,rgba(20,12,7,.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[#f9f2e7] to-transparent" />

        <div className="mx-auto flex min-h-[96vh] max-w-7xl items-center px-5 pb-40 pt-32 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.34em] text-[#f2c373] shadow-2xl backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f2c373]" />
              {heroSlide?.eyebrow || "Private Morocco journeys"}
            </div>

            <h1 className="display-font text-[4rem] font-semibold leading-[.92] tracking-[-.055em] text-white md:text-[6.6rem] lg:text-[7.4rem]">
              {heroSlide?.title || (
                <>
                  Morocco Designed <span className="block text-[#f6dfb8]">Around Your Feeling.</span>
                </>
              )}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-9 text-white/86 md:text-xl">
              {heroSlide?.description ||
                "Private desert journeys, cultural routes, treks, family escapes, luxury stays, and deep Saharan experiences shaped by local human knowledge."}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/trip-match" className="premium-btn bg-[#d79a44] text-[#1d130c] shadow-[0_22px_54px_rgba(215,154,68,.32)] hover:bg-[#efbd73]">
                Find My Best Trip <span>→</span>
              </Link>
              <Link href="/tours" className="premium-btn border border-white/26 bg-white/8 text-white backdrop-blur-md hover:bg-white/16">
                Explore All Tours <span>▷</span>
              </Link>
            </div>

            <div className="mt-11 grid gap-3 text-sm text-white/82 sm:grid-cols-3">
              {["100% private planning", "Local Sahara roots", `From ${firstPrice}`].map((item) => (
                <div key={item} className="rounded-full border border-white/14 bg-white/10 px-4 py-3 font-bold backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-24 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-[2rem] border border-[#eadbc8] bg-white/94 p-4 shadow-[0_24px_80px_rgba(58,37,22,.12)] backdrop-blur-xl md:grid-cols-5">
          {[
            ["Private", "No mass tourism"],
            ["Tailor-made", "Every route adapted"],
            ["Human", "Real Moroccan hosts"],
            ["Protected", "Clear support"],
            ["Emotional", "Memories, not checklists"],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[1.35rem] p-4 transition hover:bg-[#fbf4ea]">
              <h3 className="font-black tracking-[-.02em] text-[#2b1b11]">{title}</h3>
              <p className="mt-1 text-sm leading-5 text-[#75675d]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <SignaturePromise />

      <section className="bg-[#f9f2e7] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="premium-eyebrow">Live from your PHP admin</p>
              <h2 className="display-font mt-3 max-w-3xl text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
                Popular private Morocco tours
              </h2>
            </div>
            <Link href="/tours" className="hidden text-sm font-black text-[#8b541f] md:inline-flex">View all tours →</Link>
          </div>

          {services.length ? (
            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
              {services.slice(0, 4).map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-[#eadbc8] bg-white p-10 text-[#75675d]">
              Add published tours in your PHP admin to display them here.
            </div>
          )}
        </div>
      </section>

      <TripMatchStrip />

      {destinations.length ? (
        <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="premium-eyebrow">Destination hubs</p>
            <h2 className="display-font mt-3 max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
              Morocco by place, feeling, and route.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {destinations.slice(0, 6).map((destination) => (
                <FeatureCard key={destination.id || destination.slug} page={destination} base="/destinations" label="Destination" />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <IdealTravelerMatrix />

      {travelStyles.length ? (
        <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="premium-eyebrow">Travel styles</p>
            <h2 className="display-font mt-3 max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
              Let travelers choose by emotion.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {travelStyles.slice(0, 6).map((style) => (
                <FeatureCard key={style.id || style.slug} page={style} base="/travel-styles" label="Travel style" />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ObjectionCrusher />
      <FounderStory />
      <PlanningSteps />

      {posts.length ? (
        <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="premium-eyebrow">Travel journal</p>
            <h2 className="display-font mt-3 max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
              Advice that builds trust before the request.
            </h2>
            <div className="mt-10 grid gap-7 md:grid-cols-3">
              {posts.slice(0, 3).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTA
        eyebrow="Ready to plan?"
        title="Use the new Trip Match system or send a direct request."
        text="This upgraded website now works like a premium funnel: inspiration, trust, tour discovery, smart capture, and direct booking action."
      />
    </>
  );
}
