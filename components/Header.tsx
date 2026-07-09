import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/blog", label: "Travel Journal" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-[#f8f1e7]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-stone-950 text-sm font-bold text-white shadow-sm transition group-hover:scale-105">DB</span>
          <span>
            <span className="block text-sm font-bold uppercase tracking-[0.22em] text-stone-950">DesertBrise</span>
            <span className="block text-xs text-stone-500">Private Morocco Travel</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-stone-700 transition hover:text-stone-950">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="rounded-full bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-stone-800">
          Plan a trip
        </Link>
      </div>
    </header>
  );
}
