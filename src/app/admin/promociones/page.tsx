import { CrudTable } from "@/components/admin/CrudTable";
import { mockPromotions } from "@/data/mock";

export default function AdminPromocionesPage() {
  return (
    <CrudTable
      title="Promociones"
      description="Descuentos, cupones y campañas activas."
      columns={["Título", "Negocio", "Descuento", "Cupón"]}
      rows={mockPromotions.map((p) => [
        p.title,
        p.businessName,
        p.discount || "-",
        p.couponCode || "-",
      ])}
    />
  );
}
