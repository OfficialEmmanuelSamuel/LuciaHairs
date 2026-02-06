import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import Hero from "./pages/client_pages/Hero";
import About from "./pages/client_pages/About";
import Shop from "./pages/client_pages/Shop";
import Contact from "./pages/client_pages/Contact";
import Review from "./pages/client_pages/Reviews";
import Faqs from "./pages/client_pages/Faqs";
import SalesOffer from "./pages/products_page/SalesOffer";
import PreOrder from "./pages/products_page/PreOrder";
import { Toaster } from "react-hot-toast";
import AdminLogin from "./pages/admin_pages/AdminLogin";
import AdminDashboard from "./pages/admin_pages/AdminProducts";
import AdminRegister from "./pages/admin_pages/AdminRegistration";
import { getToken } from "./utils/auth";
import Shopping from "./pages/products_page/Shopping";
import Footer from "./component/Footer";
import AddProduct from "./pages/admin_pages/AddProduct";
import AdminOfferDashboard from "./pages/admin_pages/adminOfferDashboard";
import ScrollToTop from "./component/ScrollToTop";
import AdminPreorderForm from "./pages/admin_pages/AdminPreorderForm";
import AdminOfferForm from "./pages/admin_pages/AdminOfferForm";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/About" element={<About />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Review" element={<Review />} />
        <Route path="/Faqs" element={<Faqs />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Shopping" element={<Shopping />} />
        <Route path="/SalesOffer" element={<SalesOffer />}/>
        <Route path="/admin/offer-stats" element={<AdminOfferDashboard />} />
        <Route path="/PreOrder" element={<PreOrder />}/>
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/products" element={<AddProduct />} />
        <Route path="/admin/preorders" element={<AdminPreorderForm />} />
        <Route path="/admin/offer-products" element={<AdminOfferForm />} />
        <Route
          path="/admin/login"
          element={
            isLoggedIn ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            isLoggedIn ? (
              <AdminDashboard onLogout={() => setIsLoggedIn(false)} />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
