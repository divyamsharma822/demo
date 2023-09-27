import React from "react";
import { SideDrawer } from "../KisaanStation";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import "./History.scss";
const History = () => {
    const navigate = useNavigate();
    const handlePublished = () => {
        navigate("/admin/KisaanStation/krishiGyaan/AgriNews");
    };
    const handleDraft = () => {
        navigate("/admin/KisaanStation/krishiGyaan/AgriNews/draft");
    };

    const handleHistory = () => {
        navigate("/admin/KisaanStation/krishiGyaan/AgriNews/history");
    };
    const data = useSelector((state) => state.history.list);
    return (
        <div
            style={{ height: "100vh", backgroundColor: "rgb(248,249,250)" }}
            className={`col p-0 m-0 `}>
            <div className='row h-100 g-0 overflow-auto'>
                <div
                    className={`col-sm-12 p-0 m-0 krishiBazaar d-flex flex-column`}>
                    <div
                        className={`col-sm-12 d-flex flex-row justify-content-between align-items-center agrinavbar`}>
                        <SideDrawer />
                        <div>Krishi Gyaan</div>
                        <div>image</div>
                    </div>
                    <div className='col-sm-12 p-3 d-flex flex-column'>
                        <div className='topbar m-0 p-0'>
                            <div
                                className='history-header'
                                style={{ backgroundColor: "white" }}>
                                <div className='history-left'>
                                    <div className='history-grp'>
                                        <button
                                            type='button'
                                            onClick={handlePublished}>
                                            Active News
                                        </button>
                                        <button
                                            type='button'
                                            onClick={handleDraft}>
                                            Drafts
                                        </button>
                                        <button
                                            type='button'
                                            onClick={handleHistory}>
                                            History
                                        </button>
                                    </div>
                                </div>
                                <div className='history-right'>
                                    <Link
                                        to='/admin/KisaanStation/krishiGyaan/AgriNews/create'
                                        className='history-header-button'>
                                        {" "}
                                        + Create New
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='news-container d-flex justify-content-start my-3'>
                            <table className='table table-responsive-xs'>
                                <thead>
                                    <tr>
                                        <th>Updated Time</th>
                                        <th>News Title</th>
                                        <th>Changes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((element, index) => (
                                        <tr key={index}>
                                            <td>
                                                {moment(element.time).fromNow()}
                                            </td>
                                            <td>{element.title}</td>
                                            <td>{element.changes}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
