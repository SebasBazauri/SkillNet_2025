import { create } from "zustand";

export const useStore = create((set) => ({
  user: null,
  items: [],
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
  addItem: (item) =>
    set((state) => ({ items: [...state.items, item] })),
  updateItem: (id, data) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    })),
  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}));
