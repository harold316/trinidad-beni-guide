import { BusinessCardSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto grid max-w-7xl gap-5 px-4 py-16 sm:grid-cols-2 md:px-6 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <BusinessCardSkeleton key={i} />
      ))}
    </div>
  );
}
