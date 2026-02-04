import React, { useState } from "react";
import api from "../utils/api.js";
import { motion } from "framer-motion";
import { saveToken } from "../utils/auth.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/images/logo_no_bg.png";
import { FaUser } from "react-icons/fa";

const AdminLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const registrationPage = () => {
    navigate("/admin/register")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // ✅ Start loading
    try {
      const res = await api.post("/admin/login", { username, password });
      saveToken(res.data.token);
      toast.success("Login successful!", { duration: 4000 });
      onLoginSuccess(); // tell App.jsx user is logged in
     
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err.response?.data?.message || "Login failed!", { duration: 4000 });
    } finally {
      setLoading(false); // ✅ Stop loading (even on error)
    }
  };

  return (
    <div  className="min-h-screen flex flex-col  gap-5 items-center justify-center bg-white p-2">
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
        <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full flex flex-col items-center"
        >
          <h2 className="text-lg flex items-center gap-2 font-bold font-nunito text-center mb-6 text-gray-800"> <FaUser /> Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg font-nunito px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-400"
          />
          <div className="w-full flex items-center gap-2">
            <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg font-nunito px-3 py-2 focus:outline-none focus:ring-1 focus:ring-pink-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex items-center text-gray-500 border broder-gray-300 p-2 rounded-lg hover:text-pink-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          </div>
          

          <button
            type="submit"
            disabled={loading}
            className="w-50 bg-gradient-to-r from-pink-700 to-pink-800 text-white py-2 rounded-sm cursor-pointer hover:bg-rose-500 transition font-nunito disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <p>{message}</p>
        </form>
      </motion.div>
      <button
        type="submit"
        onClick={registrationPage}
        className="px-5 cursor-pointer bg-gradient-to-r from-pink-700 to-pink-800 text-white py-2 rounded-sm hover:bg-rose-500 transition font-nunito disabled:opacity-50"
      >
        Resgister New Admin
      </button>
      
    </div>
  );
};

export default AdminLogin;