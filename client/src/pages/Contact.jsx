import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import toast from "react-hot-toast";
import emailjs from "emailjs-com";
import { IoMailUnread, IoSend } from "react-icons/io5";



const Contact = () => {

    const scrollToSection = (id) => {
            const section = document.getElementById(id);
            if (section) {
                const yOffset =-50 //Nabvar height
                const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'}); 
                setMenuOpen(false)
            };
    };

    useEffect(() => {
            if (location.state?.id) {
                scrollToSection(location.state.id);
            };
    }, [location.state, scrollToSection]);
    

    const [formData, setFormData] = useState ({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const [errorShake, setErrorShake] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value, 
            [e.target.email]: e.target.value, 
            [e.target.message]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        emailjs
            .sendForm(
                "Emanel_service",
                "Emanel001",
                e.target,
                "Au6iMYPaNtMkzDG6n"
            ).then(
                (result) => {
                    toast.success("Message Sent Successfully!");
                    setFormData({name:"", email:"", message:""});
                },
                () => {
                    toast.error("Failed to send message. Try again")
                }
            ).finally(() => setLoading(false));
    };

    return(
        <>
            <Navbar />
            <section id='Contact' className='bg-red-00 mb-10 min-h-screen flex items-center justify-center' > 
                <div className="w-full flex flex-col items-center mx-auto px-2 mt-30">
                    <p className="font-lighter text-gray-800 mx-auto mb-5 font-nunito text-lg lg:hidden">Write Us A Message!</p>
                    <div className="max-w-4xl flex flex-col items-center gap-2 p-2 sm:flex-row lg:flex-row">
                        <div className='bg-cover w-full flex flex-col items-center lg:shadow-md lg:h-90 lg:w-2xl'>
                            <p className="hidden font-lighter text-gray-800 mb-5 font-nunito text-lg lg:flex">Write Us A Message!</p>
                            <IoMailUnread className="mx-auto text-8xl text-pink-700 lg:text-9xl"/>
                        </div>
                        <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg p-5 space-y-2'>
                            <input 
                                type="text" 
                                name='name'
                                value={formData.name}
                                placeholder='Your name'
                                onChange={handleChange}
                                required
                                className={`w-full border border-pink-100 rounded-lg p-3 shadow-sm shadow-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-500 ${errorShake ? "animate-shake border-red-500" : ""}`}
                            />
                            

                            <input 
                                type="email" 
                                name='email'
                                value={formData.email}
                                placeholder='Email Address'
                                onChange={handleChange}
                                required
                                className={`w-full border border-pink-100 rounded-lg p-3 shadow-sm shadow-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-500 ${errorShake ? "animate-shake border-red-500" : ""}`}
                            />

                            
                            <textarea 
                                name="message" 
                                id="textarea"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className={`w-full border border-pink-100 rounded-lg p-3 shadow-sm shadow-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-500 ${errorShake ? "animate-shake border-red-100" : ""}`}
                            ></textarea>
                            

                            <button 
                                type='submit'
                                disabled={loading}
                                className={`mx-auto w-50 flex items-center justify-center bg-gradient-to-r from-pink-700 to-pink-700 text-white cursor-pointer font-semibold py-3 rounded-lg transition ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-pink-700"}`}
                            >
                                {loading && (
                                    <svg
                                        className='animate-spin h-5 w-5 mr-2 text-white'
                                        xmlns='https://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'    
                                    >
                                        <circle
                                            className='opacity-25'
                                            cx='12'
                                            cy='12'
                                            r='10'
                                            stroke='currentColor'
                                            strokeWidth='4'
                                        ></circle> 
                                        <path
                                            className='opacity-75'
                                            fill='currentColor'
                                            d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
                                        ></path>
                                    </svg>
                                )}
                                {loading ? (
                                    <span>Sending...</span>
                                ) : (
                                    < div className="flex items-center gap-2">
                                        <span>Send Message</span>
                                        <IoSend />
                                    </div>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Contact;