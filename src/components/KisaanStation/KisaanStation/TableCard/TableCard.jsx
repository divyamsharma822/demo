import React from "react";
import styles from "../../KSTableCard/KSTableCard.module.scss";
import styles2 from "../AllSellerTable/AllSellerTable.module.scss";
import { Link } from "react-router-dom";
import moment from "moment";

const TableCard = ({ element, header }) => {
    const capitalizeFirst = (str) => {
        if (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return "-";
    };
    switch (header) {
        case "All":
            return (
                <div className={`card ${styles.card}`}>
                    <div className={`${styles.cardBody}`}>
                        <div className={`${styles.header}`}>
                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                <div className={`${styles.headingInfo}`}>
                                    ID : {element?.SPID}
                                </div>
                                <div className={`${styles.viewDetails}`}>
                                    <Link
                                        to={
                                            "/admin/KisaanStation/Kisaan%20Station/Sellers/View"
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
                                {capitalizeFirst(element?.fullName)}
                            </div>
                        </div>

                        <div className={styles.hr}></div>

                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>
                                    Location
                                </span>
                                <span
                                    className={`d-inline-block text-truncate`}
                                    style={{ maxWidth: "50%" }}>
                                    {element?.address?.area},{" "}
                                    {element?.address?.state}
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>Date</span>
                                <span className='text-end'>
                                    {moment(element.createdAt).format(
                                        "DD  MMM, YYYY"
                                    )}
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span className={styles.changeLeft}>
                                    Status
                                </span>
                                <span
                                    className={`d-flex justify-content-center ${
                                        element.status === "Active"
                                            ? styles2.btnActive
                                            : ""
                                    } ${
                                        element.status === "In-Active"
                                            ? styles2.btnInActive
                                            : ""
                                    }`}>
                                    {capitalizeFirst(element?.status)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        case "Approvals":
            return (
                <div className={`card ${styles.card}`}>
                    <div className={`${styles.cardBody}`}>
                        <div className={`${styles.header}`}>
                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                <div className={`${styles.headingInfo}`}>
                                    Username
                                </div>
                                <div className={`${styles.viewDetails}`}>
                                    <Link
                                        to={
                                            "/admin/KisaanStation/Kisaan%20Station/Sellers/Approvals/View"
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
                                {capitalizeFirst(element?.fullName)}
                            </div>
                        </div>

                        <div className={styles.hr}></div>

                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>
                                    Location
                                </span>
                                <span
                                    className={`d-inline-block text-truncate`}
                                    style={{ maxWidth: "50%" }}>
                                    {element?.address?.area},{" "}
                                    {element?.address?.state}
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>Date</span>
                                <span className='text-end'>
                                    {moment(element.createdAt).format(
                                        "DD  MMM, YYYY"
                                    )}
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span className={styles.changeLeft}>
                                    Status
                                </span>
                                <span
                                    className={`d-flex justify-content-center ${
                                        element.status === "Approved"
                                            ? styles2.btnApproved
                                            : ""
                                    } ${
                                        element.status === "Pending"
                                            ? styles2.btnPending
                                            : ""
                                    }${
                                        element.status === "Rejected"
                                            ? styles2.btnRejected
                                            : ""
                                    }`}>
                                    {capitalizeFirst(element?.status)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        default:
            return <h1>List is Empty</h1>;
    }
};

export default TableCard;
