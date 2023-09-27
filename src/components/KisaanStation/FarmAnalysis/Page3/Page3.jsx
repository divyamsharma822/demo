import React from "react";
import styles from "./Page3.module.scss";
import CropStageImg from "../../../../assests/cropStage.png";

const Page3 = () => {
    return (
        <div className={`d-flex flex-column ${styles.Page3}`}>
            <div className={styles.heading}>Crop Details</div>
            {[
                {
                    name: "Crop Name",
                    val: "Wheat",
                },
                {
                    name: "Crop Name",
                    val: "F-1323",
                },
                {
                    name: "Cropped Area (In Acre)",
                    val: 12.5,
                },
                {
                    name: "Crop Stage",
                    val: 2,
                },
                {
                    name: "Crop Description",
                    val: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
                },
            ].map((curr, index) => (
                <div className={`col-12 d-flex ${styles.content}`} key={index}>
                    <div className='col-1' style={{ fontWeight: "600" }}>
                        {index + 1}.
                    </div>
                    <div className={`col-4 ${styles.left}`}>{curr.name}</div>
                    <div
                        className={`col-1`}
                        style={{ fontSize: "18px", fontWeight: "500" }}>
                        :
                    </div>
                    <div className={`col-6 d-flex ${styles.right}`}>
                        {curr.val}
                        {index === 3 && <img src={CropStageImg} alt='' />}
                    </div>
                </div>
            ))}
            <br />
            <br />
            <div className={styles.heading}>Insurance Details</div>
            {[
                {
                    name: "Policy Number",
                    val: 3543534,
                },
                {
                    name: "Insurance Company",
                    val: "F-1323",
                },
                {
                    name: "Total EMI Paid",
                    val: 10000,
                },
                {
                    name: "Sum Assured Amount",
                    val: 10000,
                },
                {
                    name: "Crop Loss Claim",
                    val: 10000,
                },
            ].map((curr, index) => (
                <div className={`col-12 d-flex ${styles.content}`} key={index}>
                    <div className='col-1' style={{ fontWeight: "600" }}>
                        {index + 1}.
                    </div>
                    <div className={`col-4 ${styles.left}`}>{curr.name}</div>
                    <div
                        className={`col-1`}
                        style={{ fontSize: "18px", fontWeight: "500" }}>
                        :
                    </div>
                    <div className={`col-6 ${styles.right}`}>{curr.val}</div>
                </div>
            ))}
        </div>
    );
};

export default Page3;
