import React, { useState, useEffect } from "react";
import api from "../utils/api.js";
import { getToken } from "../utils/auth.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [extraImages, setExtraImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    isHot: false,
    image: null,
  });

  const navigate = useNavigate();

  const dashBoard = () => navigate("/admin/dashboard");

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const addExtraImageInput = () => {
    setExtraImages([...extraImages, null]);
  };

  const handleExtraImageChange = (index, file) => {
    const updated = [...extraImages];
    updated[index] = file;
    setExtraImages(updated);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      toast.error("You must be logged in as admin!");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => fd.append(key, value));
      extraImages.forEach((file) => {
        if (file) fd.append("extraImages", file);
      });
      if (video) fd.append("video", video);

      await api.post("/products", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully!", { duration: 4000 });
      fetchProducts();
      setForm({
        name: "",
        price: "",
        description: "",
        category: "",
        isHot: false,
        image: null,
      });
      setExtraImages([]);
      setVideo(null);
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err.message);
      toast.error("Failed to add product!", { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-2">
      <div className="max-w-2xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-pink-700 font-nunito">
          Add Product
        </h1>
        <button
          onClick={dashBoard}
          className="bg-pink-700 text-white px-4 py-2 rounded-lg font-nunito hover:bg-pink-600 transition"
        >
          Dashboard
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl bg-white p-3 rounded-2xl shadow-lg space-y-6 mx-auto"
      >
        {/* PRODUCT DETAILS FIELDSET */}
        <fieldset className="border border-gray-300 rounded-xl p-6">
          <legend className="text-lg font-semibold font-nunito text-pink-700 px-2">
            Product Details
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 font-nunito rounded p-2 focus:ring-1 focus:ring-pink-400"
              required
            />
            <input
              name="price"
              placeholder="Price"
              value={form.price}
              type="number"
              onChange={handleChange}
              className="border border-gray-300 font-nunito rounded p-2 focus:ring-1 focus:ring-pink-400"
              required
            />
            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="border border-gray-300 rounded font-nunito p-2 focus:ring-1 focus:ring-pink-400"
            />
            <label className="flex items-center space-x-2 mt-1">
              <input
                type="checkbox"
                name="isHot"
                checked={form.isHot}
                onChange={handleChange}
              />
              <span className="font-nunito">Hot Product?</span>
            </label>
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="border border-gray-300 font-nunito rounded p-2 md:col-span-2 focus:ring-1 focus:ring-pink-400"
            />
          </div>
        </fieldset>

        {/* IMAGE FIELDSET */}
        <fieldset className="border border-gray-300 rounded-xl p-6">
          <legend className="text-lg font-semibold font-nunito text-pink-700 px-2">
            Product Images
          </legend>
          <div className="space-y-3 mt-4">
            <div>
              <label className="font-medium font-nunito">Main Image</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="border border-gray-300 font-nunito rounded p-2 w-full mt-2"
                required
              />
            </div>

            <div>
              <h4 className="font-medium mb-2 font-nunito">Additional Pictures</h4>
              {extraImages.map((_, index) => (
                <input
                  key={index}
                  type="file"
                  onChange={(e) =>
                    handleExtraImageChange(index, e.target.files[0])
                  }
                  className="border border-gray-300 font-nunito rounded p-2 mb-2 w-full"
                />
              ))}
              <button
                type="button"
                onClick={addExtraImageInput}
                className="text-sm text-pink-700 font-nunito hover:text-pink-500"
              >
                + Add More Pictures
              </button>
            </div>
          </div>
        </fieldset>

        {/* VIDEO FIELDSET */}
        <fieldset className="border border-gray-300 rounded-xl p-6">
          <legend className="text-lg font-semibold font-nunito text-pink-700 px-2">
            Product Video
          </legend>
          <div className="mt-4">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="border border-gray-300 font-nunito rounded p-2 w-full"
            />
          </div>
        </fieldset>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-700 to-pink-800 text-white font-nunito font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
