import React from "react";

//components
import Home from "./Home";
import CoinPage from "./CoinPage";

import Navbar from "../components/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Pages = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinPage />} />
      </Routes>
    </Router>
  );
};

export default Pages;
