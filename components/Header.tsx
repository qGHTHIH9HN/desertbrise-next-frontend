import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Morocco Tours" },
  { href: "/blog", label: "Travel Journal" },
  { href: "/contact", label: "Plan a Trip" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-[#fbf6ed]/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-stone-200 transition group-hover:scale-105">
            <img
              src="https://desertbrise-travel.com/public/assets/uploads/site/logo_1781542397_5b3f7e2e.png"
              alt="DesertBrise Travel"
              className="h-10 w-10 object-contain"
            />
          </span>
          <span className="leading-tight">
            <span className="block text-[13px] font-black uppercase tracking-[0.28em] text-stone-950">DesertBrise</span>
            <span className="block text-[12px] font-medium text-stone-500">Private Morocco Travel</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-[13px] font-bold text-stone-700 transition hover:text-amber-800">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="https://wa.me/212600454881" className="hidden rounded-full border border-stone-300 bg-white px-5 py-2.5 text-[13px] font-bold text-stone-900 transition hover:border-stone-950 md:inline-flex">
            WhatsApp
          </a>
          <Link href="/contact" className="rounded-full bg-stone-950 px-5 py-2.5 text-[13px] font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-800">
            Start Planning
          </Link>
        </div>
      </div>
    </header>
  );
}
