import React from "react";
import { useState } from "react";
import "./FarmCard.scss";

const FarmCard = () => {
    const [tab, setTab] = useState(0);

    const stats = {
        total: 324343,
        active: 3433,
        pending: 3434,
    };

    const TabContent = () => {
        return (
            <div className='flex flex-col flex-1 text-sm gap-3 md:max-w-[200px]'>
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <div className='w-[8px] h-[80%] rounded-full bg-[#D3D3D3] mr-1'></div>
                        <div className='text-gray font-medium'>Total</div>
                    </div>
                    <div className='text-brown font-bold'>{stats.total.toLocaleString()}</div>
                </div>
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <div className='w-[8px] h-[80%] rounded-full bg-[#349747] mr-1'></div>
                        <div className='text-gray font-medium'>Active</div>
                    </div>
                    <div className='text-brown font-bold'>{stats.active.toLocaleString()}</div>
                </div>
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <div className='w-[8px] h-[80%] rounded-full bg-[#F39A00] mr-1'></div>
                        <div className='text-gray font-medium'>Pending</div>
                    </div>
                    <div className='text-brown font-bold'>{stats.pending.toLocaleString()}</div>
                </div>
            </div>
        );
    };

    const renderTabs = (tab) => {
        switch (tab) {
            case 0:
                return <TabContent />;
            case 1:
                return <TabContent />;
            case 2:
                return <TabContent />;

            default:
                return "Not Available";
        }
    };

    return (
        <div className='FarmCard flex flex-col rounded-md border border-slate-500 shadow-sm p-4 gap-2 h-fit'>
            <div className='flex justify-between w-full mb-3'>
                <div className='text-lg text-brown font-bold'>Farms</div>
                <div>
                    <select className='bg-[#e9e9e9] px-2 py-1 rounded-lg border-0 focus:outline-none text-brown text-sm font-medium appearance-none text-center cursor-pointer'>
                        <option value={"Today"}>Today</option>
                        <option value={"Weekly"}>Weekly</option>
                        <option value={"Monthly"}>Monthly</option>
                    </select>
                </div>
            </div>
            <div className='overflow-hidden w-full'>
                <div className='flex gap-3 text-sm 2xl:text:md font-medium border-b-[1px] border-spacing-y-1 border-[#8f8f8f4a] text-[#8f8f8f] mb-3 pb-2 overflow-x-scroll overflow-y-hidden no-scrollbar'>
                    {["All", "Farm Status", "Irrigation", "Yeild Estimation", "Crop Health"].map((curr, index) => (
                        <div
                            className={
                                tab === index
                                    ? "active text-brown cursor-pointer font-medium text-center min-w-fit"
                                    : "text-center cursor-pointer min-w-fit"
                            }
                            onClick={() => setTab(index)}
                            key={curr + index}>
                            {curr}
                        </div>
                    ))}
                </div>
                {renderTabs(tab)}
            </div>
        </div>
    );
};

export default FarmCard;
