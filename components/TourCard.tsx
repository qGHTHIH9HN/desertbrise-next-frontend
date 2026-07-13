import Link from "next/link";
import type { ServiceCard } from "@/lib/types";
import { money } from "@/lib/format";
import { SafeImage } from "@/components/SafeImage";

export function TourCard({ tour }: { tour: ServiceCard }) {
  return (
    <Link
      href={tour.url || `/tour/${tour.slug}`}
      className="group block overflow-hidden rounded-[1.8rem] border border-[#eadbc8] bg-white shadow-[0_18px_54px_rgba(58,37,22,.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_80px_rgba(58,37,22,.16)]"
    >
      <div className="relative h-64 overflow-hidden bg-[#d9c8b4]">
        <SafeImage
          src={tour.image}
          alt={tour.title}
          fallbackLabel="Morocco journey"
          className="h-full w-full"
          imgClassName="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-black/8 to-black/5" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {tour.duration ? (
            <span className="rounded-full bg-black/40 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-md">
              {tour.duration}
            </span>
          ) : null}
          {tour.location ? (
            <span className="rounded-full bg-white/88 px-3 py-1.5 text-xs font-bold text-[#2b1b11] shadow-lg backdrop-blur-md">
              {tour.location}
            </span>
          ) : null}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[11px] font-black uppercase tracking-[.28em] text-[#f2c373]">Private Morocco tour</p>
        </div>
      </div>

      <div className="p-6">
        <h3 className="display-font clamp-2 text-2xl font-semibold leading-7 tracking-[-.03em] text-[#2b1b11] transition group-hover:text-[#9a5d24]">
          {tour.title}
        </h3>
        <p className="clamp-3 mt-3 min-h-[4.5rem] text-sm leading-6 text-[#75675d]">
          {tour.excerpt || tour.best_for || "A private Morocco route shaped around comfort, culture and your pace."}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-[#f0e3d1] pt-5">
          <span className="text-xs font-black uppercase tracking-[.22em] text-[#a08b79]">From</span>
          <strong className="text-lg font-extrabold text-[#2b1b11]">{money(tour.price)}</strong>
        </div>
      </div>
    </Link>
  );
}
