import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const sizes = [
  {
    local: "8 (Small)",
    us: "4",
    bust: "32 – 34",
    waist: "24 – 26",
    hips: "34 – 36",
  },
  {
    local: "10 (Medium)",
    us: "6",
    bust: "35 – 36",
    waist: "27 – 28",
    hips: "37 – 38",
  },
  {
    local: "12 (Large)",
    us: "8",
    bust: "37 – 38",
    waist: "29 – 30",
    hips: "39 – 40",
  },
  {
    local: "14 (XL)",
    us: "10",
    bust: "39 – 40",
    waist: "31 – 32",
    hips: "41 – 42",
  },
  {
    local: "16 (XXL)",
    us: "12",
    bust: "41 – 42",
    waist: "33 – 34",
    hips: "43 – 44",
  },
];

const measureSteps = [
  {
    title: "Use a flexible tape",
    desc: "A soft fabric measuring tape gives an accurate read — a rigid ruler won't follow your curves.",
  },
  {
    title: "Keep it firm, not tight",
    desc: "The tape should sit snugly against your body without pinching or leaving a mark.",
  },
  {
    title: "Stand straight and relax",
    desc: "Don't hold your breath or flex — measure in your natural, resting posture for the truest fit.",
  },
];

const bodyParts = [
  {
    title: "Bust",
    desc: "Measure around the fullest part of your chest, keeping the tape level all the way round.",
  },
  {
    title: "Waist",
    desc: "Measure around the narrowest part of your tummy, usually just above the navel.",
  },
  {
    title: "Hips",
    desc: "Measure around the widest part of your lower body, roughly 8 inches below your waist.",
  },
  {
    title: "Blouse / Kaftan Length",
    desc: "Measure from your shoulder point straight down to your desired hem length.",
  },
];

const localNotes = [
  {
    title: "Ankara & Cotton",
    desc: "These fabrics don't stretch. Size up if you fall between two sizes.",
  },
  {
    title: "Asoke & Lace",
    desc: "Traditional fabrics have zero give — exact or custom measurements work best.",
  },
  // {
  //   title: "Free-Flowing Bubus",
  //   desc: 'Often sold as "Free Size," comfortably fitting UK 8 to 18.',
  // },
];

function GuideHeader() {
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
          Fit Guide
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-5xl font-bold text-white relative inline-block mb-5"
      >
        Size Guide
        <span className="absolute -bottom-2 left-0 w-12 h-[3px] bg-[#D4AF37] rounded-full" />
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-white/50 leading-relaxed max-w-xl mt-6"
      >
        Every measurement below is a starting point — every piece is still cut
        and finished by hand. If you're between sizes or ordering something
        bespoke, a quick conversation with our team beats a chart every time.
      </motion.p>
    </section>
  );
}

function SizeChart() {
  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-10 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-[#D4AF37]/15 bg-white/[0.02] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="border-b border-[#D4AF37]/15">
                {[
                  "Nigerian / UK Size",
                  "US Size",
                  "Bust (in)",
                  "Waist (in)",
                  "Hips (in)",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[#D4AF37] text-xs uppercase tracking-wide px-6 py-4 font-semibold"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((s, i) => (
                <motion.tr
                  key={s.local}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4 text-white font-medium">
                    {s.local}
                  </td>
                  <td className="px-6 py-4 text-white/60">{s.us}</td>
                  <td className="px-6 py-4 text-white/60">{s.bust}</td>
                  <td className="px-6 py-4 text-white/60">{s.waist}</td>
                  <td className="px-6 py-4 text-white/60">{s.hips}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <p className="text-white/30 text-xs mt-4">
        All measurements in inches. Numbers between sizes? Go with the larger
        one, or reach out for a custom fit.
      </p>
    </section>
  );
}

function HowToMeasure() {
  return (
    <section className="py-16 max-w-6xl mx-auto px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-10"
      >
        <div className="h-px w-10 bg-[#D4AF37]" />
        <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
          How To Measure
        </span>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-6">
        {measureSteps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              delay: i * 0.1,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-2xl border border-[#D4AF37]/15 bg-gradient-to-b from-[#D4AF37]/[0.04] to-white/[0.02] backdrop-blur-md p-7"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold mb-5">
              {i + 1}
            </span>
            <h3 className="font-display text-xl font-bold text-white mb-2">
              {step.title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function KeyBodyParts() {
  return (
    <section className="py-16 max-w-6xl mx-auto px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-10"
      >
        <div className="h-px w-10 bg-[#D4AF37]" />
        <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
          Key Body Parts
        </span>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
        {bodyParts.map((part, i) => (
          <motion.div
            key={part.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="flex gap-4 py-4 border-b border-[#D4AF37]/15"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-2" />
            <div>
              <h4 className="text-white font-semibold mb-1">{part.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                {part.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function LocalConsiderations() {
  return (
    <section className="py-16 max-w-6xl mx-auto px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-10"
      >
        <div className="h-px w-10 bg-[#D4AF37]" />
        <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
          Special Local Considerations
        </span>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-6">
        {localNotes.map((note, i) => (
          <motion.div
            key={note.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              delay: i * 0.1,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-2xl border border-[#D4AF37]/15 bg-gradient-to-b from-[#D4AF37]/[0.04] to-white/[0.02] backdrop-blur-md p-7"
          >
            <span className="block w-8 h-px bg-[#D4AF37] mb-5" />
            <h3 className="font-display text-lg font-bold text-white mb-2">
              {note.title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">{note.desc}</p>
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
          Still Unsure of Your Size?
        </h3>
        <p className="text-white/50 mb-8 max-w-md mx-auto">
          Charts only go so far — especially with fabrics that don't stretch.
          Send us your measurements and we'll guide you to the right fit, or
          arrange a custom cut.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-[#D4AF37] text-black px-8 py-3.5 rounded-2xl font-semibold text-sm hover:bg-[#c4a02f] transition-colors"
        >
          Get a Custom Fitting
        </Link>
      </motion.div>
    </section>
  );
}

export default function RFHSizeGuide() {
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
      <GuideHeader />
      <SizeChart />
      <HowToMeasure />
      <KeyBodyParts />
      <LocalConsiderations />
      <CTA />
      <Footer />
    </div>
  );
}
