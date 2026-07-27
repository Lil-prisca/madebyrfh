import { useState } from "react";
import { motion } from "framer-motion";
import { signIn } from "../lib/supabase";

export default function AdminAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    setError(null);
    const { error: err } = await signIn(email, password);
    if (err) setError(err.message);
    setLoading(false);
  };

  const handleKey = (e) => e.key === "Enter" && handleLogin();

  return (
    <div
      className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Playfair+Display:ital@1&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-script  { font-family: 'Playfair Display', serif; font-style: italic; }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="font-script text-3xl text-[#D4AF37]">
            made<span className="font-display font-bold text-white">byRFH</span>
          </span>
          <p className="text-white/40 text-xs mt-2 tracking-widest uppercase">
            Admin
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-b from-[#D4AF37]/[0.04] to-white/[0.02] p-8">
          <h1 className="font-display text-2xl font-bold text-white mb-6">
            Sign in
          </h1>

          <div className="space-y-4">
            <div>
              <label className="block text-[#D4AF37]/80 text-xs uppercase tracking-wide mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKey}
                placeholder="admin@madebyrfh.com"
                className="w-full bg-black/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#D4AF37]/80 text-xs uppercase tracking-wide mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKey}
                placeholder="••••••••"
                className="w-full bg-black/50 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-xs"
              >
                {error}
              </motion.p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#D4AF37] text-black py-3 rounded-xl font-semibold text-sm hover:bg-[#c4a02f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          madebyRFH admin panel — restricted access
        </p>
      </motion.div>
    </div>
  );
}
