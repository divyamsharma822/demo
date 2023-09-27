import React from "react";

const KSTable = ({ element, setShow }) => {
    const capitalizeFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <tr className='tr'>
            <td className='krishiBazaar-td'>
                {capitalizeFirst(element.ksLocation?.address)}
            </td>
            <td className='krishiBazaar-td'>{capitalizeFirst(element.name)}</td>
            <td className='krishiBazaar-td'>{capitalizeFirst(element.name)}</td>

            <td className='krishiBazaar-td'>
                <span
                    onClick={() => setShow(true)}
                    className='krishiBazaar-td--view-button'>
                    Manage
                </span>
            </td>
        </tr>
    );
};

export default KSTable;
