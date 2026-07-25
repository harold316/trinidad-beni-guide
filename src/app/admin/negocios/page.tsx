import { CrudTable } from "@/components/admin/CrudTable";
import { mockBusinesses } from "@/data/mock";
import { CATEGORY_LABELS } from "@/lib/constants";

export default function AdminNegociosPage() {
  return (
    <CrudTable
      title="Negocios"
      description="CRUD de restaurantes, clínicas, turismo y empresas."
      columns={["Nombre", "Categoría", "Rating", "Estado"]}
      rows={mockBusinesses.map((b) => [
        b.name,
        CATEGORY_LABELS[b.category],
        b.rating,
        b.verified ? "Verificado" : "Pendiente",
      ])}
    />
  );
}
