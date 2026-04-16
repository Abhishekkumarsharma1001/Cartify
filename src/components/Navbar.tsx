import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, User, Search, Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/currency";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof products>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const { totalItems } = useCart();
  const { totalItems: wishlistTotal } = useWishlist();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      setSuggestions(products.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)).slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      setSuggestions([]);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary tracking-tight">
            Cartify
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="link-hover text-sm font-medium">Home</Link>
            <Link to="/products" className="link-hover text-sm font-medium">Products</Link>
            <Link to="/products?category=electronics" className="link-hover text-sm font-medium">Electronics</Link>
            <Link to="/products?category=fashion" className="link-hover text-sm font-medium">Fashion</Link>
          </nav>

          <div className="flex items-center gap-1.5">
            {/* Search */}
            <div ref={searchRef} className="relative">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <Search className="w-5 h-5 text-muted-foreground" />
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-12 w-72 sm:w-96 bg-card rounded-xl shadow-2xl border border-border animate-scale-in p-3">
                  <form onSubmit={handleSearch}>
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="input-field text-sm"
                    />
                  </form>
                  {suggestions.length > 0 && (
                    <ul className="mt-2 divide-y divide-border">
                      {suggestions.map((p) => (
                        <li key={p.id}>
                          <Link
                            to={`/product/${p.id}`}
                            onClick={() => { setSearchOpen(false); setSearchQuery(""); setSuggestions([]); }}
                            className="flex items-center gap-3 py-2 px-1 hover:bg-secondary rounded-lg transition-colors"
                          >
                            <img src={p.image} alt={p.name} className="w-10 h-10 rounded-md object-cover" />
                            <div>
                              <p className="text-sm font-medium text-foreground line-clamp-1">{p.name}</p>
                              <p className="text-xs text-muted-foreground">{formatPrice(p.price)}</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Dark mode toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-secondary transition-colors" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-muted-foreground" />}
            </button>

            <Link to="/wishlist" className="p-2 rounded-lg hover:bg-secondary transition-colors relative">
              <Heart className="w-5 h-5 text-muted-foreground" />
              {wishlistTotal > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistTotal}
                </span>
              )}
            </Link>

            <Link to="/cart" className="p-2 rounded-lg hover:bg-secondary transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-muted-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="relative">
              {user ? (
                <>
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-1 p-2 rounded-lg hover:bg-secondary transition-colors">
                    <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-12 w-48 bg-card rounded-xl shadow-2xl border border-border animate-scale-in py-2">
                      <p className="px-4 py-2 text-sm font-medium text-foreground">{user.name}</p>
                      <hr className="border-border" />
                      <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm link-hover hover:bg-secondary">Dashboard</Link>
                      <Link to="/orders" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm link-hover hover:bg-secondary">Orders</Link>
                      <button onClick={() => { logout(); setUserMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-secondary transition-colors">Logout</button>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login" className="p-2 rounded-lg hover:bg-secondary transition-colors">
                  <User className="w-5 h-5 text-muted-foreground" />
                </Link>
              )}
            </div>

            <button className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-border py-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {[
                { to: "/", label: "Home" },
                { to: "/products", label: "All Products" },
                { to: "/products?category=electronics", label: "Electronics" },
                { to: "/products?category=fashion", label: "Fashion" },
                { to: "/products?category=home", label: "Home & Living" },
                { to: "/products?category=beauty", label: "Beauty" },
              ].map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="px-2 py-2 text-sm font-medium link-hover rounded-lg hover:bg-secondary">
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
