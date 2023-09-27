import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../../MyStation/ServicesDetailsTR/ServicesDetailsTR.module.scss";

const SellerDetailsTable = ({ header, element }) => {
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
        case "Orders":
            return (
                <tr className='tr'>
                    <td className='krishiBazaar-td'>{element?.bookingId}</td>
                    <td className='krishiBazaar-td'>{element?.serviceName}</td>
                    <td className='krishiBazaar-td text-center'>
                        {element?.bookingDate}
                    </td>
                    <td className='krishiBazaar-td text-center'>
                        <span className={`${orderstatus}`}>
                            {element?.orderStatus}
                        </span>
                    </td>

                    <td className='krishiBazaar-td'>
                        <div className='d-flex justify-content-center'>
                            <Link
                                to={`/admin/KisaanStation/Kisaan%20Station/Sellers/View/Order%20Details?_id=${element._id}`}
                                className='krishiBazaar-td--view-button'>
                                View
                            </Link>
                        </div>
                    </td>
                </tr>
            );
        case "Listings":
            return (
                <tr className='tr'>
                    <td className='krishiBazaar-td'>
                        {element?.sellingProductId}
                    </td>
                    <td className='krishiBazaar-td'>{element?.serviceName}</td>
                    <td className='krishiBazaar-td text-center'>
                        {moment(element.modifiedTime).format("DD  MMM, YYYY")}
                    </td>
                    <td className='krishiBazaar-td text-center'>
                        <span
                            className={`${
                                element.sellingStatus === "Active" &&
                                styles.Active
                            }`}>
                            {element?.sellingStatus}
                        </span>
                    </td>
                </tr>
            );
        default:
            return <div className='text-center'>List is Empty</div>;
    }
};

export default SellerDetailsTable;
