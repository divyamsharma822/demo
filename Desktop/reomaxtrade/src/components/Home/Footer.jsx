import React from 'react';
import IMAGE1 from '../../assets/icon-stay-info.svg?react';
import LOGO from '@assets/logo.png';
import FACEBOOK_LOGO from '../../assets/facebook-svgrepo-com.svg?react';
import LINKEDIN_LOGO from '../../assets/linkedin-svgrepo-com.svg?react';
import INSTAGRAM_LOGO from '../../assets/instagram-svgrepo-com.svg?react';
import TWITTER_LOGO from '../../assets/twitter-svgrepo-com.svg?react';
import { NavLink } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = ({}) => {
    return (
        <div className="flex flex-col py-10 bg-[#20252e]">
            <div className="container flex flex-col md:flex-row justify-between items-center gap-5">
                <div className="flex items-center gap-3 w-full">
                    <IMAGE1 />
                    <div className=" text-base md:text-2xl font-bold text-white text-balance">Stay Informed And Never Miss An Reo Max Coin Update!</div>
                </div>
                <div className="flex flex-col md:flex-row justify-between bg-[#2b3039] rounded-lg w-full">
                    <input type="text" placeholder="Enter your Email Address" className="bg-transparent focus:outline-none text-white p-5 w-full md:min-w-[450px]" />
                    <button type="button" className="bg-gold px-5 py-2 m-2 rounded-md font-medium text-white text-nowrap">
                        Subscribe Now
                    </button>
                </div>
            </div>
            <div className="container border-neutral-600 border-b-2 my-10"></div>
            <div className="container grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5">
                <section className="flex flex-col justify-start gap-4">
                    <img src={LOGO} className="w-48 object-contain" />
                    <p className="text-neutral-400">
                        Rio Max Coin is revolutionizing the cryptocurrency exchange landscape by providing a secure, user-friendly platform that empowers traders to seamlessly buy, sell, and manage
                        their digital assets with confidence.
                    </p>
                    <div className="flex gap-5 mt-5">
                        <div className="border border-[#656566] w-fit p-2 rounded-full bg-[#262a34] cursor-pointer hover:scale-105">
                            <FACEBOOK_LOGO className="w-5 h-5 object-contain text-white" />
                        </div>
                        <div className="border border-[#656566] w-fit p-2 rounded-full bg-[#262a34] cursor-pointer hover:scale-105">
                            <LINKEDIN_LOGO className="w-5 h-5 object-contain text-white" />
                        </div>
                        <div className="border border-[#656566] w-fit p-2 rounded-full bg-[#262a34] cursor-pointer hover:scale-105">
                            <INSTAGRAM_LOGO className="w-5 h-5 object-contain text-white" />
                        </div>
                        <div className="border border-[#656566] w-fit p-2 rounded-full bg-[#262a34] cursor-pointer hover:scale-105">
                            <TWITTER_LOGO className="w-5 h-5 object-contain text-white" />
                        </div>
                    </div>
                </section>
                <section className="flex flex-col justify-start gap-4 text-neutral-400">
                    <h1 className="text-white text-lg font-bold">Quick Links</h1>
                    <NavLink to={'/'} className="hover:text-gold cursor-pointer">
                        Home
                    </NavLink>
                    <NavLink to={'/'} className="hover:text-gold cursor-pointer">
                        About Us
                    </NavLink>
                    <NavLink to={'/'} className="hover:text-gold cursor-pointer">
                        Exchange
                    </NavLink>
                </section>
                <section className="flex flex-col justify-start gap-4 text-neutral-400">
                    <h1 className="text-white text-lg font-bold">Extra Links</h1>
                    <NavLink to={'/'} className="hover:text-gold cursor-pointer">
                        Services
                    </NavLink>
                    <NavLink to={'/'} className="hover:text-gold cursor-pointer">
                        Pricing List
                    </NavLink>
                    <NavLink to={'/'} className="hover:text-gold cursor-pointer">
                        Contact Us
                    </NavLink>
                </section>
                <section className="flex flex-col justify-start gap-4 text-neutral-400">
                    <h1 className="text-white text-lg font-bold">Contact Information</h1>
                    <NavLink to={'/'} className="flex gap-2 items-center hover:text-gold cursor-pointer">
                        <Phone />
                        (+1) 8958 456 705
                    </NavLink>
                    <NavLink to={'/'} className="flex gap-2 items-center hover:text-gold cursor-pointer">
                        <Mail />
                        Info@reomaxtrade.com
                    </NavLink>
                    <NavLink to={'/'} className="flex gap-2 items-center hover:text-gold cursor-pointer">
                        <MapPin />
                        200 East 65th Street 17 No, Australia
                    </NavLink>
                </section>
            </div>
        </div>
    );
};

export default Footer;
