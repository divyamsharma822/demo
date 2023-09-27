import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./KSViewProfile.module.scss";
import { useChangeStatusMutation } from "../../../api/KisaanStationsApi";

import { ConfirmDialog, ErrorDialog, Breadcrumb } from "../../../components";
import SideDrawer from "../SideDrawer/SideDrawer";

const KSViewProfile = () => {
    const [rejectDialog, setRejectDialog] = useState(false);
    const [rejectResponse, setRejectResponse] = useState("");
    const [errorDialog, setErrorDialog] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const [changeStatus] = useChangeStatusMutation();
    const element = location.state?.data;

    const handleApprove = () => {
        changeStatus({
            stationId: element.productId,
            status: "Approved",
            rejReason: null,
        })
            .unwrap()
            .then((payload) => {
                setConfirmDialog(true);
            })
            .catch((error) => {
                setErrorDialog(true);
            });
    };

    const handleReject = () => {
        if (rejectResponse.trim() !== "") {
            changeStatus({
                stationId: element.productId,
                status: "Rejected",
                rejReason: rejectResponse,
            })
                .unwrap()
                .then((payload) => {
                    setRejectDialog(false);
                    setConfirmDialog(true);
                })
                .catch((error) => {
                    setRejectDialog(false);
                    setErrorDialog(true);
                });
        }
    };

    return (
        <>
            {errorDialog ? (
                <ErrorDialog
                    msg={"Something went wrong. Try Again."}
                    onConfirmFunc={() => {
                        navigate(
                            "/admin/KisaanStation/KisaanStation/KisaanStations/Requests"
                        );
                    }}
                />
            ) : (
                ""
            )}
            {confirmDialog ? (
                <ConfirmDialog
                    msg={"Successfully Approved"}
                    onConfirmFunc={() => {
                        navigate(
                            "/admin/KisaanStation/KisaanStation/KisaanStations/Requests"
                        );
                    }}
                />
            ) : (
                ""
            )}
            <div className={`col p-0 m-0 g-0 ${styles.KSViewProfile}`}>
                <div className={`row g-0 h-100 overflow-auto`}>
                    <div className={`col-sm-12 p-0 m-0`}>
                        <div className={`row g-0`}>
                            <div
                                className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}>
                                <SideDrawer />
                                <Breadcrumb />
                                <div>&nbsp;</div>
                            </div>
                            <div className={`col-sm-12`}>
                                <div className={`${styles.details}`}>
                                    <div className={styles.imgwrapper}>
                                        <img
                                            src={element.profileImage}
                                            alt=''
                                            className={`${styles.img} rounded-circle`}
                                        />
                                        <div>{element.name}</div>
                                    </div>
                                    <br />
                                    <div className={styles.hr}></div>
                                    <div className={styles.bottom}>
                                        <div
                                            className={`row d-flex justify-content-between flex-wrap-reverse ${styles.row}`}>
                                            <div className='col-md-6'>
                                                <div
                                                    className={`row g-0 d-flex`}>
                                                    <div
                                                        className='col-md-4'
                                                        style={{
                                                            color: "rgb(161,161,161)",
                                                        }}>
                                                        Location :
                                                    </div>
                                                    <div
                                                        className='col-md-8'
                                                        style={{
                                                            color: "rgb(86,63,31)",
                                                        }}>
                                                        {
                                                            element.ksLocation
                                                                .address
                                                        }
                                                    </div>
                                                    <div
                                                        className='col-md-12'
                                                        style={{
                                                            padding: "1vmax",
                                                        }}></div>
                                                    <div
                                                        className='col-md-4'
                                                        style={{
                                                            color: "rgb(161,161,161)",
                                                        }}>
                                                        Contact No :
                                                    </div>
                                                    <div
                                                        className='col-md-8'
                                                        style={{
                                                            color: "rgb(86,63,31)",
                                                        }}>
                                                        {element.mobileNo}
                                                    </div>
                                                    <div
                                                        className='col-md-12'
                                                        style={{
                                                            padding: "1vmax",
                                                        }}></div>
                                                    <div
                                                        className='col-md-4'
                                                        style={{
                                                            color: "rgb(161,161,161)",
                                                        }}>
                                                        Email :
                                                    </div>
                                                    <div
                                                        className='col-md-8'
                                                        style={{
                                                            color: "rgb(86,63,31)",
                                                        }}>
                                                        {element.mailId}
                                                    </div>
                                                    <div
                                                        className='col-md-12'
                                                        style={{
                                                            padding: "1vmax",
                                                        }}></div>
                                                    <div
                                                        className='col-md-4'
                                                        style={{
                                                            color: "rgb(161,161,161)",
                                                        }}>
                                                        Description :
                                                    </div>
                                                    <div
                                                        className='col-md-8'
                                                        style={{
                                                            color: "rgb(86,63,31)",
                                                        }}>
                                                        {
                                                            element.businessDetails
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className='row g-0'>
                                                    <div
                                                        className='col-md-3'
                                                        style={{
                                                            color: "rgb(161,161,161)",
                                                        }}>
                                                        Id Proof :
                                                    </div>
                                                    <div className='col-md-9 d-flex flex-row'>
                                                        <img
                                                            src={
                                                                element
                                                                    ?.adhaarVerifiction[0]
                                                                    ?.mediaUrl
                                                            }
                                                            className={`${styles.adhaarimg} rounded`}
                                                            alt=''
                                                            style={{
                                                                objectFit:
                                                                    "scale-down",
                                                            }}
                                                            onClick={(e) => {
                                                                e.currentTarget.requestFullscreen();
                                                            }}
                                                        />
                                                        <img
                                                            src={
                                                                element
                                                                    ?.adhaarVerifiction[1]
                                                                    ?.mediaUrl
                                                            }
                                                            className={`${styles.adhaarimg} rounded`}
                                                            alt=''
                                                            style={{
                                                                objectFit:
                                                                    "scale-down",
                                                            }}
                                                            onClick={(e) => {
                                                                e.currentTarget.requestFullscreen();
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.buttons}`}>
                                    <button
                                        className={` ${styles.cancelButton}`}
                                        onClick={() => navigate(-1)}>
                                        Cancel
                                    </button>
                                    {element.status !== "Approved" ? (
                                        <div
                                            className={`d-flex gap-2 ${styles.subrow}`}>
                                            <button
                                                className={styles.rejectButton}
                                                onClick={() =>
                                                    setRejectDialog(true)
                                                }>
                                                Reject
                                            </button>
                                            <button
                                                className={styles.approveButton}
                                                onClick={handleApprove}>
                                                Approve
                                            </button>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {rejectDialog ? (
                <div className={styles.rejectMessageDialog}>
                    <div className={styles.rejectMessageDialoginfo}>
                        <span>Rejection Reason</span>
                        <textarea
                            placeholder='Reason of Rejection'
                            type='text'
                            onChange={(e) => setRejectResponse(e.target.value)}
                            maxLength={40}
                        />
                        <div className={styles.rejectMessageDialogbuttons}>
                            <span
                                onClick={() => setRejectDialog(false)}
                                className={styles.rejectMessageDialogbutton}>
                                Cancel
                            </span>
                            <span
                                onClick={handleReject}
                                className={styles.rejectMessageDialogbutton}>
                                Send
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default KSViewProfile;
