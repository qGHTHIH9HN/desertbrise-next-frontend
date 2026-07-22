import { SeoLandingPage } from "@/components/SeoLandingSections";
import { getServices } from "@/lib/api";

export const metadata = {
  title: "Morocco Trekking Tours | DesertBrise Travel",
  description: "Morocco trekking tours in the Sahara Desert and Atlas Mountains with private guides and custom adventure planning.",
};

const config = {
  eyebrow: "Trekking Morocco",
  title: "Morocco trekking tours for walkers, seekers, and desert hearts.",
  subtitle: "Walk through Sahara landscapes, mountain paths, remote villages, and quiet places where Morocco is felt through the body, not only seen from a car.",
  primaryCta: "Plan This Journey",
  secondaryCta: "Find My Best Trip",
  pillars: [["Real Movement", "Trekking creates a deeper connection with land, silence, and local rhythm."], ["Guided Safely", "Routes can include local guides, mule support, camel support, meals, and clear logistics."], ["Adapted Difficulty", "The trek should match your fitness, comfort level, season, and desired depth."]],
  routes: [["Choose desert or mountain", "Sahara treks and Atlas treks feel very different, and both can be powerful."], ["Set the difficulty", "Daily walking hours, terrain, camp style, and support level should be clear before booking."], ["Respect the season", "Heat, snow, wind, and daylight affect the route and should shape timing."], ["Balance effort and comfort", "Some travelers want raw adventure; others want guided walking with comfortable nights."]],
  faq: [["Is trekking in Morocco difficult?", "It depends on the route. Easy, moderate, and challenging treks are possible."], ["Can beginners trek in the Sahara?", "Yes, with the right distance, season, support, and pacing."], ["What is better: desert or Atlas trekking?", "Desert trekking is about silence and space. Atlas trekking is about mountains, villages, and altitude."], ["Can trekking be private?", "Yes. Private trekking routes can be adapted to your group."]],
};

export default async function Page() {
  const result = await getServices({ q: "trek trekking hike", per_page: 8 }).catch(() => null);
  const fallback = await getServices({ per_page: 8 }).catch(() => null);
  const tours = result?.items?.length ? result.items : fallback?.items || [];

  return <SeoLandingPage config={config} tours={tours} />;
}
