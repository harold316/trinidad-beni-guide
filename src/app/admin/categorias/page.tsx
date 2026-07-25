import { CrudTable } from "@/components/admin/CrudTable";
import { CATEGORY_LABELS } from "@/lib/constants";

export default function AdminCategoriasPage() {
  return (
    <CrudTable
      title="Categorías"
      description="Taxonomía del directorio."
      columns={["Slug", "Nombre", "Estado"]}
      rows={Object.entries(CATEGORY_LABELS).map(([slug, name]) => [
        slug,
        name,
        "Activa",
      ])}
    />
  );
}
