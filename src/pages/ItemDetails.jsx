import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import Breadcrumb from "../components/ProductDetails/Breadcrumb";
import Gallery from "../components/ProductDetails/Gallery";
import BuyPanel from "../components/ProductDetails/BuyPanel";
import RelatedItems from "../components/ProductDetails/RelatedItems";
import NotFound from "../components/ProductDetails/NotFound";

import { fetchProductById } from "../lib/supabase";

export default function RFHItemDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);

      const { data, error } = await fetchProductById(id);

      if (error || !data) {
        setNotFound(true);
      } else {
        setProduct(data);
      }

      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (notFound) return <NotFound />;

  return (
    <div
      className="bg-black min-h-screen text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <NavBar />

      <Breadcrumb product={product} />

      <section className="max-w-6xl mx-auto px-6 lg:px-10 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <Gallery key={product.id} product={product} />
          <BuyPanel key={product.id} product={product} />
        </div>
      </section>

      <RelatedItems product={product} />

      <Footer />
    </div>
  );
}
