import React from "react";
import styles from "./CarouselControls.module.scss";
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from "react-icons/io";
const CarouselControls = ({ prev, next, openFullscreen }) => {
    return (
        <div className={styles.CarouselControls}>
            <button
                className={`${styles.CarouselControl} ${styles.left}`}
                onClick={prev}>
                <IoIosArrowDropleftCircle size={50} className={styles.svg} />
            </button>
            <button
                className={`${styles.CarouselControl} ${styles.right}`}
                onClick={next}>
                <IoIosArrowDroprightCircle size={50} className={styles.svg} />
            </button>
        </div>
    );
};

export default CarouselControls;
