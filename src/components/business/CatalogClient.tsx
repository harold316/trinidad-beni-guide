"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Business, BusinessCategory } from "@/types";
import { searchBusinesses } from "@/lib/services/data";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { FilterBar } from "./FilterBar";
import { BusinessGrid } from "./BusinessGrid";

export function CatalogClient({
  businesses,
  categories,
  initialCategory = "",
  initialQuery = "",
}: {
  businesses: Business[];
  categories: BusinessCategory[];
  initialCategory?: string;
  initialQuery?: string;
}) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    const tipo = searchParams.get("tipo");
    const q = searchParams.get("q");
    if (tipo) setCategory(tipo);
    if (q) setQuery(q);
  }, [searchParams]);

  const filtered = useMemo(
    () =>
      searchBusinesses(businesses, query, {
        category: category || undefined,
        minRating: minRating || undefined,
      }),
    [businesses, query, category, minRating]
  );

  const { visibleItems, hasMore } = useInfiniteScroll(filtered, 6);

  return (
    <>
      <FilterBar
        categories={categories}
        selectedCategory={category}
        minRating={minRating}
        query={query}
        onCategoryChange={setCategory}
        onRatingChange={setMinRating}
        onQueryChange={setQuery}
      />
      <p className="mb-4 text-sm text-[var(--color-muted)]">
        {filtered.length} resultado{filtered.length === 1 ? "" : "s"}
      </p>
      <BusinessGrid businesses={visibleItems} />
      {hasMore ? (
        <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
          Desplázate para cargar más…
        </p>
      ) : null}
    </>
  );
}
