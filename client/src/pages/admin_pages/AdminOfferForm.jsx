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
    <section className="min-h-screen py-14 border-2 px-2 flex flex-col items-center justify-center">
      <div className="w-full lg:w-3xl sm:w-xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-pink-700 font-nunito">
          ADD OFFER SALES PRODUCT
        </h1>
        <button
          onClick={()=> toast.success("BuildUp in Progress")}
          className="bg-pink-700 text-white px-4 py-2 rounded-lg font-nunito hover:bg-pink-600 transition"
        >
          MENU
        </button>
      </div>
      <form
        onSubmit={submitHandler}
        className="w-full lg:w-3xl sm:w-xl flex flex-col items-center justify-center space-y-4 shadow-sm p-5 font-medium font-quicksand"
      >
        <input
          placeholder="Title"
          className="shadow-sm shadow-gray-600 p-3 w-full outline-none rounded-lg focus:ring focus:ring-rose-300"
          required
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Type"
          className="shadow-sm shadow-gray-600 p-3 w-full outline-none rounded-lg focus:ring focus:ring-rose-300"
          required
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="shadow-sm shadow-gray-600 p-3 w-full outline-none rounded-lg focus:ring focus:ring-rose-300"
          required
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Original Price"
          className="shadow-sm shadow-gray-600 p-3 w-full outline-none rounded-lg focus:ring focus:ring-rose-300"
          required
          onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Discount %"
          className="shadow-sm shadow-gray-600 p-3 w-full outline-none rounded-lg focus:ring focus:ring-rose-300"
          required
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
        />
        <input
          type="date"
          className="shadow-sm shadow-gray-600 p-3 w-full outline-none rounded-lg focus:ring focus:ring-rose-300"
          required
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
        />
        <input
          type="file"
          className="shadow-sm shadow-gray-600 p-3 w-full outline-none rounded-lg focus:ring focus:ring-rose-300"
          required
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button className="w-60 h-10 bg-gradient-to-r from-pink-700 to-pink-800 text-white font-nunito font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition disabled:opacity-50 sm:mt-13 sm:ml-20 lg:ml-2 lg:mt-5">
          Upload Product
        </button>
      </form>
    </section>
  );
}
