import React from "react";
import moment from "moment";
import "./Tr.scss";
import { Link } from "react-router-dom";

const Tr = ({ element, index }) => {
    const capitalizeFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <tr className='tr'>
            <td className='krishiBazaar-td'>{index + 1}</td>
            <td className='krishiBazaar-td'>{capitalizeFirst(element.traderName)}</td>
            <td className='krishiBazaar-td'>{capitalizeFirst(element.subCategory)}</td>
            <td className='krishiBazaar-td'>{moment(element.createdAt).format("DD  MMM, YYYY")}</td>
            <td className='krishiBazaar-td'>{element.quantity && element.quantity ? element.quantity : 1}</td>
            <td className='krishiBazaar-td'>{capitalizeFirst(element.trading)}</td>
            <td className='krishiBazaar-td'>
                <span className={`${element.status.toLowerCase()}`}>{capitalizeFirst(element.status)}</span>
            </td>

            <td className='krishiBazaar-td'>
                <Link
                    to={"/admin/KisaanStation/Krishi%20Bazaar/View%20Details"}
                    state={{ data: element }}
                    className='krishiBazaar-td--view-button'>
                    View
                </Link>
            </td>
        </tr>
    );
};

export default Tr;
