import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#4C1D95] mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-400 py-16">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow p-4 mb-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-4">
                {item.image && <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />}
                <div className="flex-1">
                  <h3 className="font-semibold text-[#4C1D95]">{item.name}</h3>
                  <p className="text-[#EC4899] font-bold">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 flex-1">
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1) || navigate('/home')} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                </div>
                <p className="font-bold text-[#4C1D95]">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:underline">Remove</button>
              </div>
            </div>
          ))}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 mt-6">
            <p className="text-2xl font-bold text-[#4C1D95] text-right">Total: ${totalPrice.toFixed(2)}</p>
            <div className="flex gap-3 sm:ml-4">
              <button onClick={clearCart} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Clear Cart</button>
              <button onClick={() => navigate("/checkout")} className="px-6 py-2 bg-[#EC4899] text-white rounded hover:bg-pink-500">Proceed to Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;