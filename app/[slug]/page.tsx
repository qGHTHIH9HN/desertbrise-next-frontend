import { getCmsPage, getServices } from "@/lib/api";
import { YogaRetreatPage } from "@/components/YogaRetreatPage";
import { StyleExperiencePage } from "@/components/StyleExperiencePage";
import { notFound, redirect } from "next/navigation";

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
  const data = await getCmsPage(slug).catch(() => null);

  if (!data?.page) {
    return {
      title: "DesertBrise Travel",
      description: "Private Morocco travel experiences.",
    };
  }

  const page = data.page;

  return {
    title: page.meta_title || `${page.title} | DesertBrise Travel`,
    description:
      page.meta_description ||
      page.excerpt ||
      page.hero_subtitle ||
      "Private Morocco travel experience by DesertBrise Travel.",
    openGraph: {
      title: page.meta_title || page.title,
      description: page.meta_description || page.excerpt || page.hero_subtitle,
      images: page.image ? [page.image] : [],
    },
    alternates: {
      canonical: `https://desertbrise-travel.com/${slug}`,
    },
  };
}

export default async function RootCmsPage({ params }: Props) {
  const { slug } = await params;
  const data = await getCmsPage(slug).catch(() => null);

  if (!data?.page) {
    notFound();
  }

  const page = data.page as any;
  const pageType = String(page.page_type || page.type || "").toLowerCase();

  if ((pageType.includes("hub") || pageType.includes("destination")) && !isYogaPage(page, slug)) {
    redirect(`/destinations/${slug}`);
  }

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

  if (isYogaPage(page, slug)) {
    return <YogaRetreatPage page={page} services={services} posts={selectedPosts} />;
  }

  return <StyleExperiencePage page={page} services={services} posts={selectedPosts} />;
}
