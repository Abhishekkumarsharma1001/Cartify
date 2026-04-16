import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD"; product: Product; quantity?: number }
  | { type: "REMOVE"; productId: number }
  | { type: "UPDATE_QTY"; productId: number; quantity: number }
  | { type: "CLEAR" };

const CartContext = createContext<{
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + (action.quantity || 1) }
              : i
          ),
        };
      }
      return { items: [...state.items, { product: action.product, quantity: action.quantity || 1 }] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.product.id !== action.productId) };
    case "UPDATE_QTY":
      if (action.quantity <= 0) return { items: state.items.filter((i) => i.product.id !== action.productId) };
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

function loadCart(): CartState {
  try {
    const data = localStorage.getItem("cartify-cart");
    return data ? JSON.parse(data) : { items: [] };
  } catch {
    return { items: [] };
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    localStorage.setItem("cartify-cart", JSON.stringify(state));
  }, [state]);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart: (product, quantity) => dispatch({ type: "ADD", product, quantity }),
        removeFromCart: (id) => dispatch({ type: "REMOVE", productId: id }),
        updateQuantity: (id, qty) => dispatch({ type: "UPDATE_QTY", productId: id, quantity: qty }),
        clearCart: () => dispatch({ type: "CLEAR" }),
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
