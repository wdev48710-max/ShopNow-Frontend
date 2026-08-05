import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ListOrdered, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { isAuth, logout, role } = useAuth();
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  const menuLinks = [
    { to: "/", label: "Home" },
    { to: "/cart", label: "Cart" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <header className="border-b border-b-gray-400 py-5 sticky top-0 z-50 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between gap-7 text-lightColor">
        {/* Mobile menu button */}
        <div className="w-auto md:w-1/3 md:hidden">
          <button onClick={() => setOpen(!open)} aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

        {/* Left: nav links */}
        <div className="hidden md:inline-flex w-1/3 items-center gap-5 text-sm capitalize font-semibold">
          {menuLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="hover:text-darkColor hoverEffect relative group"
            >
              {item.label}
            </Link>
          ))}
          {isAuth && role === "admin" && (
            <Link to="/add-product" className="hover:text-darkColor hoverEffect">
              Add Product
            </Link>
          )}
        </div>

        {/* Center: logo */}
        <div className="w-auto md:w-1/3 flex items-center justify-center gap-2.5">
          <Link to="/" className="text-2xl font-bold text-darkColor hoverEffect">
            ShopNow
          </Link>
        </div>

        {/* Right: cart + auth */}
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <Link to="/cart" className="group relative">
            <ShoppingBag className="w-5 h-5 group-hover:text-darkColor hoverEffect" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          {isAuth ? (
            <>
              <Link to="/profile" className="hidden sm:flex items-center gap-2 hover:text-darkColor hoverEffect">
                <User className="w-4 h-4" />
                <span className="text-sm font-semibold">Profile</span>
              </Link>
              <button onClick={logout} title="Logout">
                <LogOut className="w-4 h-4 hover:text-red-600 hoverEffect" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-semibold hover:text-darkColor hoverEffect">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-darkColor text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden mt-4 border-t border-gray-200 pt-3 pb-2 px-4 bg-white flex flex-col gap-3">
          {menuLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-gray-600 hover:text-darkColor"
            >
              {item.label}
            </Link>
          ))}
          {isAuth && role === "admin" && (
            <Link to="/add-product" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-600 hover:text-darkColor">
              Add Product
            </Link>
          )}
          {isAuth ? (
            <button onClick={() => { logout(); setOpen(false); }} className="text-sm font-medium text-red-600 text-left">
              Logout
            </button>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-600 hover:text-darkColor">
                Login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)} className="text-sm font-semibold text-darkColor hover:text-blue-600">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;