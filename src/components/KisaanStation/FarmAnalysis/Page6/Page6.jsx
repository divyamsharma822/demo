import React from "react";
import styles from "./Page6.module.scss";

const Page6 = () => {
    return (
        <div className={`d-flex flex-column ${styles.Page6}`}>
            <div className={styles.heading}>Disease Detection</div>
            <div className={styles.contentbox}>
                {[
                    {
                        name: "Name of disease (A)",
                        val: "Black Spot",
                    },
                    {
                        name: "Cause",
                        val: "A potassium deficiency that causes the leaves on a vine to turn purple and eventually black as chlorophyll is lost.",
                    },
                    {
                        name: "Stage",
                        val: "Initial Infection",
                    },
                    {
                        name: "Effects",
                        val: "Reduced crop yields & marketability of fruits. ",
                    },
                    {
                        name: "Symptoms",
                        val: "Potassium deficiency in plants including brown scorching and curling of leaf tips as well as yellowing between leaf veins. Purple spots may also appear on the leaf undersides.",
                    },
                    {
                        name: "Treatment",
                        val: `Use potassium chloride (muriate of potash)
                        Potassium nitrate
                        Potassium sulfate
                        Monopotassium phosphate`,
                    },
                    {
                        name: "Description",
                        val: "Potassium-rich treatments suitable for organicfarming include feeding with home-made comfrey liquid, adding seaweed meal, vermiculite,",
                    },
                ].map((curr, index) => (
                    <div
                        className={`col-12 d-flex ${styles.content}`}
                        key={index}>
                        <div className={`col-4 ${styles.left}`}>
                            {curr.name}
                        </div>
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
        </div>
    );
};

export default Page6;
