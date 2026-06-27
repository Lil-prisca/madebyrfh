import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { products as allProducts } from "../product";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const categories = ["All", "Outerwear", "Tailoring", "Footwear", "Essentials"];
const sorts = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
];

function ShopHeader() {
  return (
    <section className="pt-40 pb-10 max-w-6xl mx-auto px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-5"
      >
        <div className="h-px w-10 bg-[#D4AF37]" />
        <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
          Full Catalog
        </span>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-5xl font-bold text-white relative inline-block"
      >
        Shop
        <span className="absolute -bottom-2 left-0 w-12 h-[3px] bg-[#D4AF37] rounded-full" />
      </motion.h1>
    </section>
  );
}

function FilterSidebar({
  activeCategory,
  setActiveCategory,
  maxPrice,
  setMaxPrice,
}) {
  return (
    <div className="space-y-10 rounded-2xl border border-[#D4AF37]/15 bg-gradient-to-b from-[#D4AF37]/[0.04] to-transparent p-6">
      <div>
        <h4 className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-semibold mb-4">
          Category
        </h4>
        <div className="flex flex-col  overflow-auto gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-left text-sm py-1.5 pl-3 border-l-2 transition-colors ${
                activeCategory === cat
                  ? "text-[#D4AF37] font-medium border-[#D4AF37]"
                  : "text-white/50 hover:text-white/80 border-white/10 hover:border-[#D4AF37]/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-semibold mb-4">
          Max Price
        </h4>
        <input
          type="range"
          min="20000"
          max="220000"
          step="5000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#D4AF37]"
        />
        <p className="text-[#D4AF37]/70 text-xs mt-2">
          Up to ₦{maxPrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

function ProductCard({ product, index }) {
  const navigate = useNavigate();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{
        delay: index * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => navigate(`/shop/${product.id}`)}
      className=" rounded-2xl border border-[#D4AF37]/15 bg-white/[0.03] backdrop-blur-md overflow-hidden hover:border-[#D4AF37]/45 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500 cursor-pointer"
    >
      <div className="relative  h-64 overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover object-top grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {product.tag && (
          <span className="absolute top-4 left-4 bg-[#D4AF37] text-black text-xs font-semibold px-3 py-1 rounded-full">
            {product.tag}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation(); /* add-to-wishlist logic here */
          }}
          className="absolute bottom-4 right-4 w-10 h-10 rounded-xl bg-black/70 backdrop-blur-sm border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4M3 6h18M16 10a4 4 0 01-8 0"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="p-5">
        <p className="text-[#D4AF37]/70 text-xs uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-display text-lg font-semibold text-white mb-1">
          {product.name}
        </h3>
        <p className="text-[#D4AF37] font-medium">{product.price}</p>
      </div>
    </motion.div>
  );
}

function ShopGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(220000);
  const [sort, setSort] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = allProducts.filter(
      (p) =>
        (activeCategory === "All" || p.category === activeCategory) &&
        p.priceVal <= maxPrice,
    );
    if (sort === "asc")
      list = [...list].sort((a, b) => a.priceVal - b.priceVal);
    if (sort === "desc")
      list = [...list].sort((a, b) => b.priceVal - a.priceVal);
    return list;
  }, [activeCategory, maxPrice, sort]);

  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-10 pb-24">
      <div className="grid lg:grid-cols-[220px_1fr] gap-10">
        <aside className="hidden lg:block">
          <FilterSidebar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </aside>

        <div>
          <div className="flex items-center justify-between mb-8">
            <p className="text-white/40 text-sm">
              {filtered.length} piece{filtered.length !== 1 ? "s" : ""}
            </p>

            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 text-sm text-white/70 border border-[#D4AF37]/20 rounded-xl px-4 py-2 hover:border-[#D4AF37]/50 transition-colors"
              >
                {sorts.find((s) => s.value === sort)?.label}
                <svg
                  className={`w-3 h-3 transition-transform ${sortOpen ? "rotate-180" : ""}`}
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
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl overflow-hidden z-10"
                  >
                    {sorts.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => {
                          setSort(s.value);
                          setSortOpen(false);
                        }}
                        className="block w-full text-left text-sm text-white/70 hover:text-[#D4AF37] px-4 py-2.5 hover:bg-white/5 transition-colors"
                      >
                        {s.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile category pills */}
          <div className="flex lg:hidden gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 text-xs px-4 py-2 rounded-xl border transition-colors ${
                  activeCategory === cat
                    ? "border-[#D4AF37] text-[#D4AF37]"
                    : "border-white/10 text-white/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-white/40 text-center py-20">
              No pieces match these filters yet — try widening your price range.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default function RFHShop() {
  return (
    <div
      className="bg-black min-h-screen text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Playfair+Display:ital@1&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-script { font-family: 'Playfair Display', serif; font-style: italic; }
      `}</style>
      <NavBar />
      <ShopHeader />
      <ShopGrid />
      <Footer />
    </div>
  );
}
