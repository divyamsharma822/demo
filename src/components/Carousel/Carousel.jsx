import React, { useRef, useEffect, useState } from "react";
import styles from "./Carousel.module.scss";
import CarouselControls from "./CarouselControls";
import CarouselIndicators from "./CarouselIndicators";
import CarouselItem from "./CarouselItem";

const Carousel = ({ slides, controls, indicators }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideInterval = useRef();

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

    const openFullscreen = (e) => {
        document.getElementById("carousell")?.requestFullscreen();
    };

    return (
        <div className={styles.Carousel} id='carousell'>
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
            {indicators && (
                <CarouselIndicators
                    slides={slides}
                    currentIndex={currentSlide}
                />
            )}
            {controls && (
                <CarouselControls
                    prev={prev}
                    next={next}
                    openFullscreen={openFullscreen}
                />
            )}
        </div>
    );
};

export default Carousel;
