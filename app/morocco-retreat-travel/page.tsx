import { SeoLandingPage } from "@/components/SeoLandingSections";
import { getServices } from "@/lib/api";

export const metadata = {
  title: "Morocco Retreat Travel | DesertBrise Travel",
  description: "Private Morocco retreat travel combining desert silence, yoga, mindset, trekking, and slow healing journeys.",
};

const config = {
  eyebrow: "Retreat journeys",
  title: "Morocco retreat travel for silence, renewal, and deep space.",
  subtitle: "A retreat-style Morocco journey can combine desert stillness, yoga, gentle trekking, cultural grounding, and quiet time away from daily noise.",
  primaryCta: "Plan This Journey",
  secondaryCta: "Find My Best Trip",
  pillars: [["Silence as Luxury", "The desert gives space to breathe, reset, and reconnect."], ["Gentle Structure", "Yoga, walks, coaching, journaling, fire circles, and rest can be balanced carefully."], ["Private Container", "A retreat journey can be shaped for individuals, couples, small groups, or teachers."]],
  routes: [["Define the intention", "Rest, clarity, movement, healing, creativity, or spiritual renewal change the route design."], ["Choose the right setting", "M'Hamid, desert camps, quiet kasbahs, and remote routes can support a retreat atmosphere."], ["Balance activity and rest", "The best retreat routes leave space instead of filling every hour."], ["Support the group", "Food, transport, privacy, safety, and facilitation needs should be planned before arrival."]],
  faq: [["Can Morocco be used for retreats?", "Yes. The desert and mountains are powerful environments for retreat-style travel."], ["Can yoga be included?", "Yes. Yoga and gentle movement can be included depending on the group and teacher."], ["Is this only for groups?", "No. Retreat-style routes can also be made for individuals or couples."], ["Where is best for a desert retreat?", "M'Hamid and the surrounding desert are strong choices for quiet, space, and depth."]],
};

export default async function Page() {
  const result = await getServices({ q: "yoga retreat silence", per_page: 8 }).catch(() => null);
  const fallback = await getServices({ per_page: 8 }).catch(() => null);
  const tours = result?.items?.length ? result.items : fallback?.items || [];

  return <SeoLandingPage config={config} tours={tours} />;
}
