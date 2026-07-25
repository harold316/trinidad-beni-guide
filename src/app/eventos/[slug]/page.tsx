import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { fetchEvents } from "@/lib/services/data";
import { createMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const events = await fetchEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const events = await fetchEvents();
  const event = events.find((e) => e.slug === slug);
  if (!event) return createMetadata({ title: "Evento" });
  return createMetadata({
    title: event.title,
    description: event.description,
    path: `/eventos/${event.slug}`,
    image: event.image,
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const events = await fetchEvents();
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <>
      <PageHero eyebrow={event.category} title={event.title} description={event.location} />
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-10 md:px-6">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          <Image src={event.image} alt={event.title} fill className="object-cover" priority />
        </div>
        <p className="text-sm font-semibold text-[var(--color-primary)]">
          {event.startDate}
          {event.endDate ? ` — ${event.endDate}` : ""}
        </p>
        <p className="text-lg leading-relaxed text-[var(--color-muted)]">{event.description}</p>
      </div>
    </>
  );
}
