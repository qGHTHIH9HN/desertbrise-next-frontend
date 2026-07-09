import Link from "next/link";

export default function NotFound() {
  return (
    <section className="px-5 py-28 text-center lg:px-8">
      <h1 className="text-5xl font-black text-stone-950">Page not found</h1>
      <p className="mx-auto mt-4 max-w-xl text-stone-600">The page you requested does not exist in the Next.js frontend yet.</p>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-stone-950 px-7 py-3 text-sm font-bold text-white">Return home</Link>
    </section>
  );
}
