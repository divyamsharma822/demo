import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./AnalysisReportView.module.scss";
import { Breadcrumb, ConfirmDialog, ErrorDialog } from "../../../components";
import { SideDrawer } from "../../../components/KisaanStation";
import Section1 from "../../../components/KisaanStation/FarmAnalysis/Section1/Section1";
import Section2 from "../../../components/KisaanStation/FarmAnalysis/Section2/Section2";
import Section3 from "../../../components/KisaanStation/FarmAnalysis/Section3/Section3";
import Section4 from "../../../components/KisaanStation/FarmAnalysis/Section4/Section4";
import Section5 from "../../../components/KisaanStation/FarmAnalysis/Section5/Section5";
import Section6 from "../../../components/KisaanStation/FarmAnalysis/Section6/Section6";
import Section7 from "../../../components/KisaanStation/FarmAnalysis/Section7/Section7";
import Section8 from "../../../components/KisaanStation/FarmAnalysis/Section8/Section8";
import Section10 from "../../../components/KisaanStation/FarmAnalysis/Section10/Section10";
import Section9 from "../../../components/KisaanStation/FarmAnalysis/Section9/Section9";
import Section11 from "../../../components/KisaanStation/FarmAnalysis/Section11/Section11";
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

const AnalysisReportView = () => {
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);

    const location = useLocation();
    const element = location.state?.data;

    const componentRef = React.useRef(null);

    return (
        <>
            {confirmDialog && (
                <ConfirmDialog
                    msg={"Successfully Updated"}
                    onConfirmFunc={function () {
                        setConfirmDialog(false);
                    }}
                />
            )}

            {errorDialog && (
                <ErrorDialog
                    msg={"Something went wrong, Try Again..."}
                    onConfirmFunc={function () {
                        setErrorDialog(false);
                    }}
                />
            )}
            <div className={`col p-0 m-0 g-0 ${styles.AnalysisReportView}`}>
                <div
                    className={`col-sm-12 d-flex flex-column justify-content-center align-items-center d-none ${styles.pdf}`}>
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
                <div className={`row g-0 h-100 overflow-auto`}>
                    <div className={`col-sm-12 p-0 m-0 ${styles.content}`}>
                        <div className={`row g-0`}>
                            <div
                                className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}>
                                <SideDrawer />
                                <Breadcrumb />
                                <div>&nbsp;</div>
                            </div>
                            <div className={`col-sm-12`}>
                                <div
                                    className={`col-md-auto ${styles.sections}`}>
                                    <div
                                        className={`d-flex justify-content-between align-items-center flex-column flex-md-row ${styles.header}`}>
                                        <div className={styles.heading}>
                                            {element.name}'s Farm
                                        </div>
                                        <div
                                            className={`d-flex justify-content-between justify-content-md-end align-items-center ${styles.date}`}>
                                            Date of Survey : 12/12/2022
                                            <ReactToPrint
                                                trigger={() => (
                                                    <button
                                                        type='button'
                                                        className={
                                                            styles.saveBtn
                                                        }>
                                                        Save as PDF
                                                    </button>
                                                )}
                                                documentTitle='Analysis Report'
                                                content={() =>
                                                    componentRef.current
                                                }
                                                removeAfterPrint={false}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.hr}></div>
                                    <Section1
                                        id='page1'
                                        setConfirmDialog={setConfirmDialog}
                                        setErrorDialog={setErrorDialog}
                                    />
                                    <div
                                        className={styles.hr}
                                        style={{ margin: "3em 2em" }}></div>
                                    <Section2
                                        id='page2'
                                        setConfirmDialog={setConfirmDialog}
                                        setErrorDialog={setErrorDialog}
                                    />
                                    <div
                                        className={styles.hr}
                                        style={{ margin: "3em 2em" }}></div>
                                    <Section3
                                        setConfirmDialog={setConfirmDialog}
                                        setErrorDialog={setErrorDialog}
                                    />
                                    <div
                                        className={styles.hr}
                                        style={{ margin: "3em 2em" }}></div>
                                    <Section4
                                        setConfirmDialog={setConfirmDialog}
                                        setErrorDialog={setErrorDialog}
                                    />
                                    <div
                                        className={styles.hr}
                                        style={{ margin: "3em 2em" }}></div>
                                    <Section5
                                        setConfirmDialog={setConfirmDialog}
                                        setErrorDialog={setErrorDialog}
                                    />
                                    <div
                                        className={styles.hr}
                                        style={{ margin: "3em 2em" }}></div>
                                    <Section6
                                        setConfirmDialog={setConfirmDialog}
                                        setErrorDialog={setErrorDialog}
                                    />
                                    <div
                                        className={styles.hr}
                                        style={{ margin: "3em 2em" }}></div>
                                    <Section7
                                        setConfirmDialog={setConfirmDialog}
                                        setErrorDialog={setErrorDialog}
                                    />
                                    <div
                                        className={styles.hr}
                                        style={{ margin: "3em 2em" }}></div>
                                    <Section8
                                        setConfirmDialog={setConfirmDialog}
                                        setErrorDialog={setErrorDialog}
                                    />
                                    <div
                                        className={styles.hr}
                                        style={{ margin: "3em 2em" }}></div>
                                    <Section9
                                        setConfirmDialog={setConfirmDialog}
                                        setErrorDialog={setErrorDialog}
                                    />
                                    <div
                                        className={styles.hr}
                                        style={{ margin: "3em 2em" }}></div>
                                    <Section10
                                        setConfirmDialog={setConfirmDialog}
                                        setErrorDialog={setErrorDialog}
                                    />
                                    <div
                                        className={styles.hr}
                                        style={{ margin: "3em 2em" }}></div>
                                    <Section11
                                        setConfirmDialog={setConfirmDialog}
                                        setErrorDialog={setErrorDialog}
                                    />
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
