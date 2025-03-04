import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductListHeader from "./ProductListHeader";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <ProductListHeader />
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
