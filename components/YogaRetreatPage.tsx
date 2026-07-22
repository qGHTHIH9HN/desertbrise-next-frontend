import Link from "next/link";
import { TourCard } from "@/components/TourCard";
import { BlogCard } from "@/components/BlogCard";

type AnyPage = Record<string, any>;
type AnyItem = Record<string, any>;

function clean(value: any) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitList(value: any) {
  if (Array.isArray(value)) {
    return value.map((item) => clean(Array.isArray(item) ? item.join(" ") : item)).filter(Boolean);
  }

  return String(value || "")
    .split(/\r\n|\r|\n|•|\|/)
    .map((item) => clean(item))
    .filter(Boolean);
}

function pageKey(page: AnyPage) {
  return `${page.slug || ""} ${page.title || ""} ${page.meta_title || ""}`.toLowerCase();
}

function firstImage(page: AnyPage, services: AnyItem[] = []) {
  return (
    page.hero_image ||
    page.image ||
    page.featured_image ||
    page.secondary_image ||
    services.find((service) => service.image)?.image ||
    "https://www.desertbrise-travel.com/public/assets/uploads/services/service_1784452985_d210e015.webp"
  );
}

function secondImage(page: AnyPage, services: AnyItem[] = []) {
  return (
    page.secondary_image ||
    page.image_2 ||
    services.find((service) => service.image && service.image !== firstImage(page, services))?.image ||
    page.image ||
    firstImage(page, services)
  );
}

