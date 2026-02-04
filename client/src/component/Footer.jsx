import React, { useState } from 'react';
import logo from "../assets/images/logo_no_bg.png";
import { FaXTwitter } from "react-icons/fa6"
import { IoLogoFacebook, IoLogoInstagram, IoLogoTiktok, IoMail } from 'react-icons/io5';
import {  RiUserForbidLine } from "react-icons/ri";
import { IoLinkOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom'
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { ImWhatsapp } from 'react-icons/im';
import { useNavigate, useLocation } from "react-router-dom";



const Footer = ({ scrollToSection }) => {
    const [menuOpen, setMenuOpen] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = ( id ) => {
        if (id === "home") {
            // Special case → navigate to Home page
            navigate("/landingpage");
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
    
  return (
    <footer className="w-full bg-gray-900 text-gray-300 pt-12 pb-6 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 gap-5 lg:grid-cols-4 ">
            
            {/* BRANDNAME & LOGO */}
            <div>
                <div className='flex items-center space-x-2'>
                    <img
                        src={logo}
                        alt={logo}
                        className='w-10 cursor-pointer'
                    />
                    <h3 className="font-nimbus bg-gradient-to-r from-pink-700 to-pink-500 bg-clip-text text-transparent text-lg cursor-pointer">Lucia Hairs</h3>
                </div>
                
                <p className="mt-3 text-sm font-nunito font-semibold leading-7">
                    Premium handcrafted wigs designed to give you confidence and style.
                </p>
            </div>

            {/* NAVLINKS */}
            <div className='lg:flex flex-col items-center sm:flex-col'>
                <h4 className="flex items-center text-sm font-nunito font-semibold mb-3 text-pink-700">
                    QUICK LINKS<IoLinkOutline className="ml-2" />
                </h4>
                <ul className='flex flex-col gap-3 font-nunito'>
                    <li className="cursor-pointer" onClick={() => handleNavClick("hero")}>Home</li>
                    <li className="cursor-pointer" onClick={() => handleNavClick("shop")}>Shop</li>
                    <li className="cursor-pointer" onClick={() => handleNavClick("sale")}>Sale</li>
                    <li className="cursor-pointer" onClick={() => handleNavClick("preorder")}>Pre Order</li>
                </ul>
            </div>

            {/* COMPANY */}
            <div className='z-50 lg:flex flex-col items-center sm:flex-col'>
                <h4 className="flex items-center text-sm font-nunito font-semibold mb-3 text-pink-700">
                    COMPANY <HiBuildingOffice2 className="ml-2" />
                </h4>
                <ul className='flex flex-col gap-3 font-nunito'>
                    <li className="cursor-pointer">
                        <Link to="/About" onClick={() => e.preventDefault}>About Us</Link>
                    </li>
                    <li className="cursor-pointer">
                        <Link to="/Contact" onClick={() => e.preventDefault} >Contact Us</Link>
                    </li>
                    <li className="cursor-pointer">
                        <Link to="/Faqs" onClick={() => e.preventDefault}>FAQs</Link>
                    </li>
                </ul>
            </div>

            {/* SOCIAL HANDLE */}
            <div className='flex flex-col items-center'>
                <h4 className="flex items-center text-sm font-nunito font-semibold mb-5 text-pink-700">
                    FOLLOW US<RiUserForbidLine className="ml-2" />
                </h4>
                <div className="flex items-center gap-5 bg-red-600">
                    <button className='bg-blue-600 text-white w-5 h-5 flex items-center justify-center rounded-full shadow-lg text-3xl transition'><a href="https://www.facebook.com/luciahairss" ><IoLogoFacebook size={25}/></a></button>
                    <a href="https://www.instagram.com/luciahairss" className='bg-gradient-to-br from-red-700 to-red-400 text-white w-5 h-5 flex items-center justify-center rounded-sm shadow-lg text-3xl transition'><IoLogoInstagram size={40} /></a>
                    <a href="https://www.tiktok.com/luciahairss" className='bg-white text-black w-5 h-5 flex items-center justify-center rounded-sm shadow-lg text-6xl transition'><IoLogoTiktok size={20} /></a>
                    <a href="https://wa.me/2349065818813" className='bg-green-600 text-white w-5 h-5 flex items-center justify-center rounded-full shadow-lg text-6xl transition'><ImWhatsapp size={23} /></a>
                    <a href="mailto:luciahairss@gmail.com" className='text-white w-5 h-5 flex items-center justify-center rounded-full shadow-lg text-6xl transition'><IoMail size={23} /></a>
                </div>
                <div className='flex items-center gap-3 mt-5 font-nunito text-sm'>
                    <a href="/Terms" onClick={() => e.preventDefault}>Terms</a> <span>|</span>
                    <a href="/policy" onClick={() => e.preventDefault}>Return Policy</a><span>|</span>
                    <a href="/Cookies" onClick={() => e.preventDefault}>Cookies</a>
                </div>
            </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-20 border-t border-gray-700 pt-4 text-center text-sm text-gray-500 font-nunito font-semibold">
            <p>© {new Date().getFullYear()} Lucia Hairs</p>
            <p>All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;