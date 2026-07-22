import { getCmsPage, getServices } from "@/lib/api";
import { YogaRetreatPage } from "@/components/YogaRetreatPage";
import { StyleExperiencePage } from "@/components/StyleExperiencePage";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

function pageKey(page: any, slug: string) {
  return `${slug} ${page?.title || ""} ${page?.meta_title || ""}`.toLowerCase();
}

function isYogaPage(page: any, slug: string) {
  const key = pageKey(page, slug);
  return key.includes("yoga") || key.includes("retreat") || key.includes("wellness");
}

function keywordFromPage(page: any, slug: string) {
  const key = pageKey(page, slug);

  if (key.includes("mountain") || key.includes("atlas")) return "mountain yoga retreat atlas";
  if (key.includes("desert") || key.includes("sahara")) return "desert yoga retreat";
  if (key.includes("yoga") || key.includes("retreat") || key.includes("wellness")) return "yoga retreat";
  if (key.includes("trek") || key.includes("hiking") || key.includes("adventure")) return "trek";
  if (key.includes("luxury") || key.includes("premium")) return "luxury";
  if (key.includes("family")) return "family";

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
        canonical: `https://desertbrise-travel.com/${slug}`,
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

  const pageAny = page as any;
  const selectedServices = Array.isArray(pageAny.services) ? pageAny.services : [];
  const selectedPosts = Array.isArray(pageAny.posts) ? pageAny.posts : [];

  const matchingServices = await getServices({
    q: keywordFromPage(pageAny, slug),
    per_page: 9,
  }).catch(() => null);

  const fallbackServices = await getServices({ per_page: 9 }).catch(() => null);

  const services =
    selectedServices.length
      ? selectedServices
      : matchingServices?.items?.length
        ? matchingServices.items
        : fallbackServices?.items || [];

  if (isYogaPage(pageAny, slug)) {
    return <YogaRetreatPage page={pageAny} services={services} posts={selectedPosts} />;
  }

  return <StyleExperiencePage page={pageAny} services={services} posts={selectedPosts} />;
}
