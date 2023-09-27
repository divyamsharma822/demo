import React from "react";
import moment from "moment";
import "./KSTable.scss";
import { Link } from "react-router-dom";

const KSTable = ({ element, index, header }) => {
    const capitalizeFirst = (str) => {
        if (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return "-";
    };

    return header === "Approved" ? (
        <tr className='tr'>
            <td className='krishiBazaar-td'>{element?.ksId}</td>
            <td className='krishiBazaar-td'>{element?.ksName}</td>
            <td className={`krishiBazaar-td text-truncate`}>
                {capitalizeFirst(element?.ksLocation?.address)}
            </td>
            <td className='krishiBazaar-td'>
                {capitalizeFirst(element?.name)}
            </td>
            <td className='krishiBazaar-td'>
                {capitalizeFirst(element?.ksLocation?.state)}
            </td>
            <td className='krishiBazaar-td d-flex justify-content-center'>
                <span
                    className={`${element?.ksStatus}`}
                    style={{ maxWidth: "fit-content" }}>
                    {capitalizeFirst(element?.ksStatus)}
                </span>
            </td>

            <td className='krishiBazaar-td'>
                <Link
                    to={
                        "/admin/KisaanStation/Kisaan%20Station/Stations/Service%20Providers"
                    }
                    state={{ data: element }}
                    className='krishiBazaar-td--view-button'>
                    View
                </Link>
            </td>
        </tr>
    ) : (
        <tr className='tr'>
            <td className={`krishiBazaar-td text-truncate`}>
                {capitalizeFirst(element?.name)}
            </td>
            <td className={`krishiBazaar-td text-truncate`}>
                {capitalizeFirst(element?.ksLocation?.address)}
            </td>
            <td className={`krishiBazaar-td text-truncate`}>
                {capitalizeFirst(element?.ksLocation?.state)}
            </td>
            <td className='krishiBazaar-td'>
                {moment(element.updatedAt).format("DD  MMM, YYYY")}
            </td>
            <td className='krishiBazaar-td'>
                <span className={`${element.status.toLowerCase()}`}>
                    {capitalizeFirst(element.status)}
                </span>
            </td>

            <td className='krishiBazaar-td'>
                <Link
                    to={
                        "/admin/KisaanStation/Kisaan%20Station/Stations/Requests/View%20Profile"
                    }
                    state={{ data: element }}
                    className='krishiBazaar-td--view-button'>
                    View
                </Link>
            </td>
        </tr>
    );
};

export default KSTable;
