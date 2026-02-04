import React, { useEffect, useState } from "react";
import api from "../utils/api.js";
import Navbar from "../component/Navbar.jsx";
import Footer from "../component/Footer.jsx";
import { motion, AnimatePresence } from "framer-motion";

// ================= Purchase Page Component =================
function PurchasePage({ product, onBack, onConfirm }) {
  return (
    <div className="min-h-screen py-10 bg-gray-100 text-shadow-gray-900">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <button
          onClick={onBack}
          className="mb-6 text-pink-600 cursor-pointer hover:underline hover:underline-offset-6"
        >
          Back to shop
        </button>

        <div className="grid md:grid-cols-2 gap-10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-contain rounded-2xl shadow-lg"
          />

          <div className="space-y-5">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-white/70">{product.description}</p>
            <p className="text-2xl font-bold text-pink-400">₦{product.price}</p>

            <div className="mt-6 p-5 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-2">Company Bank Details</h3>
              <p>Bank: Zenith Bank</p>
              <p>Account Name: Luxury Hair Ltd</p>
              <p>Account Number: 1234567890</p>
            </div>

            <button
              onClick={onConfirm}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 py-3 font-semibold hover:brightness-110 transition"
            >
              I have made the payment
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// ================= Main Shopping Page =================
export default function Shopping() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("shop"); // shop | purchase
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    if (imagePath.startsWith("http")) return imagePath;
    return `${baseURL.replace("/api", "")}/${imagePath}`;
  };

  const openPurchasePage = (product) => {
    setSelectedProduct({ ...product, image: getImageUrl(product.image) });
    setView("purchase");
  };

  const confirmPayment = () => {
    alert("Thank you! Your payment will be verified shortly.");
    setView("shop");
    setSelectedProduct(null);
  };

  if (view === "purchase" && selectedProduct) {
    return (
      <PurchasePage
        product={selectedProduct}
        onBack={() => setView("shop")}
        onConfirm={confirmPayment}
      />
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      <div className="min-h-screen max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl py-14 font-bold text-center text-slate-800 mb-10">
          Available Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((p) => (
            <motion.div
              key={p._id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={getImageUrl(p.image)}
                alt={p.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-4 flex flex-col h-full">
                <h3 className="font-semibold text-sm mb-1">{p.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{p.category}</p>
                <p className="font-bold text-pink-600 mb-4">₦{p.price}</p>

                <button
                  onClick={() => openPurchasePage(p)}
                  className="rounded-xl bg-gradient-to-r from-pink-700 to-pink-600 text-white py-2 text-sm font-semibold hover:brightness-110 transition"
                >
                  Purchase
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
