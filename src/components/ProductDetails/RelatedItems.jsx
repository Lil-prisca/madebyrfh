import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { fetchRelatedProducts } from "../../lib/supabase";

export default function RelatedItems({ product }) {
  const navigate = useNavigate();

  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!product) return;

    const loadRelated = async () => {
      setLoading(true);

      const { data, error } = await fetchRelatedProducts(
        product.category,
        product.id,
      );

      if (error) {
        console.error(error);
      } else {
        setRelated(data || []);
      }

      setLoading(false);
    };

    loadRelated();
  }, [product]);

  if (loading) return null;

  if (related.length === 0) return null;

  return (
    <section className="py-20 max-w-6xl mx-auto px-6 lg:px-10 border-t border-[#D4AF37]/15">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-10"
      >
        <div className="h-px w-10 bg-[#D4AF37]" />

        <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">
          Pairs Well With
        </span>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {related.map((p, i) => (
          <motion.div
            key={p.id}
            onClick={() => navigate(`/shop/${p.id}`)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              delay: i * 0.08,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group rounded-2xl border border-[#D4AF37]/15 bg-white/[0.03] overflow-hidden hover:border-[#D4AF37]/45 transition-colors duration-500 cursor-pointer"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
            </div>

            <div className="p-5">
              <h3 className="font-display text-lg font-semibold text-white mb-1">
                {p.name}
              </h3>

              <p className="text-[#D4AF37] font-medium">{p.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
