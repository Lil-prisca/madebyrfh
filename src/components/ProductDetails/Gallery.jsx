import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery({ product }) {
  // Main image first, then all gallery images
  const images = useMemo(
    () => [product.img, ...(product.images || [])],
    [product],
  );

  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden h-[420px] lg:h-[560px] border border-[#D4AF37]/25 shadow-[0_0_50px_rgba(212,175,55,0.08)] mb-4">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={product.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full object-top h-full object-cover grayscale-[15%]"
          />
        </AnimatePresence>

        {product.tag && (
          <span className="absolute top-5 left-5 bg-[#D4AF37] text-black text-xs font-semibold px-3 py-1 rounded-full">
            {product.tag}
          </span>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative h-20 lg:h-24 rounded-xl overflow-hidden border transition-all ${
              active === i
                ? "border-[#D4AF37]"
                : "border-[#D4AF37]/15 hover:border-[#D4AF37]/50"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
