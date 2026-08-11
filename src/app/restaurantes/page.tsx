import { Suspense } from "react";
import { CatalogClient } from "@/components/business/CatalogClient";
import { PageHero } from "@/components/layout/PageHero";
import { AdBannerSlot } from "@/components/ads/AdBanner";
import { BusinessCardSkeleton } from "@/components/ui/Skeleton";
import { FOOD_CATEGORIES } from "@/lib/constants";
import { fetchAds, fetchRestaurants } from "@/lib/services/data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Restaurantes",
  description:
    "Restaurantes, cafeterías, pizzerías, heladerías y comida rápida en Trinidad, Beni.",
  path: "/restaurantes",
});

export default async function RestaurantesPage() {
  const [businesses, ads] = await Promise.all([
    fetchRestaurants(),
    fetchAds("between-cards"),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Gastronomía"
        title="Restaurantes en Trinidad"
        description="Descubre sabores típicos, cafés y opciones para todos los presupuestos."
      />
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 md:px-6">
        {ads[0] ? <AdBannerSlot ad={ads[0]} /> : null}
        <Suspense
          fallback={
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <BusinessCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <CatalogClient businesses={businesses} categories={FOOD_CATEGORIES} />
        </Suspense>
      </div>
    </>
  );
}
