import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API_URL from "../api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email, password,
      });
      login(res.data.token);
      toast.success("Login Successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-[#4C1D95] mb-2">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-6">Sign in to your account</p>
        
        <input
          value={email}
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]"
        />
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]"
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-[#EC4899] text-white font-semibold rounded-lg hover:bg-pink-500 transition cursor-pointer"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#4C1D95] hover:underline font-medium">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
