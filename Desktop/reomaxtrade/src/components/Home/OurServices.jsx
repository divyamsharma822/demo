import React from 'react';
import LOGO from '@assets/small-logo.svg?react';
import ICON1 from '../../assets/icon-our-services-1.svg?react';
import ICON2 from '../../assets/icon-our-services-2.svg?react';
import ICON3 from '../../assets/icon-our-services-3.svg?react';
import ICON4 from '../../assets/icon-our-services-4.svg?react';
import ICON5 from '../../assets/icon-our-services-5.svg?react';
import ICON6 from '../../assets/icon-our-services-6.svg?react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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

const OurServices = ({}) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true });

    React.useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <section className="relative bg-[#141923]">
            <div className="relative container flex flex-col justify-center items-center gap-4 h-full z-20 my-10">
                <h3 className="flex items-center gap-3 text-gold" data-aos="fade-up">
                    <LOGO className="animate-spin" />
                    Our Services
                </h3>
                <motion.h1
                    ref={ref}
                    className="max-w-[1000px] text-[30px] md:text-[50px] lg:text-[50px] leading-tight  text-white font-bold text-balance text-center flex flex-wrap justify-center gap-1"
                    variants={sentence}
                    initial="hidden"
                    animate={controls}
                >
                    {'Explore Reo Max Coin Services'.split(' ').map((word, wordIndex) => (
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

                <section className="w-full flex flex-col md:grid md:grid-cols-3 my-10 gap-5">
                    {[
                        [ICON1, 'Cryptocurrency Exchange', 'Secure and efficient platform for buying, selling, and trading digital assets.'],
                        [ICON2, 'Advanced Trading Tools', 'Real-time market data, charting, and analysis tools to aid informed decision-making.'],
                        [ICON3, 'AWallet Services', 'Robust and secure storage solutions for safeguarding digital assets.'],
                        [ICON4, '24/7 Customer Support', 'Round-the-clock assistance for any queries or issues.'],
                        [ICON5, 'Educational Resources', 'Comprehensive guides and tutorials for novice and experienced traders alike.'],
                        [ICON6, 'Fiat-to-Crypto Gateway', 'Easy conversion between traditional currencies and cryptocurrencies.'],
                    ].map(([Icon, h2, h4], index) => (
                        <div
                            data-aos="fade-up"
                            className={cn('w-full flex flex-col gap-5 justify-center items-center text-white bg-[#20252e] p-10 rounded-2xl border border-slate-400/20', { 'bg-gold': index === 1 })}
                        >
                            <Icon className="h-12 lg:h-20" />
                            <h2 className="text-base font-medium lg:text-2xl text-center">{h2}</h2>
                            <h4 className={cn('text-base text-neutral-400 lg:text-base text-center', { 'text-white': index === 1 })}>{h4}</h4>
                        </div>
                    ))}
                </section>
            </div>
        </section>
    );
};

export default OurServices;
