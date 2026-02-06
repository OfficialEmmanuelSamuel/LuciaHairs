import React from "react";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import MyReviewForm from "../../component/ReviewForm";
import { FaUser } from "react-icons/fa";

const CustomersReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reviews");
        return res.json();
      })
      .then((data) => setReviews(data))
      .catch(console.error);
  }, []);

  return (
    <div className="py-10 bg-gray-50 min-h-screen mt-15">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold font-lato text-center mb-6 dark:text-white">
          Trusted by Our Clients
        </h2>

        {/* Trust Badge */}
        <div className="flex justify-center mb-10 items-center gap-1">
          <IoMdCheckmarkCircleOutline size={35} className="text-rose-700" />
          <p className="text-2xl font-medium font-quicksand dark:text-white">
            Reviews
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            375: { slidesPerview: 2 },
            640: { slidesPreView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map(({ _id, name, product, rating, message }) => (
            <SwiperSlide key={id} className="mb-15">
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 h-full flex flex-col">
                {/* User Info */}
                <div className="flex items-center mb-4">
                  <FaUser size={35} className="dark:text-white" />
                  <div>
                    <h4 className="font-semibold text-gray-800">{name}</h4>
                    <p className="text-sm text-pink-600">{product}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-2">
                  {Array.from({ length: rating }).map((_, i) => (
                    <span key={i} className="text-yellow-500">
                      ★
                    </span>
                  ))}
                  {Array.from({ length: 5 - rating }).map((_, i) => (
                    <span key={i} className="text-gray-300">
                      ★
                    </span>
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-600 text-sm flex-grow">“{message}”</p>

                {/* Date */}
                <p className="text-xs text-gray-400 mt-3 self-end">— {date}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <MyReviewForm />
    </div>
  );
};

export default CustomersReview;
