import React from "react";

const Stats = () => {
    const stats = [1234221, 1223434, 234234];
    const name = ["Total Users", "Total Posts", "Total Comments"];

    return (
        <div className='flex gap-3 flex-col xl:flex-row h-fit'>
            {[1, 2, 3].map((curr, i) => (
                <div
                    className='flex flex-1 flex-col justify-center items-center rounded-xl p-4 border border-slate-500 shadow-sm'
                    key={i}>
                    <div className='text-brown text-xl font-extrabold text-center'>
                        {stats[i].toLocaleString(undefined, { minimumFractionDigits: 0 })}
                    </div>
                    <div className='text-brown text-sm font-medium text-center'>{name[i]}</div>
                </div>
            ))}
        </div>
    );
};

export default Stats;
