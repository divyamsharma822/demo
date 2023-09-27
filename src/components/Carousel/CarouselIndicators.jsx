import React from "react";
import styles from "./CarouselIndicators.module.scss";

const CarouselIndicators = ({ slides, currentIndex }) => {
    return (
        <div className={styles.CarouselIndicators}>
            {slides.map((_, index) => (
                <button
                    className={`${styles.carouselIndicatorItem} ${
                        currentIndex === index && styles.active
                    }`}
                    key={index}></button>
            ))}
        </div>
    );
};

export default CarouselIndicators;
