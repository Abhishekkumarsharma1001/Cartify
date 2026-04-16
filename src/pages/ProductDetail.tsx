import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, ArrowLeft, Check, Truck, MapPin, RotateCcw } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import ProductReviews from "@/components/ProductReviews";
import ProductImageGallery from "@/components/ProductImageGallery";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/currency";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState("");
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!product) {
    return (
      <Layout>
        <div className="container-main py-20 text-center">
          <p className="text-2xl font-bold text-foreground mb-4">Product not found</p>
          <Link to="/products" className="btn-primary">Browse Products</Link>
        </div>
      </Layout>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];

  const checkPincode = () => {
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeMsg("✓ Delivery available in 3-5 business days");
    } else {
      setPincodeMsg("Please enter a valid 6-digit pincode");
    }
  };

  return (
    <Layout>
      <div className="container-main py-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm link-hover mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <ProductImageGallery
            images={galleryImages}
            name={product.name}
            badge={product.badge}
            discount={discount}
          />

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground capitalize mb-1">{product.category}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{product.name}</h1>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-star text-star" : "text-muted"}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString("en-IN")} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="badge-sale">{discount}% OFF</span>
                </>
              )}
            </div>

            <p className="text-muted-foreground mt-4 leading-relaxed">{product.description}</p>

            {product.features && (
              <ul className="mt-4 space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">−</button>
                <span className="px-4 py-2 font-medium text-foreground min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">+</button>
              </div>
              <button
                onClick={() => { addToCart(product, quantity); toast({ title: "Added to cart", description: `${quantity}x ${product.name}` }); }}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
              <button
                onClick={() => {
                  if (wishlisted) { removeFromWishlist(product.id); toast({ title: "Removed from wishlist" }); }
                  else { addToWishlist(product); toast({ title: "Added to wishlist" }); }
                }}
                className={`p-3 rounded-lg border transition-all duration-200 ${wishlisted ? "border-destructive bg-destructive/10" : "border-border hover:border-primary"}`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-secondary rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">Check Delivery</span>
                </div>
                <div className="flex gap-2">
                  <input
                    value={pincode}
                    onChange={(e) => { setPincode(e.target.value); setPincodeMsg(""); }}
                    placeholder="Enter pincode"
                    maxLength={6}
                    className="input-field text-sm py-2 flex-1"
                  />
                  <button onClick={checkPincode} className="btn-secondary py-2 px-4 text-sm">Check</button>
                </div>
                {pincodeMsg && <p className={`text-xs ${pincodeMsg.startsWith("✓") ? "text-primary" : "text-destructive"}`}>{pincodeMsg}</p>}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-primary" /> {product.price >= 499 ? "Free Delivery" : "Delivery ₹49"}</span>
                <span className="flex items-center gap-1.5"><RotateCcw className="w-4 h-4 text-primary" /> 7-day Returns</span>
              </div>
              <p className="text-xs text-muted-foreground">Cash on Delivery available • Pay via UPI, Credit/Debit Card</p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <ProductReviews productId={product.id} productRating={product.rating} productReviewCount={product.reviews} />

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="section-title mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
