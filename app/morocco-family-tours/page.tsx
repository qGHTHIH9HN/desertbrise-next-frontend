import { SeoLandingPage } from "@/components/SeoLandingSections";
import { getServices } from "@/lib/api";

export const metadata = {
  title: "Morocco Family Tours | DesertBrise Travel",
  description: "Private Morocco family tours with safe pacing, comfortable travel, desert experiences, cities, and flexible planning.",
};

const config = {
  eyebrow: "Family travel",
  title: "Morocco family tours with comfort, safety, and wonder.",
  subtitle: "A private family route lets children, parents, and grandparents experience Morocco without the stress of fixed group travel.",
  primaryCta: "Plan This Journey",
  secondaryCta: "Find My Best Trip",
  pillars: [["Safe Pacing", "Shorter travel days, better stops, and flexible timing help the whole family enjoy the journey."], ["Memorable Experiences", "Desert camps, camel moments, food, music, markets, and mountains can feel magical for children."], ["Comfort Matters", "Hotels, vehicles, meals, and daily rhythm are selected with family needs in mind."]],
  routes: [["Start with ages and rhythm", "A good family route depends on the age of children and how much movement everyone enjoys."], ["Avoid overloading days", "Private travel gives space for rest, pool time, slower mornings, and spontaneous stops."], ["Choose family-friendly stays", "Riads, camps, and hotels should match comfort, safety, and room needs."], ["Keep the magic alive", "The route should include small surprises, stories, landscapes, and hands-on experiences."]],
  faq: [["Is Morocco good for family travel?", "Yes. With private planning, Morocco can be very rewarding for families."], ["Can we avoid very long drives?", "Yes. Routes can be designed with overnight stops and smoother pacing."], ["Are desert camps good for children?", "Many families love the desert, especially with the right camp comfort and timing."], ["Can meals be adapted?", "Yes. Food preferences and child-friendly needs can be considered during planning."]],
};

export default async function Page() {
  const result = await getServices({ q: "family", per_page: 8 }).catch(() => null);
  const fallback = await getServices({ per_page: 8 }).catch(() => null);
  const tours = result?.items?.length ? result.items : fallback?.items || [];

  return <SeoLandingPage config={config} tours={tours} />;
}
