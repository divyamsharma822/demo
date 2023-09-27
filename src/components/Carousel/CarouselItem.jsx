import React from "react";
import styles from "./CarouselItem.module.scss";

const CarouselItem = ({ slide, startSlide, stopSlide }) => {
    return (
        <div
            className={styles.CarouselItem}
            onMouseEnter={stopSlide}
            onMouseOut={startSlide}>
            <img src={slide} className={styles.img} alt='' />
        </div>
    );
};

export default CarouselItem;
