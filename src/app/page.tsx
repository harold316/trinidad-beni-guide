import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { PromotionsSlider } from "@/components/home/PromotionsSlider";
import { BusinessGrid } from "@/components/business/BusinessGrid";
import { AdBannerSlot } from "@/components/ads/AdBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import {
  fetchAds,
  fetchEvents,
  fetchFeaturedBusinesses,
  fetchNews,
  fetchPromotions,
  fetchRestaurants,
  fetchTourism,
} from "@/lib/services/data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Inicio",
  path: "/",
});

export default async function HomePage() {
  const [featured, restaurants, tourism, promotions, events, news, headerAds, inlineAds] =
    await Promise.all([
      fetchFeaturedBusinesses(6),
      fetchRestaurants(),
      fetchTourism(),
      fetchPromotions(),
      fetchEvents(),
      fetchNews(),
      fetchAds("header"),
      fetchAds("between-cards"),
    ]);

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6 md:py-20">
        {headerAds[0] ? <AdBannerSlot ad={headerAds[0]} /> : null}

        <section id="explorar">
          <SectionHeading
            eyebrow="Explora Trinidad"
            title="Categorías principales"
            description="Encuentra lo que necesitas: comer, hospedarte, cuidarte o descubrir la ciudad."
          />
          <CategoryShowcase />
        </section>

        <section>
          <SectionHeading
            eyebrow="Destacados"
            title="Lo mejor de Trinidad"
            description="Negocios verificados y mejor valorados por la comunidad."
            action={<ButtonLink href="/buscar" variant="outline">Ver todos</ButtonLink>}
          />
          <BusinessGrid businesses={featured} />
        </section>

        {inlineAds[0] ? <AdBannerSlot ad={inlineAds[0]} /> : null}

        <section>
          <SectionHeading
            eyebrow="Sabores"
            title="Restaurantes y gastronomía"
            description="De la cocina típica beniana a cafeterías y pizzerías."
            action={<ButtonLink href="/restaurantes" variant="outline">Ver restaurantes</ButtonLink>}
          />
          <BusinessGrid businesses={restaurants.slice(0, 3)} />
        </section>

        <section>
          <SectionHeading
            eyebrow="Promociones"
            title="Ofertas y cupones de la semana"
            description="Descuentos reales de negocios locales para ahorrar mientras exploras."
            action={<ButtonLink href="/promociones" variant="promo">Ver promociones</ButtonLink>}
          />
          <PromotionsSlider promotions={promotions} />
        </section>

        <section>
          <SectionHeading
            eyebrow="Turismo"
            title="Experiencias para visitar"
            description="Hoteles, museos, parques, balnearios y tours amazónicos."
            action={<ButtonLink href="/turismo" variant="outline">Explorar turismo</ButtonLink>}
          />
          <BusinessGrid businesses={tourism.slice(0, 3)} />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
            <SectionHeading
              eyebrow="Agenda"
              title="Eventos"
              description="Lo que está pasando en Trinidad."
              className="mb-5"
            />
            <div className="space-y-4">
              {events.slice(0, 3).map((event) => (
                <Link
                  key={event.id}
                  href={`/eventos/${event.slug}`}
                  className="block rounded-xl border border-[var(--color-border)] p-4 transition hover:border-[var(--color-primary)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)]">
                    {event.startDate} · {event.category}
                  </p>
                  <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{event.location}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
            <SectionHeading
              eyebrow="Actualidad"
              title="Noticias"
              description="Novedades de la ciudad y el comercio local."
              className="mb-5"
            />
            <div className="space-y-4">
              {news.map((article) => (
                <Link
                  key={article.id}
                  href={`/noticias/${article.slug}`}
                  className="block rounded-xl border border-[var(--color-border)] p-4 transition hover:border-[var(--color-primary)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-blue)]">
                    {article.publishedAt} · {article.category}
                  </p>
                  <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{article.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[linear-gradient(135deg,#2e7d32,#43a047_45%,#64b5f6)] p-8 text-white md:p-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
              Para negocios
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold md:text-4xl">
              Publica tu negocio y llega a más clientes en Trinidad
            </h2>
            <p className="mt-3 text-white/85">
              Crea tu perfil, sube fotos, promociones y recibe reservas o consultas por WhatsApp.
            </p>
            <div className="mt-6">
              <ButtonLink href="/publicar" variant="outline" className="border-white/30 bg-white/15 text-white hover:bg-white/25">
                Empezar ahora
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
