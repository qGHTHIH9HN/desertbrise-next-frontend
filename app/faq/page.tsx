import Link from "next/link";

export const metadata = {
  title: "Morocco Travel FAQ | DesertBrise Travel",
  description:
    "Answers to common questions about private Morocco tours, Sahara desert trips, family travel, luxury tours, trekking, safety, and planning.",
};

const groups = [
  {
    title: "Planning",
    questions: [
      ["How do I start planning a private Morocco tour?", "Send your travel month, number of travelers, arrival city, comfort level, and the feeling you want from the journey."],
      ["Can DesertBrise create a custom itinerary?", "Yes. The route can be shaped around your dates, budget, travel style, and preferred rhythm."],
      ["How many days do I need in Morocco?", "A short trip can work in 3 to 5 days, but 7 to 12 days gives more space for desert, cities, mountains, and culture."],
    ],
  },
  {
    title: "Sahara Desert",
    questions: [
      ["Is the Sahara worth visiting?", "Yes. For many travelers, the desert is the emotional center of Morocco: silence, stars, dunes, camps, and open space."],
      ["Merzouga or M'Hamid?", "Merzouga is famous and accessible. M'Hamid and Erg Chigaga can feel more remote and wild."],
      ["Can the desert be comfortable?", "Yes. Camp level can range from simple and authentic to premium or luxury."],
    ],
  },
  {
    title: "Private Travel",
    questions: [
      ["Are tours private?", "They can be. Private tours are shaped for your own group with flexible timing and route logic."],
      ["Can families travel privately?", "Yes. Private travel is often ideal for families because timing and comfort can be adapted."],
      ["Can we choose hotels?", "Yes. Hotel level and style can be adapted during itinerary planning."],
    ],
  },
  {
    title: "Trekking",
    questions: [
      ["Can beginners trek in Morocco?", "Yes. Beginner-friendly walks and moderate treks can be planned with the right guide and season."],
      ["Is Sahara trekking difficult?", "It depends on distance, heat, terrain, and support. A private route can be adjusted."],
      ["What should I bring?", "Comfortable walking shoes, layers, sun protection, personal medication, and a small daypack are usually helpful."],
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="bg-[#1d130c] px-5 py-24 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="premium-eyebrow text-[#efbd73]">Morocco travel answers</p>
          <h1 className="display-font mt-5 max-w-5xl text-6xl font-semibold leading-[.92] tracking-[-.055em] md:text-8xl">
            Questions before you travel Morocco
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-white/78">
            Clear answers help travelers feel safe, informed, and ready to request a private itinerary.
          </p>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="premium-eyebrow">Quick help</p>
            <h2 className="display-font mt-3 text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
              Still choosing your route?
            </h2>
            <Link href="/trip-match" className="premium-btn mt-8 bg-[#2b1b11] text-white hover:bg-[#7a4a1f]">
              Use Trip Match <span>→</span>
            </Link>
          </div>
          <div className="grid gap-8">
            {groups.map((group) => (
              <div key={group.title} className="rounded-[2rem] border border-[#eadbc8] bg-white p-7 shadow-[0_18px_54px_rgba(58,37,22,.06)]">
                <h2 className="display-font text-4xl font-semibold tracking-[-.04em] text-[#2b1b11]">{group.title}</h2>
                <div className="mt-6 grid gap-4">
                  {group.questions.map(([q, a]) => (
                    <div key={q} className="rounded-[1.4rem] bg-[#fffaf2] p-5">
                      <h3 className="font-black text-[#2b1b11]">{q}</h3>
                      <p className="mt-3 leading-7 text-[#75675d]">{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
