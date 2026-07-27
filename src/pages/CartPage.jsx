import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import { useCart } from "../context/useCart";
import { createOrder, createOrderItems } from "../lib/supabase";

const WHATSAPP_NUMBER = "2348144169686";

function buildWhatsAppMessage(cart, total, customer) {
  const lines = cart.map(
    (item, i) =>
      `${i + 1}. ${item.name}
   Size: ${item.size}  |  Qty: ${item.quantity}  |  ${item.price}`,
  );

  return encodeURIComponent(
    `Hello madebyRFH 👋

A new order has been placed.

CUSTOMER DETAILS
-------------------------
Name: ${customer.name}
Email: ${customer.email}
Phone: ${customer.phone}

ORDER ITEMS
-------------------------
${lines.join("\n\n")}

-------------------------
TOTAL: ₦${total.toLocaleString()}
-------------------------

Please confirm availability and payment details.`,
  );
}

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    total,
  } = useCart();

  const [checkedOut, setCheckedOut] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});

  const setField = (field) => (e) =>
    setCustomer((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!customer.name.trim()) e.name = "Full name is required.";
    if (!customer.email.trim()) e.email = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(customer.email))
      e.email = "Enter a valid email.";
    if (!customer.phone.trim()) e.phone = "Phone number is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    if (!validate()) return;

    try {
      setLoadingOrder(true);

      const { data: order, error: orderError } = await createOrder({
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        total_amount: total,
        payment_status: "pending",
        status: "pending",
      });

      if (orderError) throw orderError;

      const items = cart.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        image: item.img,
        size: item.size,
        quantity: item.quantity,
        unit_price: item.priceVal,
        subtotal: item.priceVal * item.quantity,
      }));

      const { error: itemError } = await createOrderItems(items);

      if (itemError) throw itemError;

      const message = buildWhatsAppMessage(cart, total, customer);
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
        "_blank",
        "noopener,noreferrer",
      );

      clearCart();
      setCheckedOut(true);
      setCustomer({ name: "", email: "", phone: "" });
    } catch (err) {
      console.error(err);
      alert(err.message || "Unable to submit your order. Please try again.");
    } finally {
      setLoadingOrder(false);
    }
  };

  const inputCls =
    "w-full bg-black/40 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:border-[#D4AF37] focus:outline-none transition-colors text-sm";

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {/* ── Success screen ──────────────────────────────────────── */}
            {checkedOut ? (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center py-40 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center mb-6">
                  <svg
                    className="w-7 h-7 text-[#D4AF37]"
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
                <h2 className="font-display text-4xl font-bold text-white mb-3">
                  Order sent to WhatsApp
                </h2>
                <p className="text-white/50 max-w-sm mb-8 leading-relaxed">
                  Your order has been saved and WhatsApp has opened with all the
                  details pre-filled. Just hit{" "}
                  <span className="text-white/80 font-medium">Send</span> and
                  our team will confirm within 24 hours.
                </p>
                <Link
                  to="/shop"
                  className="bg-[#D4AF37] text-black px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#c4a02f] transition-colors"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="cart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* ── Page header ─────────────────────────────────────── */}
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h1 className="font-display text-4xl font-bold">
                      Shopping Bag
                    </h1>
                    <p className="text-white/60 mt-2">
                      {cart.length} Item{cart.length !== 1 && "s"}
                    </p>
                  </div>
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="border border-red-500/50 text-red-400 px-5 py-2 rounded-lg text-sm hover:bg-red-500/10 transition-colors"
                    >
                      Clear bag
                    </button>
                  )}
                </div>

                {/* ── Empty state ─────────────────────────────────────── */}
                {cart.length === 0 ? (
                  <div className="text-center py-32">
                    <h2 className="font-display text-3xl font-semibold">
                      Your bag is empty
                    </h2>
                    <p className="text-white/50 mt-3 mb-8">
                      Browse our collection.
                    </p>
                    <Link
                      to="/shop"
                      className="bg-[#D4AF37] text-black px-8 py-4 rounded-xl font-semibold text-sm hover:bg-[#c4a02f] transition-colors"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-start">
                    {/* ── LEFT — Cart items ────────────────────────────── */}
                    <div className="space-y-5">
                      <AnimatePresence initial={false}>
                        {cart.map((item) => (
                          <motion.div
                            key={`${item.id}-${item.size}`}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{
                              opacity: 0,
                              x: -20,
                              height: 0,
                              marginBottom: 0,
                            }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="bg-white/[0.03] border border-[#D4AF37]/15 rounded-2xl p-5 flex gap-5 overflow-hidden"
                          >
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-36 h-36 object-cover object-top rounded-xl shrink-0 border border-[#D4AF37]/10"
                            />
                            <div className="flex-1 min-w-0">
                              <h2 className="font-display text-xl font-semibold text-white">
                                {item.name}
                              </h2>
                              <p className="text-[#D4AF37] mt-1 font-medium">
                                {item.price}
                              </p>
                              <p className="text-white/50 text-sm mt-1">
                                Size: {item.size}
                              </p>

                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 gap-3">
                                <div className="flex items-center border border-[#D4AF37]/20 rounded-xl overflow-hidden">
                                  <button
                                    onClick={() =>
                                      decreaseQuantity(item.id, item.size)
                                    }
                                    className="px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                                  >
                                    −
                                  </button>
                                  <span className="px-5 py-2 text-white text-sm font-medium border-x border-[#D4AF37]/20">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      increaseQuantity(item.id, item.size)
                                    }
                                    className="px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                                  >
                                    +
                                  </button>
                                </div>
                                <button
                                  onClick={() =>
                                    removeFromCart(item.id, item.size)
                                  }
                                  className="text-red-400/70 hover:text-red-400 text-sm transition-colors"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* ── RIGHT — Customer info + Order summary ────────── */}
                    <div className="space-y-5">
                      {/* Customer Information */}
                      <div className="bg-white/[0.03] border border-[#D4AF37]/20 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="h-px w-8 bg-[#D4AF37]" />
                          <span className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase font-semibold">
                            Your Details
                          </span>
                        </div>
                        <h2 className="font-display text-2xl font-semibold mb-6">
                          Customer Information
                        </h2>

                        <div className="space-y-5">
                          <div>
                            <label className="block text-[#D4AF37]/70 text-xs uppercase tracking-wide mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={customer.name}
                              onChange={setField("name")}
                              placeholder="John Doe"
                              className={inputCls}
                            />
                            {errors.name && (
                              <p className="text-red-400 text-xs mt-2">
                                {errors.name}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-[#D4AF37]/70 text-xs uppercase tracking-wide mb-2">
                              Email Address
                            </label>
                            <input
                              type="email"
                              value={customer.email}
                              onChange={setField("email")}
                              placeholder="john@email.com"
                              className={inputCls}
                            />
                            {errors.email && (
                              <p className="text-red-400 text-xs mt-2">
                                {errors.email}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-[#D4AF37]/70 text-xs uppercase tracking-wide mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={customer.phone}
                              onChange={setField("phone")}
                              placeholder="+234..."
                              className={inputCls}
                            />
                            {errors.phone && (
                              <p className="text-red-400 text-xs mt-2">
                                {errors.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="bg-white/[0.03] border border-[#D4AF37]/20 rounded-2xl p-8 sticky top-32">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="h-px w-8 bg-[#D4AF37]" />
                          <span className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase font-semibold">
                            Summary
                          </span>
                        </div>
                        <h2 className="font-display text-2xl font-semibold mb-6">
                          Order Summary
                        </h2>

                        <div className="space-y-3 mb-6">
                          {cart.map((item) => (
                            <div
                              key={`${item.id}-${item.size}`}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-white/60 truncate pr-4">
                                {item.name}
                                <span className="text-white/30">
                                  {" "}
                                  ×{item.quantity}
                                </span>
                              </span>
                              <span className="text-white/80 shrink-0">
                                ₦
                                {(
                                  item.priceVal * item.quantity
                                ).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-[#D4AF37]/15 pt-5 flex justify-between items-center mb-6">
                          <span className="text-white/60">Total</span>
                          <span className="text-[#D4AF37] text-xl font-bold">
                            ₦{total.toLocaleString()}
                          </span>
                        </div>

                        {/* WhatsApp notice */}
                        <div className="flex items-start gap-3 bg-[#25D366]/5 border border-[#25D366]/20 rounded-xl p-4 mb-6">
                          <svg
                            className="w-4 h-4 text-[#25D366] mt-0.5 shrink-0"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          <p className="text-xs text-white/50 leading-relaxed">
                            Your order is saved to our system first, then
                            WhatsApp opens with all your details pre-filled.
                            Just hit{" "}
                            <span className="text-white/70 font-medium">
                              Send
                            </span>{" "}
                            without editing.
                          </p>
                        </div>

                        <button
                          onClick={handleCheckout}
                          disabled={loadingOrder}
                          className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-semibold text-sm hover:bg-[#c4a02f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                          {loadingOrder ? (
                            <>
                              <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                              Processing Order…
                            </>
                          ) : (
                            "Proceed to Checkout"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </>
  );
}
