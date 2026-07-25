import { Suspense } from "react";
import { CatalogClient } from "@/components/business/CatalogClient";
import { PageHero } from "@/components/layout/PageHero";
import { BusinessCardSkeleton } from "@/components/ui/Skeleton";
import { CATEGORY_LABELS } from "@/lib/constants";
import { fetchBusinesses } from "@/lib/services/data";
import { createMetadata } from "@/lib/seo";
import type { BusinessCategory } from "@/types";

export const metadata = createMetadata({
  title: "Buscar",
  description: "Buscador inteligente de negocios en Trinidad, Beni.",
  path: "/buscar",
});

export default async function BuscarPage() {
  const all = await fetchBusinesses();
  const categories = Object.keys(CATEGORY_LABELS) as BusinessCategory[];

  return (
    <>
      <PageHero
        eyebrow="Buscador"
        title="Buscar en Trinidad"
        description="Filtra por categoría, calificación y palabras clave."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <Suspense
          fallback={
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <BusinessCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <CatalogClient businesses={all} categories={categories} />
        </Suspense>
      </div>
    </>
  );
}
