import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Order {
  id: string;
  date: string;
  items: { name: string; price: number; quantity: number; image: string }[];
  total: number;
  status: "processing" | "shipped" | "delivered";
}

const AuthContext = createContext<{
  user: User | null;
  orders: Order[];
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => void;
} | null>(null);

function loadUser(): User | null {
  try {
    const d = localStorage.getItem("cartify-user");
    return d ? JSON.parse(d) : null;
  } catch { return null; }
}

function loadOrders(): Order[] {
  try {
    const d = localStorage.getItem("cartify-orders");
    return d ? JSON.parse(d) : [];
  } catch { return []; }
}

function loadUsers(): { name: string; email: string; password: string }[] {
  try {
    const d = localStorage.getItem("cartify-users");
    return d ? JSON.parse(d) : [];
  } catch { return []; }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser);
  const [orders, setOrders] = useState<Order[]>(loadOrders);

  useEffect(() => {
    localStorage.setItem("cartify-user", user ? JSON.stringify(user) : "");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cartify-orders", JSON.stringify(orders));
  }, [orders]);

  const login = (email: string, password: string): boolean => {
    const users = loadUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser({ id: btoa(found.email), name: found.name, email: found.email });
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    const users = loadUsers();
    if (users.find((u) => u.email === email)) return false;
    users.push({ name, email, password });
    localStorage.setItem("cartify-users", JSON.stringify(users));
    setUser({ id: btoa(email), name, email });
    return true;
  };

  const logout = () => setUser(null);

  const addOrder = (order: Omit<Order, "id" | "date" | "status">) => {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      date: new Date().toISOString(),
      status: "processing",
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <AuthContext.Provider value={{ user, orders, login, signup, logout, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
