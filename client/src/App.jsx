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
import AdminDashboardOffer from "./pages/admin_pages/AdminDashboardOffer";
import AdminPreorderDashboard from "./pages/admin_pages/PreorderStats";
import ScrollToTop from "./component/ScrollToTop";
import AdminPreorderForm from "./pages/admin_pages/AdminPreorderForm";
import AdminOfferForm from "./pages/admin_pages/AdminOfferForm";
import LandingPage from "./pages/LandingPage";
import AdminLayout from "./pages/admin_pages/AdminLayout";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />

      <Routes>

        {/* ---------- CLIENT ROUTES ---------- */}
        <Route path="/" element={<Hero />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/About" element={<About />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Review" element={<Review />} />
        <Route path="/Faqs" element={<Faqs />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Shopping" element={<Shopping />} />
        <Route path="/SalesOffer" element={<SalesOffer />} />
        <Route path="/PreOrder" element={<PreOrder />} />

        {/* ---------- ADMIN ROUTES ---------- */}
        <Route
          path="/admin"
          element={
            isLoggedIn ? (
              <AdminLayout onLogout={() => setIsLoggedIn(false)} />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        >
          {/* Dashboard Home */}
          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          {/* Admin Features */}
          <Route path="products" element={<AddProduct />} />
          <Route path="preorders" element={<AdminPreorderForm />} />
          <Route path="offer-products" element={<AdminOfferForm />} />
          <Route path="offer-stats" element={<AdminDashboardOffer />} />
          <Route path="preorder-stats" element={<AdminPreorderDashboard />} />

          {/* Default admin route */}
          <Route index element={<Navigate to="dashboard" />} />
        </Route>

        {/* ---------- ADMIN LOGIN (OUTSIDE PROTECTED ROUTE) ---------- */}
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

        <Route path="/admin/register" element={<AdminRegister />} />

      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
