import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import API_URL from "../api";

const AddProduct = () => {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
    .then((res) => setProducts(res.data.products || res.data))
    .catch((err) => console.log(err));
  },[]);

const handleDelete = (id) => {
  axios.delete(`${API_URL}/api/products/${id}`, {
    headers: { Authorization: "Bearer " + token }
  })
  .then(() => {
    toast.success("Product Deleted!"); // P capital kar diya (optional)
    setProducts(products.filter((p) => p.id !== id));
  })
  .catch(() => {
    toast.error("Failed to delete!");
  });
};
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) return toast.error("Name and price are required!");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      if (description) formData.append("description", description);
      if (category) formData.append("category", category);
      if (image) formData.append("image", image);

      await axios.post(`${API_URL}/api/products`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Product added!");
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage(null);
      axios.get(`${API_URL}/api/products`)
        .then((res) => setProducts(res.data.products || res.data));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#4C1D95] mb-6">Product Management</h1>

      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <h2 className="text-xl font-semibold text-[#4C1D95] mb-4">All Products ({products.length})</h2>
        {products.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No products yet.</p>
        ) : (
          products.map((p) => (
            <div key={p._id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg mb-2 border border-gray-200">
              {p.image ? (
                <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded" />
              ) : (
                <div className="w-14 h-14 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">No img</div>
              )}
              <div className="flex-1">
                <p className="font-semibold text-[#4C1D95]">{p.name}</p>
                <p className="text-sm text-gray-500">${p.price} || {p.category}</p>
              </div>
              <button
                onClick={() => handleDelete(p._id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-[#4C1D95] mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            placeholder="Product Name"
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]"
          />
          <input
            value={price}
            placeholder="Price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]"
          />
          <input
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]"
          />
          <input
            value={category}
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#4C1D95]"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full mb-6"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#EC4899] text-white font-semibold rounded-lg hover:bg-pink-500 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