function getYogaProfile(page: AnyPage) {
  const key = pageKey(page);

  if (key.includes("mountain") || key.includes("atlas")) {
    return {
      kind: "mountain",
      eyebrow: "Yoga • Atlas Mountains • Stillness",
      titleFallback: "Atlas Mountain Yoga Retreat",
      heroLine: "Rise Above the Noise. Breathe With the Mountains.",
      intro:
        "A mountain yoga retreat shaped around fresh air, slow movement, Berber villages, panoramic trails and quiet Atlas mornings.",
      statement: "The mountains return you to your breath.",
      statementSmall:
        "Between stone villages, valleys and high horizons, the body softens and the mind becomes clear.",
      sanctuaryTitle: "Your Sanctuary in the Atlas",
      sanctuaryText:
        "Mountain lodges, valley views, nourishing food and guided walks create a retreat rhythm rooted in nature and local hospitality.",
      landscapeLabel: "Atlas landscape",
      nextJourney: "Spring / Autumn departures",
      placesLeft: "Private groups",
      quote:
        "The Atlas gave the retreat a different power — fresh air, silence, movement and the feeling of being held by the mountains.",
      guideQuote:
        "I know these paths, these villages and these mountains. I invite you to experience their calm.",
      offers: [
        ["Mountain Sunrise Yoga", "Morning movement facing valleys and high peaks."],
        ["Guided Atlas Walks", "Soft trekking through villages, terraces and mountain paths."],
        ["Breath & Altitude", "Breathwork and stillness in clean mountain air."],
        ["Berber Hospitality", "Local food, tea, stories and warm village encounters."],
        ["Restorative Evenings", "Slow evenings, reflection and quiet mountain nights."],
        ["Private Teacher Retreats", "Support for yoga teachers bringing a small group."],
      ],
      rhythm: [
        ["Arrive & Ground", "Settle into the mountain lodge and breathe."],
        ["Move & Open", "Morning yoga and soft valley walk."],
        ["Explore", "Guided Atlas trek and village contact."],
        ["Restore", "Rest, local food and quiet mountain evening."],
        ["Deepen", "Breathwork, journaling and panoramic silence."],
        ["Integrate", "Final practice and reflection."],
        ["Return", "Depart clear, calm and renewed."],
      ],
      included: ["Daily yoga", "Guided walks", "Local meals", "Mountain lodge", "Transfers support"],
    };
  }

  if (key.includes("desert") || key.includes("sahara") || key.includes("mhamid") || key.includes("merzouga")) {
    return {
      kind: "desert",
      eyebrow: "Yoga • Trekking • Sahara",
      titleFallback: "Desert Yoga Retreat Morocco",
      heroLine: "Leave the Noise. Enter the Desert. Return Renewed.",
      intro:
        "A deeply immersive yoga and trekking retreat in the heart of the Sahara, combining movement, stillness, desert walking and soulful connection.",
      statement: "The desert removes everything you never needed.",
      statementSmall:
        "Out here, there are no distractions — just you, the elements, and what truly matters.",
      sanctuaryTitle: "Your Sanctuary Beneath the Stars",
      sanctuaryText:
        "Elegant desert camp, nourishing cuisine, fire circles and star-filled nights create a retreat space that is raw, beautiful and deeply restorative.",
      landscapeLabel: "Sahara series",
      nextJourney: "October 2026",
      placesLeft: "Limited places",
      quote:
        "This retreat changed me in ways I didn’t know I needed. The desert, the people, the stillness — magic.",
      guideQuote:
        "I was born in this desert. Now I invite you to experience what it teaches.",
      offers: [
        ["Sunrise Yoga", "Awaken, align and breathe with the first desert light."],
        ["Nomadic Trekking", "Walk ancient paths and feel the vastness of the Sahara."],
        ["Sahraoui Evenings", "Gather, share, belong around fire, tea and stars."],
        ["Breathwork & Meditation", "Simple practices for calm, presence and grounding."],
        ["Nourishing Local Cuisine", "Seasonal meals inspired by Saharan hospitality."],
        ["Teacher-Led Retreats", "Support for facilitators bringing a private group."],
      ],
      rhythm: [
        ["Arrive & Unwind", "Welcome tea, camp arrival and soft grounding."],
        ["Ground & Breathe", "Morning yoga, breath and desert silence."],
        ["Move & Explore", "Guided trek through dunes and open landscapes."],
        ["Journey Outward", "Camel paths, oases or remote desert atmosphere."],
        ["Connect & Celebrate", "Fire, music, stories and shared presence."],
        ["Silence & Reflection", "Integration, journaling and restorative practice."],
        ["Integrate & Return", "Final sunrise and departure renewed."],
      ],
      included: ["Daily yoga", "All meals", "Guided treks", "Luxury camp", "Airport transfers support"],
    };
  }

  return {
    kind: "morocco",
    eyebrow: "Morocco • Yoga • Retreat Travel",
    titleFallback: "Morocco Yoga Retreat",
    heroLine: "Move Through Morocco. Return to Yourself.",
    intro:
      "A Morocco yoga retreat collection connecting desert stillness, mountain air, slow travel, local hospitality and meaningful movement.",
    statement: "Morocco gives every retreat a different landscape for renewal.",
    statementSmall:
      "Desert silence, Atlas villages, oasis gardens and warm human hospitality create more than a yoga holiday.",
    sanctuaryTitle: "Your Retreat, Shaped by Landscape",
    sanctuaryText:
      "Choose a desert retreat, mountain retreat or private Morocco wellness journey. Each route can be shaped around your dates, teacher, group and comfort level.",
    landscapeLabel: "Morocco retreat series",
    nextJourney: "Private dates available",
    placesLeft: "Tailor-made",
    quote:
      "Morocco gave our retreat color, silence, movement and connection. Every landscape carried a different lesson.",
    guideQuote:
      "From desert to mountains, Morocco has places that help people slow down and reconnect.",
    offers: [
      ["Desert Yoga Retreat", "Sahara silence, camp nights, dunes and fire circles."],
      ["Mountain Yoga Retreat", "Atlas air, valley walks, lodges and panoramic stillness."],
      ["Private Wellness Journey", "A tailor-made route for couples, friends or small groups."],
      ["Teacher Retreat Support", "Logistics for facilitators bringing their own students."],
      ["Yoga & Trekking Morocco", "Movement, walking, breath and cultural contact."],
      ["Slow Travel Retreat", "A softer rhythm with space, comfort and meaning."],
    ],
    rhythm: [
      ["Choose Landscape", "Desert, mountain or multi-region retreat."],
      ["Define Intention", "Yoga, reset, group retreat, trekking or silence."],
      ["Shape Comfort", "Camp, lodge, riad or boutique stay."],
      ["Plan Movement", "Yoga, walking, breath and local experiences."],
      ["Add Culture", "Food, music, village contact and Moroccan hospitality."],
      ["Create Flow", "Balance activity with rest."],
      ["Return Renewed", "Leave with clarity and memories."],
    ],
    included: ["Yoga planning", "Local guides", "Retreat logistics", "Stays", "Transport support"],
  };
}

