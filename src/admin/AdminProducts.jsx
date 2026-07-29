import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from "../lib/supabase";

const CATEGORIES = ["Footwear", "Tailoring", "Suits"];
const TAGS = ["", "New", "Limited"];

const EMPTY_FORM = {
  name: "",
  category: "Tailoring",
  price: "",
  price_val: "",
  tag: "",
  img: "",
  images: "",
  description: "",
  sizes: "",
  details: "",
};

function Modal({ product, onClose, onSave }) {
  const [form, setForm] = useState(
    product
      ? {
          ...product,
          sizes: Array.isArray(product.sizes)
            ? product.sizes.join(", ")
            : (product.sizes ?? ""),
          details: Array.isArray(product.details)
            ? product.details.join("\n")
            : (product.details ?? ""),
          images: Array.isArray(product.images)
            ? product.images.join("\n")
            : (product.images ?? ""),
        }
      : { ...EMPTY_FORM },
  );
  const [saving, setSaving] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [error, setError] = useState(null);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleMainImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMain(true);
    setError(null);

    const { url, error: uploadError } = await uploadProductImage(file);

    setUploadingMain(false);

    if (uploadError) {
      setError(uploadError.message);
      return;
    }

    setForm((f) => ({ ...f, img: url }));
  };

  const handleGalleryImages = async (e) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    setUploadingGallery(true);
    setError(null);

    const uploadedUrls = [];

    for (const file of files) {
      const { url, error: uploadError } = await uploadProductImage(file);

      if (uploadError) {
        setError(uploadError.message);
        continue;
      }

      if (url) uploadedUrls.push(url);
    }

    setUploadingGallery(false);

    if (uploadedUrls.length) {
      setForm((f) => ({
        ...f,
        images: [f.images, ...uploadedUrls].filter(Boolean).join("\n"),
      }));
    }

    e.target.value = "";
  };

  const removeGalleryImage = (urlToRemove) => {
    setForm((f) => ({
      ...f,
      images: f.images
        .split("\n")
        .map((url) => url.trim())
        .filter(Boolean)
        .filter((url) => url !== urlToRemove)
        .join("\n"),
    }));
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.img) {
      setError("Name, price, and main image are required.");
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      price_val: Number(String(form.price_val).replace(/[^0-9]/g, "")),
      sizes: form.sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      details: form.details
        .split("\n")
        .map((d) => d.trim())
        .filter(Boolean),
      images: form.images
        .split("\n")
        .map((img) => img.trim())
        .filter(Boolean),
    };

    const { data, error: err } = product
      ? await updateProduct(product.id, payload)
      : await insertProduct(payload);

    setSaving(false);

    if (err) {
      setError(err.message);
      return;
    }

    onSave(data, !!product);
  };

  const inputCls =
    "w-full bg-black/50 border border-[#D4AF37]/20 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#D4AF37]/60 transition-colors";
  const labelCls =
    "block text-[#D4AF37]/70 text-xs uppercase tracking-wide mb-1.5";

  const galleryImages = form.images
    .split("\n")
    .map((url) => url.trim())
    .filter(Boolean);

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
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[#D4AF37]/20 bg-[#0D0D0D] p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-white">
            {product ? "Edit Product" : "Add Product"}
          </h2>

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

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelCls}>Product Name</label>
              <input
                className={inputCls}
                value={form.name}
                onChange={set("name")}
                placeholder="e.g. Tailored Wool Overcoat"
              />
            </div>

            <div>
              <label className={labelCls}>Category</label>
              <select
                className={inputCls}
                value={form.category}
                onChange={set("category")}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelCls}>Tag</label>
              <select
                className={inputCls}
                value={form.tag}
                onChange={set("tag")}
              >
                {TAGS.map((t) => (
                  <option key={t} value={t}>
                    {t || "None"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelCls}>Display Price</label>
              <input
                className={inputCls}
                value={form.price}
                onChange={set("price")}
                placeholder="₦185,000"
              />
            </div>

            <div>
              <label className={labelCls}>Price Value (digits)</label>
              <input
                className={inputCls}
                type="number"
                value={form.price_val}
                onChange={set("price_val")}
                placeholder="185000"
              />
            </div>

            <div className="col-span-2">
              <label className={labelCls}>Main Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImage}
                className="w-full text-sm text-white/70 file:mr-4 file:rounded-lg file:border-0 file:bg-[#D4AF37] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:bg-[#c4a02f]"
              />

              {uploadingMain && (
                <p className="text-xs text-[#D4AF37] mt-2">
                  Uploading main image…
                </p>
              )}

              {form.img && (
                <div className="mt-3 flex items-start gap-3">
                  <img
                    src={form.img}
                    alt="Main preview"
                    className="w-24 h-24 rounded-xl object-cover border border-[#D4AF37]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, img: "" }))}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remove main image
                  </button>
                </div>
              )}
            </div>

            <div className="col-span-2">
              <label className={labelCls}>Gallery Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryImages}
                className="w-full text-sm text-white/70 file:mr-4 file:rounded-lg file:border-0 file:bg-[#D4AF37] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:bg-[#c4a02f]"
              />

              {uploadingGallery && (
                <p className="text-xs text-[#D4AF37] mt-2">
                  Uploading gallery images…
                </p>
              )}

              {galleryImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                  {galleryImages.map((url) => (
                    <div
                      key={url}
                      className="relative rounded-xl overflow-hidden border border-[#D4AF37]/20"
                    >
                      <img
                        src={url}
                        alt="Gallery preview"
                        className="w-full h-24 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(url)}
                        className="absolute top-1 right-1 bg-black/70 text-white text-xs rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-500 transition-colors"
                        title="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="col-span-2">
              <label className={labelCls}>Description</label>
              <textarea
                className={`${inputCls} resize-none`}
                rows={3}
                value={form.description}
                onChange={set("description")}
                placeholder="Product description…"
              />
            </div>

            <div className="col-span-2">
              <label className={labelCls}>Sizes (comma-separated)</label>
              <input
                className={inputCls}
                value={form.sizes}
                onChange={set("sizes")}
                placeholder="S, M, L, XL, XXL"
              />
            </div>

            <div className="col-span-2">
              <label className={labelCls}>Details (one per line)</label>
              <textarea
                className={`${inputCls} resize-none`}
                rows={3}
                value={form.details}
                onChange={set("details")}
                placeholder={
                  "80% wool, 20% cashmere\nHorn buttons\nDry clean only"
                }
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 border border-white/15 text-white/60 py-2.5 rounded-xl text-sm hover:border-white/30 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving || uploadingMain || uploadingGallery}
              className="flex-1 bg-[#D4AF37] text-black py-2.5 rounded-xl text-sm font-semibold hover:bg-[#c4a02f] disabled:opacity-50 transition-colors"
            >
              {saving ? "Saving…" : product ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function DeleteConfirm({ product, onClose, onConfirm }) {
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
          Delete product?
        </h3>

        <p className="text-white/50 text-sm mb-6">
          "<span className="text-white/80">{product.name}</span>" will be
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

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    const { data } = await fetchProducts();
    setProducts(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = (saved, isEdit) => {
    setProducts((prev) =>
      isEdit
        ? prev.map((p) => (p.id === saved.id ? saved : p))
        : [saved, ...prev],
    );
    setModal(null);
  };

  const handleDelete = async () => {
    await deleteProduct(deleteTarget.id);
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

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
              placeholder="Search products…"
              className="w-full bg-white/[0.03] border border-[#D4AF37]/15 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
            />
          </div>

          <button
            onClick={() => setModal("add")}
            className="flex items-center gap-2 bg-[#D4AF37] text-black px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#c4a02f] transition-colors shrink-0"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Add Product
          </button>
        </div>

        <div className="rounded-2xl border border-[#D4AF37]/15 bg-white/[0.02] overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="w-6 h-6 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-white/30 text-sm text-center py-16">
              {search
                ? "No products match that search."
                : "No products yet — add one above."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Product", "Category", "Price", "Tag", ""].map((h) => (
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
                    {filtered.map((p) => (
                      <motion.tr
                        key={p.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.img}
                              alt={p.name}
                              className="w-10 h-10 rounded-lg object-cover border border-[#D4AF37]/15 shrink-0"
                            />
                            <span className="text-white font-medium">
                              {p.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-white/50">
                          {p.category}
                        </td>

                        <td className="px-6 py-4 text-[#D4AF37] font-medium">
                          {p.price}
                        </td>

                        <td className="px-6 py-4">
                          {p.tag ? (
                            <span className="text-xs px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/25">
                              {p.tag}
                            </span>
                          ) : (
                            <span className="text-white/20">—</span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3 justify-end">
                            <button
                              onClick={() => setModal(p)}
                              className="text-white/40 hover:text-[#D4AF37] transition-colors"
                              title="Edit"
                            >
                              <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>

                            <button
                              onClick={() => setDeleteTarget(p)}
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
          {products.length} product{products.length !== 1 ? "s" : ""} total
        </p>
      </div>

      <AnimatePresence>
        {modal && (
          <Modal
            product={modal === "add" ? null : modal}
            onClose={() => setModal(null)}
            onSave={handleSave}
          />
        )}

        {deleteTarget && (
          <DeleteConfirm
            product={deleteTarget}
            onClose={() => setDeleteTarget(null)}
            onConfirm={handleDelete}
          />
        )}
      </AnimatePresence>
    </>
  );
}
