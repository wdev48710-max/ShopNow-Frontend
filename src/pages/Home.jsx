import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../api";
import { useCart } from "../context/CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);
  

  const filtered = products.filter((p) =>
   p.name.toLowerCase().includes(search.toLowerCase()),
  )
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-4xl font-bold text-[#4C1D95] mb-2">
          Welcome to ShopNow
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Discover amazing products at great prices
        </p>
        <input
          type="text"
          placeholder="Search"
          onInput={(e) => setSearch(e.target.value)}
          className="mt-5 w-full max-w-md mx-auto block pt-2 pb-1 px-3 border border-[#4C1D95] rounded-lg bg-neutral-50 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#4C1D95] focus:ring-2 focus:ring-[#4C1D95]/10 transition-all"
        />
      </div>
      {products.length === 0 ? (
        <p className="text-center text-gray-400 py-16">
          No products yet. Check back soon!
        </p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-16">No product found!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <Link to={`/product/${product._id}`}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </Link>
              <div className="p-4">
                <Link to={`/product/${product._id}`}>
                  <h3 className="text-lg font-semibold text-[#4C1D95] hover:text-[#EC4899]">
                    {product.name}
                  </h3>
                  <p className="text-xl font-bold text-[#EC4899] mt-1">
                    ${product.price}
                  </p>
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 w-full bg-[#4C1D95] text-white py-2 rounded-lg hover:bg-[#EC4899] transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
