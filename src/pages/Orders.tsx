import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/lib/currency";

export default function Orders() {
  const { orders } = useAuth();

  if (orders.length === 0) {
    return (
      <Layout>
        <div className="container-main py-20 text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">No orders yet</h1>
          <p className="text-muted-foreground mb-6">Start shopping to see your orders here.</p>
          <Link to="/products" className="btn-primary">Shop Now</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-main py-8">
        <h1 className="section-title mb-8">My Orders</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-card rounded-xl border border-border p-6 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <p className="font-bold text-foreground">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{formatPrice(order.total)}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    order.status === "delivered" ? "bg-primary/10 text-primary" :
                    order.status === "shipped" ? "bg-accent/10 text-accent" :
                    "bg-muted text-muted-foreground"
                  }`}>{order.status}</span>
                </div>
              </div>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-md object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
