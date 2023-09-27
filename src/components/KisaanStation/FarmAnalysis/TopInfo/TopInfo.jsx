import React, { useState } from "react";
import styles from "./TopInfo.module.scss";
import farmimg from "../../../../assests/farmdemo.png";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as SvgPDF } from "./pdficon.svg";
import { useGetUploadedPdfQuery } from "../../../../api/KisaanStationsApi";

const TopInfo = ({ element, from }) => {
    const [show, setShow] = useState(false);

    let { data, isLoading } = useGetUploadedPdfQuery({
        reqUserId: element.reqUserId,
        cropID: element.cropDetails[0]?._id,
    });

    if (isLoading) {
        return <div>Loading</div>;
    }

    const capitalizeFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton style={{ padding: "1em 2em" }}>
                    <Modal.Title>History</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        className='col-sm-12 overflow-scroll'
                        style={{ height: "60vh" }}>
                        <div className='row g-0 d-flex justify-content-around'>
                            <div className={`col-4 p-3 ${styles.modalheading}`}>
                                Date
                            </div>
                            <div className={`col-6 p-3 ${styles.modalheading}`}>
                                Description
                            </div>
                            <div className={`col-2 p-3 ${styles.modalheading}`}>
                                PDF
                            </div>
                        </div>

                        {data &&
                            data.map((listitem, index) => (
                                <div
                                    className='row g-0 d-flex justify-content-around align-items-center'
                                    key={index}>
                                    <div className='col-4 p-3'>
                                        {moment(element.listitem?.date).format(
                                            "DD  MMM, YYYY"
                                        )}
                                    </div>
                                    <div
                                        className={`col-6 p-3 d-inline-block text-truncate`}
                                        data-toggle='tooltip'
                                        data-placement='bottom'
                                        title={listitem.reportDescription}
                                        style={{ maxWidth: "100%" }}>
                                        {listitem.reportDescription}
                                    </div>
                                    <div
                                        className={`col-2 p-3 img-fluid ${styles.modalitem}`}>
                                        <a
                                            href={
                                                listitem.reportPdf[0].mediaUrl
                                            }>
                                            <SvgPDF />
                                        </a>
                                    </div>
                                </div>
                            ))}
                    </div>
                </Modal.Body>
            </Modal>
            <div className={`col-md-auto ${styles.TopInfo}`}>
                <div
                    className={`d-flex justify-content-between align-items-center ${styles.header}`}>
                    <div className={styles.heading}>{element.name}'s Farm</div>
                    {from ? (
                        <button
                            type='button'
                            className={styles.historybtn}
                            onClick={() => setShow(true)}>
                            View History
                        </button>
                    ) : (
                        <div>&nbsp;</div>
                    )}
                </div>
                <div className={styles.hr}></div>
                <div
                    className={`col-md-12 d-flex flex-row flex-wrap ${styles.headerbottom}`}>
                    <div className={`col-md-3 d-flex justify-content-center`}>
                        <img
                            src={farmimg}
                            alt=''
                            className={`rounded img-fluid ${styles.img}`}
                        />
                    </div>
                    <div className={`col-md-9`}>
                        <div className={`col-sm-12 ${styles.orangeheading}`}>
                            Farm Details
                        </div>
                        <div
                            className='row g-0 d-flex flex-wrap'
                            style={{ gap: "1em" }}>
                            <div
                                className={`col-sm-12 ${styles.textcontainer}`}>
                                <div className={styles.innerheading}>
                                    Farm Name
                                </div>
                                <div className={styles.innertext}>
                                    {capitalizeFirst(
                                        element.farmDetails?.farmName
                                    )}
                                </div>
                            </div>
                            <div className={`col-sm-3 ${styles.textcontainer}`}>
                                <div className={styles.innerheading}>
                                    Coordinates
                                </div>
                                <div
                                    className={`word-wrap ${styles.innertext}`}>
                                    {element.farmDetails?.coordinates[0]} |{" "}
                                    {element.farmDetails?.coordinates[1]}
                                </div>
                            </div>
                            <div className={`col-sm-4 ${styles.textcontainer}`}>
                                <div className={styles.innerheading}>
                                    Location
                                </div>
                                <div className={styles.innertext}>
                                    {capitalizeFirst(
                                        element.farmDetails?.address
                                    )}
                                </div>
                            </div>
                            <div className={`col-sm-3 ${styles.textcontainer}`}>
                                <div className={styles.innerheading}>Area</div>
                                <div className={styles.innertext}>
                                    {element.farmDetails?.farmArea}{" "}
                                    {element.farmDetails?.farmAreaUnit}
                                </div>
                            </div>
                        </div>
                        <div className={`col-sm-12 ${styles.orangeheading}`}>
                            Crop Details
                        </div>

                        {element.cropDetails.map((current, index) => (
                            <div
                                className={`row g-0 d-flex flex-wrap ${styles.cropDetailContainer}`}
                                key={index}>
                                <div
                                    className={`col-sm-3 ${styles.textcontainer}`}>
                                    <div className={styles.innerheading}>
                                        Crop Name:
                                    </div>
                                    <div className={styles.innertext}>
                                        {current.nameOfCrop &&
                                            capitalizeFirst(current.nameOfCrop)}
                                    </div>
                                </div>
                                <div
                                    className={`col-sm-3 ${styles.textcontainer}`}>
                                    <div className={styles.innerheading}>
                                        Area:
                                    </div>
                                    <div className={styles.innertext}>
                                        {current.cropArea && current.cropArea}{" "}
                                        {current.cropAreaUnit &&
                                            current.cropAreaUnit}
                                    </div>
                                </div>
                                <div
                                    className={`col-sm-3 ${styles.textcontainer}`}>
                                    <div className={styles.innerheading}>
                                        Crop Type:
                                    </div>
                                    <div className={styles.innertext}>
                                        {current.cropType &&
                                            capitalizeFirst(current.cropType)}
                                    </div>
                                </div>
                                <div
                                    className={`col-sm-3 ${styles.textcontainer}`}>
                                    <div className={styles.innerheading}>
                                        Sowing Date:
                                    </div>
                                    <div className={styles.innertext}>
                                        {current.sowingDate &&
                                            moment(current.sowingDate).format(
                                                "DD  MMM, YYYY"
                                            )}
                                    </div>
                                </div>
                                <div
                                    className={`col-sm-12 ${styles.textcontainer}`}>
                                    <div className={styles.innerheading}>
                                        Description:
                                    </div>
                                    <div className={styles.innertext}>
                                        {current.cropDescription &&
                                            capitalizeFirst(
                                                current.cropDescription
                                            )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopInfo;
