import { TripMatchForm } from "@/components/TripMatchForm";

export const metadata = {
  title: "Find My Best Morocco Trip | DesertBrise Travel",
  description:
    "Answer a few simple questions and get matched with the right private Morocco journey: desert, trekking, family, luxury, culture, or retreat.",
};

export default function TripMatchPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#1d130c] px-5 py-24 text-white sm:px-8 lg:px-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_0%,rgba(215,154,68,.26),transparent_38%),linear-gradient(135deg,#1d130c,#3a2415)]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.92fr_1.08fr] lg:items-end">
          <div>
            <p className="premium-eyebrow text-[#efbd73]">60-second trip match</p>
            <h1 className="display-font mt-5 max-w-5xl text-6xl font-semibold leading-[.92] tracking-[-.055em] md:text-8xl">
              Find the Morocco journey that fits you.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
              Choose your feeling, pace, comfort level, and travel timing. DesertBrise will use your answers to recommend a private route.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/14 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
            <p className="text-sm font-black uppercase tracking-[.22em] text-[#efbd73]">What this does</p>
            <div className="mt-5 grid gap-3 text-sm font-bold text-white/84">
              <p className="rounded-full bg-white/10 px-4 py-3">Matches the right travel style</p>
              <p className="rounded-full bg-white/10 px-4 py-3">Captures high-intent leads</p>
              <p className="rounded-full bg-white/10 px-4 py-3">Sends request into PHP GuestMind</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="premium-eyebrow">Private planning</p>
            <h2 className="display-font mt-3 text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
              The form feels simple. The lead data becomes powerful.
            </h2>
            <p className="mt-6 text-lg leading-9 text-[#75675d]">
              Instead of asking visitors to choose from many tours, this page helps them express what they want. That creates better leads and easier sales conversations.
            </p>
          </div>
          <TripMatchForm />
        </div>
      </section>
    </>
  );
}
