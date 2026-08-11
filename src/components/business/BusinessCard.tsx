"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaHeart, FaWhatsapp, FaClock, FaBalanceScale } from "react-icons/fa";
import type { Business } from "@/types";
import { CATEGORY_LABELS } from "@/lib/constants";
import { cn, whatsappLink } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { useFavoritesStore } from "@/stores/favorites";
import { useCompareStore } from "@/stores/compare";

export function BusinessCard({
  business,
  index = 0,
}: {
  business: Business;
  index?: number;
}) {
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.has(business.id));
  const toggleCompare = useCompareStore((s) => s.toggle);
  const inCompare = useCompareStore((s) => s.ids.includes(business.id));
  const hoursLabel = business.hours[0]
    ? business.hours[0].closed
      ? "Cerrado"
      : `${business.hours[0].open} - ${business.hours[0].close}`
    : "Horario no disponible";

  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
      className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={business.images[0]}
          alt={business.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge tone="success">{CATEGORY_LABELS[business.category]}</Badge>
          {business.priceLevel ? <Badge>{business.priceLevel}</Badge> : null}
        </div>
        <div className="absolute right-3 top-3 flex gap-2">
          <button
            type="button"
            aria-label="Favorito"
            onClick={() => toggleFavorite(business.id)}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur transition hover:scale-105",
              isFavorite ? "text-red-500" : "text-stone-600"
            )}
          >
            <FaHeart />
          </button>
          <button
            type="button"
            aria-label="Comparar"
            onClick={() => toggleCompare(business.id)}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur transition hover:scale-105",
              inCompare ? "text-[var(--color-primary)]" : "text-stone-600"
            )}
          >
            <FaBalanceScale />
          </button>
        </div>
      </div>

      <div className="space-y-3 p-4 md:p-5">
        <div>
          <Link
            href={`/negocios/${business.slug}`}
            className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)] transition hover:text-[var(--color-primary)]"
          >
            {business.name}
          </Link>
          {business.subcategory ? (
            <p className="mt-1 text-sm text-[var(--color-muted)]">{business.subcategory}</p>
          ) : null}
        </div>

        <StarRating rating={business.rating} count={business.reviewCount} />

        <p className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
          <FaClock className="shrink-0" />
          {hoursLabel}
        </p>

        <div className="grid grid-cols-3 gap-2 pt-1">
          <ButtonLink href={`/negocios/${business.slug}`} variant="outline" size="sm">
            Ver más
          </ButtonLink>
          <ButtonLink
            href={`/negocios/${business.slug}#reservar`}
            variant="secondary"
            size="sm"
          >
            Reservar
          </ButtonLink>
          {business.whatsapp ? (
            <a
              href={whatsappLink(
                business.whatsapp,
                `Hola, vi ${business.name} en Trinidad Beni Guide`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center gap-1 rounded-xl bg-[#25D366] px-2 text-xs font-semibold text-white transition hover:bg-[#1ebe57]"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          ) : (
            <Button variant="ghost" size="sm" disabled>
              WhatsApp
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
