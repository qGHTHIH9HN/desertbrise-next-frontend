import { SeoLandingPage } from "@/components/SeoLandingSections";
import { getServices } from "@/lib/api";

export const metadata = {
  title: "Luxury Morocco Tours | DesertBrise Travel",
  description: "Luxury private Morocco tours with premium riads, desert camps, private drivers, culture, and tailor-made planning.",
};

const config = {
  eyebrow: "Premium Morocco",
  title: "Luxury Morocco tours with soul, privacy, and refined comfort.",
  subtitle: "A premium Morocco journey should feel elegant but still human: beautiful stays, private transport, thoughtful pacing, and authentic local connection.",
  primaryCta: "Plan This Journey",
  secondaryCta: "Find My Best Trip",
  pillars: [["Refined Stays", "Boutique riads, premium desert camps, and selected hotels create a smoother experience."], ["Private Flow", "The route moves at your rhythm with no forced group schedule."], ["Authentic Luxury", "The best luxury in Morocco combines comfort with real culture, not isolation from the country."]],
  routes: [["Choose the right hotel level", "Luxury can mean boutique atmosphere, privacy, spa, design, or desert comfort."], ["Control the pace", "Premium travelers often need fewer rushed stops and more time to enjoy each place."], ["Add special moments", "Private dinners, guided medina visits, hammam, desert music, and scenic pauses add depth."], ["Protect the experience", "Good planning removes friction: timing, luggage, transfers, meals, and local support."]],
  faq: [["Can Morocco be a luxury destination?", "Yes. Morocco has exceptional riads, boutique hotels, desert camps, cuisine, and private experiences."], ["Can luxury tours include the desert?", "Yes. Premium camps and private desert logistics make the Sahara comfortable and memorable."], ["Is a private driver included?", "A luxury private route usually includes private transport with a trusted driver."], ["Can we avoid tourist traps?", "Yes. Strong local planning helps avoid generic stops and create a more refined journey."]],
};

export default async function Page() {
  const result = await getServices({ q: "luxury premium", per_page: 8 }).catch(() => null);
  const fallback = await getServices({ per_page: 8 }).catch(() => null);
  const tours = result?.items?.length ? result.items : fallback?.items || [];

  return <SeoLandingPage config={config} tours={tours} />;
}