function offersFromAdmin(page: AnyPage, profile: ReturnType<typeof getYogaProfile>, services: AnyItem[]) {
  if (services.length) {
    return services.map((service) => ({
      title: service.title || "Retreat Experience",
      text: service.excerpt || service.short_description || service.location || "A bookable retreat experience connected to this page.",
      image: service.image || "",
      url: service.url || (service.slug ? `/tour/${service.slug}` : "/contact"),
    }));
  }

  const lines = splitList(page.experiences);
  if (lines.length) {
    return lines.map((line, index) => {
      const parts = line.includes(" - ") ? line.split(" - ") : line.includes(":") ? line.split(":") : [profile.offers[index]?.[0] || `Offer ${index + 1}`, line];
      return {
        title: clean(parts[0]),
        text: clean(parts.slice(1).join(": ")) || line,
        image: "",
        url: "/contact",
      };
    });
  }

  return profile.offers.map(([title, text]) => ({ title, text, image: "", url: "/contact" }));
}

function highlightsFromAdmin(page: AnyPage, profile: ReturnType<typeof getYogaProfile>) {
  const lines = splitList(page.highlights);
  if (!lines.length) return profile.offers.slice(0, 3);

  return lines.slice(0, 3).map((text, index) => [
    profile.offers[index]?.[0] || `Point ${index + 1}`,
    text,
  ]);
}

