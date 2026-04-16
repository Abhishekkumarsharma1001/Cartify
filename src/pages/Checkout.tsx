import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle, CreditCard, Banknote, Smartphone } from "lucide-react";
import Layout from "@/components/Layout";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/lib/currency";

type PaymentMethod = "card" | "upi" | "cod";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "success">("form");
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", address: "", city: "", pincode: "", phone: "" });
  const [payment, setPayment] = useState<PaymentMethod>("upi");

  const shipping = totalPrice >= 499 ? 0 : 49;

  if (items.length === 0 && step !== "success") {
    navigate("/cart");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addOrder({
      items: items.map((i) => ({ name: i.product.name, price: i.product.price, quantity: i.quantity, image: i.product.image })),
      total: totalPrice + shipping,
    });
    clearCart();
    setStep("success");
  };

  if (step === "success") {
    return (
      <Layout>
        <div className="container-main py-20 text-center animate-fade-in">
          <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Order Placed!</h1>
          <p className="text-muted-foreground mb-8">Thank you for your purchase. You'll receive a confirmation shortly.</p>
          <div className="flex justify-center gap-4">
            <Link to="/orders" className="btn-primary">View Orders</Link>
            <Link to="/products" className="btn-secondary">Continue Shopping</Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-main py-8">
        <h1 className="section-title mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="font-bold text-foreground mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Phone</label>
                  <input required type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Pincode</label>
                  <input required maxLength={6} placeholder="110001" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className="input-field" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-foreground mb-1 block">Address</label>
                  <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">City</label>
                  <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input-field" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="font-bold text-foreground mb-4">Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {([
                  { id: "upi" as const, label: "UPI", icon: Smartphone, desc: "GPay, PhonePe, Paytm" },
                  { id: "card" as const, label: "Card", icon: CreditCard, desc: "Credit / Debit Card" },
                  { id: "cod" as const, label: "Cash on Delivery", icon: Banknote, desc: "Pay when delivered" },
                ]).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPayment(m.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      payment === m.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <m.icon className={`w-5 h-5 mb-2 ${payment === m.id ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="font-medium text-foreground text-sm">{m.label}</p>
                    <p className="text-xs text-muted-foreground">{m.desc}</p>
                  </button>
                ))}
              </div>
              {payment === "upi" && (
                <div className="mt-4">
                  <label className="text-sm font-medium text-foreground mb-1 block">UPI ID</label>
                  <input placeholder="name@upi" className="input-field" />
                </div>
              )}
              {payment === "card" && (
                <div className="mt-4">
                  <label className="text-sm font-medium text-foreground mb-1 block">Card Number</label>
                  <input placeholder="4242 4242 4242 4242" className="input-field" />
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-3">This is a mock checkout. No real payment will be processed.</p>
            </div>

            <button type="submit" className="btn-primary w-full">Place Order — {formatPrice(totalPrice + shipping)}</button>
          </form>

          <div className="bg-card rounded-xl border border-border p-6 h-fit sticky top-24">
            <h2 className="font-bold text-lg text-foreground mb-4">Order Summary</h2>
            <div className="space-y-3 max-h-64 overflow-auto">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3">
                  <img src={product.image} alt={product.name} className="w-12 h-12 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-foreground">{formatPrice(product.price * quantity)}</p>
                </div>
              ))}
            </div>
            <hr className="border-border my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">{formatPrice(totalPrice)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-foreground">{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
              <hr className="border-border" />
              <div className="flex justify-between font-bold text-base"><span className="text-foreground">Total</span><span className="text-foreground">{formatPrice(totalPrice + shipping)}</span></div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">🚚 Estimated delivery in 3-5 business days</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
