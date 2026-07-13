import Link from "next/link";
import { CTA } from "@/components/CTA";
import { DynamicPageCard } from "@/components/DynamicPageCard";
import { TourCard } from "@/components/TourCard";
import { getPages, getServices } from "@/lib/api";

export const revalidate = 60;

export const metadata = {
  title: "Morocco Destinations | DesertBrise Travel",
  description: "Explore editable Morocco destination pages created in the DesertBrise admin: Sahara, Marrakech, Atlas Mountains, Fes, Essaouira and more.",
};

export default async function DestinationsPage() {
  const [pagesData, toursData] = await Promise.all([
    getPages({ type: "hub", per_page: 50 }).catch(() => null),
    getServices({ per_page: 6 }).catch(() => null),
  ]);

  const pages = pagesData?.items || [];
  const tours = toursData?.items || [];
  const hero = pages[0];

  return (
    <>
      <section className="relative isolate min-h-[86vh] overflow-hidden bg-[#1d130c] px-5 pb-24 pt-36 text-white sm:px-8 lg:px-10">
        {hero?.image ? <img src={hero.image} alt="Morocco destinations" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-68" /> : null}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_20%,rgba(215,154,68,.34),transparent_27%),linear-gradient(90deg,rgba(18,10,6,.96),rgba(18,10,6,.78),rgba(18,10,6,.25))]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-52 bg-gradient-to-t from-[#fffaf2] to-transparent" />

        <div className="mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <p className="premium-eyebrow text-[#f2c373]">Editable Morocco destinations</p>
            <h1 className="display-font mt-5 max-w-5xl text-6xl font-semibold leading-[.9] tracking-[-.055em] md:text-8xl">
              Destination pages you control from your PHP admin.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-9 text-white/84">
              Every card below comes from your existing admin Pages area. Create a page, choose page type “hub”, add images, text, related tours, guides and FAQ — then it appears here automatically.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="premium-btn bg-[#d79a44] text-[#1d130c] shadow-[0_22px_54px_rgba(215,154,68,.32)] hover:bg-[#efbd73]">
                Build My Route →
              </Link>
              <Link href="/tours" className="premium-btn border border-white/22 bg-white/10 text-white backdrop-blur-md hover:bg-white/16">
                See Tours
              </Link>
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-white/16 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
            <p className="premium-eyebrow text-[#f2c373]">CMS control</p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-white/78">
              <p><strong className="text-white">Edit:</strong> admin → Pages → Edit page</p>
              <p><strong className="text-white">Set type:</strong> hub</p>
              <p><strong className="text-white">URL:</strong> /destinations/page-slug</p>
              <p><strong className="text-white">Refresh:</strong> changes appear in about 60 seconds</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="premium-eyebrow">Destination pages</p>
              <h2 className="display-font mt-3 text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
                Created in your admin, displayed in Next.js.
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-9 text-[#75675d]">
              Add Sahara, Marrakech, Atlas Mountains, Fes, Chefchaouen, Essaouira, Ouarzazate or any custom destination. No code needed after this dynamic upgrade.
            </p>
          </div>

          {pages.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {pages.map((page) => <DynamicPageCard key={page.id} page={page} label="Destination" />)}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-[#eadbc8] bg-white p-10 text-center shadow-[0_18px_54px_rgba(58,37,22,.08)]">
              <h2 className="display-font text-4xl font-semibold tracking-[-.04em] text-[#2b1b11]">No destination pages yet.</h2>
              <p className="mx-auto mt-4 max-w-2xl text-[#75675d]">Create a page in your PHP admin, set page type to “hub”, publish it, and it will appear here.</p>
            </div>
          )}
        </div>
      </section>

      {tours.length ? (
        <section className="bg-[#f6ecdd] px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="premium-eyebrow">Private Morocco journeys</p>
            <h2 className="display-font mt-3 text-5xl font-semibold leading-[.98] tracking-[-.04em] text-[#2b1b11] md:text-7xl">Tours connected to your destinations.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
            </div>
          </div>
        </section>
      ) : null}

      <CTA eyebrow="Destination planning" title="Tell us where you want to feel Morocco." text="We will shape the private route, rhythm, hotels, guides and desert or city moments around your travel style." />
    </>
  );
}