export function YogaRetreatPage({
  page,
  services = [],
  posts = [],
}: {
  page: AnyPage;
  services?: AnyItem[];
  posts?: AnyItem[];
}) {
  const profile = getYogaProfile(page);
  const ctaLabel = page.cta_button_label || (profile as any).cta || "Plan Your Retreat";
  const hero = firstImage(page, services);
  const image2 = secondImage(page, services);
  const title = page.hero_title || page.title || profile.titleFallback;
  const intro = page.hero_subtitle || page.subtitle || page.excerpt || page.meta_description || profile.intro;
  const body = clean(page.intro) || clean(page.why_visit) || clean(page.content) || profile.sanctuaryText;
  const offers = offersFromAdmin(page, profile, services);
  const highlights = highlightsFromAdmin(page, profile);
  const faqs = Array.isArray(page.faqs) ? page.faqs : [];

  return (
    <>
      <section className="relative isolate min-h-[92vh] overflow-hidden bg-[#efe4d3] text-[#2f261f]">
        <img src={hero} alt={title} className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(239,228,211,.96),rgba(239,228,211,.78)_44%,rgba(239,228,211,.08))]" />
        <div className="mx-auto grid min-h-[92vh] max-w-7xl items-center px-5 py-28 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[.32em] text-[#b65734]">{profile.eyebrow}</p>
            <h1 className="display-font mt-6 max-w-4xl text-6xl font-semibold leading-[.88] tracking-[-.06em] md:text-8xl">
              {title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5e5148]">{intro}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href={page.cta_button_url || "/contact"} className="premium-btn bg-[#b9573b] text-white hover:bg-[#9f442d]">
                {page.cta_button_label || profile.cta} <span>→</span>
              </Link>
              <a href="#offers" className="premium-btn border border-[#bfa996] bg-white/50 text-[#2f261f] hover:bg-white">
                Explore the Retreat <span>›</span>
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-5 right-5 mx-auto hidden max-w-7xl items-end justify-between text-xs font-black uppercase tracking-[.18em] text-[#5e5148] md:flex">
            <div className="flex overflow-hidden rounded-[.15rem] bg-[#3b2a21]/76 text-white backdrop-blur">
              <div className="border-r border-white/10 px-7 py-5">
                <p className="text-white/55">Next Journey</p>
                <p className="mt-2 text-lg normal-case tracking-normal">{page.next_journey || profile.nextJourney}</p>
              </div>
              <div className="px-7 py-5">
                <p className="text-white/55">Availability</p>
                <p className="mt-2 text-lg normal-case tracking-normal">{page.availability_text || profile.placesLeft}</p>
              </div>
            </div>
            <div className="text-right">
              <p>{profile.landscapeLabel}</p>
              <p className="mt-2 text-[#b65734]">Issue 01</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <h2 className="display-font text-6xl font-semibold leading-[.88] tracking-[-.055em] text-[#30251f] md:text-8xl">
              {profile.statement}
            </h2>
            <div className="mt-10 flex gap-5">
              <span className="text-3xl text-[#b9573b]">☼</span>
              <p className="max-w-sm text-sm leading-7 text-[#6b5c52]">{profile.statementSmall}</p>
            </div>
          </div>
          <div className="relative min-h-[520px]">
            <img src={image2} alt={profile.landscapeLabel} className="absolute left-[12%] top-[6%] h-[78%] w-[58%] rounded-sm object-cover shadow-[0_30px_80px_rgba(58,37,22,.18)]" />
            <div className="absolute right-[4%] top-[16%] h-[58%] w-[38%] bg-[#eadbc8]/55" />
            <div className="absolute bottom-[8%] left-[0] h-40 w-48 rounded-sm bg-[#3b2a21]/10 backdrop-blur-sm" />
          </div>
        </div>
      </section>

      <section className="border-y border-[#e5d5c3] bg-[#f9f2e7] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.55fr_1.45fr]">
          <div>
            <h2 className="display-font text-5xl font-semibold leading-[.95] tracking-[-.045em] text-[#30251f] md:text-6xl">
              A Journey Through Stillness
            </h2>
            <a href="#offers" className="mt-8 inline-flex text-xs font-black uppercase tracking-[.22em] text-[#b9573b]">
              View all offers →
            </a>
          </div>
          <div className="relative">
            <div className="absolute left-0 right-0 top-9 hidden border-t border-[#c9aa92] md:block" />
            <div className="grid gap-5 md:grid-cols-7">
              {profile.rhythm.map(([step, text], index) => (
                <div key={step} className="relative rounded-[1.2rem] bg-[#fffaf2]/70 p-4">
                  <span className="relative z-10 block h-3 w-3 rounded-full bg-[#b9573b]" />
                  <p className="mt-6 text-[10px] font-black uppercase tracking-[.18em] text-[#b9573b]">Day {index + 1}</p>
                  <h3 className="mt-2 text-sm font-black text-[#30251f]">{step}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#6b5c52]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#1e1712] text-white">
        <img src={hero} alt={profile.sanctuaryTitle} className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(24,17,12,.82),rgba(24,17,12,.50),rgba(24,17,12,.16))]" />
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
          <div className="max-w-lg border border-white/24 bg-[#221812]/58 p-10 backdrop-blur-md">
            <h2 className="display-font text-5xl font-semibold leading-[.95] tracking-[-.045em]">{profile.sanctuaryTitle}</h2>
            <p className="mt-6 leading-8 text-white/76">{body}</p>
            <div className="mt-8 grid gap-4 text-xs font-black uppercase tracking-[.18em] text-white/78">
              {profile.included.slice(0, 4).map((item) => (
                <p key={item}>✦ {item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="offers" className="bg-[#fffaf2] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="premium-eyebrow">Curated Experiences</p>
            <h2 className="display-font mt-3 text-5xl font-semibold tracking-[-.045em] text-[#30251f] md:text-7xl">
              {profile.accent} Offers
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#6b5c52]">
              This is the important dynamic list. Add selected yoga retreat services in admin, or fill the Experiences field to control these cards.
            </p>
          </div>

          <div className="mt-12 grid gap-0 overflow-hidden border border-[#eadbc8] md:grid-cols-3">
            {offers.slice(0, 9).map((offer, index) => (
              <Link key={`${offer.title}-${index}`} href={offer.url} className="group border-b border-r border-[#eadbc8] bg-white transition hover:bg-[#f9f2e7]">
                {offer.image ? (
                  <img src={offer.image} alt={offer.title} className="h-60 w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                ) : (
                  <div className="h-60 bg-[radial-gradient(circle_at_30%_20%,#eab16c,#b9573b_45%,#3b2418)]" />
                )}
                <div className="p-7">
                  <p className="display-font text-5xl text-[#dfc49f]">0{index + 1}</p>
                  <h3 className="mt-2 text-xl font-black text-[#30251f]">{offer.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6b5c52]">{offer.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-[#f9f2e7] lg:grid-cols-3">
        <div className="min-h-[430px] bg-[#2a211a]">
          <img src={image2} alt="Retreat guide" className="h-full w-full object-cover opacity-90" />
        </div>
        <div className="px-8 py-16 lg:col-span-2 lg:px-16">
          <p className="premium-eyebrow">Your Guide</p>
          <blockquote className="display-font mt-5 max-w-2xl text-5xl font-semibold leading-[1] tracking-[-.045em] text-[#30251f] md:text-6xl">
            “{profile.guideQuote}”
          </blockquote>
          <p className="mt-8 max-w-md leading-8 text-[#6b5c52]">
            DesertBrise shapes every retreat around place, people, rhythm and the feeling the group wants to return with.
          </p>
        </div>
      </section>

      <section className="bg-[#6f7865] px-5 py-12 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-6">
          <div>
            <h2 className="display-font text-3xl leading-none">Thoughtfully Included</h2>
          </div>
          {profile.included.map((item) => (
            <div key={item} className="text-center text-xs font-black uppercase tracking-[.18em] text-white/78">
              <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full border border-white/28">✧</div>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-20 text-center sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="display-font text-7xl leading-none text-[#dfc49f]">“</p>
          <p className="display-font text-3xl leading-snug text-[#30251f] md:text-4xl">{profile.quote}</p>
          <p className="mt-8 text-sm font-black uppercase tracking-[.22em] text-[#b9573b]">DesertBrise Guest Experience</p>
        </div>
      </section>

      {services.length ? (
        <section className="bg-[#f9f2e7] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="premium-eyebrow">Bookable Retreat Routes</p>
            <h2 className="display-font mt-3 text-5xl font-semibold tracking-[-.045em] text-[#30251f] md:text-6xl">
              Related Retreat Tours
            </h2>
            <div className="mt-10 grid gap-7 md:grid-cols-3">
              {services.slice(0, 3).map((service) => (
                <TourCard key={service.id} tour={service as any} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {faqs.length ? (
        <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="premium-eyebrow">Questions</p>
            <h2 className="display-font mt-3 text-5xl font-semibold tracking-[-.045em] text-[#30251f] md:text-6xl">Before You Book</h2>
            <div className="mt-10 grid gap-4">
              {faqs.slice(0, 8).map((faq: any, index: number) => (
                <div key={index} className="rounded-[1.4rem] border border-[#eadbc8] bg-white p-6">
                  <h3 className="font-black text-[#30251f]">{faq.question}</h3>
                  <p className="mt-3 leading-7 text-[#6b5c52]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {posts.length ? (
        <section className="bg-[#f9f2e7] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="premium-eyebrow">Journal</p>
            <h2 className="display-font mt-3 text-5xl font-semibold tracking-[-.045em] text-[#30251f] md:text-6xl">Read Before You Retreat</h2>
            <div className="mt-10 grid gap-7 md:grid-cols-3">
              {posts.slice(0, 3).map((post) => (
                <BlogCard key={post.id} post={post as any} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#2a1f18] px-5 py-20 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="premium-eyebrow text-[#dfb37b]">Your return awaits</p>
            <h2 className="display-font mt-3 max-w-3xl text-5xl font-semibold leading-[.95] tracking-[-.045em] md:text-7xl">
              {page.cta_title || "The retreat is waiting."}
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-white/72">
              {page.cta_text || "Choose your dates, landscape and rhythm. DesertBrise will shape the retreat around your group."}
            </p>
          </div>
          <Link href={page.cta_button_url || "/contact"} className="premium-btn bg-[#b9573b] text-white hover:bg-[#9f442d]">
            {page.cta_button_label || profile.cta} <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
