import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./ViewServiceDetails.module.scss";
import { BiTimeFive } from "react-icons/bi";
import moment from "moment";
import Accordion from "react-bootstrap/Accordion";
import { useGetOrderDetailsQuery } from "../../../../api/KisaanStationsApi";
import {
    Breadcrumb,
    ConfirmDialog,
    ErrorDialog,
    Loader,
} from "../../../../components";
import Carousel from "../../../../components/KisaanStation/KisaanStation/Carousel/Carousel";

const UpdateOrderModal = React.lazy(() =>
    import(
        "../../../../components/KisaanStation/MyStation/UpdateOrderModal/UpdateOrderModal"
    )
);
const ViewServiceDetails = () => {
    const navigate = useNavigate();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [searchParams] = useSearchParams();
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);

    let {
        data: element,
        isLoading,
        isFetching,
    } = useGetOrderDetailsQuery({ id: searchParams.get("_id") });

    if (isLoading || isFetching) {
        return <Loader />;
    }

    let orderstatus;

    if (element.list.orderStatus === "Pending") {
        orderstatus = `${styles.Pending}`;
    }

    if (element.list.orderStatus === "Delivered") {
        orderstatus = `${styles.Delivered}`;
    }
    if (element.list.orderStatus === "On the way") {
        orderstatus = `${styles.Ontheway}`;
    }
    if (element.list.orderStatus === "Approved") {
        orderstatus = `${styles.Approved}`;
    }
    if (element.list.orderStatus === "Cancelled") {
        orderstatus = `${styles.Cancelled}`;
    }

    return (
        <>
            {confirmDialog && (
                <ConfirmDialog
                    msg={"Successfully Updated"}
                    onConfirmFunc={function () {
                        setConfirmDialog(false);
                        setShowUpdateForm(false);
                    }}
                />
            )}
            {errorDialog && (
                <ErrorDialog
                    msg={"Something went wrong, Try Again..."}
                    onConfirmFunc={function () {
                        setErrorDialog(false);
                        setShowUpdateForm(false);
                    }}
                />
            )}
            {showUpdateForm && (
                <UpdateOrderModal
                    setShowModal={setShowUpdateForm}
                    element={element}
                    setConfirmDialog={setConfirmDialog}
                    setErrorDialog={setErrorDialog}
                />
            )}

            <div className={`col p-0 m-0 g-0 ${styles.KSViewProfile}`}>
                <div className={`row g-0 h-100 overflow-auto`}>
                    <div className={`col-sm-12 p-0 m-0`}>
                        <div className={`row g-0`}>
                            <div
                                className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}>
                                <Breadcrumb />
                                <div>&nbsp;</div>
                            </div>
                            <div className={`col-sm-12`}>
                                <div className={`${styles.details}`}>
                                    <div
                                        className={`d-flex justify-content-between align-items-top flex-wrap ${styles.top}`}>
                                        <div
                                            className={`col-sm-6 ${styles.topleft}`}>
                                            <div className={styles.id}>
                                                ID: {element?.list?.bookingId}{" "}
                                                <div className={orderstatus}>
                                                    {element?.list?.orderStatus}
                                                </div>
                                            </div>
                                            <div className={styles.servicename}>
                                                {element?.list?.serviceName}{" "}
                                            </div>
                                        </div>
                                        <div
                                            className={`col-sm-6 ${styles.topright}`}>
                                            <div className={styles.requestedon}>
                                                <BiTimeFive /> Requested On
                                            </div>
                                            <div className={styles.time}>
                                                {moment(
                                                    element?.list?.createdAt
                                                ).format("DD  MMM, YYYY")}{" "}
                                                |{" "}
                                                {moment(
                                                    element?.list?.createdAt
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.bottom}`}>
                                    <div
                                        className={`col-md-12 ${styles.heading}`}>
                                        Order Details
                                    </div>
                                    <div className={styles.hr}></div>
                                    <div className={`row g-0 mt-3`}>
                                        <div
                                            className={`col-md-2 ${styles.tweks}`}>
                                            <div
                                                className={`col-6 ${styles.innerheading}`}>
                                                Booking Date :
                                            </div>
                                            <div
                                                className={`col-6 ${styles.innertext}`}>
                                                {element?.list?.bookingDate}
                                            </div>
                                        </div>
                                        <div
                                            className={`col-md-3 ${styles.tweks}`}>
                                            <div
                                                className={`col-6 ${styles.innerheading}`}>
                                                Crop Type :
                                            </div>
                                            <div
                                                className={`col-6 ${styles.innertext}`}>
                                                {element?.list?.cropType}
                                            </div>
                                        </div>
                                        <div
                                            className={`col-md-4 ${styles.tweks}`}>
                                            <div
                                                className={`col-6 ${styles.innerheading}`}>
                                                Location :
                                            </div>
                                            <div
                                                className={`col-6 ${styles.innertext}`}>
                                                <div>
                                                    {
                                                        element?.list
                                                            ?.addFarmLocation
                                                            ?.latitude
                                                    }{" "}
                                                    |{" "}
                                                    {
                                                        element?.list
                                                            ?.addFarmLocation
                                                            ?.longitude
                                                    }
                                                </div>
                                                <div>
                                                    {
                                                        element?.list
                                                            ?.addFarmLocation
                                                            ?.address
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`col-md-3 ${styles.tweks}`}>
                                            <div
                                                className={`col-6 ${styles.innerheading}`}>
                                                Estimated Price:
                                            </div>
                                            <div
                                                className={`col-6 ${styles.innertext}`}>
                                                {element?.list?.estimatedPrice}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`row g-0 mt-3`}>
                                        <div
                                            className={`col-md-2 ${styles.tweks}`}>
                                            <div
                                                className={`col-6 ${styles.innerheading}`}>
                                                Farm Details :
                                            </div>
                                            <div
                                                className={`col-6 ${styles.innertext}`}>
                                                {element?.list?.addFarmDetails.map(
                                                    (current, index) => {
                                                        return (
                                                            <div key={index}>
                                                                {
                                                                    current.farmName
                                                                }{" "}
                                                                - {current.area}
                                                                &nbsp;
                                                                {
                                                                    current.areaUnit
                                                                }
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`col-md-3 ${styles.tweks}`}>
                                            <div
                                                className={`col-6 ${styles.innerheading}`}>
                                                Remarks :
                                            </div>
                                            <div
                                                className={`col-6 ${styles.innertext}`}>
                                                {element?.list?.remarks
                                                    ? element?.list?.remarks
                                                    : "N/A"}
                                            </div>
                                        </div>
                                        <div
                                            className={`col-md-4 ${styles.tweks}`}>
                                            <div
                                                className={`col-6 ${styles.innerheading}`}>
                                                Spray Products :
                                            </div>
                                            <div
                                                className={`col-6 ${styles.innertext}`}>
                                                {/* {element?.list?.sparyProduct.map(
                                                    (current, index) => {
                                                        return (
                                                            <div key={index}>
                                                                {
                                                                    current.productName
                                                                }{" "}
                                                                -{" "}
                                                                {
                                                                    current.quantity
                                                                }
                                                                &nbsp;
                                                                {
                                                                    current.qtyUnit
                                                                }
                                                            </div>
                                                        );
                                                    }
                                                )} */}
                                                {element?.list?.sparyProduct}
                                            </div>
                                        </div>
                                        <div
                                            className={`col-md-3 ${styles.tweks}`}>
                                            <div
                                                className={`col-6 ${styles.innerheading}`}>
                                                Payment:
                                            </div>
                                            <div
                                                className={`col-6 ${styles.innertext}`}>
                                                <div>
                                                    Received :{" "}
                                                    {
                                                        element?.list
                                                            ?.paymentReceived
                                                    }
                                                </div>
                                                Remaining :{" "}
                                                {
                                                    element?.list
                                                        ?.remainingPayment
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <Accordion
                                        className={`mt-4 ${styles.accordion}`}>
                                        <Accordion.Item eventKey='0'>
                                            <Accordion.Header>
                                                Buyer Information
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className='row g-0'>
                                                    <div
                                                        className={`col-md-4 ${styles.tweks}`}>
                                                        <div
                                                            className={`col-6 ${styles.innerheading}`}>
                                                            Buyer Name:
                                                        </div>
                                                        <div
                                                            className={`col-6 ${styles.innertext}`}>
                                                            {
                                                                element?.list
                                                                    ?.name
                                                            }
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`col-md-3 ${styles.tweks}`}>
                                                        <div
                                                            className={`col-6 ${styles.innerheading}`}>
                                                            Contact No:
                                                        </div>
                                                        <div
                                                            className={`col-6 ${styles.innertext}`}>
                                                            {
                                                                element?.list
                                                                    ?.mobileNo
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey='1'>
                                            <Accordion.Header>
                                                Seller Information
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className='row g-0'>
                                                    <div
                                                        className={`col-md-4 ${styles.tweks}`}>
                                                        <div
                                                            className={`col-6 ${styles.innerheading}`}>
                                                            Seller Name:
                                                        </div>
                                                        <div
                                                            className={`col-6 ${styles.innertext}`}>
                                                            {
                                                                element?.list
                                                                    ?.sellerName
                                                            }
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`col-md-3 ${styles.tweks}`}>
                                                        <div
                                                            className={`col-6 ${styles.innerheading}`}>
                                                            Contact No:
                                                        </div>
                                                        <div
                                                            className={`col-6 ${styles.innertext}`}>
                                                            {
                                                                element?.list
                                                                    ?.sellerContactNo
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row g-0 mt-2'>
                                                    <div
                                                        className={`col-md-4 ${styles.tweks}`}>
                                                        <div
                                                            className={`col-6 ${styles.innerheading}`}>
                                                            Kissan Station:
                                                        </div>
                                                        <div
                                                            className={`col-6 ${styles.innertext}`}>
                                                            {
                                                                element?.list
                                                                    ?.ksName
                                                            }
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={`col-md-6 ${styles.tweks}`}>
                                                        <div
                                                            className={`col-6 ${styles.innerheading}`}>
                                                            Completed Field
                                                            Images (
                                                            {element?.list
                                                                ?.completedFieldImages
                                                                ?.length
                                                                ? element?.list
                                                                      ?.completedFieldImages
                                                                      ?.length
                                                                : 0}
                                                            ) :
                                                        </div>
                                                        <div
                                                            className={`col-6 d-flex ${styles.innertext}`}>
                                                            {element?.list
                                                                ?.completedFieldImages &&
                                                                element?.list
                                                                    ?.completedFieldImages
                                                                    ?.length !==
                                                                    0 && (
                                                                    <Carousel
                                                                        slides={
                                                                            element
                                                                                ?.list
                                                                                ?.completedFieldImages
                                                                        }
                                                                        controls
                                                                        indicators
                                                                    />
                                                                )}
                                                            {(element?.list
                                                                ?.completedFieldImages ===
                                                                undefined ||
                                                                element?.list
                                                                    ?.completedFieldImages
                                                                    ?.length ===
                                                                    0) &&
                                                                "No Images Available"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>

                                <div className={`${styles.buttons}`}>
                                    <button
                                        className={` ${styles.cancelButton}`}
                                        onClick={() => navigate(-1)}>
                                        Cancel
                                    </button>
                                    {/* {element.list.orderStatus !==
                                        "Delivered" && ( */}
                                    <button
                                        className={` ${styles.updateButton}`}
                                        onClick={() => {
                                            setShowUpdateForm(true);
                                        }}>
                                        Update Order
                                    </button>
                                    {/* )} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewServiceDetails;
