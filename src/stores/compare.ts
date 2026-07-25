"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompareState {
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
}

const MAX = 3;

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      ids: [],
      add: (id) =>
        set((state) => {
          if (state.ids.includes(id) || state.ids.length >= MAX) return state;
          return { ids: [...state.ids, id] };
        }),
      remove: (id) => set((state) => ({ ids: state.ids.filter((x) => x !== id) })),
      toggle: (id) => {
        const { ids, add, remove } = get();
        if (ids.includes(id)) remove(id);
        else add(id);
      },
      clear: () => set({ ids: [] }),
    }),
    { name: "tbg-compare" }
  )
);
