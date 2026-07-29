import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { isAuth, logout, role } = useAuth();
  const { totalItems } = useCart();
  
  return (
    <nav className="bg-[#4C1D95] text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">ShopNow</Link>
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-[#F3E8FF]">Home</Link>
        <Link to="/cart" className="hover:text-[#F3E8FF]">
          Cart{totalItems > 0 ? " (" + totalItems + ")" : ""}
        </Link>
        {isAuth ? (
          <>
            {role === "admin" && (
              <Link to="/add-product" className="hover:text-[#F3E8FF]">Add Product</Link>
            )}
            <Link to="/profile" className="hover:text-[#F3E8FF]">Profile</Link>
            <button onClick={logout} className="bg-[#EC4899] px-3 py-1 rounded hover:bg-pink-500">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-[#F3E8FF]">Login</Link>
            <Link to="/register" className="bg-[#EC4899] px-3 py-1 rounded hover:bg-pink-500">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
