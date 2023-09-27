import React from "react";
import "./DashboardCard.scss";

const DashboardCard = ({ title, data, icon, change }) => {
    return (
        <div className='card'>
            <div className='card-body'>
                <div>
                    <div className='dashboard-icon'>{icon}</div>
                    <div className='card-text dashboardCard-card-text'>
                        <div className='dashboardCard-title'>{title}</div>
                        <div className='dashboardCard-number'>{data}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
