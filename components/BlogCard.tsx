import Image from "next/image";
import Link from "next/link";
import type { ServiceCard } from "@/lib/types";
import { money } from "@/lib/format";

export function TourCard({ tour }: { tour: ServiceCard }) {
  return (
    <Link href={tour.url || `/tour/${tour.slug}`} className="group block overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-72 overflow-hidden bg-stone-200">
        {tour.image ? <Image src={tour.image} alt={tour.title} fill className="object-cover transition duration-700 group-hover:scale-110" sizes="(min-width: 1024px) 33vw, 100vw" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/10 to-transparent" />
        <div className="absolute left-4 right-4 top-4 flex flex-wrap justify-between gap-2">
          {tour.duration ? <span className="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-black text-stone-950 shadow-sm backdrop-blur">{tour.duration}</span> : null}
          {tour.location ? <span className="rounded-full bg-stone-950/70 px-3 py-1.5 text-[11px] font-black text-white backdrop-blur">{tour.location}</span> : null}
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-200">Private Morocco Tour</p>
          <h3 className="mt-2 text-2xl font-black leading-tight tracking-tight text-white">{tour.title}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="line-clamp-3 text-sm leading-7 text-stone-600">{tour.excerpt}</p>
        <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-5">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-stone-400">From</span>
          <span className="text-lg font-black text-stone-950">{money(tour.price)}</span>
        </div>
      </div>
    </Link>
  );
}
