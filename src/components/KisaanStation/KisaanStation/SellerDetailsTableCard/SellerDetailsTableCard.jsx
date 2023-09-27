import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../../KSTableCard/KSTableCard.module.scss";
import statuscolors from "../../MyStation/ServicesDetailsTR/ServicesDetailsTR.module.scss";

const capitalizeFirst = (str) => {
    if (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return "-";
};

const SellerDetailsTableCard = ({ header, element }) => {
    let orderstatus;

    if (element.orderStatus === "Pending") {
        orderstatus = `${statuscolors.Pending}`;
    }
    if (element.orderStatus === "Delivered") {
        orderstatus = `${statuscolors.Delivered}`;
    }
    if (element.orderStatus === "On the way") {
        orderstatus = `${statuscolors.Ontheway}`;
    }
    if (element.orderStatus === "Approved") {
        orderstatus = `${statuscolors.Approved}`;
    }
    if (element.orderStatus === "Cancelled") {
        orderstatus = `${statuscolors.Cancelled}`;
    }

    switch (header) {
        case "Orders":
            return (
                <div className={`card ${styles.card}`}>
                    <div className={`${styles.cardBody}`}>
                        <div className={`${styles.header}`}>
                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                <div className={`${styles.headingInfo}`}>
                                    ID : {element?.bookingId}
                                </div>
                                <div className={`${styles.viewDetails}`}>
                                    <Link
                                        to={`/admin/KisaanStation/Kisaan%20Station/Sellers/View/Order%20Details?_id=${element._id}`}
                                        state={{ data: element }}
                                        className={`${styles.viewBtn}`}>
                                        View Details
                                    </Link>
                                </div>
                            </div>

                            <div
                                className={`text-truncate text-capitalise ${styles.headingInfo}`}>
                                {capitalizeFirst(element?.serviceName)}
                            </div>
                        </div>

                        <div className={styles.hr}></div>

                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>
                                    Booking Date
                                </span>
                                <span>{element?.bookingDate}</span>
                            </div>
                        </div>
                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>
                                    Status
                                </span>
                                <span className={`${orderstatus} text-end`}>
                                    {element?.orderStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        case "Listings":
            return (
                <div className={`card ${styles.card}`}>
                    <div className={`${styles.cardBody}`}>
                        <div className={`${styles.header}`}>
                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                <div className={`${styles.headingInfo}`}>
                                    ID : {element?.sellingProductId}
                                </div>
                            </div>

                            <div
                                className={`text-truncate text-capitalise ${styles.headingInfo}`}>
                                {element?.serviceName}
                            </div>
                        </div>

                        <div className={styles.hr}></div>

                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>
                                    Listing Date
                                </span>
                                <span>
                                    {moment(element.modifiedTime).format(
                                        "DD  MMM, YYYY"
                                    )}
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>
                                    Status
                                </span>
                                <span
                                    className={`${
                                        element.sellingStatus === "Active" &&
                                        statuscolors.Active
                                    } text-end`}>
                                    {element?.sellingStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        default:
            return <div className='text-center'>List is Empty</div>;
    }
};

export default SellerDetailsTableCard;
