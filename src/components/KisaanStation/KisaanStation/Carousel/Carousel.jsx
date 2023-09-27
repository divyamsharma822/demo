import React, { useRef, useEffect, useState } from "react";
import styles from "./Carousel.module.scss";
import CarouselControls from "./CarouselControls";
import CarouselIndicators from "./CarouselIndicators";
import CarouselItem from "./CarouselItem";

const Carousel = ({ slides, controls, indicators }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideInterval = useRef();
    const [showindicators, setshowindicators] = useState(false);

    const prev = () => {
        startSlideTimer();
        const index = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
        setCurrentSlide(index);
    };

    const next = () => {
        startSlideTimer();
        const index = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
        setCurrentSlide(index);
    };

    const startSlideTimer = () => {
        stopSlideTimer();

        slideInterval.current = setInterval(() => {
            setCurrentSlide((currentSlide) =>
                currentSlide < slides.length - 1 ? currentSlide + 1 : 0
            );
        }, 3000);
    };

    const stopSlideTimer = () => {
        if (slideInterval.current) {
            clearInterval(slideInterval.current);
        }
    };

    useEffect(() => {
        startSlideTimer();

        return () => stopSlideTimer();
    });

    useEffect(() => {
        document.addEventListener("fullscreenchange", () => {
            if (document.fullscreenElement) setshowindicators(true);
            else setshowindicators(false);
        });
    }, []);

    return (
        <div
            className={styles.Carousel}
            onClick={(e) => {
                e.currentTarget.requestFullscreen();
            }}>
            <div
                className={styles.carouselInner}
                style={{ transform: `translateX(${-currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                    <CarouselItem
                        slide={slide}
                        key={index}
                        startSlide={startSlideTimer}
                        stopSlide={stopSlideTimer}
                    />
                ))}
            </div>
            {indicators && showindicators && (
                <CarouselIndicators
                    slides={slides}
                    currentIndex={currentSlide}
                />
            )}
            {controls && showindicators && (
                <CarouselControls prev={prev} next={next} />
            )}
        </div>
    );
};

export default Carousel;
