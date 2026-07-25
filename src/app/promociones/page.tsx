import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { PromotionsSlider } from "@/components/home/PromotionsSlider";
import { Badge } from "@/components/ui/Badge";
import { fetchPromotions } from "@/lib/services/data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Promociones",
  description: "Descuentos, cupones y ofertas de negocios en Trinidad, Beni.",
  path: "/promociones",
});

export default async function PromocionesPage() {
  const promotions = await fetchPromotions();

  return (
    <>
      <PageHero
        eyebrow="Ahorra"
        title="Promociones y cupones"
        description="Ofertas activas de restaurantes, hoteles, balnearios y más."
      />
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 md:px-6">
        <PromotionsSlider promotions={promotions} />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {promotions.map((promo) => (
            <article
              key={promo.id}
              className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]"
            >
              <div className="relative aspect-[16/10]">
                <Image src={promo.image} alt={promo.title} fill className="object-cover" />
              </div>
              <div className="space-y-3 p-5">
                {promo.discount ? <Badge tone="promo">{promo.discount} OFF</Badge> : null}
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                  {promo.title}
                </h2>
                <p className="text-sm text-[var(--color-muted)]">{promo.description}</p>
                <p className="text-sm font-semibold text-[var(--color-primary)]">
                  {promo.businessName}
                </p>
                {promo.couponCode ? (
                  <p className="rounded-xl bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-900 dark:bg-amber-900/30 dark:text-amber-100">
                    Cupón: {promo.couponCode}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
