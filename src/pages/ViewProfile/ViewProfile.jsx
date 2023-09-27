import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ViewProfile.scss";
import { useChangeStatusMutation } from "../../api/krishiBazaarApi";
import { ErrorDialog, ConfirmDialog, Breadcrumb } from "../../components";
import { SideDrawer } from "../../components/KisaanStation";

const ViewProfile = () => {
    const [changeStatus] = useChangeStatusMutation();
    const [rejectDialog, setRejectDialog] = useState(false);
    const [rejectResponse, setRejectResponse] = useState("");
    const [errorDialog, setErrorDialog] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const element = location.state?.data;

    const handleApprove = () => {
        changeStatus({
            productId: element.productId,
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
                productId: element.productId,
                status: "Rejected",
                rejReason: rejectResponse,
            })
                .unwrap()
                .then((payload) => {
                    setConfirmDialog(true);
                })
                .catch((error) => {
                    setErrorDialog(true);
                });
        }
    };

    return (
        <>
            {errorDialog ? (
                <ErrorDialog
                    msg={"Enter the reason. Field cannot be empty."}
                    onConfirmFunc={() => setErrorDialog(false)}
                />
            ) : (
                ""
            )}
            {confirmDialog ? (
                <ConfirmDialog
                    msg={"Successfully Updated"}
                    onConfirmFunc={() => {
                        setConfirmDialog(false);
                        navigate("/admin/KisaanStation/Krishi%20Bazaar");
                    }}
                />
            ) : (
                ""
            )}
            <div
                style={{
                    height: "100vh",
                    overflow: "auto",
                    backgroundColor: "rgb(248,249,250)",
                }}
                className={`col p-0 m-0 container-fluid`}>
                <div className='row g-0 h-100 overflow-auto'>
                    <div
                        className={`col-sm-12 p-0 m-0 viewProfile d-flex flex-column`}>
                        <div
                            className={`col-sm-12 d-flex flex-row justify-content-between align-items-center viewnavbar`}>
                            <SideDrawer />
                            <Breadcrumb />
                            <div>image</div>
                        </div>
                        <div className='viewProfile-wrapper'>
                            {element.media.length !== 0 && (
                                <>
                                    <span>Images</span>
                                    <div className='viewProfile-images'>
                                        {element?.media?.map((image, index) => {
                                            return (
                                                <img
                                                    className='rounded'
                                                    src={image.mediaUrl}
                                                    alt=''
                                                    key={index}
                                                />
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                            <br />
                            <div className='row viewProfile-info d-flex flex-wrap '>
                                <div className='viewProfile-info--col col-sm-6 col-xs-12 d-flex flex-row'>
                                    <div className='viewProfile-info--sub col-sm-6 d-flex flex-column word-wrap'>
                                        <span>Category: </span>
                                        <span>Sub-Category: </span>
                                        <span>Brand: </span>
                                    </div>
                                    <div className='viewProfile-info--sub col-sm-6 d-flex flex-column'>
                                        <span>{element.category}</span>
                                        <span>{element.subCategory}</span>
                                        <span>{element.brand}</span>
                                    </div>
                                </div>

                                <div className='viewProfile-info--col col-sm-6 col-xs-12 d-flex flex-row'>
                                    <div className='viewProfile-info--sub col-sm-6 d-flex flex-column'>
                                        <span>Price: </span>
                                        <span>Quantity: </span>
                                        <span>Trade Type: </span>
                                    </div>
                                    <div className='viewProfile-info--sub col-sm-6 d-flex flex-column'>
                                        <span>{element.price} </span>
                                        <span>{element.quantity}</span>
                                        <span>{element.trading}</span>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className='viewProfile-description d-flex gap-1 flex-column'>
                                <span className='viewProfile-descriptiono--heading'>
                                    Description
                                </span>
                                <p className='viewProfile-description-p'>
                                    {element.description}
                                </p>
                            </div>
                            <div className='viewProfile-sellinfo d-flex gap-4 flex-column'>
                                <span className='viewProfile-sellinfo--heading'>
                                    Seller Information
                                </span>
                                <div className='viewProfile-sellinfo--col col-sm-6 col-xs-12 d-flex flex-row'>
                                    <div className='viewProfile-sellinfo--sub col-sm-6 d-flex flex-column'>
                                        <span>Seller Name: </span>
                                        <span>Address: </span>
                                        <span>Contact no: </span>
                                    </div>
                                    <div className='viewProfile-sellinfo--sub col-sm-auto d-flex flex-column'>
                                        <span>{element.traderName} </span>
                                        <span>
                                            {element.address[0]?.area} -{" "}
                                            {element.address[0]?.pinCode}
                                        </span>
                                        <span>{element.mobileNo}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='viewProfile-buttons h-100 d-flex justify-content-between flex-wrap'>
                                <button
                                    type='button'
                                    className='cancelButton'
                                    onClick={() => navigate(-1)}>
                                    Cancel
                                </button>
                                <div className='d-flex gap-3 innerdiv'>
                                    <button
                                        type='button'
                                        className='viewProfile-button'
                                        onClick={() => setRejectDialog(true)}>
                                        Reject
                                    </button>
                                    <button
                                        type='button'
                                        className='viewProfile-button'
                                        onClick={handleApprove}>
                                        Approve
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {rejectDialog ? (
                <div className='rejectMessageDialog'>
                    <div className='rejectMessageDialog--info'>
                        <span>Rejection Reason</span>
                        <textarea
                            placeholder='Reason of Rejection'
                            type='text'
                            onChange={(e) => setRejectResponse(e.target.value)}
                            maxLength={40}
                        />
                        <div className='rejectMessageDialog--buttons'>
                            <span
                                onClick={() => setRejectDialog(false)}
                                className='rejectMessageDialog--button'>
                                Cancel
                            </span>
                            <span
                                onClick={handleReject}
                                className='rejectMessageDialog--button'>
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

export default ViewProfile;
