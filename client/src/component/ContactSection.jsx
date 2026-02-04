import React from "react";
import { Link } from "react-router-dom"; // remove if not using react-router

export default function ContactSection() {
  return (
    <section className="h-150 flex items-center px-4 "   id="contact-cta">
      <div className="max-w-5xl mx-auto">
        
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-100 to-gray-100 px-8 py-14 sm:px-14 text-center shadow-2xl">

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Have questions or need help choosing the perfect wig?
            </h2>

            <p className="text-gray-700 max-w-2xl mx-auto mb-8 font-quicksand font-medium">
              We’re always happy to help. Reach out to us anytime and we’ll get back to you as soon as possible.
            </p>

            {/* Button using react-router */}
            <Link
              to="/contact"
              className="inline-flex items-center font-quicksand justify-center rounded-xl bg-gradient-to-r from-pink-700 to-pink-700 px-8 py-3 font-semibold text-white shadow-lg hover:brightness-110 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
