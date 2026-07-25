import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getFirebaseStorage } from "./config";

export async function uploadFile(
  path: string,
  file: File
): Promise<string> {
  const storage = getFirebaseStorage();
  if (!storage) throw new Error("Firebase Storage no está configurado");

  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function uploadBusinessImage(
  businessId: string,
  file: File,
  folder: "images" | "logo" | "videos" | "menus" = "images"
) {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `businesses/${businessId}/${folder}/${Date.now()}.${ext}`;
  return uploadFile(path, file);
}
