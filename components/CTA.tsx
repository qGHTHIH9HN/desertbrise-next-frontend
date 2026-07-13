import Link from "next/link";

type Props = {
  eyebrow?: string;
  title?: string;
  text?: string;
};

export function CTA({
  eyebrow = "Start your private journey",
  title = "Ready to Experience Morocco?",
  text = "Tell us what you dream of. We will shape a private Morocco itinerary that feels personal, comfortable, and unforgettable.",
}: Props) {
  return (
    <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.4rem] border border-[#eadbc8] bg-[#f9f2e7] shadow-[0_28px_90px_rgba(58,37,22,.12)]">
        <div className="grid items-center gap-8 p-7 md:grid-cols-[1.3fr_.7fr] md:p-12 lg:p-16">
          <div>
            <p className="premium-eyebrow">{eyebrow}</p>

            <h2 className="display-font mt-4 max-w-3xl text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
              {title}
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#75675d]">
              {text}
            </p>

            <div className="mt-8 grid gap-4 text-sm font-bold text-[#5d4b3e] sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Secure Booking",
                "Private Route",
                "Personal Service",
                "Flexible Planning",
              ].map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-full bg-white/70 px-4 py-3"
                >
                  <span className="text-[#9a5d24]">•</span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="flex md:justify-end">
            <Link
              href="/contact"
              className="premium-btn bg-[#d79a44] text-[#1d130c] shadow-[0_20px_54px_rgba(215,154,68,.3)] hover:bg-[#efbd73]"
            >
              Plan Your Trip Today <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
