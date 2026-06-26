import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useCart } from "../context/useCart";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    total,
  } = useCart();

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-bold">Shopping Bag</h1>

              <p className="text-white/60 mt-2">
                {cart.length} Item{cart.length !== 1 && "s"}
              </p>
            </div>

            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="border border-red-500 px-5 py-2 rounded-lg hover:bg-red-500"
              >
                Clear Cart
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-32">
              <h2 className="text-3xl font-semibold">Your bag is empty</h2>

              <p className="text-white/50 mt-3 mb-8">Browse our collection.</p>

              <Link
                to="/shop"
                className="bg-[#D4AF37] text-black px-8 py-4 rounded-xl"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-5"
                  >
                    <img
                      src={item.img}
                      className="w-40 h-40 rounded-xl object-cover"
                      alt={item.name}
                    />

                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold">{item.name}</h2>

                      <p className="text-[#D4AF37] mt-2">{item.price}</p>

                      <p className="text-white/60 mt-2">Size: {item.size}</p>

                      <div className="flex justify-between mt-8">
                        <div className="flex border border-white/20 rounded-lg">
                          <button
                            onClick={() => decreaseQuantity(item.id, item.size)}
                            className="px-4 py-2"
                          >
                            -
                          </button>

                          <span className="px-6 py-2">{item.quantity}</span>

                          <button
                            onClick={() => increaseQuantity(item.id, item.size)}
                            className="px-4 py-2"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-fit sticky top-32">
                <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

                <div className="flex justify-between mb-4">
                  <span>Total</span>

                  <span className="text-[#D4AF37] text-xl font-bold">
                    ₦{total.toLocaleString()}
                  </span>
                </div>

                <button className="w-full bg-[#D4AF37] text-black py-4 rounded-xl mt-8">
                  Proceed To Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
