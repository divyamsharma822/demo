import React from "react";
import "./Table.module.scss";
import { Link } from "react-router-dom";

const Table = ({ element, index }) => {
    const capitalizeFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <tr className='tr'>
            <td className='krishiBazaar-td'>{index}</td>
            <td className='krishiBazaar-td'>
                {element?.username ? capitalizeFirst(element?.username) : "N/A"}
            </td>
            <td className='krishiBazaar-td'>
                {element?.mobileNo && element?.mobileNo}
            </td>
            <td className='krishiBazaar-td'>
                {element.address?.area
                    ? capitalizeFirst(element.address?.area)
                    : "N/A"}
            </td>

            <td className='krishiBazaar-td'>
                <Link
                    to={`/admin/KisaanStation/User%20Details/${element?.username}`}
                    state={{ data: element }}
                    className='krishiBazaar-td--view-button'>
                    View
                </Link>
            </td>
        </tr>
    );
};

export default Table;
