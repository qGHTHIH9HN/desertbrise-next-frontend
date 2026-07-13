import { TourCard } from "@/components/TourCard";
import { getServices } from "@/lib/api";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function value(params: Record<string, string | string[] | undefined>, key: string) {
  const val = params[key];
  return Array.isArray(val) ? val[0] || "" : val || "";
}

export const metadata = {
  title: "Private Morocco Tours | DesertBrise Travel",
  description: "Explore private Morocco tours, desert journeys, treks, day trips, and tailor-made experiences.",
};

export default async function ToursPage({ searchParams }: Props) {
  const sp = await searchParams;
  const query = {
    q: value(sp, "q"),
    location: value(sp, "location"),
    duration: value(sp, "duration"),
    min_price: value(sp, "min_price"),
    max_price: value(sp, "max_price"),
    sort: value(sp, "sort") || "latest",
    group_type: value(sp, "group_type"),
    guidance_type: value(sp, "guidance_type"),
    adventure_type: value(sp, "adventure_type"),
    budget_class: value(sp, "budget_class"),
    per_page: 24,
  };
  const { items, pagination } = await getServices(query);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#1d130c] px-5 py-24 text-white sm:px-8 lg:px-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_0%,rgba(215,154,68,.22),transparent_38%),linear-gradient(135deg,#1d130c,#3a2415)]" />
        <div className="mx-auto max-w-7xl">
          <p className="premium-eyebrow text-[#efbd73]">Curated Morocco</p>
          <h1 className="display-font mt-5 max-w-4xl text-6xl font-semibold leading-[.94] tracking-[-.055em] md:text-8xl">Journeys designed with intention, privacy, and place.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">Search every tour from your PHP CMS without losing the emotional premium design.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold">
            <span className="rounded-full bg-white/12 px-4 py-2">{pagination.total} curated journeys</span>
            <span className="rounded-full bg-white/12 px-4 py-2">Private planning</span>
            <span className="rounded-full bg-white/12 px-4 py-2">Local experts</span>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[330px_1fr]">
          <aside className="h-fit rounded-[2rem] border border-[#eadbc8] bg-white p-6 shadow-[0_18px_54px_rgba(58,37,22,.07)] lg:sticky lg:top-24">
            <p className="premium-eyebrow">Refine collection</p>
            <h2 className="display-font mt-3 text-3xl font-semibold text-[#2b1b11]">Find your ideal itinerary</h2>
            <form className="mt-6 grid gap-4" action="/tours">
              <Field label="Search" name="q" defaultValue={query.q} placeholder="Desert, Marrakech, luxury..." />
              <Field label="Location" name="location" defaultValue={query.location} placeholder="Marrakech, Casablanca..." />
              <Field label="Duration" name="duration" defaultValue={query.duration} placeholder="4 Days, 7 Days..." />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Min price" name="min_price" defaultValue={query.min_price} type="number" />
                <Field label="Max price" name="max_price" defaultValue={query.max_price} type="number" />
              </div>
              <Select label="Sort" name="sort" defaultValue={query.sort} options={[["latest", "Latest"], ["price_asc", "Price low → high"], ["price_desc", "Price high → low"], ["duration_asc", "Duration"]]} />
              <Select label="Group Type" name="group_type" defaultValue={query.group_type} options={[["", "All"], ["private", "Private"], ["group", "Group"]]} />
              <Select label="Guidance" name="guidance_type" defaultValue={query.guidance_type} options={[["", "All"], ["self", "Self"], ["partially_guided", "Partially guided"], ["fully_guided", "Fully guided"]]} />
              <Select label="Adventure" name="adventure_type" defaultValue={query.adventure_type} options={[["", "All"], ["relax", "Relax"], ["moderate", "Moderate"], ["active", "Active"], ["extreme", "Extreme"]]} />
              <Select label="Budget" name="budget_class" defaultValue={query.budget_class} options={[["", "All"], ["budget", "Budget"], ["comfort", "Comfort"], ["premium", "Premium"], ["luxury", "Luxury"]]} />
              <button className="premium-btn bg-[#2b1b11] text-white hover:bg-[#3b281b]">Apply filters</button>
              <a href="/tours" className="text-center text-sm font-extrabold text-[#8b541f]">Reset filters</a>
            </form>
          </aside>

          <main>
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="premium-eyebrow">Available experiences</p>
                <h2 className="display-font mt-2 text-5xl font-semibold tracking-[-.04em] text-[#2b1b11]">{pagination.total} journeys found</h2>
              </div>
            </div>
            {items.length ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {items.map((tour) => <TourCard key={tour.id} tour={tour} />)}
              </div>
            ) : (
              <div className="premium-card rounded-[2rem] p-10 text-[#75675d]">No tours found. Try removing filters.</div>
            )}
          </main>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, defaultValue, placeholder, type = "text" }: { label: string; name: string; defaultValue?: string; placeholder?: string; type?: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-[#2b1b11]">
      {label}
      <input name={name} defaultValue={defaultValue} placeholder={placeholder} type={type} className="rounded-2xl border border-[#eadbc8] bg-[#fffaf2] px-4 py-3 text-sm font-semibold text-[#2b1b11] outline-none focus:border-[#d79a44]" />
    </label>
  );
}

function Select({ label, name, defaultValue, options }: { label: string; name: string; defaultValue?: string; options: Array<[string, string]> }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-[#2b1b11]">
      {label}
      <select name={name} defaultValue={defaultValue} className="rounded-2xl border border-[#eadbc8] bg-[#fffaf2] px-4 py-3 text-sm font-semibold text-[#2b1b11] outline-none focus:border-[#d79a44]">
        {options.map(([val, label]) => <option key={val || label} value={val}>{label}</option>)}
      </select>
    </label>
  );
}
