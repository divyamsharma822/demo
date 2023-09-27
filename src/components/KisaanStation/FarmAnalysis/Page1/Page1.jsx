import React from "react";
import styles from "./Page1.module.scss";
import logos from "../../../../assests/anaysisReport_logos.png";

const Page1 = () => {
    return (
        <div
            className={`d-flex align-items-center flex-column ${styles.Page1}`}>
            <div className={styles.heading}>Crop Monitoring Report</div>
            <div className={styles.subheading}>
                Captured by Remote Sensing, Drones, Analyzed by modern AI and
                Robots
            </div>
            <div className={styles.logos}>
                <img src={logos} alt='' height={65} />
            </div>
            <div className={styles.centerContent}>
                <div
                    className={`d-flex justify-content-between align-items-center ${styles.top}`}>
                    <div className={styles.topheading}>Basic Details</div>
                    <div className={`d-flex align-items-center ${styles.date}`}>
                        Date of Survey :{" "}
                        <span className={styles.date}> 12/12/2001</span>
                    </div>
                </div>
                <div className={`row g-0 ${styles.bottom}`}>
                    {[
                        { name: "Farmer name", val: "Demo" },
                        { name: "Kisaan ID", val: 12212 },
                        {
                            name: "Address",
                            val: "Ithum Tower, Noida Electronic city, Uttar Pardesh, 201203",
                        },
                        { name: "Email ID", val: "Anonymous@gmail.com" },
                        { name: "Mobile No", val: "7253446289" },
                        {
                            name: "Nearest Kisaan Station",
                            val: "Laalganj, Mirzapur",
                        },
                        {
                            name: "Report Released By",
                            val: "Daybest Aerospace",
                        },
                    ].map((curr, index) => (
                        <div className={`col-12 d-flex`} key={index}>
                            <div className={`col-5 ${styles.left}`}>
                                {curr.name}
                            </div>
                            <div
                                className={`col-1`}
                                style={{ fontSize: "18px", fontWeight: "500" }}>
                                :
                            </div>
                            <div className={`col-6 ${styles.right}`}>
                                {curr.val}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page1;
