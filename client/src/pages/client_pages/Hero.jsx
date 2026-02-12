/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../../assets/images/luciana.PNG";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiRefreshCcw } from "react-icons/fi";
import { FaRegSmile } from "react-icons/fa";
import { LiaShippingFastSolid } from "react-icons/lia";
import { motion } from "framer-motion";
import { RxDoubleArrowDown } from "react-icons/rx";
import { PiHandbagFill } from "react-icons/pi";

const HeroFeatures = () => {
  // Variants for feature cards with stagger
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.3,
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    }),
  };

  return (
    <section className="relative w-full py-20 min-h-screen bg-gradient-to-b from-gray-300 to-rose-100 overflow-hidden flex flex-col justify-center items-center px-5 lg:px-20">
      {/* Floating background shapes */}
      <div className="hidden md:flex absolute top-10 left-0 w-50 h-50 bg-rose-500 rounded-full opacity-30 animate-pulse"></div>
      <div className="hidden md:flex absolute top-75 right-30 w-20 h-20 bg-rose-700 rounded-4xl opacity-30 animate-spin "></div>
      <div className="hidden md:flex absolute top-25 right-10 w-10 h-10 bg-rose-950 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-500 rounded-full opacity-20 animate-ping"></div>

      {/* Hero Main Section */}
      <div className="relative z-10 flex flex-col-reverse mt-10 lg:flex-row items-center w-full max-w-7xl gap-10">
        {/* Text Section */}
        <div className="flex-1 flex flex-col items-start text-white">
          <motion.p
            className="text-lg font-bold mb-3 bg-linear-to-r from-gray-900 to-rose-500 bg-clip-text text-transparent font-quicksand"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-rose-900">|</span> Own the look. Live the
            confidence!
          </motion.p>

          <motion.h1
            className="text-3xl lg:text-5xl font-extrabold mb-6 leading-relaxed font-nimbus bg-gradient-to-r from-gray-700 to-pink-600 bg-clip-text text-transparent"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover wigs that redefine beauty effortless, elegant, and uniquely
            you.
          </motion.h1>
        </div>

        {/* Hero Image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <img
            src={HeroImage}
            alt="Model with wig"
            className="rounded-full shadow-xl w-full max-w-md lg:max-w-lg object-cover"
          />
        </motion.div>
      </div>

      {/* Feature Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16 w-full max-w-7xl">
        {[
          {
            icon: (
              <IoMdCheckmarkCircleOutline className="h-8 w-8 text-white  mb-4 p-2 rounded-full bg-pink-700" />
            ),
            title: "Original Products",
            desc: "Money-back guarantee if the products are not original.",
          },
          {
            icon: (
              <FaRegSmile className="h-8 w-8 text-white mb-4 p-2 rounded-full bg-pink-700" />
            ),
            title: "Satisfaction Guarantee",
            desc: "If you're not delighted, we're here to make it right.",
          },
          {
            icon: (
              <FiRefreshCcw className="h-8 w-8 text-white mb-4 p-2 rounded-full bg-pink-700" />
            ),
            title: "New Arrival Everyday",
            desc: "We update our collection almost daily with the hottest picks.",
          },
          {
            icon: (
              <LiaShippingFastSolid className="h-8 w-8 text-white mb-4 p-2 rounded-full bg-pink-700" />
            ),
            title: "Free Standard Shipping",
            desc: "Fast and reliable shipping locally and internationally.",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl hover:-translate-y-1 transition"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >
            {card.icon}
            <h3 className="text-lg font-semibold mb-2 font-merienda">
              {card.title}
            </h3>
            <p className="text-sm font-quicksand font-medium">{card.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* About Section */}
      <motion.div
        className="text-center text-white mt-16 mb-30 max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <p className="text-lg uppercase mb-2 font-bold underline decoration-rose-500 underline-offset-4 text-gray-900 font-quicksand">
          About Our Wigs
        </p>
        <p className="text-lg font-quicksand font-medium mt-5 mb-10 text-gray-900">
          Discover our exclusive wig collection, designed to give you the
          perfect blend of style, quality, and comfort. Shop with us and enjoy
          premium wigs that make you look and feel your best.
        </p>
        {/* Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-40 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
        >
          <span className="bg-red-300 animate-bounce text-pink-700">
            <RxDoubleArrowDown size={30} />
          </span>
        </motion.div>
      </motion.div>

      <Link to="/shopping">
        <motion.button
          className="absolute flex items-center gap-5 bottom-10 left-1/2 -translate-x-1/2 bg-white text-pink-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 font-quicksand transition transform"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <PiHandbagFill size={25} /> SHOP NOW
        </motion.button>
      </Link>
    </section>
  );
};

export default HeroFeatures;
