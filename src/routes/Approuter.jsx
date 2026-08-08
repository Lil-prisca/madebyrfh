import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Shop from "../pages/Shop";
import ItemDetail from "../pages/ItemDetails";
import CartPage from "../pages/CartPage";
import ScrollToTop from "../components/ScrollToTop";
import AdminApp from "../admin/AdminApp";
import Rfhsizeguide from "../components/Rfhsizeguide";

const Approuter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ItemDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/size-guide" element={<Rfhsizeguide />} />
      </Routes>
    </>
  );
};

export default Approuter;
