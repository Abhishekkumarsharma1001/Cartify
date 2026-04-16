import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Truck } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/currency";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden card-hover">
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </Link>
        {product.badge && (
          <span className={`absolute top-3 left-3 ${product.badge === "sale" ? "badge-sale" : "badge-new"}`}>
            {product.badge === "sale" ? `-${discount}%` : product.badge === "new" ? "New" : "Best Seller"}
          </span>
        )}
        <button
          onClick={() => {
            if (wishlisted) { removeFromWishlist(product.id); toast({ title: "Removed from wishlist" }); }
            else { addToWishlist(product); toast({ title: "Added to wishlist" }); }
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm shadow-md hover:bg-card transition-all duration-200 hover:scale-110"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
        </button>
        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => { addToCart(product); toast({ title: "Added to cart", description: product.name }); }}
            className="w-full bg-primary text-primary-foreground py-2.5 text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </div>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground text-sm line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-2">
          <Star className="w-3.5 h-3.5 fill-star text-star" />
          <span className="text-xs font-medium text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString("en-IN")})</span>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
          <Truck className="w-3 h-3" />
          <span>{product.price >= 499 ? "Free Delivery" : "Delivery ₹49"}</span>
        </div>
      </div>
    </div>
  );
}
