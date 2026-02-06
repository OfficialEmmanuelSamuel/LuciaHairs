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
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/preorders`, {
        method: "POST",
        body: formData,
      });
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item Name"
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="text"
        value={badge}
        onChange={(e) => setBadge(e.target.value)}
        placeholder="Badge (optional)"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
        className="w-full"
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
      >
        {loading ? "Uploading..." : "Upload Preorder"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>}
    </form>
  );
}
