import { useState } from "react";
import toast from "react-hot-toast";


export default function AdminOfferForm() {
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    data.append("image", image);

    await fetch(`${import.meta.env.VITE_API_BASE_URL}/offers`, {
      method: "POST",
      body: data,
    });

    toast.success("Offer uploaded successfully");
  };

  return (
    <form onSubmit={submitHandler} className="max-w-xl space-y-4">
      <input
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Type"
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        type="number"
        placeholder="Original Price"
        onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
      />
      <input
        type="number"
        placeholder="Discount %"
        onChange={(e) => setForm({ ...form, discount: e.target.value })}
      />
      <input
        type="date"
        onChange={(e) => setForm({ ...form, deadline: e.target.value })}
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button className="bg-black text-white px-4 py-2 rounded">
        Upload Offer
      </button>
    </form>
  );
}
