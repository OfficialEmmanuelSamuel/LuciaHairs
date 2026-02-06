import React from "react";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { TbCurrencyNaira } from "react-icons/tb";

export default function PreorderCard({ item, phase, onPreorder }) {
  return (
    <motion.div
      key={item._id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl overflow-hidden bg-white/90 text-gray-900 shadow-md"
    >
      <div className="relative aspect-[4/4] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {item.badge && (
          <span className="absolute font-quicksand font-medium top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/80 text-white px-3 py-1 text-xs">
            <Gift className="h-3.5 w-3.5" /> {item.badge}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="leading-tight font-quicksand font-medium">{item.name}</h3>
        <div className="mt-1 text-sm text-gray-600 font-quicksand">Preorder price</div>
        <div className="text-sm font-bold flex items-center mt-2">
          <TbCurrencyNaira className="text-lg text-gray-800" />
          {item.price}
        </div>
        <div className="mt-4 flex gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={phase !== "open"}
            onClick={() => onPreorder?.(item)}
            className={`inline-flex flex-1 items-center justify-center rounded-xl px-4 py-2.5 cursor-pointer font-quicksand font-semibold shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/40 ${
              phase === "open"
                ? "bg-gray-900 text-white hover:bg-pink-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {phase === "open" ? "Preorder now" : "Opens soon"}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            className="sm:inline-flex items-center justify-center rounded-xl px-4 py-2.5 font-medium font-quicksand border border-gray-300 text-gray-900 hover:bg-gray-50"
          >
            Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
