"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "firebase/auth";
import {
  loginWithEmail,
  loginWithGoogle,
  logout,
  registerWithEmail,
  subscribeToAuth,
} from "@/lib/firebase/auth";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import type { AppUser, UserRole } from "@/types";

interface AuthContextValue {
  user: User | null;
  profile: AppUser | null;
  loading: boolean;
  configured: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    displayName: string,
    role?: UserRole
  ) => Promise<void>;
  loginGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isEmpresa: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToAuth((nextUser, nextProfile) => {
      setUser(nextUser);
      setProfile(nextProfile);
      setLoading(false);
    });
    return unsub;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      loading,
      configured: isFirebaseConfigured,
      login: async (email, password) => {
        await loginWithEmail(email, password);
      },
      register: async (email, password, displayName, role = "cliente") => {
        await registerWithEmail(email, password, displayName, role);
      },
      loginGoogle: async () => {
        await loginWithGoogle();
      },
      signOut: async () => {
        await logout();
      },
      isAdmin: profile?.role === "admin",
      isEmpresa: profile?.role === "empresa" || profile?.role === "admin",
    }),
    [user, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
