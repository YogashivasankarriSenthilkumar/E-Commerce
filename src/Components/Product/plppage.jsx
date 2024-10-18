import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setCategoryFilter,
  setColorFilter,
  setSizeFilter,
  setDressStyleFilter,
} from "../../features/Filter/filterSlice";
import { useSelector } from "react-redux";

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    dispatch(setCategoryFilter(newCategories));
  };

  const handleColorChange = (color) => {
    const selectedColors = [color];
    dispatch(setColorFilter(selectedColors));
  };

  const handleSizeChange = (size) => {
    const selectedSizes = [size];
    dispatch(setSizeFilter(selectedSizes));
  };

  // Handle dress style filter change
  const handleDressStyleChange = (style) => {
    dispatch(setDressStyleFilter([style]));
  };

  return (
    <div className="p-4 ml-8 bg-gray-200">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <div className="flex flex-col">
          <label className="mb-1">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleCategoryChange("T-shirts")}
            />
            T-shirts
          </label>
          <label className="mb-1">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleCategoryChange("Hoodies")}
            />
            Hoodies
          </label>
          <label className="mb-1">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleCategoryChange("Jeans")}
            />
            Jeans
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Colors</h3>
        <div className="flex flex-col">
          <label className="mb-1">
            <input
              type="radio"
              name="color"
              className="mr-2"
              onChange={() => handleColorChange("blue")}
            />
            Blue
          </label>
          <label className="mb-1">
            <input
              type="radio"
              name="color"
              className="mr-2"
              onChange={() => handleColorChange("black")}
            />
            Black
          </label>
          <label className="mb-1">
            <input
              type="radio"
              name="color"
              className="mr-2"
              onChange={() => handleColorChange("gray")}
            />
            Gray
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Size</h3>
        <div className="flex flex-wrap gap-2">
          <label className="mb-1">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleSizeChange("S")}
            />
            Small
          </label>
          <label className="mb-1">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleSizeChange("M")}
            />
            Medium
          </label>
          <label className="mb-1">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleSizeChange("L")}
            />
            Large
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Dress Style</h3>
        <div className="flex flex-col">
          <label className="mb-1">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleDressStyleChange("Casual")}
            />
            Casual
          </label>
          <label className="mb-1">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleDressStyleChange("Formals")}
            />
            Formal
          </label>
        </div>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  const navigate = useNavigate();
  const filteredProducts = useSelector(
    (state) => state.filter.filteredProducts
  );

  const handleImageClick = (productName) => {
    const productUrlName = productName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/products/${productUrlName}`);
  };

  return (
    <div className="p-4">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 cursor-pointer"
                onClick={() => handleImageClick(product.name)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "path/to/placeholder.jpg";
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (v, i) => (
                    <FaStar
                      key={i}
                      color={i < product.rating ? "#FFD700" : "#e4e5e9"}
                      className="h-5 w-5"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl font-semibold text-gray-600">
          Products are unavailable.
        </div>
      )}
    </div>
  );
};

const Plppage = () => {
  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <FilterSidebar />
      </div>
      <div className="w-3/4">
        <h2 className="text-2xl font-bold p-4">Casual</h2>
        <ProductGrid />
      </div>
    </div>
  );
};

export default Plppage;
