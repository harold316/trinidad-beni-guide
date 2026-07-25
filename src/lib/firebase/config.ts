import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.appId &&
    !firebaseConfig.apiKey.includes("your_")
);

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

export function getFirebaseApp() {
  if (!isFirebaseConfigured) return undefined;
  if (!app) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  return app;
}

export function getFirebaseAuth() {
  if (!isFirebaseConfigured) return undefined;
  if (!auth) {
    const firebaseApp = getFirebaseApp();
    if (!firebaseApp) return undefined;
    auth = getAuth(firebaseApp);
  }
  return auth;
}

export function getFirebaseDb() {
  if (!isFirebaseConfigured) return undefined;
  if (!db) {
    const firebaseApp = getFirebaseApp();
    if (!firebaseApp) return undefined;
    db = getFirestore(firebaseApp);
  }
  return db;
}

export function getFirebaseStorage() {
  if (!isFirebaseConfigured) return undefined;
  if (!storage) {
    const firebaseApp = getFirebaseApp();
    if (!firebaseApp) return undefined;
    storage = getStorage(firebaseApp);
  }
  return storage;
}
