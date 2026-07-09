import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <h3 className="text-2xl font-bold">DesertBrise Travel</h3>
          <p className="mt-4 max-w-md text-sm leading-7 text-stone-300">
            Morocco journeys designed with local knowledge, desert roots, comfort, and cultural depth.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-400">Explore</h4>
          <div className="mt-4 grid gap-3 text-sm text-stone-300">
            <Link href="/tours">Tours</Link>
            <Link href="/blog">Travel Journal</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-400">Contact</h4>
          <div className="mt-4 grid gap-3 text-sm text-stone-300">
            <a href="https://wa.me/212600454881">WhatsApp</a>
            <a href="mailto:contact@desertbrise-travel.com">Email us</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} DesertBrise Travel. All rights reserved.
      </div>
    </footer>
  );
}
