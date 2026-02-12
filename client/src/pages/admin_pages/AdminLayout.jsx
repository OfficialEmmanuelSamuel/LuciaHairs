/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminDashboardMenu from "../../component/AdminDashboardMenu";
import { getToken, logout } from "../../utils/auth.js";
import { useNavigate } from "react-router-dom";

export default function AdminLayout({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const token = getToken();
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onLogout();
    navigate("/admin/login"); // ✅ go straight to login page
  };

  return (
    <div className="min-h-screen relative">
      {/* Menu Button */}
      <div className="flex justify-center mt-20 mb-10 gap-30">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-rose-700 text-white px-6 py-2 rounded-lg font-quicksand font-bold hover:bg-pink-600 transition"
        >
          Menu
        </button>
        <button
          onClick={handleLogout}
          className="bg-rose-700/50 text-white px-4 py-2 rounded-lg hover:bg-rose-800 transition font-nunito font-semibold"
        >
          Logout
        </button>
      </div>

      {/* Sidebar Menu */}
      <AdminDashboardMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />

      {/* Page Content Renders Here */}
      <div className="px-6">
        <Outlet />
      </div>
    </div>
  );
}
