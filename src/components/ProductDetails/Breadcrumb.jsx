import { Link } from "react-router-dom";

export default function Breadcrumb({ product }) {
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-32 pb-2">
      <p className="text-white/40 text-xs tracking-wide">
        <Link to="/shop" className="hover:text-[#D4AF37] transition-colors">
          Shop
        </Link>

        <span className="mx-2">/</span>

        <span className="hover:text-[#D4AF37]">{product.category}</span>

        <span className="mx-2">/</span>

        <span className="text-white/70">{product.name}</span>
      </p>
    </div>
  );
}
