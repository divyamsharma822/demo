import React from "react";
import styles from "./TableCard.module.scss";
import buttonstyles from "../../MyStation/ServicesDetailsTR/ServicesDetailsTR.module.scss";
import { Link } from "react-router-dom";
import moment from "moment";

const TableCard = ({ element, header }) => {
    const capitalizeFirst = (str) => {
        if (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return "-";
    };

    let orderstatus;

    if (element.orderStatus === "Pending") {
        orderstatus = `${buttonstyles.Pending}`;
    }

    if (element.orderStatus === "Delivered") {
        orderstatus = `${buttonstyles.Delivered}`;
    }
    if (element.orderStatus === "On the way") {
        orderstatus = `${buttonstyles.Ontheway}`;
    }
    if (element.orderStatus === "Approved") {
        orderstatus = `${buttonstyles.Approved}`;
    }
    if (element.orderStatus === "Cancelled") {
        orderstatus = `${buttonstyles.Cancelled}`;
    }

    switch (header) {
        case "Pending":
            return (
                <div className={`card ${styles.card}`}>
                    <div className={`${styles.cardBody}`}>
                        <div className={`${styles.header}`}>
                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                <div className={`${styles.headingInfo}`}>
                                    ID: {element?.bookingId}
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
                                className={`d-inline-block text-truncate ${styles.headingInfo}`}
                                style={{ maxWidth: "80%" }}>
                                {capitalizeFirst(
                                    element?.addFarmLocation?.address
                                )}
                            </div>
                        </div>

                        <div className={styles.hr}></div>

                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>
                                    Service
                                </span>
                                <span
                                    className={`d-inline-block text-truncate`}
                                    style={{ maxWidth: "50%" }}>
                                    {capitalizeFirst(element?.serviceName)}
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>
                                    Booking Date
                                </span>
                                <span
                                    className={`d-inline-block text-truncate`}
                                    style={{ maxWidth: "50%" }}>
                                    {moment(
                                        element.bookingDate,
                                        "DD/MM/YYYY"
                                    ).format("DD  MMM, YYYY")}
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span className={styles.changeLeft}>
                                    Total Area
                                </span>
                                <span>
                                    {element.addFarmDetails.reduce(
                                        (acc, curr) => acc + curr.area,
                                        element.extraAcre
                                            ? element.extraAcre
                                            : 0
                                    )}{" "}
                                    acre
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        case "Completed":
            return (
                <div className={`card ${styles.card}`}>
                    <div className={`${styles.cardBody}`}>
                        <div className={`${styles.header}`}>
                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                <div className={`${styles.headingInfo}`}>
                                    ID: {element?.bookingId}
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
                                className={`d-inline-block text-truncate ${styles.headingInfo}`}
                                style={{ maxWidth: "80%" }}>
                                {capitalizeFirst(
                                    element?.addFarmLocation?.address
                                )}
                            </div>
                        </div>

                        <div className={styles.hr}></div>

                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>
                                    Service
                                </span>
                                <span
                                    className={`d-inline-block text-truncate`}
                                    style={{ maxWidth: "50%" }}>
                                    {capitalizeFirst(element?.serviceName)}
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>
                                    Booking Date
                                </span>
                                <span
                                    className={`d-inline-block text-truncate`}
                                    style={{ maxWidth: "50%" }}>
                                    {moment(
                                        element.bookingDate,
                                        "DD/MM/YYYY"
                                    ).format("DD  MMM, YYYY")}
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span className={styles.changeLeft}>
                                    Total Area
                                </span>
                                <span>
                                    {element.addFarmDetails.reduce(
                                        (acc, curr) => acc + curr.area,
                                        element.extraAcre
                                            ? element.extraAcre
                                            : 0
                                    )}{" "}
                                    acre
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        case "Cancelled":
            return (
                <div className={`card ${styles.card}`}>
                    <div className={`${styles.cardBody}`}>
                        <div className={`${styles.header}`}>
                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                <div className={`${styles.headingInfo}`}>
                                    ID: {element?.bookingId}
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
                                className={`d-inline-block text-truncate ${styles.headingInfo}`}
                                style={{ maxWidth: "80%" }}>
                                {capitalizeFirst(
                                    element?.addFarmLocation?.address
                                )}
                            </div>
                        </div>

                        <div className={styles.hr}></div>

                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>
                                    Service
                                </span>
                                <span
                                    className={`d-inline-block text-truncate`}
                                    style={{ maxWidth: "50%" }}>
                                    {capitalizeFirst(element?.serviceName)}
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>
                                    Booking Date
                                </span>
                                <span
                                    className={`d-inline-block text-truncate`}
                                    style={{ maxWidth: "50%" }}>
                                    {moment(
                                        element.bookingDate,
                                        "DD/MM/YYYY"
                                    ).format("DD  MMM, YYYY")}
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span className={styles.changeLeft}>
                                    Total Area
                                </span>
                                <span>
                                    {element.addFarmDetails.reduce(
                                        (acc, curr) => acc + curr.area,
                                        element.extraAcre
                                            ? element.extraAcre
                                            : 0
                                    )}{" "}
                                    acre
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        case "Delivered":
            return (
                <div className={`card ${styles.card}`}>
                    <div className={`${styles.cardBody}`}>
                        <div className={`${styles.header}`}>
                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                <div className={`${styles.headingInfo}`}>
                                    ID: {element?.bookingId}
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
                                className={`d-inline-block text-truncate ${styles.headingInfo}`}
                                style={{ maxWidth: "80%" }}>
                                {capitalizeFirst(
                                    element?.addFarmLocation?.address
                                )}
                            </div>
                        </div>

                        <div className={styles.hr}></div>

                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>
                                    Service
                                </span>
                                <span
                                    className={`d-inline-block text-truncate`}
                                    style={{ maxWidth: "50%" }}>
                                    {capitalizeFirst(element?.serviceName)}
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>
                                    Booking Date
                                </span>
                                <span
                                    className={`d-inline-block text-truncate`}
                                    style={{ maxWidth: "50%" }}>
                                    {moment(
                                        element.bookingDate,
                                        "DD/MM/YYYY"
                                    ).format("DD  MMM, YYYY")}
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span className={styles.changeLeft}>
                                    Total Area
                                </span>
                                <span>
                                    {element.addFarmDetails.reduce(
                                        (acc, curr) => acc + curr.area,
                                        element.extraAcre
                                            ? element.extraAcre
                                            : 0
                                    )}{" "}
                                    acre
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        case "All":
            return (
                <div className={`card ${styles.card}`}>
                    <div className={`${styles.cardBody}`}>
                        <div className={`${styles.header}`}>
                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                <div className={`${styles.headingInfo}`}>
                                    ID: {element?.bookingId}
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
                                className={`d-inline-block text-truncate ${styles.headingInfo}`}
                                style={{ maxWidth: "80%" }}>
                                {element?.username}
                            </div>
                        </div>

                        <div className={styles.hr}></div>

                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>
                                    Service
                                </span>
                                <span
                                    className={`d-inline-block text-truncate`}
                                    style={{ maxWidth: "50%" }}>
                                    {capitalizeFirst(element?.serviceName)}
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>
                                    KS Name
                                </span>
                                <span
                                    className={`d-inline-block text-truncate`}
                                    style={{ maxWidth: "50%" }}>
                                    {element?.ksName}
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between'>
                                <span className={styles.changeLeft}>
                                    Booking Date
                                </span>
                                <span
                                    className={`d-inline-block text-truncate`}
                                    style={{ maxWidth: "50%" }}>
                                    {moment(
                                        element.bookingDate,
                                        "DD/MM/YYYY"
                                    ).format("DD  MMM, YYYY")}
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span className={styles.changeLeft}>
                                    Total Area
                                </span>
                                <span>
                                    {element.addFarmDetails.reduce(
                                        (acc, curr) => acc + curr.area,
                                        element.extraAcre
                                            ? element.extraAcre
                                            : 0
                                    )}{" "}
                                    acre
                                </span>
                            </div>
                        </div>
                        <div
                            className={`${styles.change} d-flex justify-content-between flex-column`}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span className={styles.changeLeft}>
                                    Total Area
                                </span>
                                <span>
                                    <span className={orderstatus}>
                                        {element?.orderStatus}
                                    </span>
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
