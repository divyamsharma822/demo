import React from "react";
import { Breadcrumb } from "../../../components";
import { SideDrawer } from "../../../components/KisaanStation";
import styles from "./AnalysisReportPDF.module.scss";
import ReactToPrint from "react-to-print";
import Page1 from "../../../components/KisaanStation/FarmAnalysis/Page1/Page1";
import Page2 from "../../../components/KisaanStation/FarmAnalysis/Page2/Page2";
import Page3 from "../../../components/KisaanStation/FarmAnalysis/Page3/Page3";
import Page4 from "../../../components/KisaanStation/FarmAnalysis/Page4/Page4";
import Page5 from "../../../components/KisaanStation/FarmAnalysis/Page5/Page5";
import Page6 from "../../../components/KisaanStation/FarmAnalysis/Page6/Page6";
import Page7 from "../../../components/KisaanStation/FarmAnalysis/Page7/Page7";
import Page8 from "../../../components/KisaanStation/FarmAnalysis/Page8/Page8";
import Page10 from "../../../components/KisaanStation/FarmAnalysis/Page10/Page10";
import Page11 from "../../../components/KisaanStation/FarmAnalysis/Page11/Page11";

const AnalysisReportPDF = () => {
    const componentRef = React.useRef(null);

    return (
        <div className={`col p-0 m-0 g-0 ${styles.AnalysisReportPDF}`}>
            <div className={`row g-0 h-100 overflow-auto`}>
                <div className={`col-sm-12 p-0 m-0 ${styles.content}`}>
                    <div className={`row g-0`}>
                        <div
                            className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}>
                            <SideDrawer />
                            <Breadcrumb />
                            <div>&nbsp;</div>
                        </div>
                        <div className={`col-sm-12 ${styles.btn}`}>
                            <ReactToPrint
                                trigger={() => (
                                    <button type='button'>Save as PDF</button>
                                )}
                                documentTitle='Analysis Report'
                                content={() => componentRef.current}
                                removeAfterPrint={true}
                            />
                        </div>
                        <div
                            className={`col-sm-12 d-flex flex-column justify-content-center align-items-center ${styles.pdf}`}>
                            <div ref={componentRef} className={styles.ref}>
                                <Page1 />
                                <Page2 />
                                <Page3 />
                                <Page4 />
                                <Page5 />
                                <Page6 />
                                <Page7 />
                                <Page8 />
                                <Page10 />
                                <Page11 />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisReportPDF;
