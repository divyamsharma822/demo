import React from "react";
import moment from "moment";
import "./Table.scss";
import { Link } from "react-router-dom";
var classNames = require("classnames");

const Table = ({ element, header }) => {
    const capitalizeFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    var statusClass = classNames({
        Processing:
            element.cropDetails[0]?.cropReportStatus &&
            element.cropDetails[0]?.cropReportStatus === "Processing",
        Completed:
            element.cropDetails[0]?.cropReportStatus &&
            element.cropDetails[0]?.cropReportStatus === "Completed",
    });

    return header === "Farms" ? (
        <tr className='tr'>
            <td className='krishiBazaar-td'>
                {element.name && capitalizeFirst(element.name)}
            </td>
            <td className='krishiBazaar-td'>
                {element.farmDetails?.farmName &&
                    capitalizeFirst(element.farmDetails?.farmName)}
            </td>
            <td className='krishiBazaar-td'>
                {element.farmDetails?.address && (
                    <>
                        {element.farmDetails?.address.length > 20
                            ? capitalizeFirst(
                                  element.farmDetails?.address.substring(0, 20)
                              ) + "..."
                            : capitalizeFirst(element.farmDetails?.address)}
                    </>
                )}
            </td>
            <td className='krishiBazaar-td'>
                {moment(element.createdAt).format("DD  MMM, YYYY")}
            </td>
            <td className='krishiBazaar-td'>
                <Link
                    to={"/admin/KisaanStation/Farm%20Analysis/View"}
                    state={{ data: element }}
                    className='krishiBazaar-td--view-button'>
                    View
                </Link>
            </td>
        </tr>
    ) : (
        <tr className='tr'>
            <td className='krishiBazaar-td'>
                {element.name && capitalizeFirst(element.name)}
            </td>
            <td className='krishiBazaar-td'>
                {element.cropDetails[0]?.nameOfCrop &&
                    capitalizeFirst(element.cropDetails[0]?.nameOfCrop)}
            </td>

            <td className='krishiBazaar-td'>
                {element.farmDetails?.address && (
                    <>
                        {element.farmDetails?.address.length > 20
                            ? capitalizeFirst(
                                  element.farmDetails?.address.substring(0, 20)
                              ) + "..."
                            : capitalizeFirst(element.farmDetails?.address)}
                    </>
                )}
            </td>
            <td className='krishiBazaar-td'>
                {moment(element.createdAt).format("DD  MMM, YYYY")}
            </td>
            <td className='krishiBazaar-td'>
                <span className={statusClass}>
                    {element.cropDetails[0]?.cropReportStatus &&
                        capitalizeFirst(
                            element.cropDetails[0]?.cropReportStatus
                        )}
                </span>
            </td>
            <td className='krishiBazaar-td'>
                <Link
                    to={
                        "/admin/KisaanStation/Farm%20Analysis/Analysis%20Requests/View"
                    }
                    state={{ data: element }}
                    className='krishiBazaar-td--view-button'>
                    View
                </Link>
            </td>
        </tr>
    );
};

export default Table;
