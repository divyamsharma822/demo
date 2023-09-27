import React, { useState } from "react";
import styles from "./PostReview.module.scss";
import { TiLocation } from "react-icons/ti";
import Carousel from "../../../Carousel/Carousel";

const PostReview = ({ setCurrentModalPage }) => {
    const [fulltext, setfulltext] = useState(false);

    const slides = [
        "https://picsum.photos/seed/picsum/1200/600",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/seed/picsum/600/1200",
    ];

    const texttruncate = (text) => {
        if (text.length > 80 && !fulltext) {
            return (
                <>
                    <span>{text.substr(0, 80)}</span>
                    <span
                        onClick={() => setfulltext(true)}
                        style={{ color: "#E26B26", cursor: "pointer" }}>
                        ...Read more
                    </span>
                </>
            );
        } else {
            return (
                <>
                    <span>{text}</span>
                    <span
                        onClick={() => setfulltext(false)}
                        style={{ color: "#E26B26", cursor: "pointer" }}>
                        {" "}
                        Read less
                    </span>
                </>
            );
        }
    };

    return (
        <div
            className={`col-sm-12 overflow-auto d-flex flex-column justify-content-center align-items-center`}>
            <div className={styles.postwrapper}>
                <div className={`d-flex align-items-center ${styles.header}`}>
                    <img
                        src='https://picsum.photos/200'
                        className='img-fluid rounded-circle'
                        alt=''
                        style={{ height: "40px", border: "2px solid #DFDFDF" }}
                    />
                    <div className='mx-3'>
                        <div className={styles.username}>Divyam Sharma</div>
                        <div className={`${styles.location}`}>
                            <TiLocation /> Nashik, Maharastra
                        </div>
                    </div>
                </div>
                <div className={styles.hr}></div>
                <div className={`${styles.description}`}>
                    {texttruncate(
                        "Green vegetables, green onions and fresh carrot, Green vegetables, green onions and fresh carrot Green vegetables, green onions and fresh carrot, Green vegetables, green onions and fresh carro Green vegetables, green onions and fresh carrot, Green vegetables, green onions and fresh carro"
                    )}
                </div>
                <Carousel slides={slides} indicators controls />
            </div>
            <button
                type='button'
                onClick={() => setCurrentModalPage(2)}
                className={styles.removebtn}>
                <span>Remove Post</span>
            </button>
            <button
                type='button'
                onClick={() => setCurrentModalPage(3)}
                className={styles.noticebtn}>
                <span>Send Notice</span>
            </button>
        </div>
    );
};

export default PostReview;
