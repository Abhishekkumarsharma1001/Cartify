import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Cartify</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your premium destination for curated products. Quality meets affordability.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products?category=electronics" className="link-hover">Electronics</Link></li>
              <li><Link to="/products?category=fashion" className="link-hover">Fashion</Link></li>
              <li><Link to="/products?category=home" className="link-hover">Home & Living</Link></li>
              <li><Link to="/products?category=beauty" className="link-hover">Beauty</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="link-hover">Login</Link></li>
              <li><Link to="/signup" className="link-hover">Sign Up</Link></li>
              <li><Link to="/cart" className="link-hover">Cart</Link></li>
              <li><Link to="/wishlist" className="link-hover">Wishlist</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="link-hover cursor-default">Help Center</span></li>
              <li><span className="link-hover cursor-default">Shipping</span></li>
              <li><span className="link-hover cursor-default">Returns</span></li>
              <li><span className="link-hover cursor-default">Contact</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Cartify. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
