import React, { useEffect, useState } from "react";
import OfferImage from "../assets/images/IMG_1363.jpg";
import Offer from "../component/OfferLink";

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

function TimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center px-3">
      <span className="text-[10px] text-white/60 uppercase">{label}</span>
      <span className="text-xl font-bold text-white tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
    </div>
  );
}

// ================= Main Component =================
export default function Sales() {
  const { days, hours, minutes, seconds } = useCountdown("2026-02-01T00:00:00"); // change date

  return (
    <section className="flex items-center min-h-screen py-20 px-4 bg-gradient-to-b from-rose-100  to-gray-100"  id="sales-offer">
      <div className="relative max-w-6xl mx-auto overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-b from-slate-900  to-amber-900">

        {/* Floating discount badge */}
        <div className="absolute top-6 font-quicksand right-6 z-20 bg-gradient-to-r from-pink-700 to-pink-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-xl animate-bounce">
          15% OFF
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

          {/* Text section */}
          <div className="p-8 sm:p-12 lg:p-16 text-white space-y-6">

            <span className="inline-block bg-white/10 px-4 py-1 rounded-full text-xs tracking-widest uppercase">
              Limited Offer
            </span>

            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-playfair font-light">
              Unlock Your
            </h2>
            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-playfair font-semibold">
              True Beauty
            </h2>

            <p className="text-white/70 text-sm">
              15% OFF Curly Wigs — Use code <span className="font-bold text-white font-quicksand">LH-CURLY</span>
            </p>

            {/* Countdown inside section */}
            <div className="flex gap-4 pt-2">
              <TimeBox value={days} label="Days" />
              <TimeBox value={hours} label="Hours" />
              <TimeBox value={minutes} label="Minutes" />
              <TimeBox value={seconds} label="Seconds" />
            </div>

            <div className="mt-6 font-quicksand inline-flex items-center justify-center rounded-xl  px-1 py-1 shadow-sm shadow-gray-400 font-semibold  hover:brightness-110 transition">
              <Offer />
            </div>
          </div>

          {/* Image section */}
          <div className="relative h-full min-h-[300px] lg:min-h-full">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10" />
            <img
              src={OfferImage}
              alt="Curly Wig Offer"
              className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
