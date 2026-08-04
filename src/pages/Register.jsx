import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API_URL from "../api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        name, email, password,
      });
      toast.success("Registered successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Register failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-darkColor mb-2">Create Account</h1>
        <p className="text-center text-gray-500 mb-6">Join ShopNow today</p>

        <input
          value={name}
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-darkBlue"
        />
        <input
          value={email}
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-darkBlue"
        />
        <input
          value={password}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-darkBlue"
        />

        <button
          onClick={handleRegister}
          className="w-full py-3 bg-darkBlue text-white font-semibold rounded-lg hover:bg-lightBlue transition cursor-pointer"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-darkColor hover:underline font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
