"use client";

import { CATEGORY_LABELS } from "@/lib/constants";
import type { BusinessCategory } from "@/types";

export function FilterBar({
  categories,
  selectedCategory,
  minRating,
  query,
  onCategoryChange,
  onRatingChange,
  onQueryChange,
}: {
  categories: BusinessCategory[];
  selectedCategory?: string;
  minRating?: number;
  query: string;
  onCategoryChange: (value: string) => void;
  onRatingChange: (value: number) => void;
  onQueryChange: (value: string) => void;
}) {
  return (
    <div className="mb-8 grid gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur md:grid-cols-[1.4fr_1fr_1fr]">
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
          Buscar
        </span>
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Nombre, tipo o zona..."
          className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-white/80 px-3 outline-none ring-[var(--color-primary)] transition focus:ring-2 dark:bg-stone-900/60"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
          Categoría
        </span>
        <select
          value={selectedCategory || ""}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-white/80 px-3 outline-none ring-[var(--color-primary)] transition focus:ring-2 dark:bg-stone-900/60"
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat]}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
          Calificación mínima
        </span>
        <select
          value={minRating || 0}
          onChange={(e) => onRatingChange(Number(e.target.value))}
          className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-white/80 px-3 outline-none ring-[var(--color-primary)] transition focus:ring-2 dark:bg-stone-900/60"
        >
          <option value={0}>Cualquiera</option>
          <option value={3}>3+</option>
          <option value={4}>4+</option>
          <option value={4.5}>4.5+</option>
        </select>
      </label>
    </div>
  );
}
