export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(76,175,80,0.18),transparent_35%),radial-gradient(circle_at_90%_0%,rgba(100,181,246,0.18),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        {eyebrow ? (
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-ink)] md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
