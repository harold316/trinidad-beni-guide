import { CrudTable } from "@/components/admin/CrudTable";
import { mockAds } from "@/data/mock";

export default function AdminPublicidadPage() {
  return (
    <CrudTable
      title="Publicidad"
      description="Banners administrables: header, sidebar, footer e inline."
      columns={["Título", "Ubicación", "Prioridad", "Estado"]}
      rows={mockAds.map((a) => [
        a.title,
        a.placement,
        a.priority,
        a.active ? "Activo" : "Inactivo",
      ])}
    />
  );
}
