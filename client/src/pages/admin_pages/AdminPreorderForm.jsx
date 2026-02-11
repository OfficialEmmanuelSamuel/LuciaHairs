/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AdminPreorderForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [badge, setBadge] = useState("");
  const [image, setImage] = useState(null);
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return setError("Please upload an image");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("badge", badge);
    formData.append("image", image);
    formData.append("deadline", deadline);

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/preorders`,
        {
          method: "POST",
          body: formData,
        },
      );
      if (!res.ok) throw new Error("Failed to upload preorder");
      const data = await res.json();
      setSuccess("Preorder uploaded successfully!");
      toast.success("Preorder uploaded successfully!");
      // reset form
      setName("");
      setPrice("");
      setBadge("");
      setImage(null);
      setDeadline("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen py-14 border-2 px-2 flex flex-col items-center justify-center">
      <div className="w-full lg:w-3xl sm:w-xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-pink-700 font-nunito">
          ADD PREORDER PRODUCT
        </h1>
        <button
          onClick={() => toast.success("BuildUp in  Progress")}
          className="bg-pink-700 text-white px-4 py-2 rounded-lg font-nunito hover:bg-pink-600 transition"
        >
          MENU
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
         className="w-full lg:w-3xl sm:w-xl flex flex-col items-center justify-center space-y-4 shadow-sm p-5 font-medium font-quicksand"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item Name"
          className="shadow-sm shadow-gray-600 p-3 w-full outline-none rounded-lg focus:ring focus:ring-rose-300"
          required
        />
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="shadow-sm shadow-gray-600 p-3 w-full outline-none rounded-lg focus:ring focus:ring-rose-300"
          required
        />
        <input
          type="text"
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          placeholder="Badge (optional)"
          className="shadow-sm shadow-gray-600 p-3 w-full outline-none rounded-lg focus:ring focus:ring-rose-300"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="shadow-sm shadow-gray-600 p-3 w-full outline-none rounded-lg focus:ring focus:ring-rose-300"
          required
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="shadow-sm shadow-gray-600 p-3 w-full outline-none rounded-lg focus:ring focus:ring-rose-300"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-60 h-10 bg-gradient-to-r from-pink-700 to-pink-800 text-white font-nunito font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition disabled:opacity-50 sm:mt-13 sm:ml-20 lg:ml-2 lg:mt-5"
        >
          {loading ? "Uploading Product..." : "Upload Product"}
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}
        {success && <p className="text-green-600 mt-2">{success}</p>}
      </form>
    </section>
  );
}
