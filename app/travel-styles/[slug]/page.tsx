import { getCmsPage, getServices } from "@/lib/api";
import { StyleExperiencePage } from "@/components/StyleExperiencePage";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

function keywordFromPage(page: any, slug: string) {
  const text = `${slug} ${page?.title || ""}`.toLowerCase();

  if (text.includes("yoga") || text.includes("retreat") || text.includes("wellness")) return "yoga retreat";
  if (text.includes("trek") || text.includes("hiking") || text.includes("adventure")) return "trek";
  if (text.includes("luxury") || text.includes("premium")) return "luxury";
  if (text.includes("family")) return "family";
  if (text.includes("desert") || text.includes("sahara")) return "desert";

  return page?.title || slug;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  try {
    const { page } = await getCmsPage(slug);

    return {
      title: page.meta_title || `${page.title} | DesertBrise Travel`,
      description:
        page.meta_description ||
        page.excerpt ||
        page.hero_subtitle ||
        "Private Morocco travel style by DesertBrise Travel.",
      openGraph: {
        title: page.meta_title || page.title,
        description: page.meta_description || page.excerpt || page.hero_subtitle,
        images: page.image ? [page.image] : [],
      },
      alternates: {
        canonical: `https://desertbrise-travel.com/travel-styles/${slug}`,
      },
    };
  } catch {
    return {
      title: "Private Morocco Travel Style | DesertBrise Travel",
      description: "Private Morocco travel style by DesertBrise Travel.",
    };
  }
}

export default async function TravelStyleDetailPage({ params }: Props) {
  const { slug } = await params;
  const { page } = await getCmsPage(slug);

  const selectedServices = Array.isArray(page.services) ? page.services : [];
  const selectedPosts = Array.isArray(page.posts) ? page.posts : [];

  const matchingServices = await getServices({
    q: keywordFromPage(page, slug),
    per_page: 9,
  }).catch(() => null);

  const fallbackServices = await getServices({ per_page: 9 }).catch(() => null);

  const services =
    selectedServices.length
      ? selectedServices
      : matchingServices?.items?.length
        ? matchingServices.items
        : fallbackServices?.items || [];

  return <StyleExperiencePage page={page} services={services} posts={selectedPosts} />;
}
