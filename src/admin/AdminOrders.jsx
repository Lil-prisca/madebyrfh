import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchOrders, updateOrderStatus, supabase } from "../lib/supabase";

const STATUSES = ["all", "pending", "fulfilled", "cancelled"];

const STATUS_STYLES = {
  pending: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  fulfilled: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  cancelled: "bg-red-400/10 text-red-400 border-red-400/20",
};

const PAYMENT_STYLES = {
  unpaid: "bg-red-400/10 text-red-400 border-red-400/20",
  paid: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  partial: "bg-amber-400/10 text-amber-400 border-amber-400/20",
};

const NEXT_STATUS = {
  pending: "fulfilled",
  fulfilled: "cancelled",
  cancelled: "pending",
};

const ACTION_LABEL = {
  pending: "Mark Fulfilled",
  fulfilled: "Mark Cancelled",
  cancelled: "Reopen",
};

const PAYMENT_OPTIONS = ["unpaid", "paid", "partial"];

// ─── Delete order + its items ─────────────────────────────────────────────────
const deleteOrder = async (id) => {
  await supabase.from("order_items").delete().eq("order_id", id);
  return supabase.from("orders").delete().eq("id", id);
};

// ─── Update payment status ────────────────────────────────────────────────────
const updatePaymentStatus = (id, payment_status) =>
  supabase
    .from("orders")
    .update({ payment_status })
    .eq("id", id)
    .select()
    .single();

