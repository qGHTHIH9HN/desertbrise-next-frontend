import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { TourCard } from "@/components/TourCard";

type AnyPage = Record<string, any>;
type AnyItem = Record<string, any>;

function clean(value: any) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitLines(value: any) {
  if (Array.isArray(value)) {
    return value
      .map((item) => clean(Array.isArray(item) ? item.join(" ") : item))
      .filter(Boolean);
  }

  return String(value || "")
    .split(/\r\n|\r|\n|•|\|/)
    .map((item) => clean(item))
    .filter(Boolean);
}

function imageFrom(page: AnyPage, services: AnyItem[] = []) {
  return (
    page.hero_image ||
    page.image ||
    page.secondary_image ||
    page.featured_image ||
    services.find((service) => service.image)?.image ||
    "https://www.desertbrise-travel.com/public/assets/uploads/services/service_1784452985_d210e015.webp"
  );
}

function secondaryImage(page: AnyPage, services: AnyItem[] = []) {
  return (
    page.secondary_image ||
    page.image_2 ||
    services.find((service) => service.image && service.image !== imageFrom(page, services))?.image ||
    page.image ||
    imageFrom(page, services)
  );
}

function lowerKey(page: AnyPage) {
  return `${page.slug || ""} ${page.title || ""} ${page.meta_title || ""}`.toLowerCase();
}

