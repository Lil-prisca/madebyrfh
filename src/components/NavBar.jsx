import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/Logo.png";
import { useCart } from "../context/useCart";

const shopMenu = [
  {
    name: "Tailoring",
    subsections: ["Agbada", "Kaftans", "Native Wear", "Wearons"],
  },
  {
    name: "Footwear",
    subsections: [],
  },
  {
    name: "Weddings",
    subsections: ["Groom", "Corporate"],
  },
];

const navLinks = [
  { link: "/about", name: "About" },
  { link: "/contact", name: "Contact" },
];

const NavBar = () => {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);

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
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <Link
              to="/shop"
              className="flex items-center gap-1.5 text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300 tracking-wide"
            >
              Shop
              <svg
                className={`w-3 h-3 transition-transform ${shopOpen ? "rotate-180" : ""}`}
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </Link>

            <AnimatePresence>
              {shopOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] rounded-2xl border border-[#D4AF37]/20 bg-black/95 backdrop-blur-xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.6)] grid grid-cols-3 gap-6"
                >
                  {shopMenu.map((cat) => (
                    <div key={cat.name}>
                      <Link
                        to={
                          cat.subsections.length
                            ? `/shop?group=${encodeURIComponent(cat.name)}`
                            : `/shop?category=${encodeURIComponent(cat.name)}`
                        }
                        onClick={() => setShopOpen(false)}
                        className="block text-white text-sm font-semibold mb-3 hover:text-[#D4AF37] transition-colors"
                      >
                        {cat.name}
                      </Link>

                      {cat.subsections.length > 0 && (
                        <div className="flex flex-col gap-2">
                          {cat.subsections.map((sub) => (
                            <Link
                              key={sub}
                              to={`/shop?category=${encodeURIComponent(sub)}`}
                              onClick={() => setShopOpen(false)}
                              className="text-white/50 text-sm hover:text-[#D4AF37] transition-colors"
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="col-span-3 pt-4 mt-1 border-t border-[#D4AF37]/15">
                    <Link
                      to="/shop"
                      onClick={() => setShopOpen(false)}
                      className="text-[#D4AF37] text-xs uppercase tracking-wide hover:text-[#c4a02f] transition-colors"
                    >
                      View All Pieces →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
            <div className="flex flex-col p-4 gap-1">
              <div>
                <button
                  onClick={() => setMobileShopOpen(!mobileShopOpen)}
                  className="w-full flex items-center justify-between text-white/70 hover:text-[#D4AF37] text-sm py-2 transition-colors"
                >
                  Shop
                  <svg
                    className={`w-3 h-3 transition-transform ${mobileShopOpen ? "rotate-180" : ""}`}
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
                  {mobileShopOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-3"
                    >
                      {shopMenu.map((cat) => (
                        <div key={cat.name} className="py-2">
                          <Link
                            to={
                              cat.subsections.length
                                ? `/shop?group=${encodeURIComponent(cat.name)}`
                                : `/shop?category=${encodeURIComponent(cat.name)}`
                            }
                            onClick={() => setOpen(false)}
                            className="block text-white/80 text-sm font-medium mb-1.5"
                          >
                            {cat.name}
                          </Link>
                          {cat.subsections.length > 0 && (
                            <div className="flex flex-col gap-1.5 pl-3">
                              {cat.subsections.map((sub) => (
                                <Link
                                  key={sub}
                                  to={`/shop?category=${encodeURIComponent(sub)}`}
                                  onClick={() => setOpen(false)}
                                  className="text-white/50 text-xs py-1"
                                >
                                  {sub}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.link}
                  onClick={() => setOpen(false)}
                  className="text-white/70 hover:text-[#D4AF37] text-sm py-2 transition-colors"
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
