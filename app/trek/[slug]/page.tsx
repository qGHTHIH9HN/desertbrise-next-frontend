import { getService } from "@/lib/api";
import { JourneyDetail } from "@/components/JourneyDetailPage";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  try {
    const { service } = await getService(slug);

    return {
      title: service.meta_title || `${service.title} | DesertBrise Travel`,
      description:
        service.meta_description ||
        service.excerpt ||
        "Private Morocco travel experience by DesertBrise Travel.",
      openGraph: {
        title: service.meta_title || service.title,
        description: service.meta_description || service.excerpt,
        images: service.image ? [service.image] : [],
      },
    };
  } catch {
    return {
      title: "Private Morocco Journey | DesertBrise Travel",
      description: "Private Morocco travel experience by DesertBrise Travel.",
    };
  }
}

export default async function DetailPage({ params }: Props) {
  const { slug } = await params;
  return <JourneyDetail slug={slug} />;
}
