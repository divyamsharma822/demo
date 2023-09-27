import React from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect } from "react";
import { useState } from "react";
import { ArcElement as ChartJSArcElement, Tooltip, Chart as ChartJS } from "chart.js";

ChartJS.register(ChartJSArcElement, Tooltip);

const KrishiBazaarCard = () => {
    const [width, setWidth] = useState(window.innerWidth);

    const stats = {
        totalRequests: 24443,
    };

    const data = {
        labels: ["Total Requests", "Total Products", "Sell Products", "Rent Products"],
        datasets: [
            {
                label: "My First Dataset",
                data: [634, 50, 100, 200],
                backgroundColor: ["#D3D3D3", "#349747", "#F39A00", "#7BB2E6"],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Don't maintain w/h ratio
        cutout: 30,
        margin: 30,
    };

    useEffect(() => {
        const onResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, [width]);

    return (
        <div className='KisaanStationCard flex flex-col rounded-md p-4 border border-slate-500 shadow-sm gap-2'>
            <div className='font-medium text-orange'>Krishi Bazaar</div>
            <div className='flex'>
                <div className='flex-[0.69] pr-2 max-h-[100px] 3xl:max-h-none'>
                    <Doughnut
                        data={data}
                        width={"100%"}
                        options={options}
                    />
                </div>
                <div className='flex flex-col flex-1 text-[11px] 3xl:text-[14px] justify-evenly'>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <div className='w-[8px] h-[80%] rounded-full bg-[#D3D3D3] mr-1'></div>
                            <div className='text-gray font-medium'>Total Requests</div>
                        </div>
                        <div className='text-brown font-bold'>{stats.totalRequests.toLocaleString()}</div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <div className='w-[8px] h-[80%] rounded-full bg-[#349747] mr-1'></div>
                            <div className='text-gray font-medium'>Total Products</div>
                        </div>
                        <div className='text-brown font-bold'>{stats.totalRequests.toLocaleString()}</div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <div className='w-[8px] h-[80%] rounded-full bg-[#F39A00] mr-1'></div>
                            <div className='text-gray font-medium'>Sell Products</div>
                        </div>
                        <div className='text-brown font-bold'>{stats.totalRequests.toLocaleString()}</div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <div className='w-[8px] h-[80%] rounded-full bg-[#7BB2E6] mr-1'></div>
                            <div className='text-gray font-medium'>Rent Products</div>
                        </div>
                        <div className='text-brown font-bold'>{stats.totalRequests.toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KrishiBazaarCard;
