import React, { useEffect, useState } from "react";
import api from "../utils/api.js";

const HotProducts = () => {
  const [hotProducts, setHotProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => {
      const hot = res.data.filter((p) => p.isHot);
      setHotProducts(hot);
    });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-pink-700">🔥 Hot Products</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hotProducts.map((p) => (
          <div key={p._id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
            <img
              src={`http://localhost:5000/${p.image}`}
              alt={p.name}
              className="w-full h-56 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold text-lg">{p.name}</h3>
            <p className="text-gray-600 mb-2">{p.category}</p>
            <p className="font-bold text-pink-600">₦{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotProducts;