import type { Business } from "@/types";
import { BusinessCard } from "./BusinessCard";

export function BusinessGrid({ businesses }: { businesses: Business[] }) {
  if (!businesses.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-card)] p-10 text-center text-[var(--color-muted)]">
        No se encontraron resultados. Prueba con otros filtros.
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {businesses.map((business, index) => (
        <BusinessCard key={business.id} business={business} index={index} />
      ))}
    </div>
  );
}
