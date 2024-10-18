import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");

    if (email && name) {
      setUser({ name, email });
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Profile</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <p className="bg-gray-700 rounded-md p-3">
            {user.name || "No name available"}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <p className="bg-gray-700 rounded-md p-3">
            {user.email || "No email available"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
