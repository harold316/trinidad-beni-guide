import { CatalogClient } from "@/components/business/CatalogClient";
import { PageHero } from "@/components/layout/PageHero";
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
        <CatalogClient businesses={businesses} categories={BUSINESS_CATEGORIES} />
      </div>
    </>
  );
}
