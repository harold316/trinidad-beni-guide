"use client";

import { useEffect, useMemo, useState } from "react";

export function useInfiniteScroll<T>(items: T[], pageSize = 6) {
  const [visibleCount, setVisibleCount] = useState(pageSize);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [items, pageSize]);

  useEffect(() => {
    function onScroll() {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 400;
      if (nearBottom) {
        setVisibleCount((count) => Math.min(count + pageSize, items.length));
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items.length, pageSize]);

  const visibleItems = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount]
  );

  return {
    visibleItems,
    hasMore: visibleCount < items.length,
  };
}