// ─── Order details modal ──────────────────────────────────────────────────────
function OrderDetailsModal({
  order,
  onClose,
  onStatusChange,
  onPaymentChange,
  onDelete,
}) {
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingPayment, setUpdatingPayment] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (!order) return null;

  const handleStatusChange = async (next) => {
    setUpdatingStatus(true);
    const { data, error } = await updateOrderStatus(order.id, next);
    setUpdatingStatus(false);
    if (!error && data) onStatusChange(data);
  };

  const handlePaymentChange = async (next) => {
    setUpdatingPayment(true);
    const { data, error } = await updatePaymentStatus(order.id, next);
    setUpdatingPayment(false);
    if (!error && data) onPaymentChange(data);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await deleteOrder(order.id);
    setDeleting(false);
    onDelete(order.id);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-4xl rounded-3xl border border-[#D4AF37]/15 bg-[#0b0b0b] overflow-hidden max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Order #{order.id}
              </h2>
              <p className="text-white/40 text-sm mt-1">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-[#D4AF37]/30 text-white/50 hover:text-[#D4AF37] transition"
            >
              ✕
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 p-8 overflow-y-auto">
            {/* Left — Customer + controls */}
            <div className="space-y-6">
              <div>
                <h3 className="uppercase text-xs tracking-[0.25em] text-[#D4AF37] mb-5">
                  Customer
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Name", value: order.customer_name },
                    { label: "Email", value: order.customer_email || "—" },
                    { label: "Phone", value: order.customer_phone || "—" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-white/30 text-xs uppercase">{label}</p>
                      <p className="text-white">{value}</p>
                    </div>
                  ))}
                  <div>
                    <p className="text-white/30 text-xs uppercase mb-1">
                      Total
                    </p>
                    <p className="text-2xl font-semibold text-[#D4AF37]">
                      ₦
                      {Number(
                        order.total_amount ?? order.amount ?? 0,
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order status */}
              <div>
                <h3 className="uppercase text-xs tracking-[0.25em] text-[#D4AF37] mb-3">
                  Order Status
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {["pending", "fulfilled", "cancelled"].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      disabled={updatingStatus || order.status === s}
                      className={`px-4 py-2 rounded-xl border text-xs font-medium capitalize transition-all disabled:cursor-not-allowed ${
                        order.status === s
                          ? STATUS_STYLES[s]
                          : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
                      }`}
                    >
                      {updatingStatus && order.status !== s ? "…" : s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment status */}
              <div>
                <h3 className="uppercase text-xs tracking-[0.25em] text-[#D4AF37] mb-3">
                  Payment Status
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {PAYMENT_OPTIONS.map((p) => (
                    <button
                      key={p}
                      onClick={() => handlePaymentChange(p)}
                      disabled={
                        updatingPayment ||
                        (order.payment_status ?? "unpaid") === p
                      }
                      className={`px-4 py-2 rounded-xl border text-xs font-medium capitalize transition-all disabled:cursor-not-allowed ${
                        (order.payment_status ?? "unpaid") === p
                          ? PAYMENT_STYLES[p]
                          : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
                      }`}
                    >
                      {updatingPayment &&
                      (order.payment_status ?? "unpaid") !== p
                        ? "…"
                        : p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delete */}
              <div className="pt-2 border-t border-white/5">
                {!confirmDelete ? (
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="flex items-center gap-2 text-red-400/70 hover:text-red-400 text-sm transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Delete Order
                  </button>
                ) : (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                    <p className="text-white/70 text-sm mb-3">
                      Delete order #{order.id} and all its items? This can't be
                      undone.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setConfirmDelete(false)}
                        className="flex-1 border border-white/15 text-white/50 py-2 rounded-xl text-sm hover:border-white/30 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="flex-1 bg-red-500 text-white py-2 rounded-xl text-sm font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors"
                      >
                        {deleting ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right — Order items */}
            <div>
              <h3 className="uppercase text-xs tracking-[0.25em] text-[#D4AF37] mb-5">
                Order Items
              </h3>
              <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
                {(order.order_items ?? []).length === 0 ? (
                  <p className="text-white/30 text-sm">
                    No items on this order.
                  </p>
                ) : (
                  (order.order_items ?? []).map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.product_name}
                          className="w-24 h-24 rounded-xl object-cover shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="text-white font-medium">
                          {item.product_name}
                        </h4>
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          <p className="text-white/40">Size</p>{" "}
                          <p className="text-white">{item.size}</p>
                          <p className="text-white/40">Qty</p>{" "}
                          <p className="text-white">{item.quantity}</p>
                          <p className="text-white/40">Unit</p>{" "}
                          <p className="text-white">
                            ₦{Number(item.unit_price).toLocaleString()}
                          </p>
                          <p className="text-white/40">Subtotal</p>{" "}
                          <p className="text-[#D4AF37]">
                            ₦{Number(item.subtotal).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Order row ────────────────────────────────────────────────────────────────
function OrderRow({ order, onStatusChange, onView, onDelete }) {
  const [updating, setUpdating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const itemCount =
    order.order_items?.reduce((sum, i) => sum + i.quantity, 0) ?? 0;

  const handleAction = async () => {
    setUpdating(true);
    const { data, error } = await updateOrderStatus(
      order.id,
      NEXT_STATUS[order.status],
    );
    setUpdating(false);
    if (!error && data) onStatusChange(data);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await deleteOrder(order.id);
    setDeleting(false);
    onDelete(order.id);
  };

  return (
    <>
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
      >
        <td className="px-6 py-5">
          <p className="text-white font-medium">{order.customer_name}</p>
          <p className="text-white/40 text-xs mt-1">{order.customer_email}</p>
        </td>
        <td className="px-6 py-5 text-white/70">
          {itemCount} item{itemCount !== 1 ? "s" : ""}
        </td>
        <td className="px-6 py-5 text-[#D4AF37] font-medium">
          ₦{Number(order.total_amount ?? order.amount ?? 0).toLocaleString()}
        </td>
        <td className="px-6 py-5">
          <span
            className={`text-xs px-2.5 py-1 rounded-full border ${PAYMENT_STYLES[order.payment_status ?? "unpaid"]}`}
          >
            {order.payment_status ?? "unpaid"}
          </span>
        </td>
        <td className="px-6 py-5">
          <span
            className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_STYLES[order.status] ?? STATUS_STYLES.pending}`}
          >
            {order.status}
          </span>
        </td>
        <td className="px-6 py-5 text-white/40 text-xs whitespace-nowrap">
          {new Date(order.created_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </td>
        <td className="px-6 py-5">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <button
              onClick={() => onView(order)}
              className="px-3 py-1.5 rounded-lg border border-[#D4AF37]/25 text-[#D4AF37] text-xs hover:bg-[#D4AF37]/10 transition"
            >
              View
            </button>
            <button
              onClick={handleAction}
              disabled={updating}
              className="px-3 py-1.5 rounded-lg border border-white/10 text-white/60 text-xs hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition disabled:opacity-40"
            >
              {updating ? "…" : ACTION_LABEL[order.status]}
            </button>
            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400/60 text-xs hover:text-red-400 hover:border-red-500/40 transition"
              >
                Delete
              </button>
            ) : (
              <div className="flex gap-1">
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-2 py-1.5 rounded-lg border border-white/10 text-white/40 text-xs hover:border-white/30 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-2 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 disabled:opacity-50 transition"
                >
                  {deleting ? "…" : "Confirm"}
                </button>
              </div>
            )}
          </div>
        </td>
      </motion.tr>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data } = await fetchOrders();
      setOrders(data ?? []);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return orders.filter((o) => {
      const matchStatus = filter === "all" || o.status === filter;
      const matchSearch =
        !q ||
        o.customer_name?.toLowerCase().includes(q) ||
        o.customer_email?.toLowerCase().includes(q) ||
        String(o.id).includes(q);
      return matchStatus && matchSearch;
    });
  }, [orders, filter, search]);

  const handleStatusChange = (updated) =>
    setOrders((prev) =>
      prev.map((o) => (o.id === updated.id ? { ...o, ...updated } : o)),
    );

  const handlePaymentChange = (updated) =>
    setOrders((prev) =>
      prev.map((o) => (o.id === updated.id ? { ...o, ...updated } : o)),
    );

  const handleDelete = (id) =>
    setOrders((prev) => prev.filter((o) => o.id !== id));

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] =
      s === "all" ? orders.length : orders.filter((o) => o.status === s).length;
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-1 bg-white/[0.03] border border-[#D4AF37]/10 rounded-xl p-1">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                filter === s
                  ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {s}
              <span
                className={`ml-1.5 text-[10px] ${filter === s ? "text-[#D4AF37]/70" : "text-white/20"}`}
              >
                {counts[s]}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer or order..."
            className="w-full bg-white/[0.03] border border-[#D4AF37]/15 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#D4AF37]/15 bg-white/[0.02] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-56">
            <div className="w-7 h-7 rounded-full border-2 border-[#D4AF37]/30 border-t-[#D4AF37] animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center py-16 text-white/30">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {[
                    "Customer",
                    "Items",
                    "Total",
                    "Payment",
                    "Status",
                    "Date",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-4 text-xs uppercase tracking-wider text-white/30 font-medium whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {filtered.map((order) => (
                    <OrderRow
                      key={order.id}
                      order={order}
                      onStatusChange={handleStatusChange}
                      onPaymentChange={handlePaymentChange}
                      onView={setSelectedOrder}
                      onDelete={handleDelete}
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-white/25 text-xs">
          Showing {filtered.length} of {orders.length} order
          {orders.length !== 1 ? "s" : ""}
        </p>
        <p className="text-white/20 text-xs">
          Total Revenue:&nbsp;
          <span className="text-[#D4AF37]">
            ₦
            {filtered
              .reduce(
                (sum, o) => sum + Number(o.total_amount ?? o.amount ?? 0),
                0,
              )
              .toLocaleString()}
          </span>
        </p>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={(updated) => {
            handleStatusChange(updated);
            setSelectedOrder((prev) => ({ ...prev, ...updated }));
          }}
          onPaymentChange={(updated) => {
            handlePaymentChange(updated);
            setSelectedOrder((prev) => ({ ...prev, ...updated }));
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
