import React from "react";
import Navbar from "../Navbar/Navbar";
import Slider from "../Slider/slider";
import ProductCard from "../FilteredProducts/ProductCard";
import TopSellingProduct from "../FilteredProducts/TopSellingProduct";
import DressStyles from "../FilteredProducts/DressStyles";
import Footer from "../Footer/Footer";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Slider></Slider>
      <div className="bg-black p-4 w-full flex items-center justify-around mx-auto -mt-5">
        <p className="text-white font-inter text-base font-medium">50% OFF</p>
        <p className="text-white font-inter text-base font-medium">
          Free shipping and returns
        </p>
        <p className="text-white font-inter text-base font-medium">
          Different payment methods
        </p>
      </div>
      <ProductCard></ProductCard>
      <TopSellingProduct></TopSellingProduct>
      <DressStyles></DressStyles>
      <Footer></Footer>
    </div>
  );
};

export default Main;
