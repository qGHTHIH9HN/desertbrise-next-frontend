import Link from "next/link";

export const metadata = {
  title: "Thank You | DesertBrise Travel",
  description: "Thank you for contacting DesertBrise Travel. Your private Morocco journey request has been received.",
};

export default function ThankYouPage() {
  return (
    <section className="min-h-[80vh] bg-[#1d130c] px-5 py-24 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="premium-eyebrow text-[#efbd73]">Request received</p>
        <h1 className="display-font mt-5 text-6xl font-semibold leading-[.92] tracking-[-.055em] md:text-8xl">
          Thank you. Your Morocco journey starts here.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-9 text-white/80">
          DesertBrise will review your request and reply with the next planning step. You can also contact us directly by WhatsApp for faster communication.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/tours" className="premium-btn bg-[#d79a44] text-[#1d130c] hover:bg-[#efbd73]">
            Explore Tours <span>→</span>
          </Link>
          <Link href="/trip-match" className="premium-btn border border-white/24 bg-white/10 text-white hover:bg-white/16">
            Trip Match <span>▷</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
