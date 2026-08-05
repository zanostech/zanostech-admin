"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/services/auth/loginAdmin";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await loginAdmin({ email, password });

    if (!result.success) {
      const errorMsg = result.message || "Invalid email or password.";
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      return;
    }

    toast.success("Welcome back!");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#F6F8F5" }}>
      <div className="w-full max-w-[420px] bg-white rounded-2xl p-8" style={{ boxShadow: "0 8px 32px rgba(6,78,59,0.12)" }}>
        <div className="text-center mb-6">
          <div className="flex flex-col items-center justify-center gap-3 mb-4">
            <img src="/zanostech-logo.png" alt="ZanosTech Logo" className="h-[48px] w-auto object-contain rounded-2xl admin-gradient-btn shadow-sm p-2" />
            <div className="text-left">
              <span className="block font-bold" style={{ color: "#064E3B", fontSize: "1.5rem" }}>Admin Portal</span>
            </div>
          </div>
          <p className="text-sm mt-1" style={{ color: "#6B7280", fontSize: "0.875rem" }}>
            Secure access for authorized administrators only
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm font-medium" style={{ background: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-[46px] px-4 rounded-[10px] border text-sm outline-none transition-colors"
              style={{ borderColor: "#E5E7EB" }}
              onFocus={(e) => (e.target.style.borderColor = "#064E3B")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-[46px] px-4 rounded-[10px] border text-sm outline-none transition-colors"
              style={{ borderColor: "#E5E7EB" }}
              onFocus={(e) => (e.target.style.borderColor = "#064E3B")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl text-white font-bold text-sm transition-opacity disabled:opacity-60 cursor-pointer admin-gradient-btn"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
