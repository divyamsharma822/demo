import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import Marquee from 'react-fast-marquee';
import TICKER1 from '../../assets/icon-ticker-1.svg';
import TICKER2 from '../../assets/icon-ticker-2.svg';
import TICKER3 from '../../assets/icon-ticker-3.svg';
import TICKER4 from '../../assets/icon-ticker-4.svg';
import TICKER5 from '../../assets/icon-ticker-5.svg';
import TICKER6 from '../../assets/icon-ticker-6.svg';
import TICKER7 from '../../assets/icon-ticker-7.svg';
import TICKER8 from '../../assets/icon-ticker-8.svg';
import TICKER9 from '../../assets/icon-ticker-9.svg';
import TICKER10 from '../../assets/icon-ticker-10.svg';
import TICKER11 from '../../assets/icon-ticker-11.svg';
import TICKER12 from '../../assets/icon-ticker-12.svg';
import TICKER13 from '../../assets/icon-ticker-13.svg';
import TICKER14 from '../../assets/icon-ticker-14.svg';
import { ArrowUp } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import LOGO from '@assets/small-logo.svg?react';

const logos = [
    [TICKER1, 'Bitcoin'],
    [TICKER2, 'Etherium'],
    [TICKER3, 'Tether'],
    [TICKER4, 'BNB'],
    [TICKER5, 'Solana'],
    [TICKER6, 'USD Coin'],
    [TICKER7, 'Cardano'],
    [TICKER8, 'Cardano'],
    [TICKER9, 'Dogecoin'],
    [TICKER10, 'Tron'],
    [TICKER11, 'Polygon'],
    [TICKER12, 'Shiba INU'],
    [TICKER13, 'Lite Coin'],
    [TICKER14, 'Stacks'],
];

const duplicatedLogos = [...logos, ...logos];

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

const Price = ({}) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true });

    React.useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <section className="relative bg-[#141923] w-full">
            <div className="relative flex flex-col justify-center items-center gap-4 h-full z-20 my-10">
                <h3 className="flex items-center gap-3 text-gold" data-aos="fade-up">
                    <LOGO className="animate-spin" />
                    Price
                </h3>
                <motion.h1
                    ref={ref}
                    className="max-w-[1000px] text-[30px] md:text-[50px] lg:text-[50px] leading-tight  text-white font-bold text-balance text-center flex flex-wrap justify-center gap-1"
                    variants={sentence}
                    initial="hidden"
                    animate={controls}
                >
                    {'Explore Cryptocurrency Price'.split(' ').map((word, wordIndex) => (
                        <span key={wordIndex} className={cn('whitespace-nowrap text-white')}>
                            {word.split('').map((char, charIndex) => (
                                <motion.span key={charIndex} variants={letter}>
                                    {char}
                                </motion.span>
                            ))}
                            &nbsp; {/* Add space between words */}
                        </span>
                    ))}
                </motion.h1>

                <section className="w-full bg-[#161923] py-5 overflow-hidden">
                    <Marquee speed={100}>
                        {duplicatedLogos.map(([image, label], index) => (
                            <div className="flex min-w-[220px] flex-col gap-3 mx-5 p-10  justify-center items-center bg-[#20252e] border border-neutral-700 rounded-md" key={uuidv4()}>
                                <img src={image} alt={label} className="h-14" />
                                <div className="text-neutral-300 text-lg font-bold">{label}</div>
                                <div className="flex items-center gap-2 text-white font-bold text-lg">
                                    $12.18
                                    <span className="flex items-center text-green-500 text-sm gap-1">
                                        <ArrowUp size={15} />
                                        21.30%
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className="bg-gold hover:bg-white hover:text-black transition-all text-lg cursor-pointer  duration-200 py-2 px-5 rounded-md font-medium text-white"
                                >
                                    Order Now
                                </button>
                            </div>
                        ))}
                    </Marquee>
                </section>
                <section className="w-full bg-[#161923] py-5 overflow-hidden">
                    <Marquee direction="right" speed={100}>
                        {duplicatedLogos.map(([image, label], index) => (
                            <div className="flex min-w-[220px] flex-col gap-3 mx-5 p-10  justify-center items-center bg-[#20252e] border border-neutral-700 rounded-md" key={uuidv4()}>
                                <img src={image} alt={label} className="h-14" />
                                <div className="text-neutral-300 text-lg font-bold">{label}</div>
                                <div className="flex items-center gap-2 text-white font-bold text-lg">
                                    $12.18
                                    <span className="flex items-center text-green-500 text-sm gap-1">
                                        <ArrowUp size={15} />
                                        21.30%
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className="bg-gold hover:bg-white hover:text-black transition-all text-lg cursor-pointer  duration-200 py-2 px-5 rounded-md font-medium text-white"
                                >
                                    Order Now
                                </button>
                            </div>
                        ))}
                    </Marquee>
                </section>
            </div>
        </section>
    );
};

export default Price;
