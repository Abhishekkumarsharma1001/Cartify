import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  if (user) { navigate("/dashboard"); return null; }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (signup(name, email, password)) {
      navigate("/dashboard");
    } else {
      setError("An account with this email already exists.");
    }
  };

  return (
    <Layout>
      <div className="container-main py-12 flex justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-foreground text-center mb-2">Create Account</h1>
          <p className="text-muted-foreground text-center mb-8">Join Cartify and start shopping</p>
          {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder="John Doe" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="you@email.com" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="Min. 6 characters" />
            </div>
            <button type="submit" className="btn-primary w-full">Create Account</button>
          </form>
          <p className="text-sm text-center text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
