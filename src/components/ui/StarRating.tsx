import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { formatRating } from "@/lib/utils";

export function StarRating({
  rating,
  count,
  showValue = true,
  light = false,
}: {
  rating: number;
  count?: number;
  showValue?: boolean;
  light?: boolean;
}) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const value = i + 1;
    if (rating >= value) return <FaStar key={value} className="text-amber-400" />;
    if (rating >= value - 0.5)
      return <FaStarHalfAlt key={value} className="text-amber-400" />;
    return <FaRegStar key={value} className="text-amber-400/50" />;
  });

  return (
    <div className="flex items-center gap-1.5 text-sm">
      <div className="flex items-center gap-0.5" aria-label={`Calificación ${rating} de 5`}>
        {stars}
      </div>
      {showValue ? (
        <span className={`font-semibold ${light ? "text-white" : "text-[var(--color-ink)]"}`}>
          {formatRating(rating)}
        </span>
      ) : null}
      {typeof count === "number" ? (
        <span className={light ? "text-white/75" : "text-[var(--color-muted)]"}>
          ({count})
        </span>
      ) : null}
    </div>
  );
}
