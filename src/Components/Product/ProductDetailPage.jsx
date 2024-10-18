import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { casualData } from "../../assets/data/dummyData";
import { CartContext } from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailPage = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const formattedProductName = productName
    .replace(/-/g, " ")
    .replace(" t ", " T-");

  const product = casualData.find(
    (p) => p.name.toLowerCase() === formattedProductName.toLowerCase()
  );
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top
  }, []);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // State for reviews
  const [reviews, setReviews] = useState([]);
  const [displayedReviews, setDisplayedReviews] = useState([]); // Stores currently visible reviews
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // For pagination

  const reviewsPerPage = 6; // Number of reviews to show per load

  // Fetch product data on mount
  useEffect(() => {
    if (product) {
      setSelectedSize(product.size[0]);
      setSelectedColor(product.color[0]);
    }
  }, [product]);

  // Fetch reviews on mount
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments") // Example API for reviews
      .then((response) => {
        setReviews(response.data); // Get all reviews
        setDisplayedReviews(response.data.slice(0, reviewsPerPage)); // Display first 6 reviews
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      });
  }, []);

  // Debugging size and color selection
  useEffect(() => {
    console.log("Selected Size State:", selectedSize);
    console.log("Selected Color State:", selectedColor);
  }, [selectedSize, selectedColor]);

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
      img: product.img,
    };
    addToCart(cartItem);

    // Show success toast notification
    toast.success("Product added to cart successfully!", {
      position: "top-right",
    });

    setTimeout(() => {
      navigate("/cart");
    }, 1000); // Delay for 2 seconds
  };

  const handleViewMoreReviews = () => {
    const nextPage = currentPage + 1;
    const nextReviews = reviews.slice(0, nextPage * reviewsPerPage);
    setDisplayedReviews(nextReviews);
    setCurrentPage(nextPage);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex">
        <div className="w-1/2">
          <img
            src={product.img}
            alt={product.name}
            className="w-[750px] h-[450px]"
          />
        </div>
        <div className="w-1/2 p-6">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-2xl text-gray-600">Rs.{product.price}</span>
            <span className="ml-4 line-through text-gray-500">Rs.300</span>
            <span className="ml-4 text-red-600">-40%</span>
          </div>
          <p className="mb-4">{product.text}</p>

          <div className="flex flex-col gap-6 mb-4">
            <div>
              <p className="text-gray-600">Select Size:</p>
              <div className="flex gap-2 mt-2">
                {product.size.map((size, index) => (
                  <button
                    key={index}
                    className={`border px-4 py-2 rounded-full ${
                      selectedSize === size
                        ? "bg-black text-white font-bold"
                        : "bg-gray-300 text-gray-800"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-gray-600">Select Color:</p>
              <div className="flex gap-2 mt-2">
                {product.color.map((color, index) => (
                  <button
                    key={index}
                    style={{ backgroundColor: color }}
                    className={`w-8 h-8 rounded-full ${
                      selectedColor === color
                        ? "border-4 border-black"
                        : "border border-gray-300"
                    }`}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-60 py-2 rounded-full mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>
        {loading ? (
          <p>Loading reviews...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedReviews.map((review) => (
              <div key={review.id} className="border p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{review.name}</h3>
                <p className="text-gray-600 mb-2">
                  Posted on: {new Date().toLocaleDateString()}
                </p>
                <p className="italic">"{review.body}"</p>
              </div>
            ))}
          </div>
        )}

        {displayedReviews.length < reviews.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleViewMoreReviews}
              className="bg-black text-white px-6 py-2 rounded-full"
            >
              View More Reviews
            </button>
          </div>
        )}
      </div>

      {/* ToastContainer component */}
      <ToastContainer />
    </div>
  );
};

export default ProductDetailPage;
