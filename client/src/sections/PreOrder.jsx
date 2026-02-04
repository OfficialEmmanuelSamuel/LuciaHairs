import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Gift, Sparkles, CheckCircle2 } from "lucide-react";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaShippingFast } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { PiHandbagFill } from "react-icons/pi";



/**
 * PreorderSection — drop-in preorder hero with live countdown.
 *
 * Tailwind is assumed to be available in your project.
 * You can paste this component into any React app.
 *
 * Props:
 * - start: string | Date  — when preorders open
 * - end: string | Date    — when preorders close
 * - items: Array<{ id:string, name:string, price:string, image:string, badge?:string }>
 * - onPreorder ? : (itemId: string) => void
 * - onNotify ? : (email: string) => void
 */

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState(() => calculateDiff(target));

  useEffect(() => {
    if (!target) return; // safety check

    const timer = setInterval(() => {
      setTimeLeft(calculateDiff(target));
    }, 1000);

    return () => clearInterval(timer);
  }, [target]);

  return timeLeft;
}

function calculateDiff(target) {
  if (!target) return { ms: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

  const t = new Date(target).getTime();
  const n = Date.now();
  const ms = Math.max(0, t - n);
  const sec = Math.floor(ms / 1000);

  const days = Math.floor(sec / (60 * 60 * 24));
  const hours = Math.floor((sec % (60 * 60 * 24)) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  return { ms, days, hours, minutes, seconds };
}

function TimeBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center px-2">
      <span className="bg-linear-to-r from-pink-950 to-rose-950 bg-clip-text text-transparent">{label}</span>
      <div className="rounded-lg flex items-center justify-center bg-linear-to-r from-pink-950 to-rose-950 bg-clip-text text-transparent font-quicksand mt-1 shadow-sm shadow-gray-500 w-13 h-13 px-2 py-2 text-2xl font-bold tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
    </div>
  );
}

