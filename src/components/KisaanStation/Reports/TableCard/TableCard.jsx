import React from "react";
import styles from "./TableCard.module.scss";

const TableCard = ({ element, setShow }) => {
    return (
        <div className={`card ${styles.card}`}>
            <div className={`${styles.cardBody}`}>
                <div className={`${styles.header}`}>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                        <div
                            className={`${styles.headingInfo} d-flex flex-row align-items-center gap-2 justify-content-left`}>
                            {" "}
                            <img
                                src='https://picsum.photos/200'
                                className='img-fluid rounded-circle'
                                alt=''
                                style={{
                                    height: "28px",
                                    border: "2px solid #DFDFDF",
                                }}
                            />
                            <div
                                className={` ${styles.headingInfo}`}
                                style={{ maxWidth: "100%" }}>
                                {element?.ksLocation?.address}
                            </div>
                        </div>
                        <div className={`${styles.viewDetails}`}>
                            <span
                                onClick={() => setShow(true)}
                                className={`${styles.viewBtn}`}>
                                Manage
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.hr}></div>

                <div
                    className={`${styles.change} d-flex justify-content-between flex-column`}>
                    <div className='d-flex justify-content-between'>
                        <span className={styles.changeLeft}>
                            No. of reports
                        </span>
                        <span>540</span>
                    </div>
                </div>
                <div
                    className={`${styles.change} d-flex justify-content-between flex-column`}>
                    <div className='d-flex justify-content-between'>
                        <span className={styles.changeLeft}>Reason</span>
                        <span
                            className={`d-inline-block text-truncate`}
                            style={{ maxWidth: "50%" }}>
                            False Information
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableCard;
