import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { fetchEvents } from "@/lib/services/data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Eventos",
  description: "Agenda cultural, gastronómica y turística de Trinidad, Beni.",
  path: "/eventos",
});

export default async function EventosPage() {
  const events = await fetchEvents();

  return (
    <>
      <PageHero
        eyebrow="Agenda"
        title="Eventos en Trinidad"
        description="Ferias, carnaval, exposiciones y actividades para no perderte nada."
      />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-2 md:px-6 xl:grid-cols-3">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/eventos/${event.slug}`}
            className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="space-y-2 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)]">
                {event.startDate}
                {event.endDate ? ` — ${event.endDate}` : ""} · {event.category}
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                {event.title}
              </h2>
              <p className="text-sm text-[var(--color-muted)]">{event.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
