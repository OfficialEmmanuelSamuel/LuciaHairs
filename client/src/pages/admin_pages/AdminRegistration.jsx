import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import api from "../../utils/api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/images/logo_no_bg.png";
import { FaUser } from "react-icons/fa";

const AdminRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const loginPage = () => {
    navigate("/admin/login")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      const res = await api.post("/admin/register", { username, password });
      toast.success("Registration successful!", { duration: 4000 });
      setUsername("");
      setPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed!", { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gap-5 flex flex-col items-center justify-center bg-white">
      <div className='flex items-center space-x-2'>
          <img
            src={logo}
            alt={logo}
            className='w-10 cursor-pointer'
          />
          <h3 className="font-nimbus bg-gradient-to-r from-pink-700 to-pink-500 bg-clip-text text-transparent text-lg cursor-pointer">Lucia Hairs</h3>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white flex flex-col p-8 items-center rounded-2xl shadow-lg w-full max-w-md"
      >
        
        <h2 className="text-lg flex items-center gap-2 font-bold font-nunito text-center mb-6 text-gray-800">
          <FaUser /> Admin Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col items-center">
          <div className="w-full">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg font-nunito px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="w-full flex items-center gap-2">
            <input
              type={showPassword ? "text" : "password"}
               className="w-full border border-gray-300 rounded-lg font-nunito px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center text-gray-500 border broder-gray-300 p-2 rounded-lg hover:text-pink-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="w-full">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full border rounded-lg font-nunito px-3 py-2 focus:outline-none focus:ring-1 ${
                password && confirmPassword
                  ? password === confirmPassword
                    ? "border-green-400 focus:ring-green-400"
                    : "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-pink-400"
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-50 mt-3 bg-gradient-to-r from-pink-700 to-pink-800 text-white py-2 rounded-sm cursor-pointer hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 transition font-nunito disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register Admin"}
          </button>
        </form>
        <p className="mt-10 font-nunito">Already have an account?</p>
        <button
          type="submit"
          onClick={loginPage}
          className="w-40 border border-slate-200 mt-5 cursor-pointer text-slate-900 py-2 rounded-sm hover:bg-gradient-to-r from-pink-700 to-pink-800 transition font-nunito hover:text-white disabled:opacity-50"
          >
            Admin Login
      </button>
      </motion.div>
      
    </div>
  );
};

export default AdminRegister;
