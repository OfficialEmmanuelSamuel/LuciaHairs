import React from 'react';

const Offer = () => {
    const phoneNumber = "2349065818813";
    const message = "Hello! I'm here for the curly wig offer. OFFER CODE: LH-CURRLY";

    return (
        <a href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel='noopener noreferrer'
            className="bg-gradient-to-r from-pink-700 to-pink-600 text-white font-semibold px-8 py-3  rounded-lg shadow-lg hover:shadow-xl hover:scale-105 font-quicksand transition transform"
            title='OFFER'
        >
            SHOP NOW
        </a>
    );
};

export default Offer;