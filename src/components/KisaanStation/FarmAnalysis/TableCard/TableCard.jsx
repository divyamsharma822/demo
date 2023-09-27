import React from "react";
import moment from "moment";
import styles from "./TableCard.module.scss";
import { Link } from "react-router-dom";

const TableCard = ({ element, header }) => {
    return header === "Farms" ? (
        <div className={`card ${styles.card}`}>
            <div className={`${styles.cardBody}`}>
                <div className={`${styles.header}`}>
                    <div className='d-flex justify-content-between'>
                        <div className={`${styles.headingInfo}`}>Farm</div>
                        <div className={`${styles.viewDetails}`}>
                            <Link
                                to={"/admin/KisaanStation/Farm%20Analysis/View"}
                                state={{ data: element }}
                                className={`${styles.viewBtn}`}>
                                View Details
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.headingInfo}`}>
                        {element.farmDetails?.farmName}
                    </div>
                </div>

                <div className={styles.hr}></div>

                <div
                    className={`${styles.change} d-flex justify-content-between flex-column`}>
                    <div className='d-flex justify-content-between'>
                        <span className={styles.changeLeft}>Name</span>
                        <span className='text-end'>{element?.name}</span>
                    </div>
                </div>
                <div
                    className={`${styles.change} d-flex justify-content-between flex-column`}>
                    <div className='d-flex justify-content-between'>
                        <span className={styles.changeLeft}>Location</span>
                        <span
                            className={`d-inline-block text-truncate`}
                            style={{ maxWidth: "50%" }}>
                            {element?.farmDetails?.address
                                ? element?.farmDetails?.address
                                : "Not Avaliable"}
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
    ) : (
        <div className={`card ${styles.card}`}>
            <div className={`${styles.cardBody}`}>
                <div className={`${styles.header}`}>
                    <div className='d-flex justify-content-between'>
                        <div className={`${styles.headingInfo}`}>
                            Analysis Request
                        </div>
                        <div className={`${styles.viewDetails}`}>
                            <Link
                                to={
                                    "/admin/KisaanStation/Farm%20Analysis/Analysis%20Requests/View"
                                }
                                state={{ data: element }}
                                className={`${styles.viewBtn}`}>
                                View Details
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.headingInfo}`}>
                        {element.cropDetails[0]?.nameOfCrop}
                    </div>
                </div>

                <div className={styles.hr}></div>

                <div
                    className={`${styles.change} d-flex justify-content-between flex-column`}>
                    <div className='d-flex justify-content-between'>
                        <span className={styles.changeLeft}>Name</span>
                        <span>{element?.name}</span>
                    </div>
                </div>
                <div
                    className={`${styles.change} d-flex justify-content-between flex-column`}>
                    <div className='d-flex justify-content-between'>
                        <span className={styles.changeLeft}>Location</span>
                        <span
                            className={`d-inline-block text-truncate`}
                            style={{ maxWidth: "50%" }}>
                            {element?.farmDetails?.address
                                ? element?.farmDetails?.address
                                : "Not Avaliable"}
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
                <div
                    className={`${styles.change} d-flex justify-content-between flex-column`}>
                    <div className='d-flex justify-content-between'>
                        <span className={styles.changeLeft}>Status</span>
                        <span
                            className={element.cropDetails[0]?.cropReportStatus}
                            style={{ fontSize: "0.8em" }}>
                            {element.cropDetails[0]?.cropReportStatus}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableCard;