function getProfile(page: AnyPage) {
  const key = lowerKey(page);

  if (key.includes("yoga") || key.includes("retreat") || key.includes("wellness")) {
    return {
      eyebrow: "Yoga • Trekking • Sahara",
      accent: "Yoga Retreat",
      mood: "Soft desert wellness",
      titleFallback: "Yoga Retreat in the Moroccan Desert",
      intro:
        "A slow, grounding desert retreat combining yoga, mindful movement, breath, trekking, nourishing food and Saharan silence.",
      promiseTitle: "A retreat built around presence, not performance.",
      mainSection: "Yoga, Desert Stillness and Human Connection",
      mainText:
        "This page should feel like a calm invitation: movement in the morning, desert space during the day, warm camp hospitality, mindful walking, evening fire and time to reconnect with yourself.",
      pillars: [
        ["Move", "Daily yoga, mobility and mindful movement adapted to the group."],
        ["Breathe", "Breathwork, silence and desert pauses to regulate the nervous system."],
        ["Walk", "Gentle treks through dunes, hamadas or desert landscapes."],
        ["Nourish", "Local meals, tea rituals and warm Saharan hospitality."],
      ],
      offers: [
        ["Sunrise Yoga", "Soft morning practice facing the desert light."],
        ["Breathwork & Meditation", "Simple practices for calm, presence and grounding."],
        ["Mindful Desert Walks", "Guided walking without rush, with silence and awareness."],
        ["Restorative Evenings", "Fire, stars, tea, journaling and slow conversations."],
        ["Local Food & Culture", "Nourishing meals and respectful cultural connection."],
        ["Teacher-Led Retreats", "Support for yoga teachers or facilitators bringing a group."],
      ],
      rhythm: [
        ["Morning", "Tea, sunrise yoga, breath and gentle movement."],
        ["Late Morning", "Breakfast, rest and optional mindful desert walk."],
        ["Afternoon", "Trekking, local experience, hammada walk or quiet integration."],
        ["Evening", "Sunset, dinner, fire circle, stars and silence."],
      ],
      cta: "Book Your Retreat",
    };
  }

  if (key.includes("trek") || key.includes("hiking") || key.includes("adventure")) {
    return {
      eyebrow: "Trekking • Desert • Atlas",
      accent: "Trekking Journey",
      mood: "Movement and wild landscapes",
      titleFallback: "Morocco Trekking Experience",
      intro:
        "A guided trekking style for travelers who want to feel Morocco through movement, terrain, villages, desert paths and open landscapes.",
      promiseTitle: "A walking journey shaped around your level.",
      mainSection: "Guided Trekking with Local Route Knowledge",
      mainText:
        "The page should focus on difficulty, safety, guides, daily walking rhythm, landscapes, camp logistics, meals and the emotional reward of moving through Morocco on foot.",
      pillars: [
        ["Walk", "Daily routes adapted to your fitness and season."],
        ["Explore", "Dunes, valleys, villages, oases and mountain paths."],
        ["Support", "Local guides, meals, transport and route care."],
        ["Recover", "Balanced pacing with time to rest and absorb the place."],
      ],
      offers: [
        ["Sahara Trekking", "Walk dunes, dry riverbeds and wide open desert."],
        ["Atlas Hiking", "Mountain trails, villages and panoramic views."],
        ["Camel-Supported Treks", "Traditional desert logistics for longer routes."],
        ["Beginner Walks", "Gentle trekking for first-time walkers."],
        ["Multi-Day Adventure", "Deeper routes with camps and local support."],
        ["Private Guide", "A route led by someone who knows the terrain."],
      ],
      rhythm: [
        ["Briefing", "Meet your guide and understand the route."],
        ["Morning Walk", "Start early with cooler air and soft light."],
        ["Midday Pause", "Lunch, rest and shade."],
        ["Evening Camp", "Arrive, relax, eat and sleep close to the landscape."],
      ],
      cta: "Plan Your Trek",
    };
  }

  if (key.includes("luxury") || key.includes("premium")) {
    return {
      eyebrow: "Luxury • Private • Morocco",
      accent: "Luxury Journey",
      mood: "Refined private comfort",
      titleFallback: "Luxury Morocco Travel Style",
      intro:
        "A refined private travel style with boutique stays, premium desert camps, private transport, elegant pacing and authentic experiences.",
      promiseTitle: "Luxury with atmosphere, not emptiness.",
      mainSection: "Private Comfort with Moroccan Soul",
      mainText:
        "Luxury pages should show comfort, privacy, design, pacing, curated experiences and invisible logistics, while keeping the warmth and authenticity of Morocco.",
      pillars: [
        ["Stay", "Boutique riads, refined hotels and premium camps."],
        ["Flow", "Private transport and calm route timing."],
        ["Taste", "Cuisine, design, hammam and special moments."],
        ["Relax", "Everything organized with low friction and high care."],
      ],
      offers: [
        ["Premium Riads", "Atmospheric stays with comfort and character."],
        ["Luxury Desert Camp", "Elegant nights under the stars."],
        ["Private Driver", "Smooth movement between destinations."],
        ["Curated Dining", "Memorable meals and beautiful settings."],
        ["Hammam & Spa", "Wellness and rest between travel days."],
        ["Special Access", "Private guides, hidden corners and refined experiences."],
      ],
      rhythm: [
        ["Arrival", "Private welcome and smooth transfer."],
        ["Discovery", "Guided culture, cuisine and beautiful places."],
        ["Desert", "Premium camp, sunset and slow evening."],
        ["Rest", "Space to enjoy hotels, views and comfort."],
      ],
      cta: "Design My Luxury Trip",
    };
  }

  if (key.includes("family")) {
    return {
      eyebrow: "Family • Comfort • Morocco",
      accent: "Family Journey",
      mood: "Safe, flexible and memorable",
      titleFallback: "Morocco Family Travel Style",
      intro:
        "A family-friendly private travel style with safe pacing, comfortable transport, flexible timing and meaningful experiences for all ages.",
      promiseTitle: "A route that respects the whole family.",
      mainSection: "Family Travel with Safety, Wonder and Space",
      mainText:
        "Family pages should show trust, easy rhythm, child-friendly stops, comfort, rest, food flexibility and memorable moments without overloading the days.",
      pillars: [
        ["Protect", "Safe route planning and trusted transport."],
        ["Adapt", "Timing and stops shaped around children and parents."],
        ["Enjoy", "Desert magic, food, music, markets and easy discovery."],
        ["Rest", "Balanced days with space to recover."],
      ],
      offers: [
        ["Family Desert Night", "A magical camp experience with comfort."],
        ["Private Driver", "Flexible stops and smoother movement."],
        ["Child-Friendly Guides", "Culture explained in a simple and engaging way."],
        ["Comfortable Stays", "Riads and camps chosen for family needs."],
        ["Hands-On Moments", "Food, crafts, music or camel experiences."],
        ["Balanced Route", "Enough discovery without exhausting the group."],
      ],
      rhythm: [
        ["Soft Start", "Easy arrival and simple first day."],
        ["Discovery", "Markets, culture and landscapes with flexible timing."],
        ["Desert Magic", "Camel, camp, stars and family memories."],
        ["Rest & Return", "Comfortable final pacing before departure."],
      ],
      cta: "Plan Family Journey",
    };
  }

  return {
    eyebrow: "Private • Morocco • Experience",
    accent: "Private Journey",
    mood: "Tailor-made Morocco",
    titleFallback: "Private Morocco Travel Style",
    intro:
      "A private Morocco travel style shaped around your dates, rhythm, comfort level and the feeling you want to return with.",
    promiseTitle: "A journey built around people, not packages.",
    mainSection: "Private Travel with Local Knowledge and Care",
    mainText:
      "This page should show the style clearly, explain what is offered, connect the right tours and invite visitors to send a private request.",
    pillars: [
      ["Feel", "Travel by emotion and atmosphere, not only by map."],
      ["Discover", "Meet landscapes, cities, people and stories with local care."],
      ["Shape", "Adapt the route around your timing and comfort level."],
      ["Remember", "Return with moments that stay with you."],
    ],
    offers: [
      ["Private Route Design", "A route created around your travel style."],
      ["Local Culture", "Human moments that make the trip real."],
      ["Beautiful Landscapes", "Desert, mountains, cities and valleys."],
      ["Comfort Choices", "Simple, comfortable, premium or luxury options."],
      ["Flexible Timing", "A rhythm shaped around your group."],
      ["Trusted Support", "Clear communication before and during travel."],
    ],
    rhythm: [
      ["Start", "Share your dates and travel feeling."],
      ["Design", "Receive a route proposal shaped around you."],
      ["Refine", "Adjust comfort, pace and experiences."],
      ["Travel", "Experience Morocco with local support."],
    ],
    cta: "Plan My Journey",
  };
}

