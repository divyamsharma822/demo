import React from "react";
import FarmCard from "../../components/Dashboard/FarmCard/FarmCard";
import KisaanStationCard from "../../components/Dashboard/KisaanStationCard/KisaanStationCard";
import KrishiBazaarCard from "../../components/Dashboard/KrishiBazaarCard/KrishiBazaarCard";
import MapCard from "../../components/Dashboard/MapCard/MapCard";
import NotificationsCard from "../../components/Dashboard/NotificationsCard/NotificationsCard";
import OrderCard from "../../components/Dashboard/OrderCard/OrderCard";
import PayOrderCard from "../../components/Dashboard/PayCard/PayCard";
import Stats from "../../components/Dashboard/Stats/Stats";
import Topbar from "../../components/Dashboard/Topbar/Topbar";
import "./Dashboard.scss";

const Dashboard = () => {
    return (
        <div
            style={{
                height: "100vh",
                overflow: "auto",
                backgroundColor: "rgb(248,249,250)",
            }}
            className='col p-4 m-0'>
            <Topbar />
            <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-3 mb-3'>
                <PayOrderCard />
                <OrderCard />
                <KisaanStationCard />
                <KrishiBazaarCard />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 '>
                <div>
                    <FarmCard />
                    <MapCard />
                </div>
                <div>
                    <Stats />
                    <NotificationsCard />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
