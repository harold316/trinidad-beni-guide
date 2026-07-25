import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  type DocumentData,
} from "firebase/firestore";
import { getFirebaseDb } from "./config";
import type {
  AdBanner,
  Business,
  ContactMessage,
  Event,
  NewsArticle,
  NewsletterSubscriber,
  Promotion,
  Review,
} from "@/types";

function requireDb() {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase no está configurado");
  return db;
}

async function getCollection<T>(name: string): Promise<T[]> {
  const db = requireDb();
  const snap = await getDocs(collection(db, name));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}

export async function getBusinesses(category?: string): Promise<Business[]> {
  const db = requireDb();
  const ref = collection(db, "businesses");
  const q = category
    ? query(ref, where("category", "==", category), orderBy("rating", "desc"))
    : query(ref, orderBy("rating", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Business);
}

export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  const db = requireDb();
  const q = query(collection(db, "businesses"), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Business;
}

export async function getBusinessById(id: string): Promise<Business | null> {
  const db = requireDb();
  const snap = await getDoc(doc(db, "businesses", id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Business) : null;
}

export async function saveBusiness(business: Partial<Business> & { id?: string }) {
  const db = requireDb();
  const payload: DocumentData = {
    ...business,
    updatedAt: new Date().toISOString(),
  };
  delete payload.id;

  if (business.id) {
    await updateDoc(doc(db, "businesses", business.id), payload);
    return business.id;
  }

  payload.createdAt = new Date().toISOString();
  const ref = await addDoc(collection(db, "businesses"), payload);
  return ref.id;
}

export async function deleteBusiness(id: string) {
  const db = requireDb();
  await deleteDoc(doc(db, "businesses", id));
}

export async function getPromotions(): Promise<Promotion[]> {
  return getCollection<Promotion>("promotions");
}

export async function getEvents(): Promise<Event[]> {
  return getCollection<Event>("events");
}

export async function getNews(): Promise<NewsArticle[]> {
  return getCollection<NewsArticle>("news");
}

export async function getAds(): Promise<AdBanner[]> {
  return getCollection<AdBanner>("ads");
}

export async function savePromotion(data: Partial<Promotion> & { id?: string }) {
  const db = requireDb();
  if (data.id) {
    const { id, ...rest } = data;
    await updateDoc(doc(db, "promotions", id), rest);
    return id;
  }
  const ref = await addDoc(collection(db, "promotions"), data);
  return ref.id;
}

export async function saveEvent(data: Partial<Event> & { id?: string }) {
  const db = requireDb();
  if (data.id) {
    const { id, ...rest } = data;
    await updateDoc(doc(db, "events", id), rest);
    return id;
  }
  const ref = await addDoc(collection(db, "events"), data);
  return ref.id;
}

export async function saveNews(data: Partial<NewsArticle> & { id?: string }) {
  const db = requireDb();
  if (data.id) {
    const { id, ...rest } = data;
    await updateDoc(doc(db, "news", id), rest);
    return id;
  }
  const ref = await addDoc(collection(db, "news"), data);
  return ref.id;
}

export async function saveAd(data: Partial<AdBanner> & { id?: string }) {
  const db = requireDb();
  if (data.id) {
    const { id, ...rest } = data;
    await updateDoc(doc(db, "ads", id), rest);
    return id;
  }
  const ref = await addDoc(collection(db, "ads"), data);
  return ref.id;
}

export async function deleteDocument(collectionName: string, id: string) {
  const db = requireDb();
  await deleteDoc(doc(db, collectionName, id));
}

export async function addReview(businessId: string, review: Omit<Review, "id">) {
  const db = requireDb();
  const ref = await addDoc(collection(db, "businesses", businessId, "reviews"), review);
  return ref.id;
}

export async function submitContact(message: ContactMessage) {
  const db = requireDb();
  const ref = await addDoc(collection(db, "contacts"), {
    ...message,
    createdAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function subscribeNewsletter(email: string) {
  const db = requireDb();
  const payload: NewsletterSubscriber = {
    email,
    createdAt: new Date().toISOString(),
  };
  await setDoc(doc(db, "newsletter", email), payload);
}
