import React from "react";

const OrderCard = () => {
    let number = 343434;

    return (
        <div className='flex flex-col rounded-md p-4 border border-slate-500 shadow-sm gap-2'>
            <div className='flex justify-between w-full mb-3'>
                <div className='font-medium text-orange'>PayOrderCard</div>
                <div>
                    <select className='bg-transparent border-0 focus:outline-none text-brown text-sm font-medium cursor-pointer'>
                        <option value={"Today"}>Today</option>
                        <option value={"Weekly"}>Weekly</option>
                        <option value={"Monthly"}>Monthly</option>
                    </select>
                </div>
            </div>
            <div className='flex justify-between text-sm'>
                <div className='text-[#8F8F8F]'>Total Orders</div>
                <div className='text-brown font-bold'>{number.toLocaleString()}</div>
            </div>
            <div className='flex justify-between text-sm'>
                <div className='text-[#8F8F8F]'>Completed</div>
                <div className='text-brown font-bold'>{number.toLocaleString()}</div>
            </div>
            <div className='flex justify-between text-sm'>
                <div className='text-[#8F8F8F]'>Pending</div>
                <div className='text-brown font-bold'>{number.toLocaleString()}</div>
            </div>
        </div>
    );
};

export default OrderCard;
