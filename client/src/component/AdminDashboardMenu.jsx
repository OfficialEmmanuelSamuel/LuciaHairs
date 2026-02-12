import { Link } from "react-router-dom";
import { PiPlus } from "react-icons/pi";
import { IoBarChart } from "react-icons/io5";
import { FaHome } from "react-icons/fa";

const AdminDashboardMenu = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="h-100 absolute top-15 left-2 bg-white shadow-xs shadow-rose-700 rounded-lg p-6 w-60 z-50 transition translate-y-10 transform ">
      <ul className="flex flex-col gap-8 font-quicksand font-semibold">
        <Link className="flex items-center gap-2" onClick={() => setIsOpen(false)} to="/admin/dashboard">
          <FaHome /> Dashboard
        </Link>

        <Link  className="flex items-center gap-2" onClick={() => setIsOpen(false)} to="/admin/products">
           <PiPlus /> Add Product
        </Link>

        <Link className="flex items-center gap-2" onClick={() => setIsOpen(false)} to="/admin/preorders">
           <PiPlus /> Add Preorder Product
        </Link>

        <Link className="flex items-center gap-2" onClick={() => setIsOpen(false)} to="/admin/offer-products">
           <PiPlus /> Add Offer Sales Products
        </Link>

        <Link className="flex items-center gap-2" onClick={() => setIsOpen(false)} to="/admin/offer-stats">
           <IoBarChart /> Offer Sales Stats
        </Link>

        <Link className="flex items-center gap-2" onClick={() => setIsOpen(false)} to="/admin/preorder-stats">
          <IoBarChart /> Preorder Sales Stats
        </Link>
      </ul>
    </div>
  );
};

export default AdminDashboardMenu;
