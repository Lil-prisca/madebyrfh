import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchStats, fetchOrders, fetchContactMessages } from "../lib/supabase";

function StatCard({ label, value, sub, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.07,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-2xl border border-[#D4AF37]/15 bg-gradient-to-b from-[#D4AF37]/[0.05] to-white/[0.02] p-6"
    >
      <p className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
        {label}
      </p>
      <p className="font-display text-4xl font-bold text-white">{value}</p>
      {sub && <p className="text-white/40 text-xs mt-1">{sub}</p>}
    </motion.div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [statsRes, , messagesRes] = await Promise.all([
        fetchStats(),
        fetchOrders(),
        fetchContactMessages(),
      ]);
      setStats(statsRes);
      setMessages(messagesRes.data ?? []);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
      </div>
    );
  }

  const totalMessages = messages.length;
  const pendingMessages = messages.filter((m) => !m.is_read).length;

  const statCards = [
    {
      label: "Total Products",
      value: stats?.total_products ?? 0,
      sub: "in catalog",
    },
    {
      label: "Total Messages",
      value: totalMessages,
      sub: "all time",
    },
    {
      label: "Pending Messages",
      value: pendingMessages,
      sub: "need attention",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} />
        ))}
      </div>
    </div>
  );
}
