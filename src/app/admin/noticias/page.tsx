import { CrudTable } from "@/components/admin/CrudTable";
import { mockNews } from "@/data/mock";

export default function AdminNoticiasPage() {
  return (
    <CrudTable
      title="Noticias"
      description="Publica y edita artículos del portal."
      columns={["Título", "Fecha", "Categoría", "Autor"]}
      rows={mockNews.map((n) => [n.title, n.publishedAt, n.category, n.author])}
    />
  );
}
