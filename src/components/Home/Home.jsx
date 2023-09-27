import React from "react";
import { useGetNewsListQuery } from "../../api/newsApi";
import { Card, Header, Loader } from "../../components";
import { SideDrawer } from "../KisaanStation";
import "./Home.scss";

const Home = () => {
    const { data, isLoading } = useGetNewsListQuery("published");

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div
            style={{
                height: "100vh",
                overflow: "auto",
                backgroundColor: "rgb(248,249,250)",
            }}
            className={`col p-0 m-0`}>
            <div className='row g-0 h-100 overflow-auto'>
                <div
                    className={`col-sm-12 p-0 m-0 krishiBazaar d-flex flex-column`}>
                    <div
                        className={`col-sm-12 d-flex flex-row justify-content-between align-items-center agrinavbar`}>
                        <SideDrawer />
                        <div>Krishi Gyaan</div>
                        <div>image</div>
                    </div>

                    <div className='topbar m-3'>
                        <Header />
                    </div>
                    <div className='news-container d-flex justify-content-start m-2'>
                        {data?.map((element, index) => (
                            <Card key={index} data={element} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
