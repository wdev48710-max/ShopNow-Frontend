import { Link } from "react-router-dom";

const socialIcons = [
  { d: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" },
  { d: "M12 2c2.72 0 3.06.01 4.13.06 1.07.05 1.8.22 2.44.46.66.25 1.22.59 1.77 1.14.55.55.89 1.11 1.14 1.77.24.64.41 1.37.46 2.44.05 1.07.06 1.41.06 4.13s-.01 3.06-.06 4.13c-.05 1.07-.22 1.8-.46 2.44a4.9 4.9 0 0 1-1.14 1.77c-.55.55-1.11.89-1.77 1.14-.64.24-1.37.41-2.44.46-1.07.05-1.41.06-4.13.06s-3.06-.01-4.13-.06c-1.07-.05-1.8-.22-2.44-.46a4.9 4.9 0 0 1-1.77-1.14 4.9 4.9 0 0 1-1.14-1.77c-.24-.64-.41-1.37-.46-2.44C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.13c.05-1.07.22-1.8.46-2.44.25-.66.59-1.22 1.14-1.77a4.9 4.9 0 0 1 1.77-1.14c.64-.24 1.37-.41 2.44-.46C8.94 2.01 9.28 2 12 2zm0 3.31a6.69 6.69 0 1 0 0 13.38 6.69 6.69 0 0 0 0-13.38zm0 11.04a4.35 4.35 0 1 1 0-8.7 4.35 4.35 0 0 1 0 8.7zm6.93-11.31a1.56 1.56 0 1 1-3.12 0 1.56 1.56 0 0 1 3.12 0z" },
  { d: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93zm-1.29 19.5h2.04L6.49 3.24H4.3z" },
  { d: "M21.59 7.19c-.25-1.26-1-2.03-2.28-2.28C17.56 4.55 12 4.55 12 4.55s-5.56 0-7.31.36C3.41 5.16 2.66 5.93 2.41 7.19 2.05 8.94 2.05 12.5 2.05 12.5s0 3.56.36 5.31c.25 1.26 1 2.03 2.28 2.28 1.75.36 7.31.36 7.31.36s5.56 0 7.31-.36c1.28-.25 2.03-1.02 2.28-2.28.36-1.75.36-5.31.36-5.31s0-3.56-.36-5.31zM9.98 15.59V9.41l5.06 3.09z" },
];

const FooterTop = () => (
  <div className="border-b py-6 flex flex-col md:flex-row items-center justify-between gap-4">
    <p className="text-sm text-gray-600">Free shipping on orders over $120</p>
    <p className="text-sm text-gray-600">30-day return policy</p>
  </div>
);

const Footer = () => {
  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/cart", label: "Cart" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <footer className="bg-white border-t">
      <div className="max-w-screen-xl mx-auto px-4">
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-darkColor hoverEffect">
              ShopNow
            </Link>
            <p className="text-gray-600 text-sm">Your one-stop shop for the latest products.</p>
            <div className="flex items-center gap-3">
              {socialIcons.map((icon, i) => (
                <Link key={i} to="#" className="p-2 border border-darkColor/60 rounded-full hover:border-darkColor hover:text-darkColor hoverEffect">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-darkColor/60">
                    <path d={icon.d} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-darkColor mb-4">Quick Links</h3>
            <div className="flex flex-col gap-3">
              {quickLinks.map((item) => (
                <Link key={item.to} to={item.to} className="text-gray-600 hover:text-darkColor text-sm font-medium hoverEffect">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-darkColor mb-4">Contact</h3>
            <div className="flex flex-col gap-3 text-gray-600 text-sm font-medium">
              <p>support@shopnow.com</p>
              <p>+92 300 1234567</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-darkColor mb-4">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">Subscribe to receive updates and exclusive offers.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full pt-2 pb-1 px-3 border border-darkColor rounded-lg bg-neutral-50 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-darkBlue/10 transition-all"
              />
              <button type="submit" className="w-full bg-darkColor text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;