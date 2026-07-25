import { TRINIDAD_COORDS } from "@/lib/constants";

export function MapEmbed({
  lat = TRINIDAD_COORDS.lat,
  lng = TRINIDAD_COORDS.lng,
  zoom = 14,
  className = "h-72 w-full rounded-2xl",
  title = "Mapa",
}: {
  lat?: number;
  lng?: number;
  zoom?: number;
  className?: string;
  title?: string;
}) {
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;

  return (
    <iframe
      title={title}
      src={src}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
