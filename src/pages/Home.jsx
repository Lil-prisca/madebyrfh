import { useRef } from "react";
import heroimg from "../assets/lanscapeimg.jpeg";
import { motion, useScroll, useTransform } from "framer-motion";
import NavBar from "../components/NavBar";
const products = [
  {
    id: 1,
    name: "Tailored Wool Overcoat",
    price: "₦185,000",
    img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=700&q=80",
    tag: "New",
  },
  {
    id: 2,
    name: "Merino Crewneck",
    price: "₦42,000",
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=700&q=80",
    tag: null,
  },
  {
    id: 3,
    name: "Leather Derby Shoes",
    price: "₦96,500",
    img: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=700&q=80",
    tag: "New",
  },
  {
    id: 4,
    name: "Slim Oxford Shirt",
    price: "₦38,000",
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&q=80",
    tag: null,
  },
  {
    id: 5,
    name: "Suede Chelsea Boots",
    price: "₦112,000",
    img: "https://images.unsplash.com/photo-1614253429340-98120bd6d753?w=700&q=80",
    tag: "Limited",
  },
  {
    id: 6,
    name: "Cashmere Blend Blazer",
    price: "₦220,000",
    img: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=700&q=80",
    tag: null,
  },
];

const categories = [
  {
    name: "Outerwear",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
  },
  {
    name: "Footwear",
    img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
  },
  {
    name: "Tailoring",
    img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
  },
  {
    name: "Essentials",
    img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
  },
];

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-end overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        {/* <img
          src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1920&q=85"
          alt="Tailored menswear"
          className="w-full h-full object-cover grayscale-[20%]"
        /> */}
        <img
          src={heroimg}
          alt="Tailored menswear"
          className="w-full h-full object-cover grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/30" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-10 pb-24"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-10 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
            Menswear, Reconsidered
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6"
        >
          Wear Your
          <span className="block italic font-script text-[#D4AF37] font-normal text-5xl sm:text-6xl lg:text-7xl mt-1">
            Confidence
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="text-white/60 text-lg max-w-md mb-10 leading-relaxed"
        >
          Considered tailoring and footwear, cut for men who dress with
          intention.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex gap-4"
        >
          <button className="bg-[#D4AF37] text-black px-8 py-3.5 rounded-2xl font-semibold text-sm hover:bg-[#c4a02f] transition-colors">
            Shop Collection
          </button>
          <button className="border border-white/20 text-white px-8 py-3.5 rounded-2xl font-semibold text-sm hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors">
            Lookbook
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group rounded-2xl border border-white/10 bg-white/3 backdrop-blur-md overflow-hidden hover:border-[#D4AF37]/30 transition-colors duration-500"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        {product.tag && (
          <span className="absolute top-4 left-4 bg-[#D4AF37] text-black text-xs font-semibold px-3 py-1 rounded-full">
            {product.tag}
          </span>
        )}
        <button className="absolute bottom-4 right-4 w-10 h-10 rounded-xl bg-black/70 backdrop-blur-sm border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
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
        <h3 className="font-display text-lg font-semibold text-white mb-1">
          {product.name}
        </h3>
        <p className="text-[#D4AF37] font-medium">{product.price}</p>
      </div>
    </motion.div>
  );
}

function Categories() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-12"
      >
        <div className="h-px w-10 bg-[#D4AF37]" />
        <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
          Browse
        </span>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group relative rounded-2xl overflow-hidden h-64 cursor-pointer border border-white/10"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <h4 className="font-display text-xl font-bold text-white">
                {cat.name}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Products() {
  return (
    <section className="py-12 max-w-6xl mx-auto px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-12"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
              Latest Arrivals
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold text-white">
            The Edit
          </h2>
        </div>
        <button className="text-white/50 hover:text-[#D4AF37] text-sm font-medium hidden sm:block transition-colors">
          View all →
        </button>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function Banner() {
  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative rounded-2xl overflow-hidden h-80 border border-[#D4AF37]/20"
      >
        <img
          src="https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=1600&q=85"
          alt="Limited collection"
          className="w-full h-full object-cover grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center px-10 lg:px-16">
          <div className="max-w-md">
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium block mb-4">
              Limited Run
            </span>
            <h3 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              Made for the Few Who Notice Detail
            </h3>
            <button className="bg-[#D4AF37] text-black px-7 py-3 rounded-2xl text-sm font-semibold hover:bg-[#c4a02f] transition-colors">
              Shop Limited
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 mt-12">
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

export default function RFHStore() {
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
      <Hero />
      <Categories />
      <Products />
      <Banner />
      <Footer />
    </div>
  );
}
