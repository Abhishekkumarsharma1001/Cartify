import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) { navigate("/dashboard"); return null; }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password. Please sign up first.");
    }
  };

  return (
    <Layout>
      <div className="container-main py-12 flex justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-foreground text-center mb-2">Welcome Back</h1>
          <p className="text-muted-foreground text-center mb-8">Sign in to your account</p>
          {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="you@email.com" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="••••••••" />
            </div>
            <button type="submit" className="btn-primary w-full">Sign In</button>
          </form>
          <p className="text-sm text-center text-muted-foreground mt-6">
            Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
