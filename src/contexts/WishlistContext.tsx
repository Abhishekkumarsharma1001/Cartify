import React, { createContext, useContext, useState, useEffect } from "react";
import type { Product } from "@/data/products";

const WishlistContext = createContext<{
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  totalItems: number;
} | null>(null);

function loadWishlist(): Product[] {
  try {
    const data = localStorage.getItem("cartify-wishlist");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>(loadWishlist);

  useEffect(() => {
    localStorage.setItem("cartify-wishlist", JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: Product) => {
    setItems((prev) => (prev.find((p) => p.id === product.id) ? prev : [...prev, product]));
  };

  const removeFromWishlist = (productId: number) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInWishlist = (productId: number) => items.some((p) => p.id === productId);

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist, totalItems: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
