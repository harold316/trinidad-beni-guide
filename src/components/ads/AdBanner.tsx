import Image from "next/image";
import Link from "next/link";
import type { AdBanner as AdBannerType } from "@/types";
import { cn } from "@/lib/utils";

export function AdBannerSlot({
  ad,
  className,
}: {
  ad?: AdBannerType;
  className?: string;
}) {
  if (!ad) return null;

  return (
    <Link
      href={ad.link}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-[var(--color-border)]",
        className
      )}
      aria-label={ad.title}
    >
      <div className="relative aspect-[21/6] w-full md:aspect-[21/5]">
        <Image
          src={ad.image}
          alt={ad.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex items-center p-5 md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Publicidad
            </p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-xl text-white md:text-2xl">
              {ad.title}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
