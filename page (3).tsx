import { notFound } from "next/navigation";
import { DynamicLandingPage } from "@/components/DynamicLandingPage";
import { getCmsPage } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 60;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const { page } = await getCmsPage(slug);
    return {
      title: page.meta_title || `${page.title} | DesertBrise Travel`,
      description: page.meta_description || page.excerpt,
    };
  } catch {
    return {};
  }
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  let page;
  try {
    const data = await getCmsPage(slug);
    page = data.page;
  } catch {
    notFound();
  }

  return <DynamicLandingPage page={page} backHref="/destinations" backLabel="All destinations" />;
}
