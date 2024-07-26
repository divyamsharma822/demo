import { cn } from '@/lib/utils';
import { AlignJustify } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LOGO from '../assets/logo.png';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
    const [sticky, setSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [navHeight, setNavHeight] = useState(0);

    const stickNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY;
            setSticky(windowHeight > 500);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', stickNavbar);
        setNavHeight(document.getElementById('navbar').offsetHeight);

        return () => {
            window.removeEventListener('scroll', stickNavbar);
        };
    }, []);

    const links = [
        ['Home', '/'],
        ['Exchange', 'exchange'],
        ['Price List', 'priceList'],
        ['About Us', 'about'],
        ['Services', 'services'],
        ['Contact Us', 'contact'],
    ];

    const navVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: 'easeInOut' },
        },
    };

    const stickyVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeInOut' },
        },
    };

    return (
        <>
            <motion.nav
                id="navbar"
                className={cn('relative w-full', sticky ? 'fixed top-0 left-0 z-50 bg-white bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20' : 'bg-[#20252e]')}
                variants={sticky ? stickyVariants : navVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="relative container flex justify-between items-center text-white py-5">
                    <img src={LOGO} className="max-h-10 lg:max-h-20" />

                    <div className="right flex gap-8 font-medium">
                        {links.map(([label, link], index) => (
                            <NavLink to={link} key={index} className="hover:text-gold cursor-pointer hidden lg:flex">
                                {label}
                            </NavLink>
                        ))}
                        <AlignJustify className="flex lg:hidden text-gold" onClick={() => setIsOpen(!isOpen)} />
                    </div>
                </div>
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            className="bg-gold flex flex-col gap-2 overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                            {links.map(([label, link], index) => (
                                <NavLink to={link} key={index} className="font-medium cursor-pointer px-3 py-1">
                                    {label}
                                </NavLink>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            <div style={{ paddingTop: sticky ? navHeight : 0 }}>{/* Your page content goes here */}</div>
        </>
    );
}
