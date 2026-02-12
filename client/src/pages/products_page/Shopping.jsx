/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import api from "../../utils/api.js";
import Navbar from "../../component/Navbar.jsx";
import Footer from "../../component/Footer.jsx";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingCart,
  Star,
  X,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Shopping() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || [],
  );

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    if (imagePath.startsWith("http")) return imagePath;
    return `${baseURL.replace("/api", "")}/${imagePath}`;
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category === "All" ? true : p.category === category));

  // ================= CART FUNCTIONS =================

  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    toast.success(`${product.name} added to cart 🛒`);
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
    toast("Item removed", { icon: "🗑️" });
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // ================= RATING =================

  return (
    <div className="bg-gradient-to-br from-white via-pink-50 to-fuchsia-100 min-h-screen">
      <Navbar />

      {/* HEADER */}
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4 pt-24">
        <h1 className="text-xl font-bold bg-gradient-to-r from-gray-700 to-rose-400 bg-clip-text text-transparent font-playfair">
          Luxury Hair Collection
        </h1>

        {/* Cart Icon */}
        <button onClick={() => setCartOpen(true)} className="relative">
          <ShoppingCart size={28} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* SEARCH + CATEGORY */}
      <div className="max-w-6xl mx-auto px-4 mt-10 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex items-center bg-white rounded-xl px-4 py-2 shadow w-full md:w-2/3">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Dropdown */}
        <select
          className="bg-white rounded-xl px-4 py-2 shadow w-full md:w-1/3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* PRODUCTS */}
      <div className="mx-auto px-10 py-14 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:px-2">
        {filteredProducts.map((p) => (
          <motion.div
            key={p._id}
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl shadow-md overflow-hidden"
          >
            <img
              src={getImageUrl(p.image)}
              className="h-60 w-full object-cover lg:h-72"
            />

            <div className="p-6">
              <h3 className="font-bold font-quicksand">{p.name}</h3>
              {/* DESCRIPTION FROM DATABASE */}
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                {p.description}
              </p>
              <p className="text-gray-600 font-bold mb-4 font-quicksand">
                ₦{p.price}
              </p>

              <button
                onClick={() => addToCart(p)}
                className="w-full py-2 rounded-xl bg-pink-700 text-white font-semibold font-quicksand hover:bg-rose-800 transition"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= CART DRAWER ================= */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120 }}
            className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl z-50 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <X
                className="cursor-pointer"
                onClick={() => setCartOpen(false)}
              />
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 mb-6">
                    <img
                      src={getImageUrl(item.image)}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h4 className="font-semibold font-quicksand">{item.name}</h4>
                      <p className="text-pink-600 font-bold font-quicksand">₦{item.price}</p>

                      <div className="flex items-center gap-5 mt-5">
                        <Minus
                          size={25}
                          onClick={() => decreaseQty(item._id)}
                          className="cursor-pointer shadow-sm p-1"
                        />
                        <span>{item.quantity}</span>
                        <Plus
                          size={25}
                          onClick={() => increaseQty(item._id)}
                          className="cursor-pointer shadow-sm p-1"
                        />
                      </div>
                    </div>

                    <Trash2
                      size={18}
                      className="text-red-500 cursor-pointer"
                      onClick={() => removeItem(item._id)}
                    />
                  </div>
                ))}

                <div className="border-t pt-4 mt-6">
                  <h3 className="text-lg font-bold mb-4">
                    Total: ₦{totalPrice}
                  </h3>

                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-800 to-rose-500 text-white font-semibold">
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
