import React from "react";
import ProductDetailPage from "./ProductDetailPage";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import TopSellingProduct from "../FilteredProducts/TopSellingProduct";

const PdpList = () => {
  return (
    <div>
      <Navbar></Navbar>
      <ProductDetailPage></ProductDetailPage>
      <TopSellingProduct></TopSellingProduct>
      <Footer></Footer>
    </div>
  );
};

export default PdpList;
