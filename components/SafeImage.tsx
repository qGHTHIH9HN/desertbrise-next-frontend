"use client";

import { useState } from "react";

type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackLabel?: string;
};

export function SafeImage({
  src,
  alt,
  className = "",
  imgClassName = "h-full w-full object-cover",
  fallbackLabel = "DesertBrise",
}: Props) {
  const [failed, setFailed] = useState(!src);

  if (failed || !src) {
    return (
      <div className={`${className} grid place-items-center bg-gradient-to-br from-[#eadbc8] via-[#f9f2e7] to-[#fffaf2]`}>
        <div className="px-4 text-center">
          <div className="display-font text-3xl font-semibold tracking-[-.04em] text-[#8b541f]">DB</div>
          <div className="mt-1 text-[10px] font-black uppercase tracking-[.24em] text-[#8b6b52]">{fallbackLabel}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <img
        src={src}
        alt={alt}
        className={imgClassName}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
