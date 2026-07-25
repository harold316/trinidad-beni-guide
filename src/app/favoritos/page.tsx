"use client";

import { useEffect, useState } from "react";
import { BusinessGrid } from "@/components/business/BusinessGrid";
import { PageHero } from "@/components/layout/PageHero";
import { mockBusinesses } from "@/data/mock";
import { useFavoritesStore } from "@/stores/favorites";
import type { Business } from "@/types";

export default function FavoritosPage() {
  const ids = useFavoritesStore((s) => s.ids);
  const [items, setItems] = useState<Business[]>([]);

  useEffect(() => {
    setItems(mockBusinesses.filter((b) => ids.includes(b.id)));
  }, [ids]);

  return (
    <>
      <PageHero
        eyebrow="Tu lista"
        title="Favoritos"
        description="Guarda negocios para volver a ellos cuando quieras."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <BusinessGrid businesses={items} />
      </div>
    </>
  );
}
