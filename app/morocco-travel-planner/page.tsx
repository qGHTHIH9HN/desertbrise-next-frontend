import Link from "next/link";

export const metadata = {
  title: "Morocco Travel Planner | DesertBrise Travel",
  description:
    "Plan a private Morocco itinerary with clear steps for timing, route style, comfort level, desert travel, cities, and trekking.",
};

const blocks = [
  ["1. Choose your travel feeling", "Desert silence, cultural discovery, family comfort, luxury escape, active trekking, or retreat-style renewal."],
  ["2. Choose your route rhythm", "Slow luxury, balanced discovery, active adventure, or deep desert immersion."],
  ["3. Choose your comfort level", "Simple authentic stays, comfortable riads, premium camps, or luxury boutique hotels."],
  ["4. Send your dates", "The best Morocco route depends on season, arrival city, trip length, and your energy."],
];

export default function MoroccoTravelPlannerPage() {
  return (
    <>
      <section className="bg-[#1d130c] px-5 py-24 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="premium-eyebrow text-[#efbd73]">Planning guide</p>
          <h1 className="display-font mt-5 max-w-5xl text-6xl font-semibold leading-[.92] tracking-[-.055em] md:text-8xl">
            Morocco Travel Planner
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-white/78">
            A simple planning page that helps visitors understand how to choose a private Morocco itinerary.
          </p>
          <Link href="/trip-match" className="premium-btn mt-9 bg-[#d79a44] text-[#1d130c] hover:bg-[#efbd73]">
            Start Trip Match <span>→</span>
          </Link>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          {blocks.map(([title, text]) => (
            <div key={title} className="premium-card rounded-[2rem] p-8">
              <h2 className="display-font text-4xl font-semibold tracking-[-.04em] text-[#2b1b11]">{title}</h2>
              <p className="mt-4 leading-8 text-[#75675d]">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
