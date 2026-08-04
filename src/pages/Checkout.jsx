import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API_URL from "../api";

const Checkout = () => {
  const { token } = useAuth();
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!token) return toast.error("Please login first!");
    if (cart.length === 0) return toast.error("Cart is empty!");
    if (!address) return toast.error("Please enter delivery address!");
    setLoading(true);

    try {
      const products = cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      }));

      await axios.post(
        `${API_URL}/api/orders`,
        { products, total: totalPrice, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success("Order placed!");
      clearCart();
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Order failed!");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-darkColor mb-6">Checkout</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-400 py-16">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow p-4 mb-4 flex items-center gap-4">
              {item.image && <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded shrink-0" />}
              <p className="flex-1 text-darkColor wrap-break-word">{item.name} x{item.quantity}</p>
              <p className="font-bold text-darkBlue">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Delivery Address"
            className="w-full px-4 py-3 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-darkBlue"
            rows="3"
          />
          <div className="text-right mt-6">
            <p className="text-2xl font-bold text-darkColor mb-4">Total: ${totalPrice.toFixed(2)}</p>
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="px-8 py-3 bg-darkBlue text-white rounded-lg hover:bg-lightBlue disabled:opacity-50"
            >
              {loading ? "Placing..." : "Place Order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
