import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb, isFirebaseConfigured } from "./config";
import type { AppUser, UserRole } from "@/types";

const googleProvider = new GoogleAuthProvider();

async function ensureUserProfile(user: User, role: UserRole = "cliente") {
  const db = getFirebaseDb();
  if (!db) return null;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const profile: AppUser = {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "Usuario",
      photoURL: user.photoURL || undefined,
      role,
      favorites: [],
      businessIds: [],
      createdAt: new Date().toISOString(),
    };
    await setDoc(ref, profile);
    return profile;
  }

  return snap.data() as AppUser;
}

export async function registerWithEmail(
  email: string,
  password: string,
  displayName: string,
  role: UserRole = "cliente"
) {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase no está configurado");

  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName });
  return ensureUserProfile(cred.user, role);
}

export async function loginWithEmail(email: string, password: string) {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase no está configurado");

  const cred = await signInWithEmailAndPassword(auth, email, password);
  return ensureUserProfile(cred.user);
}

export async function loginWithGoogle() {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase no está configurado");

  const cred = await signInWithPopup(auth, googleProvider);
  return ensureUserProfile(cred.user);
}

export async function logout() {
  const auth = getFirebaseAuth();
  if (!auth) return;
  await signOut(auth);
}

export function subscribeToAuth(
  callback: (user: User | null, profile: AppUser | null) => void
) {
  if (!isFirebaseConfigured) {
    callback(null, null);
    return () => undefined;
  }

  const auth = getFirebaseAuth();
  if (!auth) {
    callback(null, null);
    return () => undefined;
  }

  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      callback(null, null);
      return;
    }
    const profile = await ensureUserProfile(user);
    callback(user, profile);
  });
}

export async function getUserProfile(uid: string): Promise<AppUser | null> {
  const db = getFirebaseDb();
  if (!db) return null;
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as AppUser) : null;
}
