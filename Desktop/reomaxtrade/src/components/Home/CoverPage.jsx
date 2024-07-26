import React from 'react';
import BACKGROUND_OVERLAY from '../../assets/overlay.mp4';
import LOGO from '@assets/small-logo.svg?react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const sentence = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.2,
            staggerChildren: 0.03,
        },
    },
};

const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
    },
};

const CoverPage = ({}) => {
    const titleText = 'Empowering Your Crypto Exchange Experience';

    return (
        <section className="relative bg-black h-screen w-screen">
            <video src={BACKGROUND_OVERLAY} autoPlay muted loop className="absolute top-0 left-0 object-cover h-full w-full opacity-40" />
            <div className="relative container flex flex-col justify-center items-center gap-10 h-full z-20">
                <h3 className="flex items-center gap-3 text-gold" data-aos="fade-up">
                    <LOGO className="animate-spin" />
                    Welcome to Rio Max Coin
                </h3>
                <motion.h1
                    className="max-w-[1000px] text-[30px] md:text-[50px] leading-tight lg:text-[76px] text-white font-bold text-balance text-center flex flex-wrap justify-center gap-1"
                    variants={sentence}
                    initial="hidden"
                    animate="visible"
                >
                    {titleText.split(' ').map((word, wordIndex) => (
                        <span key={wordIndex} className={cn('whitespace-nowrap', { 'text-gold': word === 'Crypto' })}>
                            {word.split('').map((char, charIndex) => (
                                <motion.span key={charIndex} variants={letter}>
                                    {char}
                                </motion.span>
                            ))}
                            &nbsp; {/* Add space between words */}
                        </span>
                    ))}
                </motion.h1>

                <p data-aos="fade-up" className="max-w-[500px] text-white text-center text-lg">
                    Rio Max Coin is revolutionizing the cryptocurrency exchange landscape by providing a secure, user-friendly platform that empowers traders to seamlessly buy, sell, and manage their
                    digital assets with confidence.
                </p>

                <button type="button" className="bg-gold hover:bg-white hover:text-black transition-all text-lg cursor-pointer  duration-200 py-2 px-5 rounded-md font-medium text-white">
                    Join for Free
                </button>
            </div>
        </section>
    );
};

export default CoverPage;
