import React from "react";
import styles from "./DashboardCard.module.scss";

const DashboardCard = ({
    isLoading,
    isFetching,
    listdata,
    arrleft,
    arrright,
    photo,
    photostyle,
}) => {
    return (
        <div className={`col-md-12 ${styles.infocard}`}>
            <div className='row g-0 w-100'>
                <div
                    className={`card col-md-5 d-flex flex-row justify-content-center ${styles.card1}`}>
                    <img
                        src={photo}
                        style={photostyle}
                        className={styles.photo}
                        alt=''
                    />
                    <div
                        className={`d-flex flex-column align-items-end ${styles.details}`}>
                        <div className={styles.mainheading}>
                            {isLoading || isFetching ? "Loading" : arrleft.data}
                        </div>
                        <div className={styles.subheading}>
                            {arrleft.heading}
                        </div>
                    </div>
                </div>
                <div
                    className={`card col-md-6 d-flex flex-row align-items-center justify-content-between flex-grow-1 ${styles.card2}`}>
                    {arrright.map((element, index) => {
                        return (
                            <div
                                className={`d-flex flex-column flex-grow-1 ${styles.details}`}
                                key={index}>
                                <div className={styles.mainheading}>
                                    {isLoading || isFetching
                                        ? "Loading"
                                        : element.data}
                                </div>
                                <div className={styles.subheading}>
                                    {element.heading}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
