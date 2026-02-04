import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Faqs from './pages/Faqs';
import Navbar from './component/Navbar';
import { Toaster } from "react-hot-toast";
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminProducts.jsx';
import AdminRegister from './pages/AdminRegistration';
import { getToken } from './utils/auth';
import Shopping from "./pages/Shopping";
import Footer from './component/Footer';
import AddProduct from "./pages/AddProduct.jsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] =  useState(!!getToken());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/About" element={<About/>} />
        <Route path="/Faqs" element={<Faqs/>} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/Shopping" element={<Shopping />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/products" element={<AddProduct />} />
        <Route path="/admin/login" element={isLoggedIn ? (<Navigate to="/admin/dashboard" />) : (<AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />)}/>
        <Route path="/admin/dashboard" element={isLoggedIn ? <AdminDashboard onLogout={() => setIsLoggedIn(false)}/> : <Navigate to="/admin/login" />}/>
      </Routes>
      <Toaster position="top-right" reverseOrder={false}/>
    </BrowserRouter>
  );
}

export default App;
