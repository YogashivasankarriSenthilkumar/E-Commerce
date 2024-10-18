import React from "react";
import { Link } from "react-router-dom";
import { DressStyle } from "../../assets/data/dummyData";
import { useEffect } from "react";

const DressStyles = () => {
  return (
    <div className="flex justify-center items-center py-8 bg-gray-100">
      <div className="w-full max-w-6xl bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/products"
            key={DressStyle[0].id}
            className="relative bg-gray-200 p-4 shadow-lg rounded-lg overflow-hidden col-span-2 row-span-2"
          >
            <img
              src={DressStyle[0].img}
              alt={DressStyle[0].name}
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="text-white font-semibold text-xl">
                {DressStyle[0].name}
              </span>
            </div>
          </Link>

          <Link
            to="/products"
            key={DressStyle[1].id}
            className="relative bg-gray-200 p-4 shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={DressStyle[1].img}
              alt={DressStyle[1].name}
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="text-white font-semibold text-xl">
                {DressStyle[1].name}
              </span>
            </div>
          </Link>

          <Link
            to="/products"
            key={DressStyle[2].id}
            className="relative bg-gray-200 p-4 shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={DressStyle[2].img}
              alt={DressStyle[2].name}
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="text-white font-semibold text-xl">
                {DressStyle[2].name}
              </span>
            </div>
          </Link>

          <Link
            to="/products"
            key={DressStyle[3].id}
            className="relative bg-gray-200 p-4 shadow-lg rounded-lg overflow-hidden col-span-2"
          >
            <img
              src={DressStyle[3].img}
              alt={DressStyle[3].name}
              className="w-full h-70 object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="text-white font-semibold text-xl">
                {DressStyle[3].name}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DressStyles;
