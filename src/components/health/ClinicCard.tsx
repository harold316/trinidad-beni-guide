"use client";

import Image from "next/image";
import Link from "next/link";
import { FaPhone, FaWhatsapp, FaUserMd, FaAmbulance } from "react-icons/fa";
import type { Business } from "@/types";
import { whatsappLink } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { MapEmbed } from "@/components/maps/MapEmbed";

export function ClinicCard({ clinic }: { clinic: Business }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm">
      <div className="grid md:grid-cols-2">
        <div className="relative min-h-56">
          <Image
            src={clinic.images[0]}
            alt={clinic.name}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-4 p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="info">Clínica</Badge>
            {clinic.emergency ? (
              <Badge tone="promo">
                <span className="inline-flex items-center gap-1">
                  <FaAmbulance /> Emergencias 24/7
                </span>
              </Badge>
            ) : null}
          </div>

          <Link
            href={`/negocios/${clinic.slug}`}
            className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)] hover:text-[var(--color-primary)]"
          >
            {clinic.name}
          </Link>

          <StarRating rating={clinic.rating} count={clinic.reviewCount} />

          {clinic.specialties?.length ? (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                Especialidades
              </p>
              <div className="flex flex-wrap gap-2">
                {clinic.specialties.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </div>
          ) : null}

          {clinic.doctors?.length ? (
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                <FaUserMd /> Doctores
              </p>
              <p className="text-sm text-[var(--color-ink)]">{clinic.doctors.join(" · ")}</p>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2">
            {clinic.phone ? (
              <a
                href={`tel:${clinic.phone}`}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--color-border)] px-3 text-sm font-semibold"
              >
                <FaPhone /> {clinic.phone}
              </a>
            ) : null}
            {clinic.whatsapp ? (
              <a
                href={whatsappLink(clinic.whatsapp, `Hola, quiero agendar en ${clinic.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#25D366] px-3 text-sm font-semibold text-white"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            ) : null}
            <ButtonLink href={`/negocios/${clinic.slug}#reservar`} size="sm">
              Agendar
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] p-3">
        <MapEmbed
          lat={clinic.location.lat}
          lng={clinic.location.lng}
          title={`Mapa de ${clinic.name}`}
          className="h-48 w-full rounded-xl"
        />
      </div>
    </article>
  );
}
