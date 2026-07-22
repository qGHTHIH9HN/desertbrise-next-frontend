import Link from "next/link";

export const metadata = {
  title: "Why Travel With DesertBrise | Private Morocco Experts",
  description:
    "Why travelers choose DesertBrise Travel for private Morocco tours, Sahara journeys, trekking, culture, comfort, and local support.",
};

const reasons = [
  ["Saharan roots", "The company identity begins in the desert, not in a generic tourism office."],
  ["Private planning", "Routes are adapted to the traveler instead of forcing everyone into one fixed package."],
  ["Human service", "The tone is warm, clear, and personal from the first message."],
  ["Morocco-wide knowledge", "DesertBrise can connect desert, mountains, imperial cities, coast, and local culture."],
  ["Conversion clarity", "The upgraded site answers doubts and gives visitors direct next steps."],
  ["Smart lead capture", "Visitor intent can now connect with the PHP GuestMind system already in your backend."],
];

export default function WhyTravelWithUsPage() {
  return (
    <>
      <section className="bg-[#1d130c] px-5 py-24 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="premium-eyebrow text-[#efbd73]">Why DesertBrise</p>
          <h1 className="display-font mt-5 max-w-5xl text-6xl font-semibold leading-[.92] tracking-[-.055em] md:text-8xl">
            Real Morocco, planned with care.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-white/78">
            Travelers are not only choosing a route. They are choosing who they trust with their time, comfort, safety, and memories.
          </p>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reasons.map(([title, text], index) => (
            <div key={title} className="premium-card rounded-[2rem] p-8">
              <span className="display-font text-6xl text-[#dfc49f]">0{index + 1}</span>
              <h2 className="mt-8 text-xl font-black text-[#2b1b11]">{title}</h2>
              <p className="mt-4 leading-8 text-[#75675d]">{text}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-7xl rounded-[2rem] bg-[#2b1b11] p-8 text-white md:p-12">
          <p className="premium-eyebrow text-[#efbd73]">Next step</p>
          <h2 className="display-font mt-3 max-w-3xl text-5xl font-semibold leading-none tracking-[-.04em]">
            Find the right private route in 60 seconds.
          </h2>
          <Link href="/trip-match" className="premium-btn mt-8 bg-[#d79a44] text-[#1d130c] hover:bg-[#efbd73]">
            Start Trip Match <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
