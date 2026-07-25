import { CrudTable } from "@/components/admin/CrudTable";

export default function AdminUsuariosPage() {
  return (
    <CrudTable
      title="Usuarios"
      description="Administra roles: admin, empresa, cliente."
      columns={["Nombre", "Email", "Rol", "Estado"]}
      rows={[
        ["Admin TBG", "admin@trinidadbeniguide.com", "admin", "Activo"],
        ["Hotel Plaza Real", "hotel@example.com", "empresa", "Activo"],
        ["Ana López", "ana@example.com", "cliente", "Activo"],
      ]}
    />
  );
}
