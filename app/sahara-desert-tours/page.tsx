import { SeoLandingPage } from "@/components/SeoLandingSections";
import { getServices } from "@/lib/api";

export const metadata = {
  title: "Sahara Desert Tours Morocco | DesertBrise Travel",
  description: "Private Sahara desert tours in Morocco with camps, camel experiences, desert routes, and tailor-made planning.",
};

const config = {
  eyebrow: "Sahara journeys",
  title: "Sahara desert tours with silence, stars, and real depth.",
  subtitle: "Experience Morocco\u2019s desert with private planning, trusted local support, scenic routes, camps, camel moments, and time to feel the silence.",
  primaryCta: "Plan This Journey",
  secondaryCta: "Find My Best Trip",
  pillars: [["Desert Atmosphere", "Sunset dunes, open sky, quiet camp nights, and space away from noise."], ["Private Desert Logistics", "Driver, route, camp, timing, meals, and stops are organized clearly."], ["More Than a Photo Stop", "The journey can include villages, kasbahs, oases, nomadic culture, and slow desert rhythm."]],
  routes: [["Choose the desert region", "Merzouga, M'Hamid, Erg Chigaga, Zagora, and Ouarzazate routes each create a different experience."], ["Plan the drive well", "The desert is far from big cities, so the route should make the road part of the beauty."], ["Choose camp comfort", "Simple authentic camps, comfortable camps, or luxury camps create very different feelings."], ["Add meaning", "Camel trek, stargazing, music, fire, silence, and local stories can transform the journey."]],
  faq: [["Which Sahara desert is best in Morocco?", "Merzouga is famous for big dunes and accessibility. M'Hamid and Erg Chigaga feel more remote and wild."], ["How many days do I need?", "From Marrakech, 3 days is possible, but 4 or 5 days usually feels better and less rushed."], ["Can the Sahara trip be private?", "Yes. The route, driver, camp level, and daily pace can be arranged privately."], ["Is the desert comfortable?", "It depends on the camp level. Comfortable and luxury options are possible."]],
};

export default async function Page() {
  const result = await getServices({ q: "desert sahara", per_page: 8 }).catch(() => null);
  const fallback = await getServices({ per_page: 8 }).catch(() => null);
  const tours = result?.items?.length ? result.items : fallback?.items || [];

  return <SeoLandingPage config={config} tours={tours} />;
}
