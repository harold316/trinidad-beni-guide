import Image from "next/image";
import { notFound } from "next/navigation";
import {
  FaClock,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { MapEmbed } from "@/components/maps/MapEmbed";
import { ShareButtons } from "@/components/business/ShareButtons";
import { AdBannerSlot } from "@/components/ads/AdBanner";
import { CATEGORY_LABELS, SITE_URL } from "@/lib/constants";
import {
  fetchAds,
  fetchBusinessBySlug,
  fetchBusinesses,
} from "@/lib/services/data";
import { createMetadata, localBusinessJsonLd } from "@/lib/seo";
import { whatsappLink } from "@/lib/utils";

export async function generateStaticParams() {
  const businesses = await fetchBusinesses();
  return businesses.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = await fetchBusinessBySlug(slug);
  if (!business) return createMetadata({ title: "Negocio" });
  return createMetadata({
    title: business.name,
    description: business.description,
    path: `/negocios/${business.slug}`,
    image: business.images[0],
  });
}

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [business, ads] = await Promise.all([
    fetchBusinessBySlug(slug),
    fetchAds("sidebar"),
  ]);
  if (!business) notFound();

  const url = `${SITE_URL}/negocios/${business.slug}`;
  const jsonLd = localBusinessJsonLd({
    name: business.name,
    description: business.description,
    address: business.address,
    phone: business.phone,
    image: business.images[0],
    rating: business.rating,
    reviewCount: business.reviewCount,
    url,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative min-h-[42vh] overflow-hidden">
        <Image
          src={business.images[0]}
          alt={business.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
        <div className="relative mx-auto flex min-h-[42vh] max-w-7xl flex-col justify-end px-4 py-10 md:px-6">
          <div className="flex flex-wrap gap-2">
            <Badge tone="success">{CATEGORY_LABELS[business.category]}</Badge>
            {business.verified ? <Badge tone="info">Verificado</Badge> : null}
            {business.priceLevel ? <Badge>{business.priceLevel}</Badge> : null}
          </div>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold text-white md:text-5xl">
            {business.name}
          </h1>
          <div className="mt-3">
            <StarRating rating={business.rating} count={business.reviewCount} light />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.5fr_0.9fr] md:px-6">
        <div className="space-y-8">
          <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              Sobre el lugar
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--color-muted)]">
              {business.description}
            </p>
            <div className="mt-5 space-y-2 text-sm text-[var(--color-ink)]">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[var(--color-primary)]" />
                {business.address}
              </p>
              {business.phone ? (
                <p className="flex items-center gap-2">
                  <FaPhone className="text-[var(--color-primary)]" />
                  {business.phone}
                </p>
              ) : null}
              {business.website ? (
                <p className="flex items-center gap-2">
                  <FaGlobe className="text-[var(--color-primary)]" />
                  <a href={business.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Sitio web
                  </a>
                </p>
              ) : null}
            </div>
            <div className="mt-5">
              <ShareButtons url={url} title={business.name} />
            </div>
          </section>

          {business.images.length > 1 ? (
            <section>
              <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl font-semibold">
                Galería
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {business.images.map((img) => (
                  <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image src={img} alt={business.name} fill className="object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {business.products?.length ? (
            <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                Productos destacados
              </h2>
              <ul className="mt-4 space-y-3">
                {business.products.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between rounded-xl border border-[var(--color-border)] px-4 py-3"
                  >
                    <span className="font-medium">{p.name}</span>
                    {p.price ? <span className="font-semibold text-[var(--color-primary)]">Bs. {p.price}</span> : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
            <h2 className="mb-4 flex items-center gap-2 font-[family-name:var(--font-display)] text-2xl font-semibold">
              <FaClock /> Horarios
            </h2>
            <ul className="space-y-2 text-sm">
              {business.hours.map((h) => (
                <li key={h.day} className="flex justify-between border-b border-[var(--color-border)] py-2">
                  <span>{h.day}</span>
                  <span className="text-[var(--color-muted)]">
                    {h.closed ? "Cerrado" : `${h.open} - ${h.close}`}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section id="reservar" className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              Reseñas
            </h2>
            <p className="mt-2 text-[var(--color-muted)]">
              Sistema de reseñas listo para conectarse a Firestore. Por ahora se muestra la calificación agregada.
            </p>
            <div className="mt-4">
              <StarRating rating={business.rating} count={business.reviewCount} />
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <div className="sticky top-24 space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass)] p-5 backdrop-blur">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
              Contactar / Reservar
            </h3>
            <div className="grid gap-2">
              {business.whatsapp ? (
                <a
                  href={whatsappLink(
                    business.whatsapp,
                    `Hola, vi ${business.name} en Trinidad Beni Guide y quiero más información`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] font-semibold text-white"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
              ) : null}
              {business.phone ? (
                <a
                  href={`tel:${business.phone}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] font-semibold"
                >
                  <FaPhone /> Llamar
                </a>
              ) : null}
              <ButtonLink href="/comparar">Agregar a comparador</ButtonLink>
            </div>
            <MapEmbed
              lat={business.location.lat}
              lng={business.location.lng}
              title={`Ubicación de ${business.name}`}
              className="h-56 w-full rounded-xl"
            />
          </div>
          {ads[0] ? <AdBannerSlot ad={ads[0]} className="!rounded-2xl" /> : null}
        </aside>
      </div>
    </>
  );
}
