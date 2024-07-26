import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import DASHBOARD_IMAGE from '../../assets/video-bg.png';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import LOGO from '@assets/small-logo.svg?react';
import PLAY_LOGO from '@assets/play.svg?react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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

const OurDashboard = ({}) => {
    const controls = useAnimation();
    const [open, setOpen] = useState(false);
    const [ref, inView] = useInView({ triggerOnce: true });

    React.useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <section className="relative bg-[#141923] w-full">
            <div className="relative container flex flex-col justify-center items-center gap-4 h-full z-20 my-10">
                <h3 className="flex items-center gap-3 text-gold" data-aos="fade-up" onClick={() => setOpen(true)}>
                    <LOGO className="animate-spin" />
                    Our Dashboard
                </h3>
                <motion.h1
                    ref={ref}
                    className="max-w-[1000px] text-[30px] md:text-[50px] lg:text-[50px] leading-tight  text-white font-bold text-balance text-center flex flex-wrap justify-center gap-1"
                    variants={sentence}
                    initial="hidden"
                    animate={controls}
                >
                    {'Watch Our Demo Video'.split(' ').map((word, wordIndex) => (
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

                <section className="relative w-full bg-[#161923] mt-5 overflow-hidden">
                    <Dialog onOpenChange={setOpen} open={open}>
                        <DialogTrigger className="relative">
                            <img src={DASHBOARD_IMAGE} alt="DASHBOARD_IMAGE" className="mx-auto" />
                            <PLAY_LOGO className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse border-2 border-gold p-2 rounded-full" />
                        </DialogTrigger>
                        <DialogContent className="h-fit w-fit">
                            <DialogHeader>
                                <DialogTitle>&nbsp;</DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <iframe
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black inset-0 aspect-video md:min-w-[500px]"
                                src="//www.youtube.com/embed/Y-x0efG1seA?autoplay=1"
                                frameborder="0"
                                allowfullscreen="allowfullscreen"
                            ></iframe>
                        </DialogContent>
                    </Dialog>
                </section>
            </div>
        </section>
    );
};

export default OurDashboard;
