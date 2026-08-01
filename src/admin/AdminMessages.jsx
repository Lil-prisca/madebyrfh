import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchContactMessages,
  markMessageRead,
  deleteContactMessage,
} from "../lib/supabase";

function ViewMessage({ message, onClose, onToggleRead }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
        className="relative w-full max-w-lg rounded-2xl border border-[#D4AF37]/20 bg-[#0D0D0D] p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="font-display text-xl font-bold text-white">
              {message.name}
            </h2>
            <p className="text-white/40 text-sm">{message.email}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap mb-6">
          {message.message}
        </p>

        <div className="flex items-center justify-between text-xs text-white/30 border-t border-white/5 pt-4 mb-6">
          <span>
            {new Date(message.created_at).toLocaleString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <button
            onClick={onToggleRead}
            className="text-[#D4AF37] hover:text-[#c4a02f] transition-colors"
          >
            Mark as {message.is_read ? "unread" : "read"}
          </button>
        </div>

        <a
          href={`mailto:${message.email}?subject=${encodeURIComponent(
            "Re: Your message to madebyRFH",
          )}`}
          className="block text-center w-full bg-[#D4AF37] text-black py-2.5 rounded-xl text-sm font-semibold hover:bg-[#c4a02f] transition-colors"
        >
          Reply by email
        </a>
      </motion.div>
    </div>
  );
}

function DeleteConfirm({ message, onClose, onConfirm }) {
  const [deleting, setDeleting] = useState(false);

  const confirm = async () => {
    setDeleting(true);
    await onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative rounded-2xl border border-red-500/20 bg-[#0D0D0D] p-6 w-full max-w-sm"
      >
        <h3 className="font-display text-lg font-bold text-white mb-2">
          Delete message?
        </h3>
        <p className="text-white/50 text-sm mb-6">
          The message from "
          <span className="text-white/80">{message.name}</span>" will be
          permanently removed.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-white/15 text-white/60 py-2.5 rounded-xl text-sm hover:border-white/30 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            disabled={deleting}
            className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    const { data } = await fetchContactMessages();
    setMessages(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = messages.filter(
    (m) =>
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()) ||
      m.message?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleView = async (message) => {
    setViewing(message);
    if (!message.is_read) {
      const { data } = await markMessageRead(message.id, true);
      if (data) {
        setMessages((prev) => prev.map((m) => (m.id === data.id ? data : m)));
      }
    }
  };

  const handleToggleRead = async () => {
    const { data } = await markMessageRead(viewing.id, !viewing.is_read);
    if (data) {
      setMessages((prev) => prev.map((m) => (m.id === data.id ? data : m)));
      setViewing(data);
    }
  };

  const handleDelete = async () => {
    await deleteContactMessage(deleteTarget.id);
    setMessages((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <>
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
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
              placeholder="Search messages…"
              className="w-full bg-white/[0.03] border border-[#D4AF37]/15 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
            />
          </div>

          {unreadCount > 0 && (
            <span className="text-xs px-3 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/25 font-medium shrink-0">
              {unreadCount} unread
            </span>
          )}
        </div>

        <div className="rounded-2xl border border-[#D4AF37]/15 bg-white/[0.02] overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="w-6 h-6 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-white/30 text-sm text-center py-16">
              {search ? "No messages match that search." : "No messages yet."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {["From", "Message", "Date", ""].map((h) => (
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
                  <AnimatePresence initial={false}>
                    {filtered.map((m) => (
                      <motion.tr
                        key={m.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => handleView(m)}
                        className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2.5">
                            {!m.is_read && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                            )}
                            <div>
                              <p
                                className={
                                  m.is_read
                                    ? "text-white/70"
                                    : "text-white font-medium"
                                }
                              >
                                {m.name}
                              </p>
                              <p className="text-white/40 text-xs">{m.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-white/50 max-w-xs truncate">
                          {m.message}
                        </td>
                        <td className="px-6 py-4 text-white/40 text-xs whitespace-nowrap">
                          {new Date(m.created_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3 justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteTarget(m);
                              }}
                              className="text-white/40 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-white/25 text-xs">
          {messages.length} message{messages.length !== 1 ? "s" : ""} total
        </p>
      </div>

      <AnimatePresence>
        {viewing && (
          <ViewMessage
            message={viewing}
            onClose={() => setViewing(null)}
            onToggleRead={handleToggleRead}
          />
        )}

        {deleteTarget && (
          <DeleteConfirm
            message={deleteTarget}
            onClose={() => setDeleteTarget(null)}
            onConfirm={handleDelete}
          />
        )}
      </AnimatePresence>
    </>
  );
}
