import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { TourCard } from "@/components/TourCard";
import { getHome } from "@/lib/api";

const travelStyles = [
  { title: "Sahara Desert", text: "Private camps, camel rides, Erg Chigaga, M'Hamid, dunes and silence.", icon: "☀" },
  { title: "Imperial Cities", text: "Marrakech, Fes, Meknes, Rabat, medinas, palaces and living history.", icon: "◆" },
  { title: "Atlas Mountains", text: "Berber villages, scenic passes, valleys, kasbahs and mountain culture.", icon: "△" },
  { title: "Tailor-Made Luxury", text: "Beautiful riads, private drivers, refined pacing and elegant logistics.", icon: "✦" },
];

const reasons = [
  "Real local planning from Morocco, not generic copied itineraries.",
  "Private tours shaped around pace, comfort, budget and travel style.",
  "Deep desert identity: Sahara knowledge, not only city tourism.",
  "Flexible route design across all Morocco: desert, cities, mountains and coast.",
];

export default async function HomePage() {
  const data = await getHome();
  const featuredTours = data.services?.slice(0, 6) || [];
  const posts = data.posts?.slice(0, 3) || [];

  return (
    <>
      <Hero slide={data.hero_slides?.[0]} />

      <section className="relative z-10 -mt-12 px-5 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-[2rem] border border-stone-200 bg-white/95 p-4 shadow-2xl shadow-stone-950/10 backdrop-blur md:grid-cols-4">
          {[
            ["100%", "Private trips"],
            ["Local", "Morocco team"],
            ["Sahara", "Desert roots"],
            ["Custom", "Routes & comfort"],
          ].map(([big, small]) => (
            <div key={big} className="rounded-[1.5rem] bg-[#fbf6ed] p-5 text-center">
              <div className="text-3xl font-black tracking-tight text-stone-950">{big}</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-stone-500">{small}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-amber-800">Travel styles</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-stone-950 md:text-6xl">Choose the Morocco you want to feel.</h2>
            <p className="mt-6 text-lg leading-8 text-stone-600">From the silence of the Sahara to the rhythm of ancient medinas, every journey is designed with purpose, comfort and cultural depth.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {travelStyles.map((style) => (
              <div key={style.title} className="group rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-stone-950 text-2xl text-amber-300 transition group-hover:bg-amber-300 group-hover:text-stone-950">{style.icon}</div>
                <h3 className="mt-6 text-2xl font-black tracking-tight text-stone-950">{style.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{style.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-amber-800">Featured private journeys</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-stone-950 md:text-6xl">Routes crafted for travelers who want more than a tour.</h2>
              <p className="mt-5 text-lg leading-8 text-stone-600">Your PHP CMS content, now displayed inside a premium Next.js interface with stronger visual hierarchy.</p>
            </div>
            <Link href="/tours" className="inline-flex rounded-full border border-stone-300 bg-white px-7 py-4 text-sm font-black text-stone-950 transition hover:bg-stone-950 hover:text-white">
              View all tours
            </Link>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {featuredTours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-stone-950 px-5 py-24 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="relative min-h-[560px] overflow-hidden rounded-[2.5rem] bg-stone-800 shadow-2xl">
            <img src="https://desertbrise-travel.com/public/assets/uploads/services/service_1782507486_bd3cd0d5.webp" alt="Private Morocco journey" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/10 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 rounded-[1.5rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-200">Signature promise</p>
              <p className="mt-2 text-2xl font-black leading-tight">A journey planned like a story, not a package.</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-amber-300">Why DesertBrise</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-6xl">Built from local knowledge, not from templates.</h2>
            <p className="mt-6 text-lg leading-8 text-stone-300">Your strongest advantage is your origin: real Morocco, real desert culture, real travel operations. The design must communicate trust, depth, and premium planning immediately.</p>
            <div className="mt-8 grid gap-4">
              {reasons.map((reason) => (
                <div key={reason} className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-300 text-sm font-black text-stone-950">✓</span>
                  <p className="text-sm font-semibold leading-7 text-stone-200">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-amber-800">Planning experience</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-stone-950 md:text-6xl">From first idea to final route.</h2>
              <p className="mt-6 text-lg leading-8 text-stone-600">A premium travel site should not only show tours. It should guide the traveler toward trust and action.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["01", "Tell us your dates, people and travel style."],
                ["02", "We design a private Morocco route around your pace."],
                ["03", "You approve, refine and travel with confidence."],
              ].map(([num, text]) => (
                <div key={num} className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
                  <div className="text-sm font-black uppercase tracking-[0.24em] text-amber-800">{num}</div>
                  <p className="mt-6 text-lg font-black leading-7 text-stone-950">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-amber-800">Travel journal</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-stone-950 md:text-6xl">Advice that helps travelers choose better.</h2>
              <p className="mt-5 text-lg leading-8 text-stone-600">Useful guides from your blog, transformed into premium editorial cards.</p>
            </div>
            <Link href="/blog" className="inline-flex rounded-full border border-stone-300 bg-white px-7 py-4 text-sm font-black text-stone-950 transition hover:bg-stone-950 hover:text-white">
              Read the journal
            </Link>
          </div>
          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => <BlogCard key={post.id} post={post} />)}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
