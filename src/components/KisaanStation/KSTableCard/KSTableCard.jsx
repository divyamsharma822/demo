import React from "react";
import styles from "./KSTableCard.module.scss";
import { Link } from "react-router-dom";

const KSTableCard = ({ element, header }) => {
    const capitalizeFirst = (str) => {
        if (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return "-";
    };

    return header === "Approved" ? (
        <div className={`card ${styles.card}`}>
            <div className={`${styles.cardBody}`}>
                <div className={`${styles.header}`}>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                        <div className={`${styles.headingInfo}`}>
                            KisaanStation
                        </div>
                        <div className={`${styles.viewDetails}`}>
                            <Link
                                to={
                                    "/admin/KisaanStation/Kisaan%20Station/Stations/Service%20Providers"
                                }
                                state={{ data: element }}
                                className={`${styles.viewBtn}`}>
                                View Details
                            </Link>
                        </div>
                    </div>

                    <div
                        className={`d-inline-block text-truncate ${styles.headingInfo}`}
                        style={{ maxWidth: "80%" }}>
                        {element?.ksLocation?.address}
                    </div>
                </div>

                <div className={styles.hr}></div>

                <div
                    className={`${styles.change} d-flex justify-content-between flex-column`}>
                    <div className='d-flex justify-content-between'>
                        <span className={styles.changeLeft}>Manager</span>
                        <span className='text-end'>{element?.name}</span>
                    </div>
                </div>
                <div
                    className={`${styles.change} d-flex justify-content-between flex-column`}>
                    <div className='d-flex justify-content-between'>
                        <span className={styles.changeLeft}>State</span>
                        <span
                            className={`d-inline-block text-truncate`}
                            style={{ maxWidth: "50%" }}>
                            {element?.ksLocation?.state
                                ? element?.ksLocation?.state
                                : "Not Avaliable"}
                        </span>
                    </div>
                </div>
                <div
                    className={`${styles.change} d-flex justify-content-between flex-column`}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <span className={styles.changeLeft}>Status</span>
                        <span
                            className={`${element?.ksStatus}`}
                            style={{ maxWidth: "fit-content" }}>
                            {capitalizeFirst(element?.ksStatus)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className={`card ${styles.card}`}>
            <div className={`${styles.cardBody}`}>
                <div className={`${styles.header}`}>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                        <div className={`${styles.headingInfo}`}>Requests</div>
                        <div className={`${styles.viewDetails}`}>
                            <Link
                                to={
                                    "/admin/KisaanStation/Kisaan%20Station/Stations/Requests/View%20Profile"
                                }
                                state={{ data: element }}
                                className={`${styles.viewBtn}`}>
                                View Details
                            </Link>
                        </div>
                    </div>

                    <div
                        className={`d-inline-block text-truncate ${styles.headingInfo}`}
                        style={{ maxWidth: "80%" }}>
                        {capitalizeFirst(element?.ksLocation?.address)}
                    </div>
                </div>

                <div className={styles.hr}></div>

                <div
                    className={`${styles.change} d-flex justify-content-between flex-column`}>
                    <div className='d-flex justify-content-between'>
                        <span className={styles.changeLeft}>Manager</span>
                        <span className='text-end'>{element?.name}</span>
                    </div>
                </div>
                <div
                    className={`${styles.change} d-flex justify-content-between flex-column`}>
                    <div className='d-flex justify-content-between'>
                        <span className={styles.changeLeft}>State</span>
                        <span
                            className={`d-inline-block text-truncate`}
                            style={{ maxWidth: "50%" }}>
                            {element?.ksLocation?.state
                                ? element?.ksLocation?.state
                                : "Not Avaliable"}
                        </span>
                    </div>
                </div>
                <div
                    className={`${styles.change} d-flex justify-content-between flex-column`}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <span className={styles.changeLeft}>Status</span>
                        <span className={`${element.status.toLowerCase()}`}>
                            {capitalizeFirst(element.status)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KSTableCard;
