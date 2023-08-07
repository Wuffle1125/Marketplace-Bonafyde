import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Market from "../pages/Market";
import Create from "../pages/Create";
import Contact from "../pages/Contact";
import Users from "../pages/Users";
import Blog from "../pages/Blog";
import About from "../pages/About";
import Faq from "../pages/Faq";
import Login from "../pages/Login";

import Wallet from "../pages/Wallet";
import NftDetails from "../pages/NftDetails";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/market" element={<Market />} />
      <Route path="/users" element={<Users />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/about" element={<About />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/market/:id" element={<NftDetails />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Routers;
