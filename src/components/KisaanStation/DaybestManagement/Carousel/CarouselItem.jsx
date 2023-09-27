import React from "react";
import styles from "./CarouselItem.module.scss";

const CarouselItem = ({ slide, startSlide, stopSlide }) => {
    return (
        <div
            className={`no-scrollbar ${styles.CarouselItem}`}
            onMouseEnter={stopSlide}
            onMouseOut={startSlide}>
            <img
                src={slide.mediaUrl}
                className={`no-scrollbar ${styles.img}`}
                alt=''
            />
        </div>
    );
};

export default CarouselItem;
