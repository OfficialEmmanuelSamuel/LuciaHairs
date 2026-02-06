import React from "react";
import FeaturedProduct from '../../data/Featured/FeaturedProduct';
import Hotpick from '../../data/HotPick/HotPick';
import { GiStarFormation } from 'react-icons/gi';
import { FaFire } from "react-icons/fa6";
import { TbCurrencyNaira } from 'react-icons/tb';

const Sale = () => {
    const Product = FeaturedProduct;
    const HotPicks = Hotpick;
    return (
        <div className="shadow-lg shadow-gray-900 bg-gradient-to-b from-pink-600 via-slate-200 to-pink-500 p-1 gap-2 overflow-hidden w-full ">
            {/* Featured product */}
            <h3 data-aos="fade-right" className="flex items-center gap-2 mt-8 mb-2 mx-3 font-nunito font-bold text-sm text-slate-950 lg:mx-25"><GiStarFormation className="text-pink-700 text-2xl " /> FEATURED PRODUCT</h3>
            <div data-aos="fade-up" className="grid grid-cols-2 gap-3 mb-10  mx-auto rounded-lg p-2 py-5  sm:grid-cols-4 lg:grid-cols-4 lg:max-w-6xl">
                {Product.map(({ image, description, price }, index) => (
                    <div key={index} className="shadow-sm rounded-t-4xl transition duration-500 hover:-translate-y-5 hover:bg-transparent">
                        <div className="flex flex-col gap-3">
                            <div className="mx-auto w-full h-50 lg:h-70">
                                <img
                                    src={image}
                                    alt={description}
                                    className="w-full h-full object-cover rounded-t-4xl"
                                />
                            </div>
                            <div className="p-2">
                                <p className="text-gray-900 text-sm  font-nunito font-bold">{description}</p>
                                <p className="flex items-center font-bold text-sm mt-3 font-nunito"><TbCurrencyNaira className="text-sm font-bold" />{price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Hot pick */}
            <h3 data-aos="fade-right" className="flex items-center gap-2 mt-12 mb-8 mx-3 font-nunito font-bold text-sm text-gray-900 lg:mx-25"><FaFire className="text-pink-700 text-2xl duration-200" /> HOT PICKS</h3>
            <div data-aos="fade-up" className="grid grid-cols-2 gap-3 mb-10 p-2 mx-auto sm:grid-cols-4 lg:grid-cols-4 lg:max-w-6xl">
                {HotPicks.map(({ image, description, price }, index) => (
                    <div key={index} className="shadow-sm rounded-t-4xl transition duration-500 hover:-translate-y-5 hover:bg-transparent">
                        <div className="flex flex-col gap-3">
                            <div className="mx-auto w-full h-50 lg:h-70">
                                <img
                                    src={image}
                                    alt={description}
                                    className="w-full h-full object-cover rounded-t-4xl"
                                />
                            </div>
                            <div className="p-2">
                                <p className="text-gray-900 text-sm  font-nunito font-bold">{description}</p>
                                <p className="flex items-center font-bold text-sm mt-3 font-nunito"><TbCurrencyNaira className="text-sm font-bold" />{price}</p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Sale;