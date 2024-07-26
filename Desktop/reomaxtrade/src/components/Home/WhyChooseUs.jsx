import React from 'react';
import LOGO from '@assets/small-logo.svg?react';
import ICON1 from '../../assets/icon-why-choose-us-1.svg?react';
import ICON2 from '../../assets/icon-why-choose-us-2.svg?react';
import ICON3 from '../../assets/icon-why-choose-us-3.svg?react';
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

const WhyChooseUs = ({}) => {
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
                    How it Works
                </h3>
                <motion.h1
                    ref={ref}
                    className="max-w-[1000px] text-[30px] md:text-[50px] lg:text-[50px] leading-tight  text-white font-bold text-balance text-center flex flex-wrap justify-center gap-1"
                    variants={sentence}
                    initial="hidden"
                    animate={controls}
                >
                    {'Get Started Today with Reo Max Coin'.split(' ').map((word, wordIndex) => (
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

                <section className="w-full flex flex-col md:grid md:grid-cols-3 my-10 gap-10">
                    {[
                        [ICON1, 'Safe & Secure'],
                        [ICON2, 'Early Bonus'],
                        [ICON3, 'Several Profit'],
                    ].map(([Icon, label], index) => (
                        <div data-aos="fade-up" className="w-full flex flex-col gap-5 justify-center items-center text-white font-bold bg-[#20252e] p-10 rounded-2xl border border-slate-400/20">
                            <Icon className="h-12 lg:h-20" />
                            <div className="text-base lg:text-2xl text-center">{label}</div>
                        </div>
                    ))}
                </section>
            </div>
        </section>
    );
};

export default WhyChooseUs;
