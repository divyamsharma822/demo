import React from "react";
import styles from "./Page11.module.scss";
import droneImg from "../../../../assests/droneImage.png";

const Page11 = () => {
    return (
        <div className={`d-flex flex-column ${styles.Page11}`}>
            <div className={styles.heading}>Drone Captured Images</div>
            <div className={styles.list}>
                {[
                    {
                        content:
                            "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequatduis enim velit mollit. Exercitation veniam conse  sunt nostrud amet.",
                        img: droneImg,
                    },
                    {
                        content:
                            "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequatduis enim velit mollit. Exercitation veniam conse  sunt nostrud amet.",
                        img: droneImg,
                    },
                    {
                        content:
                            "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequatduis enim velit mollit. Exercitation veniam conse  sunt nostrud amet.",
                        img: droneImg,
                    },
                ].map((curr, index) => (
                    <div className='row g-0 d-flex justify-content-between' key={index}>
                        <div className='col-6'>
                            {index + 1}. {curr.content}
                        </div>
                        <div className='col-6 d-flex justify-content-end'>
                            <img src={curr.img} alt='' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page11;
