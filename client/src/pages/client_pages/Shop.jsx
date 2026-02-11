/* eslint-disable no-unused-vars */
import React from "react";
import Wigs from "../../assets/images/IMG_1082.PNG";
import Frontals from "../../assets/images/IMG_1088.PNG";
import Bundles from "../../assets/images/IMG_1086.PNG";
import Clipsin from "../../assets/images/IMG_1085.PNG";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const products = [
  { name: "Wigs", img: Wigs, link: "/Shopping", gradient: "from-purple-400 via-gray-700 to-pink-100" },
  { name: "Frontals", img: Frontals, link: "/Shopping", gradient: "from-rose-900 via-gray-700 to-rose-400" },
  { name: "Bundles", img: Bundles, link: "/Shopping", gradient: "from-sky-900 via-gray-700 to-pink-400" },
  { name: "Clip-ins", img: Clipsin, link: "/Shopping", gradient: "from-teal-900 via-gray-700 to-rose-400" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, type: "spring", stiffness: 60 },
  }),
};

const Shop = () => {
  return (
    <section className="min-h-screen flex flex-col items-center bg-linear-to-b from-rose-100 to-gray-100 p-5 gap-12 w-full">
      
      {/* Header */}
      <motion.div
        className="max-w-3xl text-center mb-10 mt-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="text-xl font-bold font-quicksand text-gray-900 mb-3">
          TREAT YOURSELF TO TRUE LUXURY
        </h3>
        <p className="font-quicksand font-medium text-lg text-gray-700 md:text-xl">
          Our luxury hair extensions are sourced from the best vendors. Our frontals and closures are sleek, undetectable, and durable. Verified by notable hair stylists and celebrities.
        </p>
      </motion.div>

      {/* Collection Title */}
      <motion.h3
        className="text-xl font-bold font-quicksand text-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        OUR COLLECTION
      </motion.h3>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {products.map((product, i) => (
          <motion.div
            key={product.name}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 h-96 sm:h-80 md:h-96"
          >
            {/* Image */}
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${product.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-500`}
            ></div>

            {/* Text & Link */}
            <div className="absolute bottom-6 left-6">
              <motion.p
                className="text-lg font-semibold text-white font-quicksand"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {product.name}
              </motion.p>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  to={product.link}
                  className="text-sm rounded-lg font-bold font-quicksand underline underline-offset-2 text-white hover:text-rose-500 transition-colors duration-300"
                >
                  SHOP NOW
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Shop;
