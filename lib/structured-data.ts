const SITE_URL = "https://desertbrise-travel.com";
const LOGO_URL = "https://desertbrise-travel.com/favicon.svg";
const PHONE = "+212600454881";
const EMAIL = "Desertbrise@gmail.com";

function absoluteUrl(path = "") {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function cleanText(value?: string) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function imageArray(service: any) {
  const images = [
    service?.image,
    service?.hero_image,
    service?.featured_image,
    ...(Array.isArray(service?.images) ? service.images.map((item: any) => item?.image) : []),
  ].filter(Boolean);

  return Array.from(new Set(images.map((image: string) => absoluteUrl(image))));
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#organization`,
    name: "DesertBrise Travel",
    url: SITE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    telephone: PHONE,
    email: EMAIL,
    areaServed: [
      "Morocco",
      "Marrakech",
      "Sahara Desert",
      "Atlas Mountains",
      "Fes",
      "Casablanca",
      "Merzouga",
      "M'Hamid El Ghizlane",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
      addressRegion: "Drâa-Tafilalet",
      addressLocality: "M'Hamid El Ghizlane",
    },
    sameAs: ["https://desertbrise-travel.com"],
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "DesertBrise Travel",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/tours?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function buildTourSchema(
  service: any,
  slug: string,
  routeBase: "/tour" | "/trek" | "/daytrip" = "/tour"
) {
  const title = service?.title || "Private Morocco Journey";
  const description =
    cleanText(service?.meta_description) ||
    cleanText(service?.excerpt) ||
    cleanText(service?.content) ||
    "Private Morocco travel experience designed by DesertBrise Travel.";

  const url = absoluteUrl(`${routeBase}/${slug}`);
  const price = Number(service?.price || service?.from_price || 0);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${url}#tour`,
    name: title,
    description,
    url,
    image: imageArray(service),
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    touristType: [
      "Private travelers",
      "Families",
      "Couples",
      "Culture travelers",
      "Adventure travelers",
    ],
    itinerary: Array.isArray(service?.itinerary)
      ? service.itinerary.slice(0, 12).map((day: any, index: number) => ({
          "@type": "ItemList",
          name: day?.title || `Day ${index + 1}`,
          description: cleanText(day?.details || day?.description),
          position: index + 1,
        }))
      : undefined,
  };

  if (price > 0) {
    schema.offers = {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url,
      seller: {
        "@id": `${SITE_URL}/#organization`,
      },
    };
  }

  if (service?.review_summary?.average && service?.review_summary?.total) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: Number(service.review_summary.average),
      reviewCount: Number(service.review_summary.total),
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

export function buildFaqSchema(faqs: any[] = []) {
  const clean = faqs.filter((faq) => faq?.question && faq?.answer).slice(0, 12);

  if (!clean.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: clean.map((faq) => ({
      "@type": "Question",
      name: cleanText(faq.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: cleanText(faq.answer),
      },
    })),
  };
}
