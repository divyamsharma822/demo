import React from "react";
import { SideDrawer } from "../../components/KisaanStation";
import styles from "./ComingSoon.module.scss";

const ComingSoon = () => {
    return (
        <div
            style={{
                height: "100vh",
                overflow: "auto",
                backgroundColor: "rgb(248,249,250)",
            }}
            className={`col p-0 m-0 ${styles.FarmAnalysis}`}>
            <div className={`col-sm-12 p-0 m-0 krishiBazaar d-flex flex-column ${styles.content}`}>
                <div className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}>
                    <SideDrawer />
                    <div>&nbsp;</div>
                </div>

                <div className={`col-sm-12 w-100 `}>
                    <div className={`${styles.middlebar} `}>Not Available</div>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
