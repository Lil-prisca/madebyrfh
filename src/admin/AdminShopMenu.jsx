import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchShopMenu,
  insertShopMenuItem,
  updateShopMenuItem,
  deleteShopMenuItem,
  buildShopMenuTree,
} from "../lib/supabase";

function DeleteConfirm({ item, onClose, onConfirm }) {
  const [deleting, setDeleting] = useState(false);
  const isCategory = !item.parent_id;

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
          Delete {isCategory ? "category" : "subsection"}?
        </h3>
        <p className="text-white/50 text-sm mb-6">
          "<span className="text-white/80">{item.name}</span>"
          {isCategory && " and all of its subsections "}
          will be permanently removed.
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

function EditableName({ value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const save = () => {
    setEditing(false);
    if (draft.trim() && draft.trim() !== value) {
      onSave(draft.trim());
    } else {
      setDraft(value);
    }
  };

  if (editing) {
    return (
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.target.blur();
          if (e.key === "Escape") {
            setDraft(value);
            setEditing(false);
          }
        }}
        className="bg-black/50 border border-[#D4AF37]/40 rounded-lg px-2 py-1 text-sm text-white focus:outline-none"
      />
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="text-left hover:text-[#D4AF37] transition-colors"
      title="Click to rename"
    >
      {value}
    </button>
  );
}

export default function AdminShopMenu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [addingSubsectionFor, setAddingSubsectionFor] = useState(null);
  const [newSubsectionName, setNewSubsectionName] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    const { data, error: err } = await fetchShopMenu();
    if (err) setError(err.message);
    setMenu(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const tree = buildShopMenuTree(menu);

  const nextSortOrder = (parentId) => {
    const siblings = menu.filter(
      (m) => (m.parent_id ?? null) === (parentId ?? null),
    );
    return siblings.length
      ? Math.max(...siblings.map((s) => s.sort_order)) + 1
      : 0;
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    const { data, error: err } = await insertShopMenuItem({
      name: newCategoryName.trim(),
      parent_id: null,
      sort_order: nextSortOrder(null),
    });
    if (err) {
      setError(err.message);
      return;
    }
    setMenu((prev) => [...prev, data]);
    setNewCategoryName("");
    setAddingCategory(false);
  };

  const handleAddSubsection = async (categoryId) => {
    if (!newSubsectionName.trim()) return;
    const { data, error: err } = await insertShopMenuItem({
      name: newSubsectionName.trim(),
      parent_id: categoryId,
      sort_order: nextSortOrder(categoryId),
    });
    if (err) {
      setError(err.message);
      return;
    }
    setMenu((prev) => [...prev, data]);
    setNewSubsectionName("");
    setAddingSubsectionFor(null);
  };

  const handleRename = async (item, name) => {
    const { data, error: err } = await updateShopMenuItem(item.id, { name });
    if (err) {
      setError(err.message);
      return;
    }
    setMenu((prev) => prev.map((m) => (m.id === data.id ? data : m)));
  };

  const handleDelete = async () => {
    await deleteShopMenuItem(deleteTarget.id);
    setMenu((prev) =>
      prev.filter(
        (m) => m.id !== deleteTarget.id && m.parent_id !== deleteTarget.id,
      ),
    );
    setDeleteTarget(null);
  };

  const handleMove = async (item, direction) => {
    const siblings = menu
      .filter((m) => (m.parent_id ?? null) === (item.parent_id ?? null))
      .sort((a, b) => a.sort_order - b.sort_order);

    const index = siblings.findIndex((s) => s.id === item.id);
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= siblings.length) return;

    const other = siblings[swapIndex];

    const [a, b] = await Promise.all([
      updateShopMenuItem(item.id, { sort_order: other.sort_order }),
      updateShopMenuItem(other.id, { sort_order: item.sort_order }),
    ]);

    setMenu((prev) =>
      prev.map((m) => {
        if (m.id === a.data.id) return a.data;
        if (m.id === b.data.id) return b.data;
        return m;
      }),
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-white">
            Shop Menu
          </h2>
          <button
            onClick={() => setAddingCategory(true)}
            className="flex items-center gap-2 bg-[#D4AF37] text-black px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#c4a02f] transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Add Category
          </button>
        </div>

        {error && <p className="text-red-400 text-xs">{error}</p>}

        {addingCategory && (
          <div className="flex gap-2 rounded-xl border border-[#D4AF37]/20 bg-white/[0.02] p-3">
            <input
              autoFocus
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
              placeholder="Category name (e.g. Accessories)"
              className="flex-1 bg-black/40 border border-[#D4AF37]/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]/60"
            />
            <button
              onClick={handleAddCategory}
              className="bg-[#D4AF37] text-black px-4 rounded-lg text-sm font-semibold hover:bg-[#c4a02f] transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => {
                setAddingCategory(false);
                setNewCategoryName("");
              }}
              className="text-white/40 hover:text-white px-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="space-y-4">
          {tree.map((cat) => (
            <div
              key={cat.id}
              className="rounded-2xl border border-[#D4AF37]/15 bg-white/[0.02] overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#D4AF37]/10">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <button
                      onClick={() => handleMove(cat, "up")}
                      className="text-white/30 hover:text-[#D4AF37] transition-colors"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 8l4-4 4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleMove(cat, "down")}
                      className="text-white/30 hover:text-[#D4AF37] transition-colors"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 4l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>
                  </div>
                  <span className="font-display text-lg font-semibold text-white">
                    <EditableName
                      value={cat.name}
                      onSave={(name) => handleRename(cat, name)}
                    />
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setAddingSubsectionFor(cat.id)}
                    className="text-xs text-[#D4AF37] hover:text-[#c4a02f] transition-colors"
                  >
                    + Subsection
                  </button>
                  <button
                    onClick={() => setDeleteTarget(cat)}
                    className="text-white/40 hover:text-red-400 transition-colors"
                    title="Delete category"
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
                  </button>
                </div>
              </div>

              <div className="px-5 py-3 space-y-2">
                {cat.subsections.length === 0 &&
                  addingSubsectionFor !== cat.id && (
                    <p className="text-white/25 text-xs py-1">No subsections</p>
                  )}

                {cat.subsections.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between pl-2 py-1.5 border-l-2 border-[#D4AF37]/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <button
                          onClick={() => handleMove(sub, "up")}
                          className="text-white/20 hover:text-[#D4AF37] transition-colors"
                        >
                          <svg
                            className="w-2.5 h-2.5"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2 8l4-4 4 4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleMove(sub, "down")}
                          className="text-white/20 hover:text-[#D4AF37] transition-colors"
                        >
                          <svg
                            className="w-2.5 h-2.5"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2 4l4 4 4-4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </button>
                      </div>
                      <span className="text-sm text-white/70">
                        <EditableName
                          value={sub.name}
                          onSave={(name) => handleRename(sub, name)}
                        />
                      </span>
                    </div>
                    <button
                      onClick={() => setDeleteTarget(sub)}
                      className="text-white/30 hover:text-red-400 transition-colors"
                      title="Delete subsection"
                    >
                      <svg
                        className="w-3.5 h-3.5"
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
                ))}

                {addingSubsectionFor === cat.id && (
                  <div className="flex gap-2 pt-1">
                    <input
                      autoFocus
                      value={newSubsectionName}
                      onChange={(e) => setNewSubsectionName(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleAddSubsection(cat.id)
                      }
                      placeholder="Subsection name"
                      className="flex-1 bg-black/40 border border-[#D4AF37]/20 rounded-lg px-3 py-1.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]/60"
                    />
                    <button
                      onClick={() => handleAddSubsection(cat.id)}
                      className="bg-[#D4AF37] text-black px-3 rounded-lg text-xs font-semibold hover:bg-[#c4a02f] transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setAddingSubsectionFor(null);
                        setNewSubsectionName("");
                      }}
                      className="text-white/40 hover:text-white px-2 text-xs transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {tree.length === 0 && (
            <p className="text-white/30 text-sm text-center py-16">
              No categories yet — add one above.
            </p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {deleteTarget && (
          <DeleteConfirm
            item={deleteTarget}
            onClose={() => setDeleteTarget(null)}
            onConfirm={handleDelete}
          />
        )}
      </AnimatePresence>
    </>
  );
}