export default function PreorderSection({
  start = new Date("2026-01-10T10:00:00"),
  end = new Date("2026-02-27T24:00:00"),

  items = [
    {
      id: "body-wave-2",
      name: 'Body Wave 24" Lace Front Wig',
      price: "328,500",
      image: "../src/assets/images/home_pic_3.jpg",
      badge: "Best Seller",
    },
    {
      id: "deep-curly-2",
      name: 'Deep Curly 26" HD Lace',
      price: "403,500",
      image: "../src/assets/images/home_pic_1.jpg",
      badge: "New",
    },
    {
      id: "deep-curly-28",
      name: 'Deep Curly 20" HD Lace',
      price: "403,500",
      image: "../src/assets/images/wig_sample.jpg",
      badge: "New",
    },
    {
      id: "body-wave-24",
      name: 'Body Wave 24" Lace Front Wig',
      price: "328,500",
      image: "../src/assets/images/home_pic_3.jpg",
      badge: "Best Seller",
    },
    {
      id: "deep-curly-26",
      name: 'Deep Curly 26" HD Lace',
      price: "403,500",
      image: "../src/assets/images/home_pic_1.jpg",
      badge: "New",
    },
    {
      id: "deep-curly-20",
      name: 'Deep Curly 20" HD Lace',
      price: "403,500",
      image: "../src/assets/images/wig_sample.jpg",
      badge: "New",
    },
  ],
  onPreorder,
  onNotify,
}) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const now = Date.now();
  const phase = now < startDate ? "before" : now > endDate ? "after" : "open";

  const { days, hours, minutes, seconds } = useCountdown(
    phase === "before" ? startDate : endDate
  );

  const headline = {
    before: "Preorders open in",
    open: "Preorders end in",
    after: "Preorders closed",
  }[phase];

  const subline =
    phase === "before"
      ? `Opens ${startDate.toLocaleString()}`
      : phase === "open"
      ? `Closes ${endDate.toLocaleString()}`
      : `Ended ${endDate.toLocaleString()}`;

  const percent = (() => {
    const total = endDate.getTime() - startDate.getTime();
    const done = Math.min(Math.max(Date.now() - startDate.getTime(), 0), total);
    return total > 0 ? (done / total) * 100 : 0;
  })();

  return (
    <section
      id="preorder"
      className="relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-200 to-rose-50" />
      <div
        className="absolute -z-10 inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, white 0, transparent 25%), radial-gradient(circle at 80% 50%, white 0, transparent 25%)",
        }}
      />
      <p className="text-xl mt-10 p-2 mb-8 text-center font-quicksand font-medium bg-linear-to-r from-gray-900 to-rose-500 bg-clip-text text-transparent">
        Your next glow-up starts here. The drop everyone’s been waiting for.
      </p>
      <div className="flex items-center gap-10 justify-center">
        <BsCartCheckFill size={50} className="text-white p-2 rounded-full bg-pink-700" />
        <PiHandbagFill size={50} className="text-white p-2 rounded-full bg-pink-700" />
        <FaShippingFast size={50} className="text-white p-2 rounded-full bg-pink-700" />
      </div>

      <div className="mx-auto max-w-9xl sm:px-2 lg:px-5 py-10 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-5 sm:p-8"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-white/90">
                <Sparkles className="h-5 w-5 text-pink-900 animate-bounce" />
                <p className="text-lg tracking-wide font-quicksand font-bold bg-linear-to-r from-pink-900 to-rose-900 bg-clip-text text-transparent">Limited-time preorder</p>
              </div>
              <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold bg-linear-to-r from-gray-900 to-rose-500 bg-clip-text text-transparent">
                {headline}
              </h2>
              <p className="text-gray-900 w-70 font-quicksand font-medium mt-1 shadow-sm shadow-gray-500 rounded-full py-2 text-center">{subline}</p>
            </div>

            {/* Countdown */}
            <div className="flex items-center justify-center">
              {phase !== "after" ? (
                <div className="flex items-center gap-2 mt-5 text-gray-900 font-quicksand font-bold">
                  <Clock className="text-pink-950 h-6 w-6 animate-spin" />
                  <TimeBlock value={days} label="Days" />
                  <TimeBlock value={hours} label="Hrs" />
                  <TimeBlock value={minutes} label="Mins" />
                  <TimeBlock value={seconds} label="Secs" />
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-linear-to-r from-pink-900 to-rose-900 bg-clip-text text-transparent">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="font-semibold">
                    Thanks! We’ll reopen soon.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="h-1.5 w-full rounded-full shadow-sm shadow-gray-600 bg-transparent overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-pink-900 to-rose-800"
                style={{ width: `${percent}%` }}
                aria-label="time remaining"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(percent)}
              />
            </div>
            <div className="flex justify-between text-sm font-quicksand font-medium bg-linear-to-r from-pink-950 to-rose-950 bg-clip-text text-transparent mt-2">
              <span>Opens: {startDate.toLocaleDateString()}</span>
              <span>Closes: {endDate.toLocaleDateString()}</span>
            </div>
          </div>

          {/* Products */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {items.map((item) => (
              <motion.div
                key={item.id}
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
                    className="w-full object-cover"
                    loading="lazy"
                  />
                  {item.badge && (
                    <span className="absolute font-quicksand  font-medium top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/80 text-white px-3 py-1 text-xs">
                      <Gift className="h-3.5 w-3.5" /> {item.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className=" leading-tight font-quicksand font-medium">{item.name}</h3>
                  <div className="mt-1 text-sm text-gray-600 font-quicksand">
                    Preorder price
                  </div>
                  <div className="text-sm font-bold flex items-center  mt-2">
                    <TbCurrencyNaira className="text-lg font-semibold font-quicksand text-gray-800" />
                    {item.price}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      disabled={phase !== "open"}
                      onClick={() => onPreorder?.(item.id)}
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
                      onClick={() => onPreorder?.(item.id)}
                      className="sm:inline-flex items-center justify-center rounded-xl px-4 py-2.5 font-medium font-quicksand border border-gray-300 text-gray-900 hover:bg-gray-50"
                    >
                      Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notify me */}
        {phase !== "open" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const email = fd.get("email")?.toString() || "";
              onNotify?.(email);
              e.currentTarget.reset();
              alert("Thanks! We’ll notify you when preorders open.");
            }}
            className="mt-20 grid gap-6 sm:grid-cols-[1fr,auto]"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email for early access"
              className="rounded-xl border-0 px-4 py-3 shadow-sm w-85 mx-auto shadow-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-pink-200 outline-0 lg:w-100 lg:mx-auto"
            />
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="inline-flex items-center w-50 mx-auto justify-center rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white shadow-sm lg:w-50 lg:mx-auto hover:bg-gray-800"
            >
              Notify me
            </motion.button>
          </form>
        )}
      </div>
    </section>
  );
}
