import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useCart } from "../../context/useCart";

export default function BuyPanel({ product }) {
  const { addToCart } = useCart();
  const [size, setSize] = useState(null);
  const [showNote, setShowNote] = useState(false);

  return (
    <div className="lg:sticky lg:top-32">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px w-10 bg-[#D4AF37]" />
        <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
          {product.category}
        </span>
      </div>

      <h1 className="font-display text-4xl font-bold text-white mb-3">
        {product.name}
      </h1>
      <p className="text-[#D4AF37] text-2xl font-medium mb-6">
        {product.price}
      </p>

      <p className="text-white/50 text-sm leading-relaxed mb-8">
        {product.description}
      </p>

      <div className="mb-8">
        <h4 className="text-white text-sm font-semibold mb-3 tracking-wide">
          Select Size
        </h4>
        <div className="flex gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`w-12 h-12 rounded-xl border text-sm font-medium transition-colors ${
                size === s
                  ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                  : "border-[#D4AF37]/25 text-white/70 hover:border-[#D4AF37]/60"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => {
            if (!size) {
              setShowNote(true);
              return;
            }

            addToCart(product, size);
            setShowNote(true);
          }}
          className="flex-1 bg-[#D4AF37] text-black px-8 py-4 rounded-2xl font-semibold text-sm hover:bg-[#c4a02f] transition-colors"
        >
          Add to Bag
        </button>
        <button className="w-14 h-14 rounded-2xl border border-[#D4AF37]/25 flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/60 transition-colors shrink-0">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21s-8-5.2-8-11a4.6 4.6 0 018-3 4.6 4.6 0 018 3c0 5.8-8 11-8 11z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {showNote && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-[#D4AF37] mb-8 -mt-4"
          >
            {size ? `Added — size ${size}.` : "Pick a size first."}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="border-t border-[#D4AF37]/15 pt-6">
        <h4 className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-semibold mb-4">
          Details
        </h4>
        <ul className="space-y-2">
          {product.details.map((d) => (
            <li key={d} className="text-white/50 text-sm flex gap-2">
              <span className="text-[#D4AF37]">—</span>
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
