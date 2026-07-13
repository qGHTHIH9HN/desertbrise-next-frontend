import { getService } from "@/lib/api";
import { JourneyDetail } from "@/components/JourneyDetailPage";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const { service } = await getService(slug);
    return { title: service.meta_title || `${service.title} | DesertBrise Travel`, description: service.meta_description || service.excerpt };
  } catch {
    return {};
  }
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;
  return <JourneyDetail slug={slug} />;
}
