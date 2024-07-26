import React from 'react';
import LOGO from '@assets/small-logo.svg?react';
import ICON1 from '../../assets/team-1.png';
import ICON2 from '../../assets/team-2.png';
import ICON3 from '../../assets/team-3.png';
import ICON4 from '../../assets/team-4.png';
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

const OurTeam = ({}) => {
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
                    Our Team
                </h3>
                <motion.h1
                    ref={ref}
                    className="max-w-[1000px] text-[30px] md:text-[50px] lg:text-[50px] leading-tight  text-white font-bold text-balance text-center flex flex-wrap justify-center gap-1"
                    variants={sentence}
                    initial="hidden"
                    animate={controls}
                >
                    {'Our Crypto Exchange Experts'.split(' ').map((word, wordIndex) => (
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

                <section className="w-full flex flex-col md:flex-row my-10 justify-center gap-5">
                    {[
                        [ICON1, 'John Doe', '(Founder & CEO)'],
                        [ICON2, 'Marco Verratti', '(Senior Consultant)'],
                        [ICON3, 'Arita Banson', '(Creative Manager)'],
                        [ICON4, 'Banson Doe', '(Senior Consultant)'],
                    ].map(([Icon, label, designation], index) => (
                        <div data-aos="fade-up" className="w-full flex flex-col justify-center gap-2 items-center text-white font-bold">
                            <img src={Icon} className="w-full lg:h-full rounded-lg" />
                            <div className="text-lg text-center mt-2">{label}</div>
                            <div className="text-lg text-center text-neutral-500">{designation}</div>
                        </div>
                    ))}
                </section>
            </div>
        </section>
    );
};

export default OurTeam;
