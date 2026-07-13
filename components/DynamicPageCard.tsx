import Link from "next/link";
import type { CmsPageCard } from "@/lib/types";
import { SafeImage } from "@/components/SafeImage";

export function DynamicPageCard({ page, label = "Explore" }: { page: CmsPageCard; label?: string }) {
  return (
    <Link
      href={page.url}
      className="group block overflow-hidden rounded-[2rem] border border-[#eadbc8] bg-white shadow-[0_18px_54px_rgba(58,37,22,.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_90px_rgba(58,37,22,.14)]"
    >
      <div className="relative h-72 overflow-hidden bg-[#d9c8b4]">
        <SafeImage
          src={page.image}
          alt={page.title}
          fallbackLabel={label}
          className="h-full w-full"
          imgClassName="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1d130c]/86 via-[#1d130c]/22 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <p className="text-[11px] font-black uppercase tracking-[.28em] text-[#f2c373]">{label}</p>
          <h3 className="display-font mt-2 text-4xl font-semibold leading-none tracking-[-.04em]">{page.title}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="clamp-3 text-sm leading-7 text-[#75675d]">
          {page.excerpt || page.hero_subtitle || "A private Morocco experience shaped with local knowledge, comfort and a human touch."}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#8b541f]">
          Open page <span>→</span>
        </div>
      </div>
    </Link>
  );
}
