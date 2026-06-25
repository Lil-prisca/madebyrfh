import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import NavBar from "../components/NavBar";

const values = [
  {
    title: "Cut, Not Costume",
    body: "Every silhouette is fitted to move with you, not perform for a photograph. We design for the man who wears the piece, not the other way round.",
  },
  {
    title: "Fewer, Better",
    body: "Small runs, considered fabrics, nothing made to be discounted in six weeks. We'd rather sell out than mark down.",
  },
  {
    title: "Built in Lagos, Worn Anywhere",
    body: "Pattern-cut and finished by hand in our Lagos atelier, built to hold its shape from Victoria Island to a winter in London.",
  },
];

const milestones = [
  {
    year: "2021",
    text: "First collection — eleven pieces, one tailor, a spare room .",
  },
  {
    year: "2023",
    text: "Opened the atelier. Stopped outsourcing finishing work to anyone.",
  },
  {
    year: "2025",
    text: "madebyRFH crosses into footwear, built on the same floor as the suiting.",
  },
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
          We make clothes the way a tailor makes a promise —
          <span className="font-script italic text-[#D4AF37] font-normal">
            {" "}
            one fitting at a time.
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
              The Premise
            </span>
          </div>
          <p className="text-white/50 leading-relaxed">
            Most menswear is built for a rack. Ours is built for a body — your
            shoulders, your stride, the way you actually sit in a chair during a
            four-hour meeting.
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
          "Confidence isn't loud. It's a coat that sits right on the first try,
          and a man who stops thinking about what he's wearing the moment he
          puts it on."
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

      <div className="grid md:grid-cols-3 gap-6">
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

function Timeline() {
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
          How We Got Here
        </span>
      </motion.div>

      <div className="space-y-0">
        {milestones.map((m, i) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="flex gap-8 py-6 border-b border-[#D4AF37]/15 last:border-b-0 items-start"
          >
            <div className="flex items-center gap-3 w-20 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="font-display text-2xl text-[#D4AF37] font-bold">
                {m.year}
              </span>
            </div>
            <p className="text-white/60 leading-relaxed">{m.text}</p>
          </motion.div>
        ))}
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
          See the Current Collection
        </h3>
        <p className="text-white/50 mb-8 max-w-md mx-auto">
          Built the way you just read about. Worn by men who'd rather not
          explain themselves.
        </p>
        <button className="bg-[#D4AF37] text-black px-8 py-3.5 rounded-2xl font-semibold text-sm hover:bg-[#c4a02f] transition-colors">
          Shop the Edit
        </button>
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
      <Timeline />
      <CTA />
      <Footer />
    </div>
  );
}
