import Image from "next/image";
import Link from "next/link";
import type { ServiceCard } from "@/lib/types";
import { money } from "@/lib/format";

export function TourCard({ tour }: { tour: ServiceCard }) {
  return (
    <Link href={tour.url || `/tour/${tour.slug}`} className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-64 overflow-hidden bg-stone-200">
        {tour.image ? (
          <Image src={tour.image} alt={tour.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" />
        ) : null}
        <div className="absolute inset-x-4 top-4 flex justify-between gap-3">
          {tour.duration ? <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-800 backdrop-blur">{tour.duration}</span> : null}
          {tour.location ? <span className="rounded-full bg-stone-950/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{tour.location}</span> : null}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold tracking-tight text-stone-950 group-hover:text-amber-800">{tour.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-stone-600">{tour.excerpt}</p>
        <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-5">
          <span className="text-sm text-stone-500">From</span>
          <span className="text-base font-bold text-stone-950">{money(tour.price)}</span>
        </div>
      </div>
    </Link>
  );
}
