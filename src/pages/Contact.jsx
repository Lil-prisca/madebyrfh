import { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";

const channels = [
  { label: "Email", value: "concierge@madebyrfh.com" },
  { label: "Phone", value: "+234 803 555 0142" },
  { label: "Atelier", value: "14 Adeola Odeku St, Victoria Island, Lagos" },
  { label: "Hours", value: "Mon–Sat, 10am – 7pm WAT" },
];

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#D4AF37]/[0.08] to-white/[0.02] p-10 text-center h-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.1)]"
      >
        <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center mb-5">
          <svg
            className="w-5 h-5 text-[#D4AF37]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-white mb-2">
          Message sent
        </h3>
        <p className="text-white/50 text-sm max-w-xs">
          Someone from the team will get back to you within one business day.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-b from-[#D4AF37]/[0.04] to-white/[0.02] backdrop-blur-md p-8 lg:p-10">
      <div className="space-y-6">
        <div>
          <label className="block text-[#D4AF37]/80 text-xs uppercase tracking-wide mb-2">
            Name
          </label>
          <input
            value={form.name}
            onChange={handleChange("name")}
            type="text"
            placeholder="Your full name"
            className="w-full bg-black/40 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
          />
        </div>
        <div>
          <label className="block text-[#D4AF37]/80 text-xs uppercase tracking-wide mb-2">
            Email
          </label>
          <input
            value={form.email}
            onChange={handleChange("email")}
            type="email"
            placeholder="you@example.com"
            className="w-full bg-black/40 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
          />
        </div>
        <div>
          <label className="block text-[#D4AF37]/80 text-xs uppercase tracking-wide mb-2">
            Message
          </label>
          <textarea
            value={form.message}
            onChange={handleChange("message")}
            rows={5}
            placeholder="Tell us what you need — sizing help, a bespoke order, press, anything."
            className="w-full bg-black/40 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]/60 transition-colors resize-none"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-[#D4AF37] text-black px-8 py-3.5 rounded-2xl font-semibold text-sm hover:bg-[#c4a02f] transition-colors"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

function InfoPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px w-10 bg-[#D4AF37]" />
        <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
          Get In Touch
        </span>
      </div>

      <h1 className="font-display text-5xl font-bold text-white leading-tight mb-5 relative">
        Questions Before You
        <span className="block font-script italic text-[#D4AF37] font-normal text-4xl mt-1">
          Commit to a Cut?
        </span>
        <span className="absolute -bottom-4 left-0 w-14 h-[3px] bg-[#D4AF37] rounded-full" />
      </h1>

      <p className="text-white/50 leading-relaxed mb-10 mt-6 max-w-md">
        Sizing, bespoke requests, wholesale, press — whatever it is, a real
        person reads every message.
      </p>

      <div className="space-y-5 rounded-2xl border border-[#D4AF37]/15 bg-gradient-to-b from-[#D4AF37]/[0.03] to-transparent p-6">
        {channels.map((c) => (
          <div
            key={c.label}
            className="flex gap-4 pb-5 border-b border-[#D4AF37]/15 last:border-b-0 last:pb-0"
          >
            <span className="text-[#D4AF37] text-xs uppercase tracking-wide w-20 shrink-0 pt-0.5 font-semibold">
              {c.label}
            </span>
            <span className="text-white/80 text-sm">{c.value}</span>
          </div>
        ))}
      </div>
    </div>
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

export default function RFHContact() {
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
      <section className="pt-40 pb-24 max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <InfoPanel />
          <ContactForm />
        </div>
      </section>
      <Footer />
    </div>
  );
}
