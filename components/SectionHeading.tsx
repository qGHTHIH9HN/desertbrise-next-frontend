type Props = {
  eyebrow?: string;
  title: string;
  text?: string;
};

export function SectionHeading({ eyebrow, title, text }: Props) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? <p className="text-sm font-bold uppercase tracking-[0.28em] text-amber-700">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-950 md:text-5xl">{title}</h2>
      {text ? <p className="mt-5 text-base leading-8 text-stone-600 md:text-lg">{text}</p> : null}
    </div>
  );
}
