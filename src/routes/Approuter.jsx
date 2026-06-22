import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

const Approuter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Approuter;
