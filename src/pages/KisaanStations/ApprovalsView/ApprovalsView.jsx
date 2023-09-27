import React, { useState } from "react";
import styles from "./ApprovalsView.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, ConfirmDialog, ErrorDialog } from "../../../components";
import { useSellerApprovalOrActiveOrInactiveMutation } from "../../../api/KisaanStationsApi";
import { BsArrowLeft } from "react-icons/bs";

const ApprovalsView = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [rejectDialog, setRejectDialog] = useState(false);
    const [rejectResponse, setRejectResponse] = useState("");
    const [errorDialog, setErrorDialog] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [element] = useState(location.state?.data || {});

    const [changeStatus] = useSellerApprovalOrActiveOrInactiveMutation();

    const handleApprove = () => {
        changeStatus({
            seller_id: element._id,
            status: "Active",
            rejReason: undefined,
            InActiveReason: undefined,
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
                seller_id: element._id,
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
                        setErrorDialog(false);
                    }}
                />
            ) : (
                ""
            )}
            {confirmDialog ? (
                <ConfirmDialog
                    msg={"Successfully Approved"}
                    onConfirmFunc={() => {
                        setConfirmDialog(false);
                    }}
                />
            ) : (
                ""
            )}
            <div className={`col p-0 m-0 g-0 ${styles.ApprovalsView}`}>
                <div className={`row g-0 h-100 overflow-auto`}>
                    <div className={`col-sm-12 p-0 m-0`}>
                        <div className={`row g-0`}>
                            <div
                                className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}>
                                <Breadcrumb />
                                <div>image</div>
                            </div>
                            <div className={`col-sm-12`}>
                                <div className={`${styles.details}`}>
                                    <div
                                        className={styles.backbtn}
                                        onClick={() => navigate(-1)}>
                                        <BsArrowLeft className={styles.icon} />{" "}
                                        Back
                                    </div>
                                    <div className={styles.imgwrapper}>
                                        <img
                                            src={element.userProfileImage}
                                            alt=''
                                            className={`${styles.img} rounded-circle`}
                                            onClick={(e) => {
                                                e.currentTarget.requestFullscreen();
                                            }}
                                        />
                                        <div>{element.fullName}</div>
                                    </div>
                                    <br />
                                    <div className={styles.hr}></div>
                                    <div className={styles.bottom}>
                                        <div
                                            className={`row g-0 d-flex flex-wrap ${styles.row}`}>
                                            <div
                                                className={`col-sm-3 ${styles.left}`}>
                                                Contact No :
                                            </div>
                                            <div
                                                className={`col-sm-9 ${styles.right}`}>
                                                {element?.mobileNo}
                                            </div>
                                        </div>
                                        <div
                                            className={`row g-0 d-flex flex-wrap ${styles.row}`}>
                                            <div
                                                className={`col-sm-3 ${styles.left}`}>
                                                Email :
                                            </div>
                                            <div
                                                className={`col-sm-9 ${styles.right}`}>
                                                {element?.email}
                                            </div>
                                        </div>
                                        <div
                                            className={`row g-0 d-flex flex-wrap ${styles.row}`}>
                                            <div
                                                className={`col-sm-3 ${styles.left}`}>
                                                Location :
                                            </div>
                                            <div
                                                className={`col-sm-9 ${styles.right}`}>
                                                {element?.address?.area} ,{" "}
                                                {element?.address?.district} ,{" "}
                                                {element?.address?.state}
                                            </div>
                                        </div>
                                        <div
                                            className={`row g-0 d-flex flex-wrap ${styles.row}`}>
                                            <div
                                                className={`col-sm-3 ${styles.left}`}>
                                                ID Proof :
                                            </div>
                                            <div className='col-sm-9 d-flex flex-row gap-2'>
                                                <img
                                                    src={
                                                        element?.documents[0]
                                                            ?.mediaUrl
                                                    }
                                                    alt=''
                                                    width={100}
                                                    className={styles.docimg}
                                                    onClick={(e) => {
                                                        e.currentTarget.requestFullscreen();
                                                    }}
                                                />
                                                <img
                                                    src={
                                                        element?.documents[1]
                                                            ?.mediaUrl
                                                    }
                                                    alt=''
                                                    width={100}
                                                    className={styles.docimg}
                                                    onClick={(e) => {
                                                        e.currentTarget.requestFullscreen();
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={`row g-0 d-flex flex-wrap ${styles.row}`}>
                                            <div
                                                className={`col-sm-3 ${styles.left}`}>
                                                Description :
                                            </div>
                                            <div
                                                className={`col-sm-9 ${styles.right}`}>
                                                {element?.businessDetails}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.buttons}`}>
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
                                                Active
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
                            maxLength={60}
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
                                Confirm
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

export default ApprovalsView;
