import { MediaUploader } from "@/components/panel/MediaUploader";

export default function PanelMediosPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
        Fotos y videos
      </h1>
      <div className="grid gap-5 lg:grid-cols-2">
        <MediaUploader title="Logo" folder="logo" />
        <MediaUploader title="Galería de fotos" folder="images" />
        <MediaUploader title="Videos" folder="videos" />
        <MediaUploader title="Menús / catálogos" folder="menus" />
      </div>
    </div>
  );
}
