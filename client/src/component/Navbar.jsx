import { React, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BrandLogo from '../assets/images/logo_no_bg.png'

const Navbar = ({ scrollToSection }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = ( id ) => {
        if (id === "contact") {
            // Special case → navigate to Contact page
            navigate("/contact");
            setMenuOpen(false);
            return;
        }

        if (location.pathname === "/"){
            scrollToSection(id);
        } else {
            navigate("/", {state: { id } });
        };
        setMenuOpen(false);
    };
    return(
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md h-15 z-50">
            <div className="mx-auto px-2 py-2 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img src={BrandLogo} alt="Lucia_Hair_Logo" className="w-10 cursor-pointer" />
                    <h1 className="font-nimbus bg-gradient-to-r from-pink-700 to-pink-500 bg-clip-text text-transparent text-lg cursor-pointer">Lucia Hairs</h1>
                </div>

                {/* Desktop View */}
                <div className="px-10">
                    <ul className="hidden md:flex space-x-10 font-bold font-nunito  text-gray-700 text-xs">
                        <li className="cursor-pointer  hover:text-pink-600" onClick={() => handleNavClick("hero")}>HOME</li> 
                        <li className="cursor-pointer hover:text-pink-600" onClick={() => handleNavClick("shop")}>SHOP</li>
                        <li className="cursor-pointer hover:text-pink-600" onClick={() => handleNavClick("preorder")}>PRE-ORDER</li>
                        <li className="cursor-pointer hover:text-pink-600" onClick={() => handleNavClick("sale")}>SALE</li>
                        <li className="cursor-pointer hover:text-pink-600" onClick={() => handleNavClick("contact-cta")}>CONTACT US</li>
                    </ul>
                </div>

                {/* Hamburger Mobile View */}
                <div className="md:hidden mx-2">
                    <div onClick={() => setMenuOpen(!menuOpen)} className={`flex flex-col justify-center items-center w-10 h-10 space-y-1 ${menuOpen ? 'shadow-sm  rounded-full' : ''}`}>
                        <span className={`block h-0.5 w-6 rounded-lg bg-pink-600 transform transition duration-300 ease-in-out ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`}/>
                        <span className={`block h-0.5 w-6 rounded-lg bg-pink-600  transform transition duration-300 ease-in-out ${menuOpen ? 'opacity-0' : ''}`}/>
                        <span className={`block h-0.5 w-6 rounded-lg bg-pink-600  transform transition duration-300 ease-in-out ${menuOpen ? 'opacity-0' : ''}`}/>
                        <span className={`block h-0.5 w-6 rounded-lg bg-pink-600  transform transition duration-300 ease-in-out ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
                    </div>
                </div>

                {/* Mobile Menu view */}
                <div className={`absolute top-14 left-0 w-full bg-white shadow-md px-4 py-4 space-y-4 transition-all duration-500 ease-in-out transform z-50 text-xs font-nunito items-center font-medium cursor-pointer md:hidden  ${menuOpen ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-100 delay-0'}`}>
                    <ul className="flex flex-col font-bold text-center gap-8 font-nunito text-gray-900">
                        <li className="cursor-pointer hover:text-pink-700" onClick={() => {handleNavClick("hero"); setMenuOpen(false); }} 
                        >HOME</li> 
                        <li className="cursor-pointer hover:text-pink-700" onClick={() => {handleNavClick("shop"); setMenuOpen(false); }}>SHOP</li>
                        <li className="cursor-pointer hover:text-pink-700" onClick={() => {handleNavClick("preorder"); setMenuOpen(false); }}>PRE-ORDER</li>
                       <li className="cursor-pointer hover:text-pink-700" onClick={() => {handleNavClick("sale"); setMenuOpen(false); }}>SALE</li>
                        <li className="cursor-pointer hover:text-pink-700" onClick={() => {handleNavClick("contact-cta"); setMenuOpen(false); }}>CONTACT US</li>
                    </ul>
                </div>
                
            </div>
        </nav>
    )   
}

export default Navbar;