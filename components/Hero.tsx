import Image from "next/image";
import Link from "next/link";
import type { HeroSlide } from "@/lib/types";

export function Hero({ slide }: { slide?: HeroSlide }) {
  const fallback = {
    eyebrow: "Private Morocco Travel",
    title: "Morocco journeys designed from the desert outward.",
    description: "Tailor-made Sahara journeys, trekking, cultural tours, and private travel experiences across Morocco.",
    image: "https://www.desertbrise-travel.com/public/assets/images/hero-morocco.jpg",
    link_primary: "/tours",
    label_primary: "Explore tours",
    link_secondary: "/contact",
    label_secondary: "Plan your trip",
  };
  const s = slide || fallback;

  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden bg-stone-950 text-white">
      {s.image ? <Image src={s.image} alt="Morocco desert travel" fill priority className="-z-20 object-cover" sizes="100vw" /> : null}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-stone-950/85 via-stone-950/55 to-stone-950/10" />
      <div className="mx-auto flex min-h-[78vh] max-w-7xl items-center px-5 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-300">{s.eyebrow}</p>
          <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">{s.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-100 md:text-xl">{s.description}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href={s.link_primary || "/tours"} className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-stone-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-100">
              {s.label_primary || "Explore tours"}
            </Link>
            <Link href={s.link_secondary || "/contact"} className="rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20">
              {s.label_secondary || "Plan your trip"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
