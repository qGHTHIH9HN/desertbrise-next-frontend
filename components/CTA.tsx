import Link from "next/link";

export function CTA() {
  return (
    <section className="bg-[#f8f1e7] px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-stone-950 px-6 py-14 text-center text-white shadow-2xl md:px-16 md:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-amber-300">Tailor-made Morocco</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">Tell us your dates, style, and dream route. We design the journey.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-300">A real Morocco travel expert reviews your request and builds a private itinerary around your pace, comfort, and interests.</p>
        <Link href="/contact" className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-bold text-stone-950 transition hover:-translate-y-0.5 hover:bg-amber-100">
          Start planning
        </Link>
      </div>
    </section>
  );
}
