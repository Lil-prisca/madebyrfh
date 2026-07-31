import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const values = [
  {
    title: "Precision Craftsmanship",
    body: "Every piece is meticulously handcrafted, blending traditional tailoring technique with contemporary design for a fit that's impeccable, not approximate.",
  },
  {
    title: "Premium Fabrics",
    body: "We source materials that hold their shape and their shine — nothing chosen to be discounted or replaced in a season.",
  },
  {
    title: "Personalized Service",
    body: "Every client begins with a conversation. We take the time to understand your style, occasion, and personality before a single cut is made.",
  },
  {
    title: "Attention to Detail",
    body: "Affordable luxury without compromising quality — the smallest stitch gets the same care as the finished silhouette.",
  },
];

const creations = [
  "Bespoke Agbada",
  "Luxury Kaftans",
  "Groom & Wedding Ensembles",
  "Corporate Native Wear",
  "Custom Traditional Attire",
  "Ready-to-Wear Collections",
];

function AboutHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      ref={ref}
      className="relative h-[85vh] flex items-center overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&q=85"
          alt="Atelier"
          className="w-full h-full object-cover grayscale-[35%] sepia-[0.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-[#D4AF37]/[0.07]" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-10 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
            Our Story
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-3xl"
        >
          Tailoring Confidence.
          <span className="font-script italic text-[#D4AF37] font-normal">
            {" "}
            Crafting Legacy.
          </span>
        </motion.h1>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="py-28 max-w-6xl mx-auto px-6 lg:px-10">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
              Who We Are
            </span>
          </div>
          <p className="text-white/50 leading-relaxed">
            madebyRFH is a brand born out of excellence and a commitment to a
            premium tailoring experience, changing the narrative of tailoring
            while creating timeless fashion pieces.
            <br /> For over a decade, we've styled clients across every class
            with an unwavering commitment to EXCELLENCE, QUALITY, VALUE and
            DETAILS.
          </p>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl sm:text-4xl text-white leading-snug border-l-2 border-[#D4AF37] pl-8 relative"
        >
          <span className="absolute -left-[2px] top-0 w-2 h-2 rounded-full bg-[#D4AF37] -translate-x-1/2" />
          "Exceptional style is more than what you wear — it's how you introduce
          yourself to the world."
        </motion.blockquote>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="py-12 max-w-6xl mx-auto px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-12"
      >
        <div className="h-px w-10 bg-[#D4AF37]" />
        <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
          What We Hold To
        </span>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              delay: i * 0.1,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-2xl border border-[#D4AF37]/15 bg-gradient-to-b from-[#D4AF37]/[0.04] to-white/[0.02] backdrop-blur-md p-7 hover:border-[#D4AF37]/40 transition-colors duration-500"
          >
            <span className="block w-8 h-px bg-[#D4AF37] mb-5" />
            <h3 className="font-display text-2xl font-bold text-white mb-3">
              {v.title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">{v.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function OurCraft() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-6 lg:px-10">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
              Our Craft
            </span>
          </div>
          <p className="text-white/50 leading-relaxed">
            Every client begins with a conversation. We take time to understand
            your style, occasion, and personality before transforming your
            vision into a garment tailored exclusively for you. From measurement
            to final fitting, every stage is handled with care, precision, and
            professionalism.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium block mb-6">
            What We Create
          </span>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {creations.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="flex items-center gap-3 py-3 border-b border-[#D4AF37]/15"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                <span className="text-white/70">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/[0.08] via-white/[0.03] to-transparent backdrop-blur-md p-12 text-center shadow-[0_0_60px_rgba(212,175,55,0.08)]"
      >
        <h3 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
          Our Promise
        </h3>
        <p className="text-white/50 mb-8 max-w-md mx-auto">
          We don't simply make clothes. We create pieces that inspire
          confidence, celebrate culture, and stand the test of time — serving
          clients across Nigeria and beyond.
        </p>
        <Link to="/shop">
          <button className="bg-[#D4AF37] text-black px-8 py-3.5 rounded-2xl font-semibold text-sm hover:bg-[#c4a02f] transition-colors">
            Explore the Collection
          </button>
        </Link>
      </motion.div>
    </section>
  );
}

export default function RFHAbout() {
  return (
    <div
      className=" min-h-screen bg-black text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Playfair+Display:ital@1&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-script { font-family: 'Playfair Display', serif; font-style: italic; }
      `}</style>
      <NavBar />
      <AboutHero />
      <Manifesto />
      <Values />
      <OurCraft />
      <CTA />
      <Footer />
    </div>
  );
}
