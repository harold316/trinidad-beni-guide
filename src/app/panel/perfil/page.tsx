import { BusinessForm } from "@/components/panel/BusinessForm";

export default function PanelPerfilPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
        Perfil del negocio
      </h1>
      <BusinessForm />
    </div>
  );
}
