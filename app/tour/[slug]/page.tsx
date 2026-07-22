import { getService } from "@/lib/api";
import { JourneyDetail } from "@/components/JourneyDetailPage";
import { StructuredData } from "@/components/StructuredData";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildTourSchema,
} from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

const ROUTE_BASE = "/tour" as const;
const ROUTE_LABEL = "Tours";

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
      alternates: {
        canonical: `https://desertbrise-travel.com${ROUTE_BASE}/${slug}`,
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

  let service: any = null;

  try {
    const response = await getService(slug);
    service = response.service;
  } catch {
    service = null;
  }

  const schemas = [];

  if (service) {
    schemas.push(buildTourSchema(service, slug, ROUTE_BASE));
    schemas.push(
      buildBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: ROUTE_LABEL, url: ROUTE_BASE },
        { name: service.title || "Private Morocco Journey", url: `${ROUTE_BASE}/${slug}` },
      ])
    );

    const faqSchema = buildFaqSchema(service.faqs || []);
    if (faqSchema) schemas.push(faqSchema);
  }

  return (
    <>
      {schemas.length ? <StructuredData data={schemas} /> : null}
      <JourneyDetail slug={slug} />
    </>
  );
}
