import React from "react";

const Topbar = () => {
    const d = new Date();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className='flex justify-between mb-3'>
            <div className='flex flex-col gap-1'>
                <span className='date'>
                    <i className='fa-solid fa-calendar-days me-2 text-orange'></i>
                    <span className='text-brown font-semibold text-sm'>{month[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()}</span>
                </span>
                <h3 className='text-xl font-semibold text-brown'>Dashboard</h3>
            </div>
        </div>
    );
};

export default Topbar;
