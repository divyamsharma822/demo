import React from 'react';
import LOGO from '@assets/small-logo.svg?react';
import IMAGE_OVERLAY from '../../assets/crypto-calculator-bg.png';
import IMAGE from '../../assets/mobile-img.png';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const DownloadApp = ({}) => {
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
                <section className="flex flex-col lg:grid lg:grid-cols-2 my-10 gap-10">
                    <div className="left flex flex-col gap-5">
                        <h3 className="flex items-center gap-3 text-gold" data-aos="fade-up">
                            <LOGO className="animate-spin" />
                            Download App
                        </h3>
                        <h1 className="text-[50px] font-bold text-white">Rio Max Coin App</h1>

                        <p data-aos="fade-up" className="text-neutral-400">
                            Exciting news for our users: Rio Max Coin is soon launching dedicated Android and iOS apps! These apps will bring the full power of our cryptocurrency exchange platform to
                            your mobile devices, allowing you to trade, monitor market trends, and manage your digital assets on the go. With intuitive interfaces, robust security features, and
                            seamless integration with our web platform, our mobile apps will make it easier than ever to stay connected and in control of your crypto investments, no matter where you
                            are. Stay tuned for more updates on the official release!
                        </p>
                    </div>
                    <div className="right grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-300">
                        <div data-aos="fade-up" className="relative flex flex-col gap-5 border border-neutral-500 bg-[#20252e] rounded-lg p-4 items-center min-h-[300px]">
                            <h1 className="text-2xl text-white font-medium">Get App for IOS</h1>
                            <button className="border-2 border-gold rounded-full px-5 py-2 text-gold">Download</button>
                            <img src={IMAGE} alt="" className="absolute bottom-0 left-1/2 -translate-x-1/2 h-40 object-contain" />
                        </div>
                        <div data-aos="fade-up" className="relative flex flex-col gap-5 border border-neutral-500 bg-[#20252e] rounded-lg p-4 items-center min-h-[300px]">
                            <h1 className="text-2xl text-white font-medium">Get App for IOS</h1>
                            <button className="border-2 border-gold rounded-full px-5 py-2 text-gold">Download</button>
                            <img src={IMAGE} alt="" className="absolute bottom-0 left-1/2 -translate-x-1/2 h-40 object-contain" />
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default DownloadApp;
