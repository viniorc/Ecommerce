'use client';

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { fallbackProductImage } from "@/data/products";

export type CartItem = {
  id: string;
  name: string;
  slug?: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
  variant?: string;
};

export type CartProductInput = {
  id: string;
  name: string;
  price: number;
  promoPrice?: number;
  image?: string;
  slug?: string;
  variant?: string;
  originalPrice?: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: CartProductInput, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  totals: () => { subtotal: number; discount: number; total: number };
  itemCount: () => number;
};

const noopStorage: Storage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
  clear: () => undefined,
  key: () => null,
  length: 0,
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, qty = 1) =>
        set((state) => {
          const basePrice = product.price;
          const finalPrice = product.promoPrice ?? basePrice;
          const originalPrice = product.originalPrice ?? basePrice;

          const existing = state.items.find((entry) => entry.id === product.id);
          if (existing) {
            return {
              items: state.items.map((entry) =>
                entry.id === product.id
                  ? { ...entry, quantity: entry.quantity + qty }
                  : entry
              ),
            };
          }

          const newItem: CartItem = {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: finalPrice,
            originalPrice,
            quantity: qty,
            image: product.image ?? fallbackProductImage,
            variant: product.variant,
          };

          return { items: [...state.items, newItem] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQty: (id, qty) =>
        set((state) => {
          if (qty <= 0) {
            return { items: state.items.filter((item) => item.id !== id) };
          }
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity: qty } : item
            ),
          };
        }),
      clear: () => set({ items: [] }),
      totals: () => {
        const subtotal = get().items.reduce((acc, item) => {
          const base = item.originalPrice ?? item.price;
          return acc + base * Math.max(item.quantity, 0);
        }, 0);

        const total = get().items.reduce(
          (acc, item) => acc + item.price * Math.max(item.quantity, 0),
          0
        );

        return {
          subtotal,
          discount: Math.max(subtotal - total, 0),
          total,
        };
      },
      itemCount: () =>
        get().items.reduce((acc, item) => acc + Math.max(item.quantity, 0), 0),
    }),
    {
      name: "liahna-cart",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : noopStorage
      ),
      version: 2,
      migrate: (persistedState: {
        state?: { items?: Array<Partial<CartItem>> };
      }) => {
        // Ensure new fields exist after migration
        if (persistedState?.state?.items) {
          persistedState.state.items = persistedState.state.items.map(
            (item) => ({
              ...item,
              originalPrice: item.originalPrice ?? item.price,
            })
          );
        }
        return persistedState;
      },
    }
  )
);