function adminPairs(page: AnyPage, field: string, fallback: string[][]) {
  const raw = splitLines(page[field]);
  if (!raw.length) return fallback;

  return raw.slice(0, fallback.length).map((text, index) => [
    fallback[index]?.[0] || `Point ${index + 1}`,
    text,
  ]);
}

function serviceOffer(service: AnyItem, index: number) {
  return {
    title: service.title || `Experience ${index + 1}`,
    text:
      service.excerpt ||
      service.short_description ||
      service.location ||
      "A curated experience connected to this travel style.",
    image: service.image || "",
    url: service.url || (service.slug ? `/tour/${service.slug}` : "/contact"),
  };
}

export function StyleExperiencePage({
  page,
  services = [],
  posts = [],
}: {
  page: AnyPage;
  services?: AnyItem[];
  posts?: AnyItem[];
}) {
  const profile = getProfile(page);
  const hero = imageFrom(page, services);
  const image2 = secondaryImage(page, services);

  const pageTitle = page.hero_title || page.title || profile.titleFallback;
  const intro =
    page.hero_subtitle ||
    page.subtitle ||
    page.excerpt ||
    page.meta_description ||
    profile.intro;

  const body =
    clean(page.intro) ||
    clean(page.why_visit) ||
    clean(page.content) ||
    profile.mainText;

  const pillars = adminPairs(page, "highlights", profile.pillars);
  const adminOffers = adminPairs(page, "experiences", profile.offers);
  const serviceOffers = services.map(serviceOffer);
  const offers = serviceOffers.length ? serviceOffers : adminOffers.map(([title, text], index) => ({ title, text, image: "", url: "/contact" }));
  const faqs = Array.isArray(page.faqs) ? page.faqs : [];

  return (
    <>
      <section className="relative isolate min-h-[88vh] overflow-hidden bg-[#f5eadb]">
        <img src={hero} alt={pageTitle} className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(249,242,231,.96)_0%,rgba(249,242,231,.80)_43%,rgba(249,242,231,.14)_100%)]" />
        <div className="mx-auto flex min-h-[88vh] max-w-7xl items-center px-5 py-28 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[.32em] text-[#b66142]">
              {profile.eyebrow}
            </p>
            <h1 className="display-font mt-6 text-6xl font-semibold leading-[.92] tracking-[-.055em] text-[#34251d] md:text-8xl">
              {pageTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f5148]">{intro}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href={page.cta_button_url || "/contact"} className="premium-btn bg-[#b9573b] text-white hover:bg-[#9f442d]">
                {page.cta_button_label || profile.cta} <span>→</span>
              </Link>
              <a href="#offers" className="premium-btn border border-[#dec9ae] bg-white/70 text-[#34251d] hover:bg-white">
                View Offers <span>›</span>
              </a>
            </div>
            <p className="mt-8 text-sm font-bold text-[#6f6259]">{profile.mood}. Private planning. Rooted in place.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-20 text-center sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="display-font text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#34251d] md:text-6xl">
            {profile.promiseTitle}
          </h2>
        </div>
        <div className="mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-4">
          {pillars.slice(0, 4).map(([title, text]) => (
            <div key={title} className="px-4">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-[1.5rem] border border-[#eadbc8] bg-[#fff6e9] text-3xl text-[#b9573b]">
                ☼
              </div>
              <h3 className="display-font mt-5 text-3xl font-semibold text-[#34251d]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#6f6259]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid bg-[#f9f2e7] lg:grid-cols-2">
        <div className="min-h-[520px]">
          <img src={image2} alt={profile.mainSection} className="h-full w-full object-cover" />
        </div>
        <div className="flex items-center px-5 py-20 sm:px-8 lg:px-16">
          <div className="max-w-2xl">
            <p className="premium-eyebrow text-[#b9573b]">The {profile.accent}</p>
            <h2 className="display-font mt-4 text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#34251d] md:text-6xl">
              {profile.mainSection}
            </h2>
            <p className="mt-6 text-lg leading-9 text-[#6f6259]">{body}</p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {adminOffers.slice(0, 4).map(([title, text]) => (
                <div key={title} className="rounded-[1.4rem] border border-[#eadbc8] bg-[#fffaf2] p-5">
                  <h3 className="font-black text-[#34251d]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6f6259]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="offers" className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="premium-eyebrow">What This Page Offers</p>
            <h2 className="display-font mt-3 text-5xl font-semibold tracking-[-.04em] text-[#34251d] md:text-6xl">
              {profile.accent} Offers & Experiences
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#6f6259]">
              This section is where the page becomes specific. Add selected tours from your PHP admin, or use the Experiences field to list what this style includes.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {offers.slice(0, 9).map((offer, index) => (
              <Link
                key={`${offer.title}-${index}`}
                href={offer.url}
                className="group overflow-hidden rounded-[1.8rem] border border-[#eadbc8] bg-white shadow-[0_18px_54px_rgba(58,37,22,.07)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(58,37,22,.14)]"
              >
                {offer.image ? (
                  <img src={offer.image} alt={offer.title} className="h-52 w-full object-cover transition duration-700 group-hover:scale-105" />
                ) : (
                  <div className="h-52 bg-[radial-gradient(circle_at_30%_20%,#eab16c,#b9573b_45%,#3b2418)]" />
                )}
                <div className="p-6">
                  <p className="text-xs font-black uppercase tracking-[.22em] text-[#b9573b]">Offer {index + 1}</p>
                  <h3 className="display-font mt-3 text-3xl font-semibold text-[#34251d]">{offer.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6f6259]">{offer.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5eadb] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="display-font text-5xl font-semibold tracking-[-.04em] text-[#34251d] md:text-6xl">
            A Possible Daily Rhythm
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {profile.rhythm.map(([title, text]) => (
              <div key={title} className="rounded-[1.5rem] bg-white/60 p-6">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#e3c9ae] text-2xl text-[#b9573b]">✦</div>
                <h3 className="mt-5 text-lg font-black text-[#34251d]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6f6259]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {services.length ? (
        <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="premium-eyebrow">Connected Tours</p>
              <h2 className="display-font mt-3 text-5xl font-semibold tracking-[-.04em] text-[#34251d] md:text-6xl">
                Bookable Routes Related to This Style
              </h2>
            </div>
            <div className="mt-12 grid gap-7 md:grid-cols-3">
              {services.slice(0, 3).map((service) => (
                <TourCard key={service.id} tour={service as any} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#f9f2e7] px-5 py-20 text-center sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="display-font text-7xl leading-none text-[#dfc49f]">“</p>
          <p className="display-font text-3xl leading-snug text-[#34251d] md:text-4xl">
            {profile.testimonial}
          </p>
          <p className="mt-8 text-sm font-black uppercase tracking-[.22em] text-[#b9573b]">
            DesertBrise Guest Experience
          </p>
        </div>
      </section>

      {faqs.length ? (
        <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="premium-eyebrow">Questions</p>
            <h2 className="display-font mt-3 text-5xl font-semibold tracking-[-.04em] text-[#34251d] md:text-6xl">
              Before You Book
            </h2>
            <div className="mt-10 grid gap-4">
              {faqs.slice(0, 8).map((faq: any, index: number) => (
                <div key={index} className="rounded-[1.5rem] border border-[#eadbc8] bg-white p-6">
                  <h3 className="font-black text-[#34251d]">{faq.question}</h3>
                  <p className="mt-3 leading-7 text-[#6f6259]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {posts.length ? (
        <section className="bg-[#f9f2e7] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="premium-eyebrow">Guides & Stories</p>
            <h2 className="display-font mt-3 text-5xl font-semibold tracking-[-.04em] text-[#34251d] md:text-6xl">
              Read Before You Travel
            </h2>
            <div className="mt-10 grid gap-7 md:grid-cols-3">
              {posts.slice(0, 3).map((post) => (
                <BlogCard key={post.id} post={post as any} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#b9573b] px-5 py-20 text-center text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="display-font text-5xl font-semibold leading-[1] tracking-[-.04em] md:text-6xl">
            {page.cta_title || `Ready to shape your ${profile.accent.toLowerCase()}?`}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/82">
            {page.cta_text || "Tell us your dates, group size, comfort level and intention. We will suggest the right private route."}
          </p>
          <Link href={page.cta_button_url || "/contact"} className="premium-btn mt-9 bg-white text-[#b9573b] hover:bg-[#fff4ea]">
            {page.cta_button_label || profile.cta} <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
