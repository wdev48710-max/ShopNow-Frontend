import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import API_URL from "../api";
import { useCart } from "../context/CartContext";

const HomeBanner = () => (
  <div className="flex flex-col items-center justify-center gap-5">
    <h1 className="text-3xl md:text-4xl uppercase font-bold text-center text-darkColor">
      Best Product Collection
    </h1>
    <p className="text-sm text-center text-lightColor/80 font-medium max-w-[480px]">
      Find everything you need and shop the latest products at great prices
    </p>
  </div>
);

const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="group text-sm rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 overflow-hidden relative">
        <Link to={`/product/${product._id}`}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-72 object-contain overflow-hidden hoverEffect group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-72 flex items-center justify-center text-gray-400">No Image</div>
          )}
        </Link>
      </div>
      <div className="py-3 px-2 flex flex-col gap-1.5 bg-zinc-50 border border-t-0 rounded-lg rounded-tl-none rounded-tr-none">
        <h2 className="font-semibold line-clamp-1 text-darkColor">{product.name}</h2>
        <p className="text-sm text-lightColor font-semibold">${product.price}</p>
        <button
          onClick={() => onAdd(product)}
          className="w-full bg-transparent text-darkColor shadow-none border border-darkColor/30 font-semibold tracking-wide hover:text-white hover:bg-darkColor hoverEffect py-2 rounded-md"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <HomeBanner />
      <div className="mt-10">
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search products..."
            onInput={(e) => setSearch(e.target.value)}
            className="w-full max-w-md pt-2 pb-1 px-3 border border-darkColor rounded-lg bg-neutral-50 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-darkColor focus:ring-2 focus:ring-darkBlue/10 transition-all"
          />
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="animate-spin" />
              <span className="text-lg font-semibold">Products are loading...</span>
            </div>
          </div>
        ) : filtered.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-full">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} onAdd={addToCart} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
            <p className="text-lg font-semibold text-gray-600">
              {products.length === 0 ? "No products yet. Check back soon!" : "No product found!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;