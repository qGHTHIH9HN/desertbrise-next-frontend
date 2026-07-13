type Props = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, text, align = "left" }: Props) {
  const isCenter = align === "center";
  return (
    <div className={`${isCenter ? "mx-auto text-center" : ""} max-w-4xl`}>
      {eyebrow ? <p className="premium-eyebrow">{eyebrow}</p> : null}
      <h2 className="display-font mt-3 text-5xl font-semibold leading-[1] tracking-[-.04em] text-[#2b1b11] md:text-7xl">
        {title}
      </h2>
      {text ? <p className={`${isCenter ? "mx-auto" : ""} mt-5 max-w-2xl text-lg leading-8 text-[#75675d]`}>{text}</p> : null}
    </div>
  );
}
