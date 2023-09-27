import React from "react";
import styles from "./CarouselControls.module.scss";
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
    IoIosExpand,
} from "react-icons/io";
const CarouselControls = ({ prev, next, openFullscreen }) => {
    return (
        <div className={styles.CarouselControls}>
            <button
                className={`${styles.CarouselControl} ${styles.left}`}
                onClick={prev}>
                <IoIosArrowDropleftCircle className={styles.svg} />
            </button>
            <button
                className={`${styles.CarouselControl} ${styles.middle}`}
                onClick={openFullscreen}
                data-toggle='tooltip'
                data-placement='right'
                title='Fullscreen'>
                <IoIosExpand className={styles.svg} />
            </button>
            <button
                className={`${styles.CarouselControl} ${styles.right}`}
                onClick={next}>
                <IoIosArrowDroprightCircle className={styles.svg} />
            </button>
        </div>
    );
};

export default CarouselControls;
