"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { mockBusinesses } from "@/data/mock";
import { useCompareStore } from "@/stores/compare";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { Business } from "@/types";

export default function CompararPage() {
  const ids = useCompareStore((s) => s.ids);
  const remove = useCompareStore((s) => s.remove);
  const clear = useCompareStore((s) => s.clear);
  const [items, setItems] = useState<Business[]>([]);

  useEffect(() => {
    setItems(mockBusinesses.filter((b) => ids.includes(b.id)));
  }, [ids]);

  return (
    <>
      <PageHero
        eyebrow="Decide mejor"
        title="Comparador de negocios"
        description="Compara hasta 3 negocios lado a lado."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-6 flex justify-end">
          <Button variant="outline" onClick={clear} disabled={!items.length}>
            Limpiar
          </Button>
        </div>
        {!items.length ? (
          <div className="rounded-2xl border border-dashed border-[var(--color-border)] p-10 text-center text-[var(--color-muted)]">
            Aún no hay negocios en el comparador. Usa el ícono de balanza en las tarjetas.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {items.map((b) => (
              <article
                key={b.id}
                className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]"
              >
                <div className="relative aspect-[16/10]">
                  <Image src={b.images[0]} alt={b.name} fill className="object-cover" />
                </div>
                <div className="space-y-3 p-5">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                    <Link href={`/negocios/${b.slug}`}>{b.name}</Link>
                  </h2>
                  <p className="text-sm text-[var(--color-muted)]">
                    {CATEGORY_LABELS[b.category]}
                  </p>
                  <StarRating rating={b.rating} count={b.reviewCount} />
                  <p className="text-sm">Precio: {b.priceLevel || "N/D"}</p>
                  <p className="text-sm text-[var(--color-muted)]">{b.address}</p>
                  <Button variant="outline" size="sm" onClick={() => remove(b.id)}>
                    Quitar
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
