import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from './../context/CartContext';
import API_URL from "../api";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios.get(`${API_URL}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center py-16 text-gray-500">Loading...</p>;
  if (!product) return <p className="text-center py-16 text-gray-500">Product not found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col md:flex-row">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full md:w-96 h-80 object-cover" />
        ) : (
          <div className="w-full md:w-96 h-80 bg-gray-200 flex items-center justify-center text-gray-400">No image</div>
        )}
        <div className="p-6 flex-1">
          <h1 className="text-3xl font-bold text-[#4C1D95] mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-[#EC4899] mb-4">${product.price}</p>
          <p className="text-gray-500 mb-2">{product.category}</p>
          <p className="text-gray-700 mb-2">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="px-6 py-3 bg-[#4C1D95] text-white rounded-lg hover:bg-[#EC4899] transition cursor-pointer"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
