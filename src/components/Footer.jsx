import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#4C1D95] text-white mt-8">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-xl mb-3">ShopNow</h3>
          <p className="text-[#F3E8FF] text-sm">Your one-stop e-commerce store. Quality products, fast delivery.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-[#F3E8FF]">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/cart" className="hover:text-white">Cart</Link>
            <Link to="/profile" className="hover:text-white">Profile</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-[#F3E8FF] text-sm">Email: support@shopnow.com</p>
          <p className="text-[#F3E8FF] text-sm">Phone: +92 300 1234567</p>
        </div>
      </div>
      <div className="border-t border-[#F3E8FF]/20 text-center py-4 text-sm text-[#F3E8FF]">
        &copy; 2026 ShopNow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
