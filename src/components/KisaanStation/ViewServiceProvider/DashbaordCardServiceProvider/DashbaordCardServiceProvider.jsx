import React from "react";
import styles from "./DashbaordCardServiceProvider.module.scss";

const DashbaordCardServiceProvider = ({ title, data, icon }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardbody}>
                <div className='d-flex flex-wrap'>
                    <div className={styles.icon}>{icon}</div>
                    <div className={` ${styles.cardtext}`}>
                        <div className={styles.title}>{title}</div>
                        <div className={styles.number}>{data}</div>
                    </div>
                </div>
                <div className='hr'></div>
            </div>
        </div>
    );
};
export default DashbaordCardServiceProvider;
