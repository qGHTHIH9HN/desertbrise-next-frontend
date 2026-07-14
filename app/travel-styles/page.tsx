import Link from "next/link";
import { getPages } from "@/lib/api";

export const revalidate = 60;

type AdminPageCard = {
  id?: number | string;
  title?: string;
  slug?: string;
  excerpt?: string;
  image?: string;
  hero_image?: string;
  featured_image?: string;
  secondary_image?: string;
  thumbnail?: string;
  hero_subtitle?: string;
  meta_description?: string;
};

function getImage(page: AdminPageCard) {
  return (
    page.image ||
    page.hero_image ||
    page.featured_image ||
    page.secondary_image ||
    page.thumbnail ||
    ""
  );
}

export default async function TravelStylesPage() {
  let pages: AdminPageCard[] = [];

  try {
    const response = await getPages({ type: "style" });
    pages = (response.items || []) as AdminPageCard[];
  } catch {
    pages = [];
  }

  return (
    <main className="bg-[#fff8ee] text-[#2b1b11]">
      <section className="px-5 pb-14 pt-28 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="premium-eyebrow">Dynamic travel styles</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-end">
            <h1 className="display-font text-6xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-8xl">
              Travel Morocco in the style that fits you.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#75675d]">
              These pages come from your PHP admin. You can create luxury tours,
              trekking, family trips, culture, food, retreats, and more.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pages.length ? (
            pages.map((page, index) => {
              const image = getImage(page);
              const slug = page.slug || "";
              const text =
                page.excerpt ||
                page.meta_description ||
                page.hero_subtitle ||
                "A private Morocco travel style edited from your admin.";

              return (
                <Link
                  key={`${page.id || slug}-${index}`}
                  href={`/travel-styles/${slug}`}
                  className="group overflow-hidden rounded-[2rem] border border-[#eadbc8] bg-white shadow-[0_24px_80px_rgba(58,37,22,.08)] transition duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-72 overflow-hidden bg-[#eadbc8]">
                    {image ? (
                      <img
                        src={image}
                        alt={page.title || "Morocco travel style"}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,#f0bd72,#8d5524_48%,#2b1b11)]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-xs font-black uppercase tracking-[0.32em] text-[#f4c36e]">
                        Travel Style
                      </p>
                      <h2 className="display-font mt-2 text-4xl font-semibold leading-none text-white">
                        {page.title}
                      </h2>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="line-clamp-4 text-[15px] leading-7 text-[#75675d]">
                      {text}
                    </p>
                    <div className="mt-6 inline-flex rounded-full bg-[#f5eadb] px-4 py-2 text-sm font-black text-[#8d5524]">
                      Explore {page.title} →
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full rounded-[2rem] border border-[#eadbc8] bg-white p-10 text-[#75675d]">
              No travel style pages found yet. In the PHP admin, create a page with page type
              <strong> style</strong>.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
