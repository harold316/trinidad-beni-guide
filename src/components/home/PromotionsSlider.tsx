"use client";

import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import type { Promotion } from "@/types";
import { Badge } from "@/components/ui/Badge";

export function PromotionsSlider({ promotions }: { promotions: Promotion[] }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 4200, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      spaceBetween={16}
      slidesPerView={1}
      breakpoints={{
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      }}
      className="!pb-10"
    >
      {promotions.map((promo) => (
        <SwiperSlide key={promo.id}>
          <Link
            href="/promociones"
            className="group relative block overflow-hidden rounded-2xl border border-[var(--color-border)]"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={promo.image}
                alt={promo.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 space-y-2 p-5">
                {promo.discount ? <Badge tone="promo">{promo.discount} OFF</Badge> : null}
                <h3 className="font-[family-name:var(--font-display)] text-xl text-white">
                  {promo.title}
                </h3>
                <p className="text-sm text-white/80">{promo.businessName}</p>
                {promo.couponCode ? (
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-200">
                    Cupón: {promo.couponCode}
                  </p>
                ) : null}
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
