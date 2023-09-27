import React from "react";
import moment from "moment";
import "./KrishiBazaarTableCard.scss";
import { Link } from "react-router-dom";

const krishiBazaarTableCard = ({ element }) => {
    const capitalizeFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className='card'>
            <div className='card-body'>
                <div className='krishiBazaarTableCard--header'>
                    <div className='heading d-flex flex-column'>
                        <div
                            className={`${element.trading.toLowerCase()} heading--info`}>
                            {capitalizeFirst(element.trading)}
                        </div>
                        <div className='heading--info'>
                            {capitalizeFirst(element.traderName)}
                        </div>
                    </div>
                    <div className='krishiBazaarTableCard--viewDetails'>
                        <Link
                            to={
                                "/admin/KisaanStation/Krishi%20Bazaar/View%20Details"
                            }
                            state={{ data: element }}
                            className='krishiBazaarTableCard--view-button'>
                            View Details
                        </Link>
                    </div>
                </div>

                <div className='hr'></div>
                <div className='krishiBazaarTableCard-change d-flex justify-content-between flex-column'>
                    <div>
                        <span className='krishiBazaarTableCard-change--left'>
                            Product Name
                        </span>
                        <span>{capitalizeFirst(element.subCategory)}</span>
                    </div>
                </div>
                <div className='krishiBazaarTableCard-change d-flex justify-content-between flex-column'>
                    <div>
                        <span className='krishiBazaarTableCard-change--left'>
                            Date
                        </span>
                        <span>
                            {moment(element.createdAt).format("DD  MMM, YYYY")}
                        </span>
                    </div>
                </div>
                <div className='krishiBazaarTableCard-change d-flex justify-content-between flex-column'>
                    <div>
                        <span className='krishiBazaarTableCard-change--left'>
                            Status
                        </span>
                        <span className={`${element.status.toLowerCase()}`}>
                            {capitalizeFirst(element.status)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default krishiBazaarTableCard;
