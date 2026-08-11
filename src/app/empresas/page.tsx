import { Suspense } from "react";
import { CatalogClient } from "@/components/business/CatalogClient";
import { PageHero } from "@/components/layout/PageHero";
import { BusinessCardSkeleton } from "@/components/ui/Skeleton";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { fetchCompanies } from "@/lib/services/data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Empresas",
  description:
    "Empresas, tiendas, supermercados, bancos, gimnasios y servicios profesionales en Trinidad.",
  path: "/empresas",
});

export default async function EmpresasPage() {
  const businesses = await fetchCompanies();

  return (
    <>
      <PageHero
        eyebrow="Comercio local"
        title="Empresas y servicios"
        description="El directorio comercial de Trinidad para comprar, gestionar y crecer."
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
          <CatalogClient businesses={businesses} categories={BUSINESS_CATEGORIES} />
        </Suspense>
      </div>
    </>
  );
}
