import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const CartPage = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  // Calculate subtotal, discount, and total
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = cartItems.length === 0 ? 0 : 15;
  const total = subtotal - discount + deliveryFee;

  // Payment integration
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Q8fPeByrVu6wJZ3yevSp5h1uwqqF1s0e3v5lCRmD7AwqUVun8D3Ao4XFnbQczjlSTThJxwra4t12NJ9K2R65E8h000GRitJu2"
    );

    const body = {
      products: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      })),
    };

    console.log(body);

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "http://localhost:7001/api/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    console.log("response : ", response);

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Fetch error:", errorMessage);
      return;
    }

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  const handleCheckout = (event) => {
    event.preventDefault();
    if (total > 0) {
      makePayment();
    } else {
      console.log("Your cart is empty!");
    }
  };

  return (
    <div className="container mx-auto p-6 flex">
      {/* Cart Items Section */}
      <div className="w-3/4 pr-6">
        <h1 className="text-3xl font-extrabold mb-6">YOUR CART</h1>
        {cartItems.length === 0 ? (
          <div className="flex items-center">
            <p>Your cart is empty</p>
            <Link to="/products" className="text-blue-600 hover:underline ml-2">
              Shop for Products
            </Link>
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={`${item.id}-${item.size}-${item.color}-${index}`}
              className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow"
            >
              <div className="flex items-center">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-24 h-24 object-cover mr-4"
                />
                <div>
                  <h2 className="font-bold text-lg">{item.name}</h2>
                  <p>Size: {item.size}</p>
                  <p>Color: {item.color}</p>
                  <p className="font-semibold">Rs. {item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    decreaseQuantity(item.id, item.size, item.color)
                  }
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full text-xl"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() =>
                    increaseQuantity(item.id, item.size, item.color)
                  }
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full text-xl"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id, item.size, item.color)}
                className="text-red-600 text-xl"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {/* Order Summary Section */}
      <div className="w-1/4 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <p>Subtotal</p>
            <p>Rs. {subtotal}</p>
          </div>
          <div className="flex justify-between mb-2 text-red-600">
            <p>Discount (20%)</p>
            <p>-Rs. {discount.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Delivery Fee</p>
            <p>Rs. {deliveryFee}</p>
          </div>
          <div className="flex justify-between font-bold text-xl mt-4">
            <p>Total</p>
            <p>Rs. {total.toFixed(2)}</p>
          </div>
        </div>

        {/* Promo Code Section */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Add promo code"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button className="bg-black text-white w-full py-2">Apply</button>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          className={`${
            total === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-black"
          } text-white px-4 py-3 mt-6 w-full text-lg flex justify-center items-center`}
          disabled={total === 0}
        >
          Go to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
