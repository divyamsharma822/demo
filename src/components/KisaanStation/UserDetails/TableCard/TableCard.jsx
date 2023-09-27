import React from "react";
import moment from "moment";
import styles from "./TableCard.module.scss";
import { Link } from "react-router-dom";

const TableCard = ({ element }) => {
    const capitalizeFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className={`card ${styles.card}`}>
            <div className={`${styles.cardBody}`}>
                <div className={`${styles.header}`}>
                    <div className='d-flex justify-content-between'>
                        <div className={`${styles.headingInfo}`}>Username</div>
                        <div className={`${styles.viewDetails}`}>
                            <Link
                                to={`/admin/KisaanStation/User%20Details/${element?.username}`}
                                state={{ data: element }}
                                className={`${styles.viewBtn}`}>
                                View Details
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.headingInfo}`}>
                        {element?.username
                            ? capitalizeFirst(element?.username)
                            : "N/A"}
                    </div>
                </div>

                <div className={styles.hr}></div>

                <div
                    className={`${styles.change} d-flex justify-content-between flex-column`}>
                    <div className='d-flex justify-content-between'>
                        <span className={styles.changeLeft}>Mobile No</span>
                        <span>{element?.mobileNo && element?.mobileNo}</span>
                    </div>
                </div>
                <div
                    className={`${styles.change} d-flex justify-content-between flex-column`}>
                    <div className='d-flex justify-content-between'>
                        <span className={styles.changeLeft}>Address</span>
                        <span
                            className={`d-inline-block text-truncate`}
                            style={{ maxWidth: "50%" }}>
                            {element.address?.area
                                ? capitalizeFirst(element.address?.area)
                                : "N/A"}
                        </span>
                    </div>
                </div>
                <div
                    className={`${styles.change} d-flex justify-content-between flex-column`}>
                    <div className='d-flex justify-content-between'>
                        <span className={styles.changeLeft}>Date</span>
                        <span>
                            {moment(element.createdAt).format("DD  MMM, YYYY")}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableCard;
