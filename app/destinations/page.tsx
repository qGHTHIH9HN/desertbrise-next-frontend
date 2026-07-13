import Link from "next/link";
import { getPages } from "@/lib/api";

export const revalidate = 60;

type AdminPageCard = {
  id?: number | string;
  title?: string;
  slug?: string;
  url?: string;
  page_type?: string;
  excerpt?: string;
  image?: string;
  secondary_image?: string;
  hero_subtitle?: string;
  meta_description?: string;
};

function pageImage(page: AdminPageCard) {
  return page.image || page.secondary_image || "";
}

export default async function DestinationsPage() {
  let pages: AdminPageCard[] = [];

  try {
    const response = await getPages({ type: "hub" });
    pages = (response.items || []) as AdminPageCard[];
  } catch {
    pages = [];
  }

  return (
    <main className="bg-[#fff8ee] text-[#2b1b11]">
      <section className="px-5 pb-16 pt-28 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="premium-eyebrow">Morocco destinations from your admin</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-end">
            <h1 className="display-font text-6xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-8xl">
              Choose the place that calls you.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#75675d]">
              These destination pages are loaded dynamically from your PHP admin. Edit the title,
              image, excerpt, and SEO in the admin, and the Next.js page updates automatically.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pages.length ? (
            pages.map((page, index) => {
              const image = pageImage(page);
              const slug = page.slug || "";
              return (
                <Link
                  key={`${page.id || slug}-${index}`}
                  href={`/destinations/${slug}`}
                  className="group overflow-hidden rounded-[2rem] border border-[#eadbc8] bg-white shadow-[0_22px_70px_rgba(58,37,22,.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(58,37,22,.15)]"
                >
                  <div className="relative h-72 overflow-hidden bg-[#eadbc8]">
                    {image ? (
                      <img
                        src={image}
                        alt={page.title || "Morocco destination"}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[#d79a44] via-[#81502e] to-[#2b1b11]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-xs font-black uppercase tracking-[0.32em] text-[#f4c36e]">
                        Destination
                      </p>
                      <h2 className="display-font mt-2 text-4xl font-semibold leading-none text-white">
                        {page.title}
                      </h2>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="line-clamp-4 text-[15px] leading-7 text-[#75675d]">
                      {page.excerpt || page.meta_description || page.hero_subtitle}
                    </p>
                    <div className="mt-6 text-sm font-black text-[#8d5524]">
                      Explore {page.title} →
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full rounded-[2rem] border border-[#eadbc8] bg-white p-10 text-[#75675d]">
              No destination pages found yet. Create pages in your PHP admin with page type
              <strong> hub</strong>.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
