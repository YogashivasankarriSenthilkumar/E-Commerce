import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleKeepShopping = () => {
    navigate("/products");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-semibold text-white mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-400 mb-6">Thank you for your purchase.</p>
        <button
          onClick={handleKeepShopping}
          className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-lg transition-colors"
        >
          Keep Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
