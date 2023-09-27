import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import styles from "./ServicesDetailsTR.module.scss";

const ServicesDetailsTR = ({ element, header }) => {
    const capitalizeFirst = (str) => {
        if (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return "-";
    };
    let orderstatus;

    if (element.orderStatus === "Pending") {
        orderstatus = `${styles.Pending}`;
    }

    if (element.orderStatus === "Delivered") {
        orderstatus = `${styles.Delivered}`;
    }
    if (element.orderStatus === "On the way") {
        orderstatus = `${styles.Ontheway}`;
    }
    if (element.orderStatus === "Approved") {
        orderstatus = `${styles.Approved}`;
    }
    if (element.orderStatus === "Cancelled") {
        orderstatus = `${styles.Cancelled}`;
    }

    switch (header) {
        case "All":
            return (
                <tr className='tr'>
                    <td className='krishiBazaar-td'>{element?.bookingId}</td>
                    <td className='krishiBazaar-td'>{element?.username}</td>
                    <td className='krishiBazaar-td'>{element?.ksName}</td>
                    <td className='krishiBazaar-td'>
                        {capitalizeFirst(element?.serviceName)}
                    </td>
                    <td className='krishiBazaar-td'>
                        {moment(element.bookingDate, "DD/MM/YYYY").format(
                            "DD  MMM, YYYY"
                        )}
                    </td>
                    <td className='krishiBazaar-td'>
                        <span>
                            {element.addFarmDetails.reduce(
                                (acc, curr) => acc + curr.area,
                                element.extraAcre ? element.extraAcre : 0
                            )}{" "}
                            acre
                        </span>
                    </td>
                    <td className={`krishiBazaar-td`}>
                        <span className={orderstatus}>
                            {element?.orderStatus}
                        </span>
                    </td>
                    <td className='krishiBazaar-td'>
                        <Link
                            to={`/admin/KisaanStation/MyStation/Services/Order%20Details?_id=${element._id}`}
                            className='krishiBazaar-td--view-button'>
                            View
                        </Link>
                    </td>
                </tr>
            );
        case "Pending":
            return (
                <tr className='tr'>
                    <td className='krishiBazaar-td'>{element?.bookingId}</td>
                    <td className='krishiBazaar-td'>{element?.username}</td>
                    <td className='krishiBazaar-td'>{element?.ksName}</td>
                    <td className='krishiBazaar-td'>
                        {capitalizeFirst(element?.serviceName)}
                    </td>
                    <td className='krishiBazaar-td'>
                        {moment(element.bookingDate, "DD/MM/YYYY").format(
                            "DD  MMM, YYYY"
                        )}
                    </td>
                    <td className='krishiBazaar-td'>
                        <span>
                            {element.addFarmDetails.reduce(
                                (acc, curr) => acc + curr.area,
                                element.extraAcre ? element.extraAcre : 0
                            )}{" "}
                            acre
                        </span>
                    </td>

                    <td className='krishiBazaar-td'>
                        <Link
                            to={`/admin/KisaanStation/MyStation/Services/Order%20Details?_id=${element._id}`}
                            className='krishiBazaar-td--view-button'>
                            View
                        </Link>
                    </td>
                </tr>
            );
        case "Delivered":
            return (
                <tr className='tr'>
                    <td className='krishiBazaar-td'>{element?.bookingId}</td>
                    <td className='krishiBazaar-td'>{element?.username}</td>
                    <td className='krishiBazaar-td'>{element?.ksName}</td>
                    <td className='krishiBazaar-td'>
                        {capitalizeFirst(element?.serviceName)}
                    </td>
                    <td className='krishiBazaar-td'>
                        {moment(element.bookingDate, "DD/MM/YYYY").format(
                            "DD  MMM, YYYY"
                        )}
                    </td>
                    <td className='krishiBazaar-td'>
                        <span>
                            {element.addFarmDetails.reduce(
                                (acc, curr) => acc + curr.area,
                                element.extraAcre ? element.extraAcre : 0
                            )}{" "}
                            acre
                        </span>
                    </td>

                    <td className='krishiBazaar-td'>
                        <Link
                            to={`/admin/KisaanStation/MyStation/Services/Order%20Details?_id=${element._id}`}
                            className='krishiBazaar-td--view-button'>
                            View
                        </Link>
                    </td>
                </tr>
            );
        case "Cancelled":
            return (
                <tr className='tr'>
                    <td className='krishiBazaar-td'>{element?.bookingId}</td>
                    <td className='krishiBazaar-td'>{element?.username}</td>
                    <td className='krishiBazaar-td'>{element?.ksName}</td>
                    <td className='krishiBazaar-td'>
                        {capitalizeFirst(element?.serviceName)}
                    </td>
                    <td className='krishiBazaar-td'>
                        {moment(element.bookingDate, "DD/MM/YYYY").format(
                            "DD  MMM, YYYY"
                        )}
                    </td>
                    <td className='krishiBazaar-td'>
                        <span>
                            {element.addFarmDetails.reduce(
                                (acc, curr) => acc + curr.area,
                                element.extraAcre ? element.extraAcre : 0
                            )}{" "}
                            acre
                        </span>
                    </td>

                    <td className='krishiBazaar-td'>
                        <Link
                            to={`/admin/KisaanStation/MyStation/Services/Order%20Details?_id=${element._id}`}
                            className='krishiBazaar-td--view-button'>
                            View
                        </Link>
                    </td>
                </tr>
            );
        case "On the way":
            return (
                <tr className='tr'>
                    <td className='krishiBazaar-td'>{element?.bookingId}</td>
                    <td className='krishiBazaar-td'>{element?.username}</td>
                    <td className='krishiBazaar-td'>{element?.ksName}</td>
                    <td className='krishiBazaar-td'>
                        {capitalizeFirst(element?.serviceName)}
                    </td>
                    <td className='krishiBazaar-td'>
                        {moment(element.bookingDate, "DD/MM/YYYY").format(
                            "DD  MMM, YYYY"
                        )}
                    </td>
                    <td className='krishiBazaar-td'>
                        <span>
                            {element.addFarmDetails.reduce(
                                (acc, curr) => acc + curr.area,
                                element.extraAcre ? element.extraAcre : 0
                            )}{" "}
                            acre
                        </span>
                    </td>

                    <td className='krishiBazaar-td'>
                        <Link
                            to={`/admin/KisaanStation/MyStation/Services/Order%20Details?_id=${element._id}`}
                            className='krishiBazaar-td--view-button'>
                            View
                        </Link>
                    </td>
                </tr>
            );
        case "Approved":
            return (
                <tr className='tr'>
                    <td className='krishiBazaar-td'>{element?.bookingId}</td>
                    <td className='krishiBazaar-td'>{element?.username}</td>
                    <td className='krishiBazaar-td'>{element?.ksName}</td>
                    <td className='krishiBazaar-td'>
                        {capitalizeFirst(element?.serviceName)}
                    </td>
                    <td className='krishiBazaar-td'>
                        {moment(element.bookingDate, "DD/MM/YYYY").format(
                            "DD  MMM, YYYY"
                        )}
                    </td>
                    <td className='krishiBazaar-td'>
                        <span>
                            {element.addFarmDetails.reduce(
                                (acc, curr) => acc + curr.area,
                                element.extraAcre ? element.extraAcre : 0
                            )}{" "}
                            acre
                        </span>
                    </td>

                    <td className='krishiBazaar-td'>
                        <Link
                            to={`/admin/KisaanStation/MyStation/Services/Order%20Details?_id=${element._id}`}
                            className='krishiBazaar-td--view-button'>
                            View
                        </Link>
                    </td>
                </tr>
            );

        default:
            return <h1>List is Empty</h1>;
    }
};

export default ServicesDetailsTR;
