import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Shop from "../pages/Shop";
import ItemDetail from "../pages/ItemDetails";

const Approuter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:id" element={<ItemDetail />} />
    </Routes>
  );
};

export default Approuter;
