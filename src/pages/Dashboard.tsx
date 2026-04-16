import { Link } from "react-router-dom";
import { Package, Heart, ShoppingCart } from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { formatPrice } from "@/lib/currency";

export default function Dashboard() {
  const { user, orders, logout } = useAuth();
  const { totalItems } = useCart();
  const { totalItems: wishlistTotal } = useWishlist();

  if (!user) return null;

  const stats = [
    { icon: Package, label: "Orders", value: orders.length, to: "/orders" },
    { icon: ShoppingCart, label: "Cart Items", value: totalItems, to: "/cart" },
    { icon: Heart, label: "Wishlist", value: wishlistTotal, to: "/wishlist" },
  ];

  return (
    <Layout>
      <div className="container-main py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <button onClick={logout} className="btn-secondary text-sm py-2">Logout</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <Link key={stat.label} to={stat.to} className="bg-card rounded-xl border border-border p-6 card-hover">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10"><stat.icon className="w-5 h-5 text-primary" /></div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {orders.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Recent Orders</h2>
              <Link to="/orders" className="text-sm text-primary hover:underline">View All</Link>
            </div>
            <div className="space-y-3">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString("en-IN")}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{formatPrice(order.total)}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      order.status === "delivered" ? "bg-primary/10 text-primary" :
                      order.status === "shipped" ? "bg-accent/10 text-accent" :
                      "bg-muted text-muted-foreground"
                    }`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
