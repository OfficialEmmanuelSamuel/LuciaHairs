import React from 'react';
import { ImWhatsapp } from 'react-icons/im';

const WhatsappButton = () => {
    const phoneNumber = "2349065818813";
    const message = "Hello! I'm interested in your wigs";

    return (
        <a href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel='noopener noreferrer'
            className='fixed z-50  bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg text-3xl transition animate-bounce'
            title='Contact Us'
        >
            <ImWhatsapp size={30}/>
        </a>
    );
};

export default WhatsappButton;