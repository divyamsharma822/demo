import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
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

    return (
        <div className='header' style={{ backgroundColor: "white" }}>
            <div className='left'>
                <div className='grp'>
                    <button type='button' onClick={handlePublished}>
                        Active News
                    </button>
                    <button type='button' onClick={handleDraft}>
                        Drafts
                    </button>
                    <button type='button' onClick={handleHistory}>
                        History
                    </button>
                </div>
            </div>
            <div className='right'>
                <Link
                    to='/admin/KisaanStation/krishiGyaan/AgriNews/create'
                    className='header-button'>
                    {" "}
                    + Create New
                </Link>
            </div>
        </div>
    );
};

export default Header;
