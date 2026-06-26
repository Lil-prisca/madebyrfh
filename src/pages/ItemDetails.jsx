import { useParams } from "react-router-dom";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import Breadcrumb from "../components/ProductDetails/Breadcrumb";
import Gallery from "../components/ProductDetails/Gallery";
import BuyPanel from "../components/ProductDetails/BuyPanel";
import RelatedItems from "../components/ProductDetails/RelatedItems";
import NotFound from "../components/ProductDetails/NotFound";

import { getProductById } from "../product";

export default function RFHItemDetail() {
  const { id } = useParams();

  const product = getProductById(id);

  if (!product) return <NotFound />;

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
