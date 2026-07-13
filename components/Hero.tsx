import Image from "next/image";
import Link from "next/link";
import type { HeroSlide } from "@/lib/types";

export function Hero({ slide }: { slide?: HeroSlide }) {
  const fallback = {
    eyebrow: "Private Morocco Journeys",
    title: "Morocco, designed with desert-born expertise.",
    description: "Tailor-made Sahara journeys, cultural routes, luxury private tours, trekking, and slow travel experiences across Morocco.",
    image: "https://desertbrise-travel.com/public/assets/uploads/services/service_1782453493_cbd91aa5.webp",
    link_primary: "/contact",
    label_primary: "Design my trip",
    link_secondary: "/tours",
    label_secondary: "Explore tours",
  };

  const s = slide || fallback;

  return (
    <section className="relative isolate overflow-hidden bg-stone-950 text-white">
      <div className="absolute inset-0 -z-30">
        {s.image ? <Image src={s.image} alt="Private Morocco travel" fill priority className="object-cover" sizes="100vw" /> : null}
      </div>
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_70%_20%,rgba(251,191,36,.22),transparent_32%),linear-gradient(90deg,rgba(15,23,42,.94),rgba(28,25,23,.72),rgba(28,25,23,.18))]" />
      <div className="absolute bottom-0 left-0 right-0 -z-10 h-40 bg-gradient-to-t from-[#fbf6ed] to-transparent" />

      <div className="mx-auto grid min-h-[86vh] max-w-7xl items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_.75fr] lg:px-8">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-amber-200 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            {s.eyebrow || "Private Morocco Journeys"}
          </div>

          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
            {s.title || fallback.title}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-9 text-stone-100 md:text-xl">
            {s.description || fallback.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={s.link_primary || "/contact"} className="rounded-full bg-amber-300 px-8 py-4 text-sm font-black text-stone-950 shadow-2xl shadow-amber-950/30 transition hover:-translate-y-1 hover:bg-white">
              {s.label_primary || "Design my trip"}
            </Link>
            <Link href={s.link_secondary || "/tours"} className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:text-stone-950">
              {s.label_secondary || "Explore tours"}
            </Link>
          </div>

          <div className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
            {[
              ["Local", "Moroccan expertise"],
              ["Private", "Tailor-made routes"],
              ["Sahara", "Desert-born planning"],
            ].map(([big, small]) => (
              <div key={big} className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                <div className="text-2xl font-black text-white">{big}</div>
                <div className="mt-1 text-sm text-stone-300">{small}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
            <div className="rounded-[1.5rem] bg-[#fbf6ed] p-6 text-stone-950">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-800">Signature planning</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Private itinerary, not a template.</h2>
              <div className="mt-6 grid gap-4">
                {["Route designed around your pace", "Hotels, desert camp, drivers and guides", "Cultural depth from real local knowledge"].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                    <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-stone-950 text-[11px] font-black text-white">✓</span>
                    <p className="text-sm font-semibold leading-6 text-stone-700">{item}</p>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="mt-6 inline-flex w-full justify-center rounded-full bg-stone-950 px-6 py-3.5 text-sm font-black text-white transition hover:bg-amber-800">
                Request a custom route
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
