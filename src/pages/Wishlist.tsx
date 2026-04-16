import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Layout from "@/components/Layout";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/currency";

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-main py-20 text-center">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-6">Save items you love to your wishlist.</p>
          <Link to="/products" className="btn-primary">Discover Products</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-main py-8">
        <h1 className="section-title mb-8">My Wishlist ({items.length})</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((product) => (
            <div key={product.id} className="flex gap-4 bg-card rounded-xl border border-border p-4 animate-fade-in">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-24 h-24 rounded-lg object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${product.id}`} className="font-semibold text-foreground text-sm hover:text-primary transition-colors line-clamp-2">{product.name}</Link>
                <p className="font-bold text-foreground mt-2">{formatPrice(product.price)}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => { addToCart(product); toast({ title: "Added to cart" }); }}
                    className="flex items-center gap-1.5 text-xs btn-primary py-1.5 px-3"
                  >
                    <ShoppingCart className="w-3 h-3" /> Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
