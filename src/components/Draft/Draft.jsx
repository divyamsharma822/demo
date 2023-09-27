import React from "react";
import { Card, Loader } from "../../components";
import "./Draft.scss";
import { useGetNewsListQuery } from "../../api/newsApi";
import { Link, useNavigate } from "react-router-dom";
import { SideDrawer } from "../KisaanStation";

const Draft = () => {
    const { data, isLoading } = useGetNewsListQuery("draft");

    const navigate = useNavigate();

    if (isLoading) {
        return <Loader />;
    }

    const handlePublished = () => {
        navigate("/admin/KisaanStation/krishiGyaan/AgriNews");
    };
    const handleDraft = () => {
        navigate("/admin/KisaanStation/krishiGyaan/AgriNews/draft");
    };

    const handleHistory = () => {
        navigate("/admin/KisaanStation/krishiGyaan/AgriNews/history");
    };

    return (
        <div
            style={{ height: "100vh", backgroundColor: "rgb(248,249,250)" }}
            className={`col p-0 m-0`}>
            <div className='row g-0 h-100 overflow-auto'>
                <div className='col-sm-12 p-0 m-0 krishiBazaar d-flex flex-column'>
                    <div
                        className={`col-sm-12 d-flex flex-row justify-content-between align-items-center agrinavbar`}>
                        <SideDrawer />
                        <div>Krishi Gyaan</div>
                        <div>image</div>
                    </div>
                    <div className='topbar m-2 p-2'>
                        <div
                            className='draft-header'
                            style={{ backgroundColor: "white" }}>
                            <div className='draft-left'>
                                <div className='draft-grp'>
                                    <button
                                        type='button'
                                        onClick={handlePublished}>
                                        Active News
                                    </button>
                                    <button type='button' onClick={handleDraft}>
                                        Drafts
                                    </button>
                                    <button
                                        type='button'
                                        onClick={handleHistory}>
                                        History
                                    </button>
                                </div>
                            </div>
                            <div className='draft-right'>
                                <Link
                                    to='/admin/KisaanStation/krishiGyaan/AgriNews/create'
                                    className='draft-header-button'>
                                    {" "}
                                    + Create New
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='news-container d-flex justify-content-start m-2'>
                        {data?.map((element, index) => (
                            <Card key={index} data={element} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Draft;
