import { CrudTable } from "@/components/admin/CrudTable";
import { mockEvents } from "@/data/mock";

export default function AdminEventosPage() {
  return (
    <CrudTable
      title="Eventos"
      description="Gestiona la agenda cultural y comercial."
      columns={["Título", "Fecha", "Categoría", "Lugar"]}
      rows={mockEvents.map((e) => [e.title, e.startDate, e.category, e.location])}
    />
  );
}
