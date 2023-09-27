import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./FarmAnalysisView.module.scss";
import TopInfo from "../../../components/KisaanStation/FarmAnalysis/TopInfo/TopInfo";
import { Breadcrumb } from "../../../components";

const AnalysisReportView = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const element = location.state?.data;

    return (
        <>
            <div className={`col p-0 m-0 ${styles.FarmAnalysisView}`}>
                <div className={`row g-0 h-100 overflow-auto`}>
                    <div className={`col-sm-12 p-0 m-0`}>
                        <div className={`row g-0`}>
                            <div
                                className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}>
                                <Breadcrumb />
                                <div>&nbsp;</div>
                            </div>
                            <div className={`col-sm-12`}>
                                <TopInfo element={element} />

                                <div className={`${styles.buttons}`}>
                                    <button
                                        className={` ${styles.cancelButton}`}
                                        onClick={() => navigate(-1)}>
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AnalysisReportView;
