import { SeoLandingPage } from "@/components/SeoLandingSections";
import { getServices } from "@/lib/api";

export const metadata = {
  title: "Private Morocco Tours | DesertBrise Travel",
  description: "Private Morocco tours designed around your dates, comfort level, travel style, and emotional rhythm.",
};

const config = {
  eyebrow: "Tailor-made travel",
  title: "Private Morocco tours designed around you.",
  subtitle: "Travel Morocco with a private driver, flexible pacing, local knowledge, and a route shaped around your people, comfort level, and travel feeling.",
  primaryCta: "Plan This Journey",
  secondaryCta: "Find My Best Trip",
  pillars: [["Only Your Group", "No fixed group pressure, no forced rhythm, no generic travel script."], ["Flexible Route Design", "Marrakech, desert, Atlas Mountains, Fes, coast, culture, and hidden local moments can be combined carefully."], ["Human Support", "You get a clear plan before travel and local support during the journey."]],
  routes: [["Start from your arrival city", "The route can begin from Marrakech, Casablanca, Fes, Ouarzazate, or another point depending on flights."], ["Shape the travel rhythm", "Slow luxury, family comfort, adventure, or deep culture \u2014 the daily pace changes the feeling of the whole trip."], ["Balance distance and beauty", "Long drives are planned with pauses, views, local stops, and comfortable timing."], ["Finish with confidence", "The final itinerary is built around your departure city and the experience you want to remember."]],
  faq: [["Can a Morocco tour be fully private?", "Yes. DesertBrise can arrange private routes with your own driver, guide options, and custom pacing."], ["Can the itinerary change before booking?", "Yes. The planning stage is built to refine the route until it fits your dates and style."], ["Is private travel good for families?", "Yes. Private pacing is often better for families because stops, timing, and hotels can be adapted."], ["Can luxury and authenticity be combined?", "Yes. A route can include refined riads and camps while still keeping real cultural moments."]],
};

export default async function Page() {
  const result = await getServices({ q: "private", per_page: 8 }).catch(() => null);
  const fallback = await getServices({ per_page: 8 }).catch(() => null);
  const tours = result?.items?.length ? result.items : fallback?.items || [];

  return <SeoLandingPage config={config} tours={tours} />;
}
