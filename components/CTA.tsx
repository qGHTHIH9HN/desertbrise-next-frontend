import Link from "next/link";

export function CTA() {
  return (
    <section className="bg-[#fbf6ed] px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] bg-stone-950 shadow-2xl lg:grid-cols-[1.05fr_.75fr]">
        <div className="p-8 text-white md:p-14 lg:p-16">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-amber-300">Start with one message</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] md:text-6xl">Tell us your dream Morocco route. We shape the journey.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">Dates, comfort level, travel style, must-see places, and your real intention. We turn it into a private Morocco itinerary with local depth.</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-full bg-amber-300 px-8 py-4 text-sm font-black text-stone-950 transition hover:bg-white">Plan my trip</Link>
            <a href="https://wa.me/212600454881" className="rounded-full border border-white/20 px-8 py-4 text-sm font-black text-white transition hover:bg-white hover:text-stone-950">WhatsApp now</a>
          </div>
        </div>
        <div className="relative min-h-[320px] bg-[url('https://desertbrise-travel.com/public/assets/uploads/services/service_1782626721_ff9a9df0.webp')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/60 to-transparent lg:bg-gradient-to-l" />
        </div>
      </div>
    </section>
  );
}
