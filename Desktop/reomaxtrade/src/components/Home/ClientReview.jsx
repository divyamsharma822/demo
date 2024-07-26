import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import Marquee from 'react-fast-marquee';
import AUTHOR1 from '../../assets/author-1.jpg';
import AUTHOR2 from '../../assets/author-2.jpg';
import AUTHOR3 from '../../assets/author-3.jpg';
import AUTHOR4 from '../../assets/author-4.jpg';
import AUTHOR5 from '../../assets/author-5.jpg';
import AUTHOR6 from '../../assets/author-6.jpg';
import DOUBLEQUOTES from '../../assets/icon-double-quote.svg';
import { ArrowUp } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import LOGO from '@assets/small-logo.svg?react';

const logos = [
    [
        AUTHOR1,
        "Rio Max Coin's wallet services are secure and user-friendly. I feel my assets are well-protected. The new mobile app will add even more convenience!",
        'Edward Johns',
        '(Senior Consultant)',
    ],
    [
        AUTHOR2,
        'The security features on Rio Max Coin are top-notch. I feel confident trading and storing my assets here. The upcoming mobile app will be a game-changer!',
        'Aisha K',
        '(Senior Consultant)',
    ],
    [
        AUTHOR3,
        "I appreciate the real-time market data and analysis tools. They make trading decisions much easier. I'm eagerly awaiting the new mobile app for on-the-go trading!",
        'Alison Banson',
        '(Senior Consultant)',
    ],
    [
        AUTHOR4,
        "Rio Max Coin's wallet services are secure and user-friendly. I feel my assets are well-protected. The new mobile app will add even more convenience!",
        'Tracey Hawkins',
        '(Senior Consultant)',
    ],
    [
        AUTHOR5,
        "Rio Max Coin has transformed my trading experience. The platform is intuitive, and their customer support is always there to help. I can't wait for the mobile app!",
        'John D.',
        '(Senior Consultant)',
    ],
    [
        AUTHOR6,
        'The security features on Rio Max Coin are top-notch. I feel confident trading and storing my assets here. The upcoming mobile app will be a game-changer!',
        'David D.',
        '(Senior Consultant)',
    ],
];

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

const ClientReview = ({}) => {
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
                    Client Review
                </h3>
                <motion.h1
                    ref={ref}
                    className="max-w-[1000px] text-[30px] md:text-[50px] lg:text-[50px] leading-tight  text-white font-bold text-balance text-center flex flex-wrap justify-center gap-1"
                    variants={sentence}
                    initial="hidden"
                    animate={controls}
                >
                    {'Client Testimonials'.split(' ').map((word, wordIndex) => (
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

                <section className="relative w-full bg-[#161923] py-5 overflow-hidden">
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#161923] via-transparent to-[#161923] z-20"></div>
                    <Marquee speed={100}>
                        {logos.map(([image, label, name, designation], index) => (
                            <div className="flex w-[300px] md:w-[600px] flex-col gap-3 mx-5 p-10 justify-center items-start bg-[#20252e] border border-neutral-700 rounded-md" key={uuidv4()}>
                                <img src={DOUBLEQUOTES} alt={label} className="w-14 object-contain" />
                                <div className="text-neutral-400 text-base">{label}</div>
                                <div className="flex justify-center items-center gap-5 mt-2">
                                    <img src={image} alt="" className="rounded-full h-16" />
                                    <div className="flex flex-col">
                                        <div className="text-white font-bold">{name}</div>
                                        <div className="text-neutral-400">{designation}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Marquee>
                </section>
            </div>
        </section>
    );
};

export default ClientReview;
