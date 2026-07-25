import Image from "next/image";
import { Suspense } from "react";
import { CatalogClient } from "@/components/business/CatalogClient";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BusinessCardSkeleton } from "@/components/ui/Skeleton";
import { TOURISM_CATEGORIES } from "@/lib/constants";
import { fetchTourism } from "@/lib/services/data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Turismo",
  description:
    "Hoteles, balnearios, parques, museos, ríos y tours en Trinidad y la Amazonía del Beni.",
  path: "/turismo",
});

const gallery = [
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80",
  "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=900&q=80",
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80",
  "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=900&q=80",
];

export default async function TurismoPage() {
  const businesses = await fetchTourism();

  return (
    <>
      <PageHero
        eyebrow="Descubre"
        title="Turismo en Trinidad"
        description="Hoteles, balnearios, parques, museos, paseos y tours amazónicos."
      />
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 md:px-6">
        <section>
          <SectionHeading
            title="Galería de Trinidad"
            description="Paisajes, cultura y naturaleza de la capital del Beni."
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {gallery.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden rounded-2xl ${i === 0 ? "md:col-span-2 md:row-span-2 min-h-64" : "min-h-40"}`}
              >
                <Image
                  src={src}
                  alt={`Trinidad turismo ${i + 1}`}
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                  sizes="(max-width:768px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            title="Lugares y experiencias"
            description="Filtra por hoteles, museos, balnearios, parques y más."
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
              categories={TOURISM_CATEGORIES}
            />
          </Suspense>
        </section>
      </div>
    </>
  );
}
