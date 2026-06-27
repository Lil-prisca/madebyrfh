import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useCart } from "../context/useCart";

const navLinks = [
  { link: "/shop", name: "Shop" },
  { link: "/about", name: "About" },
  // { link: "", name: "Footwear" },
  // { link: "", name: "Tailoring" },
  { link: "/contact", name: "Contact" },
];

const NavBar = () => {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl"
    >
      <div className="rounded-2xl border border-[#D4AF37]/20 bg-black/60 backdrop-blur-xl px-6 py-3 flex items-center justify-between shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <Link to="/">
          <span className="font-script text-2xl text-[#D4AF37] select-none">
            <img src={logo} alt="logo" className=" h-10" />
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.link}
              className="text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300 tracking-wide"
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:flex w-9 h-9 rounded-xl border border-white/10 items-center justify-center text-white/70 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M12.9 14.32a8 8 0 111.41-1.41l4.38 4.37-1.41 1.42-4.38-4.38z"
                fill="currentColor"
              />
            </svg>
          </button>
          <Link to="/cart">
            <button className="relative flex w-9 h-9 rounded-xl border border-white/10 items-center justify-center text-white/70 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4M3 6h18M16 10a4 4 0 01-8 0"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#D4AF37] text-black text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-1"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="w-4 h-0.5 bg-white block"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="w-4 h-0.5 bg-white block"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="w-4 h-0.5 bg-white block"
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-2 rounded-2xl border border-[#D4AF37]/20 bg-black/80 backdrop-blur-xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.link}
                  className="text-white/70 hover:text-[#D4AF37] text-sm py-1 transition-colors"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;
