import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API_URL from "../api";

const Profile = () => {
  const { token, logout, role, login } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [showAdminForm, setShowAdminForm] = useState(false);
  
  useEffect(() => {
    if (!token) return navigate("/login");
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUserName(payload.name);
    setUserEmail(payload.email);
    const url = role === "admin" ? `${API_URL}/api/orders/all` : `${API_URL}/api/orders`;
    axios.get(url, {
      headers: { Authorization: "Bearer " + token }
    }).then((res) => setOrders(res.data));
  }, [token, navigate, role]);
  const handleBecomeAdmin = async () => {
    if (!adminKey) return toast.error("Enter Password!");
    try {
      const res = await axios.post(`${API_URL}/api/auth/become-admin`,
        { adminKey }, { headers: { Authorization: "Bearer " + token } }
      );
      login(res.data.token);
      toast.success("Welcome to Admin Panel!");
      setAdminKey("");
      setShowAdminForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed!");
    }
  };

  const handleLeaveAdmin = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/leave-admin`,
        {}, { headers: { Authorization: "Bearer " + token } }
      );
      login(res.data.token);
      toast.success("Normal user ban gaye!");
    } catch (err) {
      toast.error("Failed!");
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#4C1D95]">My Profile</h1>
        <button onClick={() => { logout(); navigate("/"); }} className="bg-[#EC4899] text-white px-4 py-2 rounded hover:bg-pink-500">Logout</button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-[#4C1D95] mb-3">Account Info</h2>
        <p className="text-gray-700"><span className="font-medium">Name: </span>{userName}</p>
        <p className="text-gray-700"><span className="font-medium">Email: </span>{userEmail}</p>
        <p className="text-gray-700"><span className="font-medium">Role: </span>
          <span className={role === "admin" ? "text-[#EC4899] font-bold" : "text-gray-500"}>{role}</span>
        </p>
      </div>

      {role !== "admin" && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          {!showAdminForm ? (
            <button onClick={() => setShowAdminForm(true)} className="bg-[#4C1D95] text-white px-6 py-3 rounded-lg hover:bg-[#EC4899]">Become Admin</button>
          ) : (
            <div>
              <input type="password" value={adminKey} placeholder="Admin Password"
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]" />
              <div className="flex gap-3">
                <button onClick={handleBecomeAdmin} className="px-6 py-3 bg-[#EC4899] text-white rounded-lg hover:bg-pink-500">Confirm</button>
                <button onClick={() => { setShowAdminForm(false); setAdminKey(""); }} className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}

      {role === "admin" && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <button onClick={handleLeaveAdmin} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Leave Admin</button>
        </div>
      )}
      
      <h2 className="text-2xl font-bold text-[#4C1D95] mb-4">{role === "admin" ? "All Orders" : "Order History"}</h2>
      {orders.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No orders yet.</p>
      ) : orders.map((order) => (
        <div key={order._id} className="bg-white rounded-lg shadow p-4 mb-4">
          {role === "admin" && order.user && (
            <p className="text-sm font-medium text-[#4C1D95]">Customer: {order.user.name} ({order.user.email})</p>
          )}
          <p className="text-sm text-gray-500">ID: {order._id} | {order.status} | ${order.total}</p>
          <p className="text-sm text-gray-500 font-bold">Address: {order.address}</p>
          {order.products?.map((item, i) => (
            <div key={i} className="border-t py-2 text-gray-700">
              <p>{item.product?.name} - Qty: {item.quantity} - ${item.price}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Profile;
