import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center px-6">
      <h1 className="font-display text-4xl font-bold mb-4">Piece not found</h1>

      <p className="text-white/50 mb-8">
        That item doesn't exist or may have sold out.
      </p>

      <Link
        to="/shop"
        className="bg-[#D4AF37] text-black px-8 py-3 rounded-2xl font-semibold"
      >
        Back to Shop
      </Link>
    </div>
  );
}
