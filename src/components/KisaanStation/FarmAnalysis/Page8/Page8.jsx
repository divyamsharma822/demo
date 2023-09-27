import React from "react";
import styles from "./Page8.module.scss";

const Page8 = () => {
    return (
        <div className={`d-flex flex-column ${styles.Page8}`}>
            <div className={styles.heading}>Post Harvesting Preperation</div>
            <div className='d-flex'>
                <div
                    className={styles.card}
                    style={{ backgroundColor: "#D8EEDA" }}>
                    <div className={styles.name}>Expected Price Range</div>
                    <div className={styles.val}>₹12,000 - ₹18,000</div>
                </div>
                <div
                    className={styles.card}
                    style={{ backgroundColor: "#FFEACD" }}>
                    <div className={styles.name}>Last Year Crop Price</div>
                    <div className={styles.val}>₹14000</div>
                </div>
            </div>
            <div className='d-flex mt-3'>
                <div
                    className={styles.card}
                    style={{ backgroundColor: "#FFEACD" }}>
                    <div className={styles.name}>Expected Logistics</div>
                    <div className={styles.val}>Fresh Feilds</div>
                </div>
                <div
                    className={styles.card}
                    style={{ backgroundColor: "#D8EEDA" }}>
                    <div className={styles.name}>Expected Storage</div>
                    <div className={styles.val}>AgroAcres</div>
                </div>
            </div>
            <div className={styles.hr}></div>
            {[
                {
                    name: "Potential Buyers",
                    val: `Farm Fresh Agro
                    Agro Corporations 
                    Fresh feilds`,
                },
                {
                    name: "Description",
                    val: `Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duisenim velit mollit. Exercitation veniam consesunt nostrud amet.`,
                },
            ].map((curr, index) => (
                <div className={`col-12 d-flex ${styles.content}`} key={index}>
                    <div className={`col-4 ${styles.left}`}>{curr.name}</div>
                    <div
                        className={`col-1`}
                        style={{ fontSize: "18px", fontWeight: "500" }}>
                        :
                    </div>
                    <div className={`col-7 d-flex ${styles.right}`}>
                        {curr.val}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Page8;
