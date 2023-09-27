import React from "react";
import styles from "./Page7.module.scss";

const Page7 = () => {
    return (
        <div className={`d-flex flex-column ${styles.Page7}`}>
            <div className={styles.head}>Yield Estimation</div>
            <div
                className={`row g-0 justify-content-center justify-content-md-start ${styles.cardWrapper}`}>
                <div className={styles.card}>
                    <div className={`${styles.info}`}>
                        {24}
                        <span
                            style={{
                                fontSize: "0.8em",
                            }}>
                            Kg
                        </span>
                    </div>
                    <div className={`${styles.heading}`}>
                        Estimated Crop In Weight
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={`${styles.info}`}>
                        <span>&#8377; </span>
                        2122
                    </div>
                    <div className={`${styles.heading}`}>
                        Estimated Market Price
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={`${styles.info}`}>2344</div>
                    <div className={`${styles.heading}`}>Crop Tree Count</div>
                </div>
                <div className={`${styles.card}`}>
                    <div className={`${styles.info}`}>14%</div>
                    <div className={`${styles.heading}`}>Stressed Crops</div>
                </div>
                <div className={`${styles.card}`}>
                    <div className={`${styles.info}`}>
                        4{" "}
                        <span
                            style={{
                                fontSize: "0.8em",
                            }}>
                            Kg
                        </span>
                    </div>
                    <div className={`${styles.heading}`}>Approx Wastage</div>
                </div>
                <div className={`${styles.card}`}>
                    <div className={`${styles.info}`}>27%</div>
                    <div className={`${styles.heading}`}>Affected Crops</div>
                </div>
                <div className={`${styles.card}`}>
                    <div className={`${styles.info}`}>73%</div>
                    <div className={`${styles.heading}`}>Healthy Crops</div>
                </div>
                <div className={`${styles.card}`}>
                    <div className={`${styles.info}`}>
                        14
                        <span
                            style={{
                                fontSize: "0.8em",
                            }}>
                            Kg
                        </span>
                    </div>
                    <div className={`${styles.heading}`}>
                        Approx Weight Loss
                    </div>
                </div>
                <div className={`${styles.card}`}>
                    <div className={`${styles.info}`}>
                        600
                        <span
                            style={{
                                fontSize: "0.8em",
                            }}>
                            Kg
                        </span>
                    </div>
                    <div className={`${styles.heading}`}>Total Yield</div>
                </div>
                <div className={`${styles.card}`}>
                    <div className={`${styles.info}`}>
                        104
                        <span
                            style={{
                                fontSize: "0.8em",
                            }}>
                            Kg
                        </span>
                    </div>
                    <div className={`${styles.heading}`}>Net Yield/ Acre</div>
                </div>
            </div>
            <div className={styles.head} style={{ marginTop: "60px" }}>
                Crop Health Analysis
            </div>
            <div>
                Potassium-rich treatments suitable for organic farming include
                feeding with home-made comfrey liquid, adding seaweed meal,
                vermiculite,Potassium-rich treatments suitable for organic
                farming include feeding with home-made comfrey liquid, adding
                seaweed meal, vermiculite,Potassium-rich treatments suitable for
                organic farming include feeding with home-made comfrey liquid,
                adding seaweed meal, vermiculite,
            </div>
        </div>
    );
};

export default Page7;
