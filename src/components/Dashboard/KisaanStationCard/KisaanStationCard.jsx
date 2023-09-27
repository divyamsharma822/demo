import React from "react";
import { useState } from "react";
import "./KisaanStationCard.scss";

const KisaanStationCard = () => {
    const [tab, setTab] = useState(0);

    const TabContent = ({ heading1, heading2, progress1, progress2, count1, count2 }) => {
        return (
            <div className='flex flex-col gap-1'>
                <div className='flex justify-between items-center gap-4'>
                    <div className='text-sm text-[#8F8F8F] min-w-[60px]'>{heading1}</div>
                    <div className='h-2 w-[80%] bg-[#d3d3d3] rounded-full'>
                        <div
                            className='h-2 bg-[#349747] rounded-full'
                            style={{ width: progress1 + "%" }}></div>
                    </div>
                    <div className='text-brown font-semibold'>{count1}</div>
                </div>
                <div className='flex justify-between items-center gap-4'>
                    <div className='text-sm text-[#8F8F8F] min-w-[60px]'>{heading2}</div>
                    <div className='h-2 w-[80%] bg-[#d3d3d3] rounded-full'>
                        <div
                            className='h-2 bg-[#349747] rounded-full'
                            style={{ width: progress2 + "%" }}></div>
                    </div>
                    <div className='text-brown font-semibold'>{count2}</div>
                </div>
            </div>
        );
    };

    const renderTabs = (tab) => {
        switch (tab) {
            case 0:
                return (
                    <TabContent
                        heading1={"Active"}
                        heading2={"InActive"}
                        progress1={45}
                        progress2={45}
                        count1={243}
                        count2={453}
                    />
                );
            case 1:
                return (
                    <TabContent
                        heading1={"Active"}
                        heading2={"InActive"}
                        progress1={45}
                        progress2={45}
                        count1={243}
                        count2={453}
                    />
                );
            case 2:
                return (
                    <TabContent
                        heading1={"Listed"}
                        heading2={"UnListed"}
                        progress1={45}
                        progress2={45}
                        count1={243}
                        count2={453}
                    />
                );

            default:
                return "Not Available";
        }
    };

    return (
        <div className='KisaanStationCard flex flex-col flex-1 rounded-md border border-slate-500 shadow-sm p-4 gap-2'>
            <div className='font-medium text-orange'>Kisaan Station</div>

            <div className='flex gap-3 text-sm 2xl:text:md font-medium border-b-[1px] border-spacing-y-1 border-[#8f8f8f4a] text-[#8f8f8f] mb-2 pb-2 overflow-hidden'>
                {["Stations", "Sellers", "Listings"].map((curr, index) => (
                    <div
                        className={
                            tab === index
                                ? "active text-orange cursor-pointer font-medium text-center min-w-fit"
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
    );
};

export default KisaanStationCard;
