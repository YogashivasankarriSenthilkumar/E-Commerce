import { auth, provider } from "./config";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import Main from "../Main/Main";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle Google sign-in
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user.email);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("name", data.user.displayName);
        navigate("/"); // Redirecting to the home page after login
      })
      .catch((error) => {
        if (error.code === "auth/popup-closed-by-user") {
          console.log("Popup closed by user before completing sign-in.");
          alert(
            "You closed the login popup before signing in. Please try again."
          );
        } else {
          console.error("Error during sign-in: ", error);
          alert("An error occurred during sign-in. Please try again.");
        }
      });
  };

  // Handle email/password sign-in
  const handleEmailSignIn = (e) => {
    e.preventDefault(); // Prevent form reload
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setValue(user.email);
        localStorage.setItem("email", user.email);
        localStorage.setItem("name", user.displayName || "User"); // Store user name if available
        navigate("/"); // Redirect to home page
      })
      .catch((error) => {
        console.error("Error during email sign-in: ", error);
        alert("Invalid email or password. Please try again.");
      });
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    if (!email) {
      alert("Please enter your email address to reset your password.");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert(
          "A password reset link has been sent to your email. Please check your inbox."
        );
      })
      .catch((error) => {
        console.error("Error sending password reset email: ", error);
        alert(
          "Failed to send password reset email. Please check your email address and try again."
        );
      });
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setValue(storedEmail); // Set the stored email if the user is already logged in
      navigate("/"); // Redirect to the home page if the user is already logged in
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      {value ? (
        <Main /> // If user is logged in, render the main content
      ) : (
        <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-96">
          <h1 className="text-3xl text-white font-bold mb-8 text-center">
            Sign In
          </h1>

          <button
            onClick={handleClick}
            className="w-full py-2 px-4 mb-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 flex items-center justify-center"
          >
            <svg
              className="w-6 h-6 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M21.805 10.023h-9.566v3.981h5.474c-.551 2.2-2.276 3.733-5.474 3.733-3.328 0-6.015-2.68-6.015-5.991 0-3.311 2.687-5.992 6.015-5.992 1.418 0 2.724.502 3.737 1.367l2.682-2.64C18.209 2.499 16.073 1.6 13.796 1.6 8.988 1.6 5 5.49 5 10.254c0 4.764 3.988 8.654 8.796 8.654 5.077 0 7.914-3.49 7.914-8.533 0-.564-.105-1.126-.263-1.646z"
                fill="white"
              />
            </svg>
            Continue with Google
          </button>

          <p className="text-white text-center my-4">or</p>

          <form onSubmit={handleEmailSignIn}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:bg-gray-600"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:bg-gray-600"
            />

            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:bg-gradient-to-l"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-white hover:underline cursor-pointer"
              >
                Create an account
              </span>
            </p>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-400">
              Forgot password?{" "}
              <span
                className="text-white cursor-pointer hover:underline"
                onClick={handleForgotPassword}
              >
                Reset Password
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
