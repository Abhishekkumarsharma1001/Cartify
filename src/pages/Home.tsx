import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RotateCcw, Star, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const trending = products.filter((p) => p.badge === "new").slice(0, 4);
const bestsellers = products.filter((p) => p.badge === "bestseller").slice(0, 4);

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
        <div className="container-main py-16 sm:py-24 lg:py-32">
          <div className="max-w-2xl">
            <span className="inline-block badge-new mb-4 animate-fade-in">🇮🇳 Made for India</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Discover Products You'll <span className="text-primary">Love</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Curated collections of premium products at prices that make sense. Free delivery on orders over ₹499.
            </p>
            <div className="flex flex-wrap gap-3 mt-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link to="/products" className="btn-primary inline-flex items-center gap-2">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products?category=electronics" className="btn-secondary inline-flex items-center gap-2">
                Explore Electronics
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </section>

      {/* Trust Badges */}
      <section className="border-b border-border bg-card">
        <div className="container-main py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: "Free Delivery", sub: "On orders above ₹499" },
              { icon: Shield, label: "Secure Payment", sub: "UPI, Cards & COD" },
              { icon: RotateCcw, label: "Easy Returns", sub: "7-day return policy" },
              { icon: MapPin, label: "Pan-India Delivery", sub: "Delivering across India" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-main py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Shop by Category</h2>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="group relative rounded-xl overflow-hidden aspect-[4/3] card-hover"
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="text-primary-foreground font-bold text-lg">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="bg-secondary/50">
        <div className="container-main py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">Trending Now</h2>
            <Link to="/products" className="text-sm font-medium text-primary hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trending.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="container-main py-16">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-primary/80 p-8 sm:p-12 lg:p-16">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">Mega Sale Live!</h2>
            <p className="mt-3 text-primary-foreground/80">Up to 40% off on selected items. COD available on all orders.</p>
            <Link to="/products" className="btn-accent inline-flex items-center gap-2 mt-6">
              Shop the Sale <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full bg-primary-foreground/5 rounded-l-full" />
        </div>
      </section>

      {/* Bestsellers */}
      <section className="container-main pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Best Sellers</h2>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestsellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </Layout>
  );
}
