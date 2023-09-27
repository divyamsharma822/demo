import React from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./DocumentsModal.module.scss";
import { FaFileDownload } from "react-icons/fa";

const DocumentsModal = ({ show, setShow, data }) => {
    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton style={{ padding: "1em 2em" }}>
                    <Modal.Title>Uploaded Files</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        className='col-sm-12 overflow-scroll'
                        style={{ height: "60vh" }}>
                        <div className='row g-0 d-flex justify-content-around'>
                            <div className={`col-9 p-3 ${styles.modalheading}`}>
                                Description
                            </div>
                            <div
                                className={`col-3 p-3 d-flex justify-content-center ${styles.modalheading}`}>
                                File
                            </div>
                        </div>

                        {data &&
                            data.map((listitem, index) => (
                                <div
                                    className='row g-0 d-flex justify-content-around align-items-center'
                                    key={index}>
                                    <div
                                        className={`col-9 p-3 d-inline-block text-truncate`}
                                        data-toggle='tooltip'
                                        data-placement='bottom'
                                        title='Description'
                                        style={{ maxWidth: "100%" }}>
                                        File {index + 1}
                                    </div>
                                    <div
                                        className={`col-3 p-3 d-flex justify-content-center ${styles.modalitem}`}>
                                        <a href={listitem.mediaUrl}>
                                            <FaFileDownload size={25} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DocumentsModal;
