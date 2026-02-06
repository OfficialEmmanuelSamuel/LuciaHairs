import React, { useEffect, useState } from "react";
import api from "../../utils/api.js";
import Navbar from "../../component/Navbar.jsx";
import Footer from "../../component/Footer.jsx";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getToken, logout } from "../../utils/auth.js";
import toast from "react-hot-toast";
import { IoBarChart } from "react-icons/io5";

const BarChart = IoBarChart;

const AdminDashboard = ({ onLogout }) => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  const baseURL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  const cleanBase = baseURL.replace("/api", "");

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onLogout();
    navigate("/admin/login"); // ✅ go straight to login page
  };

  const token = getToken();

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await api.put(`/products/${id}`, formData);
      toast.success("Product updated successfully!");
      fetchProducts();
      setEditingProduct(null);
    } catch (err) {
      console.error("Error updating:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Failed to update product.");
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setFormData({ name: "", price: "", description: "", category: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ navigate to AddProduct page
  const handleAddProduct = () => {
    navigate("/admin/products");
  };

  const handleOfferStats = () => {
    navigate("/admin/offer-stats");
  }

  const handlePreorderProduct = () => {
    navigate("/admin/preorders");
  };

  const handleSalesOfferProduct = () => {
    navigate("/admin/offer-products");
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen mt-16">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-700 font-nunito text-center sm:text-left">
            Admin Dashboard — Manage Products
          </h2>

          <div className="flex flex-wrap justify-center sm:justify-end gap-3">
            <div>
              <span className="text-sm text-gray-500">Add Product</span>
            </div>
            
            <button
              onClick={handleAddProduct}
              className="border border-slate-200 text-slate-900 font-bold font-nunito py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-100 transition"
            >
              <Plus size={18} /> All Products
            </button>

            <button
              onClick={handlePreorderProduct}
              className="border border-slate-200 text-slate-900 font-bold font-nunito py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-100 transition"
            >
              <Plus size={18} /> Pre-Order Products
            </button>

            <button
              onClick={handleSalesOfferProduct}
              className="border border-slate-200 text-slate-900 font-bold font-nunito py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-100 transition"
            >
              <Plus size={18} /> Offer Sales Products
            </button>

            <button
              onClick={handleOfferStats}
              className="border border-slate-200 text-slate-900 font-bold font-nunito py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-100 transition"
            >
              <BarChart size={18} /> Offer Stats
            </button>

            <button
              onClick={handleLogout}
              className="bg-rose-700 text-white px-4 py-2 rounded-lg hover:bg-rose-800 transition font-nunito font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-pink-600 text-white text-left">
              <tr>
                <th className="py-3 px-4 font-nunito font-bold">Image</th>
                <th className="py-3 px-4 font-nunito">Name</th>
                <th className="py-3 px-4 font-nunito">Category</th>
                <th className="py-3 px-4 font-nunito">Price (₦)</th>
                <th className="py-3 px-4 font-nunito">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="odd:bg-yellow-100 even:bg-white">
                  <td className="py-2 px-4">
                    <img
                      src={`${cleanBase}/${p.image}`}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-4 font-semibold font-nunito">
                    {p.name}
                  </td>
                  <td className="py-2 px-4 font-nunito">{p.category}</td>
                  <td className="py-2 px-4 font-nunito">₦{p.price}</td>
                  <td className="py-2 px-4 font-nunito">
                    {editingProduct === p._id ? (
                      <div className="flex flex-col space-y-2">
                        <input
                          type="text"
                          name="name"
                          placeholder="Product Name"
                          value={formData.name}
                          onChange={handleChange}
                          className="border border-pink-100 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-pink-500"
                        />
                        <input
                          type="text"
                          name="category"
                          placeholder="Category"
                          value={formData.category}
                          onChange={handleChange}
                          className="border border-pink-100 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-pink-500"
                        />
                        <input
                          type="number"
                          name="price"
                          placeholder="Price"
                          value={formData.price}
                          onChange={handleChange}
                          className="border border-pink-100 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-pink-500"
                        />
                        <textarea
                          name="description"
                          value={formData.description}
                          placeholder="Description"
                          onChange={handleChange}
                          className="border border-pink-100 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-pink-500"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdate(p._id)}
                            className="bg-pink-600 hover:bg-pink-700 font-nunito text-white font-medium py-2 px-8 rounded-sm flex items-center gap-2"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="bg-slate-600 font-nunito hover:bg-slate-700 text-white font-medium py-2 px-8 rounded-sm flex items-center gap-2"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-10">
                        <button
                          onClick={() => handleEdit(p)}
                          className="flex items-center text-white gap-2 bg-slate-600 py-1 px-5 rounded-sm"
                        >
                          <Pencil size={18} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="flex items-center text-white gap-2 bg-red-600 py-1 px-5 rounded-sm"
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
