import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import { products, getProductById } from "../product";
import NavBar from "../components/NavBar";

function Breadcrumb({ product }) {
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-32 pb-2">
      <p className="text-white/40 text-xs tracking-wide">
        <Link
          to="/shop"
          className="hover:text-[#D4AF37] cursor-pointer transition-colors"
        >
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">
          {product.category}
        </span>
        <span className="mx-2">/</span>
        <span className="text-white/70">{product.name}</span>
      </p>
    </div>
  );
}

function Gallery({ product }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden h-[420px] lg:h-[560px] border border-[#D4AF37]/25 shadow-[0_0_50px_rgba(212,175,55,0.08)] mb-4">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={product.images[active]}
            alt={product.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full object-cover grayscale-[15%]"
          />
        </AnimatePresence>
        {product.tag && (
          <span className="absolute top-5 left-5 bg-[#D4AF37] text-black text-xs font-semibold px-3 py-1 rounded-full">
            {product.tag}
          </span>
        )}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {product.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative h-20 lg:h-24 rounded-xl overflow-hidden border transition-colors ${
              active === i
                ? "border-[#D4AF37]"
                : "border-[#D4AF37]/15 hover:border-[#D4AF37]/50"
            }`}
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover grayscale-[15%]"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function BuyPanel({ product }) {
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
          onClick={() => setShowNote(true)}
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

function RelatedItems({ product }) {
  const navigate = useNavigate();
  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-20 max-w-6xl mx-auto px-6 lg:px-10 border-t border-[#D4AF37]/15">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-10"
      >
        <div className="h-px w-10 bg-[#D4AF37]" />
        <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
          Pairs Well With
        </span>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {related.map((p, i) => (
          <motion.div
            key={p.id}
            onClick={() => navigate(`/shop/${p.id}`)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              delay: i * 0.08,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group rounded-2xl border border-[#D4AF37]/15 bg-white/[0.03] overflow-hidden hover:border-[#D4AF37]/45 transition-colors duration-500 cursor-pointer"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-semibold text-white mb-1">
                {p.name}
              </h3>
              <p className="text-[#D4AF37] font-medium">{p.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 mt-4">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <span className="font-script text-2xl text-[#D4AF37]">
            made<span className="font-display font-bold text-white">byRFH</span>
          </span>
          <p className="text-white/40 text-sm mt-4 leading-relaxed">
            Menswear and footwear for men who dress with intention.
          </p>
        </div>
        {[
          {
            title: "Shop",
            links: ["Outerwear", "Footwear", "Tailoring", "Essentials"],
          },
          {
            title: "Company",
            links: ["About", "Stockists", "Careers", "Contact"],
          },
          {
            title: "Support",
            links: ["Shipping", "Returns", "Size Guide", "FAQ"],
          },
        ].map((col) => (
          <div key={col.title}>
            <h5 className="text-white text-sm font-semibold mb-4">
              {col.title}
            </h5>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-white/40 hover:text-[#D4AF37] text-sm transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-6 text-center text-white/30 text-xs">
        © {new Date().getFullYear()} madebyRFH. All rights reserved.
      </div>
    </footer>
  );
}

export default function RFHItemDetail() {
  const { id } = useParams();
  const product = getProductById(id);

  if (!product) {
    return (
      <div
        className="bg-black min-h-screen text-white flex flex-col items-center justify-center px-6"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Playfair+Display:ital@1&family=Inter:wght@400;500;600&display=swap');
          .font-display { font-family: 'Cormorant Garamond', serif; }
          .font-script { font-family: 'Playfair Display', serif; font-style: italic; }
        `}</style>
        <h1 className="font-display text-4xl font-bold mb-4">
          Piece not found
        </h1>
        <p className="text-white/50 mb-8">
          That item doesn't exist or may have sold out.
        </p>
        <Link
          to="/shop"
          className="bg-[#D4AF37] text-black px-8 py-3.5 rounded-2xl font-semibold text-sm hover:bg-[#c4a02f] transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

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
      <Breadcrumb product={product} />
      <section className="max-w-6xl mx-auto px-6 lg:px-10 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <Gallery key={product.id} product={product} />
          <BuyPanel key={product.id} product={product} />
        </div>
      </section>
      <RelatedItems product={product} />
      <Footer />
    </div>
  );
}
