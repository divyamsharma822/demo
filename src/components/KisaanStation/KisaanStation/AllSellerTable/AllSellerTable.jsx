import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import styles from "./AllSellerTable.module.scss";

const AllSellerTable = ({ element, header }) => {
    const capitalizeFirst = (str) => {
        if (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return "-";
    };
    switch (header) {
        case "All":
            return (
                <tr className='tr'>
                    <td className='krishiBazaar-td'>{element?.SPID}</td>
                    <td className='krishiBazaar-td'>{element?.fullName}</td>
                    <td className='krishiBazaar-td'>
                        {moment(element.createdAt).format("DD  MMM, YYYY")}
                    </td>
                    <td className={`krishiBazaar-td`}>
                        <span
                            style={{ maxWidth: "80%" }}
                            className='d-block text-truncate'>
                            {element?.address?.area}, {element?.address?.state}
                        </span>
                    </td>
                    <td className='krishiBazaar-td'>
                        <div
                            style={{ maxWidth: "fit-content", margin: "auto" }}
                            className={`d-flex justify-content-center flex-grow-1 ${
                                element.status === "Active"
                                    ? styles.btnActive
                                    : ""
                            } ${
                                element.status === "In-active"
                                    ? styles.btnInActive
                                    : ""
                            }`}>
                            {capitalizeFirst(element?.status)}
                        </div>
                    </td>
                    <td className='krishiBazaar-td'>
                        <div className='d-flex justify-content-center'>
                            <Link
                                to={
                                    "/admin/KisaanStation/Kisaan%20Station/Sellers/View"
                                }
                                state={{ data: element }}
                                className='krishiBazaar-td--view-button'>
                                View
                            </Link>
                        </div>
                    </td>
                </tr>
            );
        case "Approvals":
            return (
                <tr className='tr'>
                    <td className='krishiBazaar-td'>{element?.fullName}</td>
                    <td className={`krishiBazaar-td`}>
                        <span
                            style={{ maxWidth: "80%" }}
                            className='d-block text-truncate'>
                            {element?.address?.area}, {element?.address?.state}
                        </span>
                    </td>
                    <td className='krishiBazaar-td'>
                        {moment(element.createdAt).format("DD  MMM, YYYY")}
                    </td>
                    <td className='krishiBazaar-td'>
                        <div
                            style={{ maxWidth: "fit-content" }}
                            className={`d-flex justify-content-center ${
                                element.status === "Pending"
                                    ? styles.btnPending
                                    : ""
                            }${
                                element.status === "Rejected"
                                    ? styles.btnRejected
                                    : ""
                            }`}>
                            {capitalizeFirst(element?.status)}
                        </div>
                    </td>
                    <td className='krishiBazaar-td'>
                        <div className='d-flex justify-content-center'>
                            <Link
                                to={
                                    "/admin/KisaanStation/Kisaan%20Station/Sellers/Approvals/View"
                                }
                                state={{ data: element }}
                                className='krishiBazaar-td--view-button'>
                                View
                            </Link>
                        </div>
                    </td>
                </tr>
            );
        default:
            return <h1>List is Empty</h1>;
    }
};

export default AllSellerTable;
