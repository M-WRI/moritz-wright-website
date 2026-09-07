export function SectionHeading({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <div data-reveal className="max-w-2xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        {kicker}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
