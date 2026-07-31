import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { isAuth, logout, role } = useAuth();
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#4C1D95] text-white px-4 sm:px-6 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">ShopNow</Link>

        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden text-2xl focus:outline-none"
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>

        <div className="hidden sm:flex gap-5 items-center">
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
      </div>

      {open && (
        <div className="sm:hidden flex flex-col gap-3 mt-3 pb-2 border-t border-[#F3E8FF]/20 pt-3">
          <Link to="/" onClick={() => setOpen(false)} className="hover:text-[#F3E8FF]">Home</Link>
          <Link to="/cart" onClick={() => setOpen(false)} className="hover:text-[#F3E8FF]">
            Cart{totalItems > 0 ? " (" + totalItems + ")" : ""}
          </Link>
          {isAuth ? (
            <>
              {role === "admin" && (
                <Link to="/add-product" onClick={() => setOpen(false)} className="hover:text-[#F3E8FF]">Add Product</Link>
              )}
              <Link to="/profile" onClick={() => setOpen(false)} className="hover:text-[#F3E8FF]">Profile</Link>
              <button onClick={logout} className="bg-[#EC4899] px-3 py-1 rounded hover:bg-pink-500 text-left">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="hover:text-[#F3E8FF]">Login</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="bg-[#EC4899] px-3 py-1 rounded hover:bg-pink-500 text-center">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
