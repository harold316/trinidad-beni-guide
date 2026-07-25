"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { uploadBusinessImage } from "@/lib/firebase/storage";

export function MediaUploader({
  title,
  folder,
}: {
  title: string;
  folder: "images" | "logo" | "videos" | "menus";
}) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  async function onUpload() {
    if (!files?.length) {
      toast.error("Selecciona al menos un archivo");
      return;
    }
    setLoading(true);
    try {
      if (isFirebaseConfigured) {
        for (const file of Array.from(files)) {
          await uploadBusinessImage("demo-business", file, folder);
        }
        toast.success("Archivos subidos a Firebase Storage");
      } else {
        await new Promise((r) => setTimeout(r, 500));
        toast.success("Demo: archivos listos. Conecta Firebase Storage para subirlos.");
      }
      setFiles(null);
    } catch {
      toast.error("Error al subir archivos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">{title}</h2>
      <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-border)] bg-black/[0.02] px-4 py-10 text-center dark:bg-white/[0.03]">
        <FaCloudUploadAlt className="text-3xl text-[var(--color-primary)]" />
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          Arrastra archivos o haz clic para seleccionar
        </p>
        <input
          type="file"
          multiple
          accept={folder === "videos" ? "video/*" : "image/*"}
          className="hidden"
          onChange={(e) => setFiles(e.target.files)}
        />
      </label>
      {files?.length ? (
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          {files.length} archivo(s) seleccionado(s)
        </p>
      ) : null}
      <Button className="mt-4" onClick={onUpload} disabled={loading}>
        {loading ? "Subiendo..." : "Subir"}
      </Button>
    </div>
  );
}
