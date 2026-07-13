import Link from "next/link";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-5 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/50 bg-[#fffaf2]/92 px-3 py-2.5 shadow-[0_18px_50px_rgba(43,27,17,.10)] backdrop-blur-xl lg:px-5">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-[#eadbc8] bg-white text-sm font-black tracking-[-.08em] text-[#2b1b11] shadow-sm">
            <img src="https://www.desertbrise-travel.com/public/assets/uploads/site/logo_1781542397_5b3f7e2e.png" alt="DesertBrise Travel" className="h-full w-full object-contain p-1" />
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block text-[.95rem] font-extrabold uppercase tracking-[.28em] text-[#2b1b11]">DesertBrise</span>
            <span className="mt-1 block text-[.68rem] font-semibold uppercase tracking-[.14em] text-[#8c725e]">Private Morocco Travel</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-bold text-[#3a2a20] xl:flex">
          <Link href="/" className="transition hover:text-[#a5692b]">Home</Link>
          <Link href="/tours" className="transition hover:text-[#a5692b]">Morocco Tours</Link>
          <Link href="/destinations" className="transition hover:text-[#a5692b]">Destinations</Link>
          <Link href="/travel-styles" className="transition hover:text-[#a5692b]">Travel Styles</Link>
          <Link href="/blog" className="transition hover:text-[#a5692b]">Travel Journal</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/contact" className="hidden rounded-full border border-[#eadbc8] bg-white/70 px-5 py-3 text-sm font-extrabold text-[#2b1b11] shadow-sm transition hover:-translate-y-0.5 hover:bg-white lg:inline-flex">
            WhatsApp
          </Link>
          <Link href="/contact" className="rounded-full bg-[#2b1b11] px-4 py-3 text-xs font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#7a4a1f] sm:px-6 sm:text-sm">
            Start Planning
          </Link>
        </div>
      </div>
    </header>
  );
}
