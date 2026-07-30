import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchStats, fetchOrders } from "../lib/supabase";

const STATUS_STYLES = {
  pending: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  fulfilled: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  cancelled: "bg-red-400/10 text-red-400 border-red-400/20",
};

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
  // const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [statsRes] = await Promise.all([fetchStats(), fetchOrders()]);
      setStats(statsRes);
      // setRecentOrders((ordersRes.data ?? []).slice(0, 5));
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

  const statCards = [
    {
      label: "Total Products",
      value: stats?.total_products ?? 0,
      sub: "in catalog",
    },
    // { label: "Total Orders", value: stats?.total_orders ?? 0, sub: "all time" },
    // {
    //   label: "Pending Orders",
    //   value: stats?.pending ?? 0,
    //   sub: "need attention",
    // },
    // {
    //   label: "Revenue",
    //   value: `₦${(stats?.total_revenue ?? 0).toLocaleString()}`,
    //   sub: "all time",
    // },
  ];

  return (
    <div className="space-y-8">
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} />
        ))}
      </div>

      {/* Recent orders */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32, duration: 0.5 }}
        className="rounded-2xl border border-[#D4AF37]/15 bg-white/[0.02] overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/10">
          <h2 className="font-display text-lg font-bold text-white">
            Recent Orders
          </h2>
          <span className="text-white/40 text-xs">Last 5</span>
        </div> */}

      {/* {recentOrders.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-12">
            No orders yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {[
                    "Customer",
                    "Product",
                    "Size",
                    "Amount",
                    "Status",
                    "Date",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-white/30 text-xs uppercase tracking-wide px-6 py-3 font-medium"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr
                    key={order.id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">
                        {order.customer_name}
                      </p>
                      <p className="text-white/40 text-xs">
                        {order.customer_email}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-white/70">
                      {order.product_name}
                    </td>
                    <td className="px-6 py-4 text-white/50">
                      {order.size ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-[#D4AF37] font-medium">
                      ₦{(order.amount ?? 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_STYLES[order.status] ?? STATUS_STYLES.pending}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/40 text-xs">
                      {new Date(order.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )} */}
      {/* </motion.div> */}
    </div>
  );
}
