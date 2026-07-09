export const metadata = {
  title: "Plan Your Morocco Trip | DesertBrise Travel",
  description: "Contact DesertBrise Travel to plan a private Morocco tour, Sahara journey, trek, or tailor-made itinerary.",
};

export default function ContactPage() {
  return (
    <section className="px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-amber-700">Plan your journey</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-stone-950 md:text-7xl">Tell us what kind of Morocco trip you want.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">This page is a frontend design placeholder. Connect it later to your existing PHP booking/contact form endpoint.</p>
        </div>
        <form className="rounded-[2rem] bg-white p-6 shadow-sm md:p-10">
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-semibold text-stone-700">Name<input className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-950" /></label>
            <label className="grid gap-2 text-sm font-semibold text-stone-700">Email<input type="email" className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-950" /></label>
            <label className="grid gap-2 text-sm font-semibold text-stone-700">Message<textarea rows={6} className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-stone-950" /></label>
            <button type="button" className="rounded-full bg-stone-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-stone-800">Send request</button>
          </div>
        </form>
      </div>
    </section>
  );
}
