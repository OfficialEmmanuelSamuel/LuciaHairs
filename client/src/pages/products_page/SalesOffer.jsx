import React, { useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useCart } from "../../context/cartContext";

// ================= Countdown Hook =================
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(getDiff(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getDiff(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function getDiff(target) {
  const now = Date.now();
  const t = new Date(target).getTime();
  const diff = Math.max(0, t - now);

  const sec = Math.floor(diff / 1000);
  return {
    days: Math.floor(sec / 86400),
    hours: Math.floor((sec % 86400) / 3600),
    minutes: Math.floor((sec % 3600) / 60),
    seconds: sec % 60,
  };
}

// ================= Offer Card =================
function OfferCard({ offer }) {
  const { addToCart } = useCart();
  const { days, hours, minutes, seconds } = useCountdown(offer.deadline);

  return (
    <div className="group relative overflow-hidden rounded-3xl shadow-xl bg-white transition hover:-translate-y-1 hover:shadow-2xl">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Discount Badge */}
        <span className="absolute top-4 right-4 bg-rose-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
          {offer.discount}% OFF
        </span>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>

        <p className="text-sm text-gray-500">{offer.type}</p>

        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-pink-600">
            ₦{offer.price.toLocaleString()}
          </span>
          <span className="text-sm line-through text-gray-400">
            ₦{offer.originalPrice.toLocaleString()}
          </span>
        </div>

        {/* Countdown */}
        <div className="flex gap-3 text-xs text-gray-600 pt-2">
          <span>{days}d</span>
          <span>{hours}h</span>
          <span>{minutes}m</span>
          <span>{seconds}s</span>
        </div>

        {/* CTA */}
        <button
          onClick={() => addToCart(offer)}
          className="w-full bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// ================= Main Component =================
export default function Sales() {
  // ✅ State for offers, loading, and errors
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch offers from backend API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/offers`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load offers");
        return res.json();
      })
      .then(setOffers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="sales-offer"
      className="min-h-screen py-24 px-4 bg-gradient-to-b from-rose-100 to-rose-100"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* ================= Header Text ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="inline-block bg-pink-700 text-white px-4 py-1 rounded-full text-xs tracking-widest uppercase font-quicksand">
            Limited-Time Offers
          </span>

          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-playfair font-light text-gray-900">
            Elevate Your Look,
          </h2>

          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-playfair font-semibold text-gray-900">
            Define Your Confidence
          </h2>

          <p className="text-gray-600 text-sm sm:text-base">
            Shop exclusive deals on premium wigs and hair products.
            Professionally curated, beautifully crafted, and offered for a
            limited time only.
          </p>

          <ul className="flex flex-col sm:flex-row justify-center gap-4 text-sm text-gray-700 pt-2">
            <li>
              <IoIosCheckmarkCircle
                size={20}
                className="inline mr-2 text-pink-700 font-quicksand"
              />
              Premium quality hair
            </li>
            <li>
              <IoIosCheckmarkCircle
                size={20}
                className="inline mr-2 text-pink-700 font-quicksand"
              />
              Transparent pricing
            </li>
            <li>
              <IoIosCheckmarkCircle
                size={20}
                className="inline mr-2 text-pink-700 font-quicksand"
              />
              Fast & secure delivery
            </li>
          </ul>
        </div>

        {/* ================= Offer Cards Grid ================= */}
        {/* Offer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-3xl h-72"
              />
            ))}

          {error && (
            <p className="text-center text-red-600 font-semibold">{error}</p>
          )}

          {!loading &&
            !error &&
            offers.map((offer) => <OfferCard key={offer._id} offer={offer} />)}
        </div>
      </div>
    </section>
  );
}
