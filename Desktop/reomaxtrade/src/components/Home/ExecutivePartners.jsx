import React from 'react';
import LOGO from '@assets/small-logo.svg?react';
import ICON1 from '../../assets/icon-executive-partners-1.svg?react';
import ICON2 from '../../assets/icon-executive-partners-2.svg?react';
import ICON3 from '../../assets/icon-executive-partners-3.svg?react';
import ICON4 from '../../assets/icon-executive-partners-4.svg?react';
import ICON5 from '../../assets/icon-executive-partners-5.svg?react';
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

const ExecutivePartners = ({}) => {
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
                    Executive Partners
                </h3>
                <motion.h1
                    ref={ref}
                    className="max-w-[1000px] text-[30px] md:text-[50px] lg:text-[50px] leading-tight  text-white font-bold text-balance text-center flex flex-wrap justify-center gap-1"
                    variants={sentence}
                    initial="hidden"
                    animate={controls}
                >
                    {'100+ Partners & Supporters'.split(' ').map((word, wordIndex) => (
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

                <section className="w-full flex justify-center items-center flex-wrap gap-10 my-10">
                    {[ICON1, ICON2, ICON3, ICON4, ICON5, ICON1, ICON2, ICON3].map((Icon, index) => (
                        <Icon data-aos="fade-up" className="h-10 lg:h-14 object-contain" />
                    ))}
                </section>
            </div>
        </section>
    );
};

export default ExecutivePartners;
