import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/currency";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-main py-20 text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2">
            Start Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Layout>
    );
  }

  const shipping = totalPrice >= 499 ? 0 : 49;

  return (
    <Layout>
      <div className="container-main py-8">
        <h1 className="section-title mb-8">Shopping Cart ({items.length})</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 bg-card rounded-xl border border-border p-4 animate-fade-in">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`} className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">{product.name}</Link>
                  <p className="text-sm text-muted-foreground capitalize mt-0.5">{product.category}</p>
                  <p className="font-bold text-foreground mt-2">{formatPrice(product.price)}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(product.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center border border-border rounded-lg">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1.5 text-muted-foreground hover:text-foreground"><Minus className="w-3 h-3" /></button>
                    <span className="px-3 text-sm font-medium text-foreground">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 text-muted-foreground hover:text-foreground"><Plus className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-xl border border-border p-6 h-fit sticky top-24">
            <h2 className="font-bold text-lg text-foreground mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">{formatPrice(totalPrice)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-foreground">{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
              <hr className="border-border" />
              <div className="flex justify-between text-base font-bold"><span className="text-foreground">Total</span><span className="text-foreground">{formatPrice(totalPrice + shipping)}</span></div>
            </div>
            {shipping > 0 && <p className="text-xs text-muted-foreground mt-3">Add {formatPrice(499 - totalPrice)} more for free delivery!</p>}
            <Link to="/checkout" className="btn-primary w-full mt-6 text-center block">Proceed to Checkout</Link>
            <Link to="/products" className="block text-center text-sm link-hover mt-3">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
