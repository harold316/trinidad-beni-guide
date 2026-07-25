import { Suspense } from "react";
import { ClinicCard } from "@/components/health/ClinicCard";
import { CatalogClient } from "@/components/business/CatalogClient";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BusinessCardSkeleton } from "@/components/ui/Skeleton";
import { HEALTH_CATEGORIES } from "@/lib/constants";
import { fetchHealth } from "@/lib/services/data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Salud",
  description:
    "Clínicas, hospitales, farmacias, consultorios y laboratorios en Trinidad, Beni.",
  path: "/salud",
});

export default async function SaludPage() {
  const businesses = await fetchHealth();
  const clinics = businesses.filter(
    (b) => b.category === "clinicas" || b.category === "hospitales"
  );

  return (
    <>
      <PageHero
        eyebrow="Bienestar"
        title="Salud en Trinidad"
        description="Clínicas, especialidades, emergencias, farmacias y laboratorios cerca de ti."
      />
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 md:px-6">
        <section className="space-y-6">
          <SectionHeading
            title="Clínicas y centros médicos"
            description="Especialidades, doctores, emergencias y contacto directo."
          />
          {clinics.map((clinic) => (
            <ClinicCard key={clinic.id} clinic={clinic} />
          ))}
        </section>

        <section>
          <SectionHeading
            title="Directorio de salud"
            description="Farmacias, consultorios, laboratorios y más."
          />
          <Suspense
            fallback={
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <BusinessCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <CatalogClient
              businesses={businesses}
              categories={HEALTH_CATEGORIES}
            />
          </Suspense>
        </section>
      </div>
    </>
  );
}
