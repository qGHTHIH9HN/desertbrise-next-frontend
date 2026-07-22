"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const whatsappNumber = "212600454881";

function getWhatsappText(pathname: string) {
  const page = pathname === "/" ? "homepage" : pathname;
  return encodeURIComponent(
    `Hello DesertBrise, I am visiting ${page}. I want help planning a private Morocco trip.`
  );
}

export function FloatingConversion() {
  const pathname = usePathname();

  if (pathname?.startsWith("/contact")) {
    return null;
  }

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${getWhatsappText(pathname || "/")}`;

  return (
    <>
      <div className="fixed bottom-6 right-5 z-[70] hidden flex-col gap-3 md:flex">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 rounded-full border border-[#eadbc8] bg-white/95 px-5 py-3 text-sm font-black text-[#2b1b11] shadow-[0_18px_50px_rgba(43,27,17,.16)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-[#fffaf2]"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#25D366] text-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.2 1.6 6L0 24l6.4-1.7a11.9 11.9 0 0 0 5.7 1.5h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.5ZM12.1 21.8h-.1c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2C2.1 6.4 6.6 2 12.1 2c2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.5-4.4 10-9.8 10Zm5.5-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6 0-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z" />
            </svg>
          </span>
          <span>
            <span className="block leading-none">WhatsApp us</span>
            <span className="mt-1 block text-xs font-bold text-[#8b7a6e]">Fast private planning</span>
          </span>
        </a>

        <Link
          href="/trip-match"
          className="group flex items-center gap-3 rounded-full bg-[#2b1b11] px-5 py-3 text-sm font-black text-white shadow-[0_18px_50px_rgba(43,27,17,.22)] transition hover:-translate-y-1 hover:bg-[#7a4a1f]"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#d79a44] text-[#1d130c]">
            →
          </span>
          <span>
            <span className="block leading-none">Find my trip</span>
            <span className="mt-1 block text-xs font-bold text-white/68">60-second match</span>
          </span>
        </Link>
      </div>

      <div className="fixed inset-x-3 bottom-3 z-[70] grid grid-cols-2 gap-2 rounded-[1.4rem] border border-[#eadbc8] bg-white/96 p-2 shadow-[0_18px_50px_rgba(43,27,17,.18)] backdrop-blur-xl md:hidden">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-xs font-black text-white"
        >
          WhatsApp
        </a>
        <Link
          href="/trip-match"
          className="flex items-center justify-center gap-2 rounded-full bg-[#2b1b11] px-4 py-3 text-xs font-black text-white"
        >
          Find Trip →
        </Link>
      </div>
    </>
  );
}
