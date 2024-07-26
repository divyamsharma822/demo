import React from 'react';
import LOGO from '@assets/small-logo.svg?react';
import IMAGE_OVERLAY from '../../assets/crypto-calculator-bg.png';
import ABOUT1 from '../../assets/about-us-1.jpg';
import ABOUT2 from '../../assets/about-us-2.jpg';
import EXCHANGE_IMAGE from '../../assets/icon-bitcoin-exchange.svg?react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { CircleCheckBig } from 'lucide-react';

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

const AboutSection = ({}) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true });

    React.useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <section className="relative bg-[#141923]">
            <img src={IMAGE_OVERLAY} className="absolute object-cover h-full" />
            <div className="relative container flex flex-col justify-center items-center gap-4 h-full z-20 my-10">
                <h3 className="flex items-center gap-3 text-gold" data-aos="fade-up">
                    <LOGO className="animate-spin" />
                    About Rio Max Coin
                </h3>
                <motion.h1
                    ref={ref}
                    className="max-w-[1000px] text-[30px] md:text-[50px] leading-tight lg:text-[76px] text-white font-bold text-balance text-center flex flex-wrap justify-center gap-1"
                    variants={sentence}
                    initial="hidden"
                    animate={controls}
                >
                    {'Simple. Faster. Secure'.split(' ').map((word, wordIndex) => (
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

                <section className="flex flex-col lg:grid lg:grid-cols-2 my-10 gap-10">
                    <div className="left flex flex-col sm:grid sm:grid-cols-2 gap-5">
                        <img src={ABOUT1} className="rounded-md object-contain h-full" data-aos="flip-left" />
                        <div className="flex flex-col gap-5">
                            <img src={ABOUT2} className="rounded-md" data-aos="flip-left" />
                            <div className="bg-[#20252e] font-bold text-white rounded-md flex justify-center gap-3 py-2 items-center h-fit border border-slate-500 text-lg">
                                <EXCHANGE_IMAGE />
                                Bitcoin Exchange
                            </div>
                        </div>
                    </div>
                    <div className="right flex flex-col text-neutral-300">
                        <p data-aos="fade-up">
                            Established in the vibrant city of Dubai, REO MAX COIN stands at the forefront of innovation in the realm of digital assets, leveraging the power of Binance technology to
                            provide unparalleled trading experiences to our global clientele.
                        </p>
                        <br />
                        <br />
                        <p data-aos="fade-up">
                            We are a team of highly qualified technical and experienced Crypto trading experts, We will use most advanced and powerful AI algorithms to analyze current Crypto markets.
                        </p>

                        <div data-aos="fade-up" className="grid grid-cols-2 gap-5 my-8">
                            {[
                                'Lifetime Risk free Exchange',
                                'Protect You identity',
                                'Sercurity & control',
                                'Automatic conversion',
                                'Multiple asset',
                                'Easy to manage',
                                'Scan. Convert. Pay.',
                                '24x7 Support',
                            ].map(curr => (
                                <div className="flex gap-3 items-center">
                                    <CircleCheckBig className="text-gold" />
                                    <div>{curr}</div>
                                </div>
                            ))}
                        </div>

                        <button
                            data-aos="fade-up"
                            type="button"
                            className="bg-gold hover:bg-white hover:text-black transition-all text-lg cursor-pointer duration-200 w-fit my-5 py-2 px-5 rounded-md font-medium text-white"
                        >
                            Read more
                        </button>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default AboutSection;
