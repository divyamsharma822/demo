import React from "react";
import styles from "./DailyExpensesModal.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import fileIcon from "../../../../assests/DailyAnalysisModalIcon.png";

const DailyExpensesModal = ({ setShowModal, element }) => {
    return (
        <>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <div className={styles.header}>
                        <div>Ajay Kumar Dodiya</div>
                        <IoCloseOutline
                            size={45}
                            className={styles.close}
                            onClick={() => setShowModal(false)}
                        />
                    </div>
                    <div className={styles.bottomContent}>
                        <div className='d-flex justify-content-between my-2'>
                            <div className={styles.dept}>
                                Department - Designation
                            </div>
                            <div className={`${styles.date} text-end`}>
                                04-12-2021
                            </div>
                        </div>
                        <div className={styles.infoWrapper}>
                            <div className={styles.info}>
                                <div className={styles.left}>
                                    Total Amount -
                                </div>
                                <div className={styles.right}>3050</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.left}>Description -</div>
                                <div className={styles.right}>
                                    "Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do{" "}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className={styles.viewinvoice}>
                                View Invoice
                            </div>
                        </div>
                        <div>
                            <div className={styles.imgWrapper}>
                                <a href='https://kisaan-station-app.s3.ap-south-1.amazonaws.com/fieldImages_1671797003203.jpg'>
                                    <img
                                        src={fileIcon}
                                        height='100'
                                        alt=''
                                        className={styles.img}
                                    />
                                </a>
                                <a href='https://kisaan-station-app.s3.ap-south-1.amazonaws.com/fieldImages_1671797003203.jpg'>
                                    <img
                                        src={fileIcon}
                                        height='100'
                                        alt=''
                                        className={styles.img}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DailyExpensesModal;
