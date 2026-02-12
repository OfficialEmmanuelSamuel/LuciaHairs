/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import api from "../../utils/api.js";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteId, setDeleteId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productsPerPage = 6;

  const baseURL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const cleanBase = baseURL.replace("/api", "");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/products/${selectedProduct._id}`, selectedProduct);
      toast.success("Product updated");
      fetchProducts();
      setSelectedProduct(null);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category)),
  ];

  const filteredProducts = products
    .filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((p) =>
      selectedCategory === "All"
        ? true
        : p.category === selectedCategory
    );

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  return (
    <div className="min-h-screen w-full mb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-xl px-4 py-2 w-72 focus:ring-2 focus:ring-pink-500 outline-none"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-pink-500"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          {/* Product Cards */}
          <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {currentProducts.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4"
              >
                <img
                  src={`${cleanBase}/${p.image}`}
                  alt={p.name}
                  className="w-full h-60 object-fit rounded-t-xl mb-4"
                />

                <h3 className="text-lg font-bold font-quicksand">{p.name}</h3>
                <p className="text-gray-500 text-sm mb-2 font-quicksand">
                  {p.category}
                </p>
                <p className="text-pink-600 font-semibold mb-4 font-quicksand">
                  ₦{p.price}
                </p>

                <div className="flex justify-between">
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className="flex items-center gap-1 bg-slate-600 text-white px-3 py-1 rounded-lg text-sm font-quicksand"
                  >
                    <Pencil size={16} /> Edit
                  </button>

                  <button
                    onClick={() => setDeleteId(p._id)}
                    className="flex items-center gap-1 bg-rose-800 text-white px-3 py-1 rounded-lg text-sm font-quicksand"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-pink-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-xl">
            <h2 className="text-lg font-bold mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete(deleteId);
                  setDeleteId(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide-In Edit Panel */}
      {selectedProduct && (
        <div className="fixed inset-0 flex justify-end z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={() => setSelectedProduct(null)}
          />

          <div className="relative bg-white w-96 h-full shadow-2xl p-6 overflow-y-auto">
            <h2 className="text-xl font-bold mb-6">
              Edit Product
            </h2>

            <input
              type="text"
              value={selectedProduct.name}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  name: e.target.value,
                })
              }
              className="border w-full mb-3 p-2 rounded-lg"
              placeholder="Name"
            />

            <input
              type="text"
              value={selectedProduct.category}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  category: e.target.value,
                })
              }
              className="border w-full mb-3 p-2 rounded-lg"
              placeholder="Category"
            />

            <input
              type="number"
              value={selectedProduct.price}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  price: e.target.value,
                })
              }
              className="border w-full mb-3 p-2 rounded-lg"
              placeholder="Price"
            />

            <textarea
              value={selectedProduct.description}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  description: e.target.value,
                })
              }
              className="border w-full mb-4 p-2 rounded-lg"
              placeholder="Description"
            />

            <div className="flex gap-3">
              <button
                onClick={handleUpdate}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
