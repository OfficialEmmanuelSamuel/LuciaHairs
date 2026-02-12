import { React, useState } from "react";
import { Link } from "react-router-dom";
import BrandLogo from "../assets/images/logo_no_bg.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent filter backdrop-blur-lg h-15 z-50">
      <div className="mx-auto px-2 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src={BrandLogo}
            alt="Lucia_Hair_Logo"
            className="w-10 cursor-pointer"
          />
          <h1 className="font-nimbus bg-gradient-to-r from-gray-700 to-pink-600 bg-clip-text text-transparent text-xl cursor-pointer">
            Lucia Hairs
          </h1>
        </div>

        {/* Desktop View */}
        <div className="px-10 hidden md:flex space-x-10 font-bold font-nunito  text-gray-700 text-xs sm:space-x-7 lg:space-x-15">
          <Link to="/" className="nav-link">
            HOME
          </Link>
          <Link to="/shop" className="nav-link">
            SHOP
          </Link>
          <Link to="/preorder" className="nav-link">
            PRE-ORDER
          </Link>
          <Link to="/salesoffer" className="nav-link">
            SALES OFFER
          </Link>
          <Link to="/review" className="nav-link">
            REVIEWS
          </Link>
          <Link to="/contact" className="nav-link">
            CONTACT US
          </Link>
        </div>

        {/* Hamburger Mobile View */}
        <div className="md:hidden mx-2">
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex flex-col justify-center items-center w-10 h-10 space-y-1 ${menuOpen ? "shadow-none" : ""}`}
          >
            <span
              className={`block h-0.5 w-6 rounded-lg bg-rose-700 transform transition duration-300 ease-in-out ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />

            <span
              className={`block h-0.5 w-6 rounded-lg bg-rose-700  transform transition duration-300 ease-in-out ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 rounded-lg bg-rose-700  transform transition duration-300 ease-in-out ${menuOpen ? "-rotate-45 -translate-y-1" : ""}`}
            />
          </div>
        </div>

        {/* Mobile Menu view */}
        <div
          className={`absolute flex flex-col gap-5 top-14 left-0 w-2/3 min-h-screen bg-linear-to-b from-pink-900 to-pink-600 shadow-md px-4 py-10 space-y-4 transition-all duration-500 ease-in-out transform z-50 text-xs font-nunito items-center font-medium cursor-pointer md:hidden  ${menuOpen ? "opacity-100 translate-y-0 delay-200" : "opacity-0 -translate-x-100 delay-0"}`}
        >
          <Link
            to="/"
            className="cursor-pointer hover:text-pink-700 font-quicksand font-medium text-white"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            HOME
          </Link>
          <Link
            to="/shop"
            className="cursor-pointer font-quicksand font-medium text-white"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            SHOP
          </Link>
          <Link
            to="/preorder"
            className="cursor-pointer  font-quicksand font-medium text-white"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            PRE-ORDER
          </Link>

          <Link
            to="/salesoffer"
            className="cursor-pointer font-quicksand font-medium text-white"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            SALES OFFER
          </Link>
          <Link
            to="/review"
            className="cursor-pointer font-quicksand font-medium text-white"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            REVIEW
          </Link>
          <Link
            to="/contact"
            className="cursor-pointer  font-quicksand font-medium text-white"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
