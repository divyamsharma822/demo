import React, { useState } from "react";
import styles from "./InventoryView.module.scss";
import { IoSearch, IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useLocation } from "react-router-dom";
import { useGetAssignedItemHistoryQuery } from "../../../api/daybestApi";
import ReactPaginate from "react-paginate";
import Carousel from "../../../components/KisaanStation/DaybestManagement/Carousel/Carousel";

const DocumentsModal = React.lazy(() => import("../../../components/KisaanStation/DaybestManagement/DocumentsModal/DocumentsModal"));
const AssignItemModal = React.lazy(() => import("../../../components/KisaanStation/DaybestManagement/AssignItemModal/AssignItemModal"));
const SideDrawer = React.lazy(() => import("../../../components/KisaanStation/SideDrawer/SideDrawer"));

const InventoryView = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [showDocumentModal, setShowDocumentModal] = useState(false);

    const location = useLocation();

    const element = location.state?.data;

    let { data, isLoading, isFetching, refetch } = useGetAssignedItemHistoryQuery({
        itemId: element._id,
        page: currentPage,
    });

    if (isLoading || isFetching) {
        return <div>Loading...</div>;
    }

    const useHandlePageClick = async (data) => {
        setCurrentPage(data.selected + 1);
        refetch();
    };
    return (
        <>
            {showModal && (
                <AssignItemModal
                    element={element}
                    setShowModal={setShowModal}
                />
            )}
            {showDocumentModal && (
                <DocumentsModal
                    element={element}
                    show={showDocumentModal}
                    setShow={setShowDocumentModal}
                    data={element.UploadDocument}
                />
            )}

            <div
                style={{
                    height: "100vh",
                    overflow: "auto",
                    backgroundColor: "rgb(248,249,250)",
                }}
                className={`col p-0 m-0 ${styles.InventoryView}`}>
                <div className={`col-sm-12 justify-content-end p-0 m-0 krishiBazaar d-flex flex-column ${styles.content}`}>
                    {/* navbar */}
                    <div className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}>
                        <SideDrawer /> <div>&nbsp;</div>
                        <div className='d-flex flex-row justify-content-end gap-3'>
                            <div className={styles.search}>
                                <input
                                    className={styles.input}
                                    placeholder='Search anything...'
                                />
                                <IoSearch
                                    size={25}
                                    className={styles.searchsvg}
                                />
                            </div>
                            <div className={styles.notiicon}>
                                <IoNotificationsOutline
                                    size={20}
                                    className={styles.icon}
                                />
                            </div>
                            <div className={styles.notiicon}>
                                <CgProfile
                                    size={20}
                                    className={styles.icon}
                                />
                            </div>
                        </div>
                    </div>
                    {/* header */}
                    <div className={`col-sm-12 d-flex justify-content-center ${styles.headerWrapper}`}>
                        <div className={`d-flex flex-row align-items-end justify-content-between flex-wrap ${styles.header}`}>
                            <div className={`col-sm-12 col-md-6 d-flex flex-row ${styles.left}`}>
                                <div className={styles.imgwrapper}>
                                    {element.myImage !== undefined && (
                                        <img
                                            src={element.itemImage}
                                            alt=''
                                            className={`img-fluid rounded ${styles.img}`}
                                            loading='lazy'
                                            height={100}
                                            width={100}
                                            onClick={(e) => e.currentTarget.requestFullscreen()}
                                        />
                                    )}
                                    {element.myImage === undefined && "No Image"}
                                </div>
                                <div className={`d-flex flex-column justify-content-between ${styles.info}`}>
                                    <div className={styles.itemName}>{element?.ItemName}</div>
                                    <div className={styles.itemId}>
                                        <span
                                            style={{
                                                fontWeight: "600",
                                                paddingRight: "1em",
                                            }}>
                                            Item ID :
                                        </span>{" "}
                                        {element.ItemID}
                                    </div>
                                    <div className={styles.status}>
                                        <span style={{ fontWeight: "600" }}>Status :</span>
                                        <span
                                            className={`${element.Status === "Active" ? styles.btnActive : ""} ${
                                                element.Status === "In-store" ? styles.btnInstore : ""
                                            }${element.Status === "Damaged" ? styles.btnDamaged : ""}${
                                                element.Status === "Working" ? styles.btnWorking : ""
                                            }${element.Status === "On-site" ? styles.btnOnsite : ""}
                                            ${element.Status === "Repairing" ? styles.btnRepairing : ""}`}>
                                            {element?.Status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-sm-12 col-md-6 d-flex justify-content-end flex-grow-1 ${styles.right}`}>
                                <div className={`d-flex justify-content-center justify-content-sm-end w-100 ${styles.buttons}`}>
                                    <button
                                        type='button'
                                        className={`d-flex flex-grow-1 flex-sm-grow-0 align-items-center justify-content-center ${styles.button1}`}
                                        onClick={() => setShowDocumentModal(true)}>
                                        Documents
                                    </button>
                                    <button
                                        type='button'
                                        className={`d-flex flex-grow-1 flex-sm-grow-0 align-items-center justify-content-center ${styles.button2}`}
                                        onClick={() => setShowModal(true)}>
                                        Assign Items
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* history list */}
                    <div className={`col-sm-12 d-flex justify-content-center ${styles.bottomWrapper}`}>
                        <div className={`d-flex flex-row align-items-end justify-content-center flex-wrap ${styles.bottom}`}>
                            <div className={`col-sm-12 col-md-8 col-lg-7 d-flex flex-grow-1 flex-sm-grow-0 flex-column`}>
                                <div className={styles.heading}>Item History</div>
                                <div className={styles.listWrapper}>
                                    {data.itemHistory.map((curr, index) => {
                                        return (
                                            <div key={index}>
                                                <div className={styles.card}>
                                                    <div className={`col-sm-12 d-flex flex-row  ${styles.cardleft}`}>
                                                        <div className={styles.imgwrapper}>
                                                            {curr.assignItemImages.length !== 0 && (
                                                                <Carousel
                                                                    slides={curr.assignItemImages}
                                                                    controls
                                                                    indicators
                                                                />
                                                            )}
                                                            {curr.assignItemImages.length === 0 && "No Image"}
                                                        </div>
                                                        <div
                                                            className={`d-flex flex-column flex-grow-1 gap-1 justify-content-between ${styles.info}`}>
                                                            <div
                                                                className={`row g-0 d-flex justify-content-between flex-grow-sm-1 ${styles.subheading}`}>
                                                                <div className='col-12 col-sm-6'>Handover Date :</div>
                                                                <div
                                                                    className={`col-12 col-sm-6 d-flex justify-content-start justify-content-md-start ${styles.data}`}>
                                                                    {curr.handoverDate}
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={`row g-0 d-flex justify-content-between flex-grow-sm-1 ${styles.subheading}`}>
                                                                <div className='col-12 col-sm-6'>Holder's Name :</div>
                                                                <div
                                                                    className={`col-12 col-sm-6 d-flex justify-content-start justify-content-md-start ${styles.data}`}>
                                                                    {curr.holderName}
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={`row g-0 d-flex justify-content-between flex-grow-sm-1 ${styles.subheading}`}>
                                                                <div className='col-12 col-sm-6'>Status when assigned :</div>
                                                                <div
                                                                    className={`col-12 col-sm-6 d-flex justify-content-start justify-content-md-start ${styles.data}`}>
                                                                    <span
                                                                        className={`${curr.statusWhenAssigned === "Active" ? styles.btnActive : ""} ${
                                                                            curr.statusWhenAssigned === "In-store" ? styles.btnInstore : ""
                                                                        }${curr.statusWhenAssigned === "Damaged" ? styles.btnDamaged : ""}${
                                                                            curr.statusWhenAssigned === "Working" ? styles.btnWorking : ""
                                                                        }${curr.statusWhenAssigned === "On-site" ? styles.btnOnsite : ""}
                                                                ${curr.statusWhenAssigned === "Repairing" ? styles.btnRepairing : ""}`}
                                                                        style={{
                                                                            minHeight: "fit-content",
                                                                        }}>
                                                                        {curr?.statusWhenAssigned}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`col-sm-12 ${styles.cardright}`}>
                                                        <div className={styles.description}>Description</div>
                                                        <div className={styles.descriptionText}>
                                                            {curr.itemDescription ? curr.itemDescription : "No description available"}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.hr}></div>
                                            </div>
                                        );
                                    })}
                                    {data.itemHistory.length !== 0 ? (
                                        <div className='pagination'>
                                            <ReactPaginate
                                                previousLabel={"previous"}
                                                nextLabel={"next"}
                                                breakLabel={"..."}
                                                pageCount={Math.ceil(data.totalHistory / 20)}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={2}
                                                onPageChange={useHandlePageClick}
                                                forcePage={currentPage - 1}
                                                containerClassName={"pagination"}
                                                pageClassName={"page-item"}
                                                pageLinkClassName={"page-link"}
                                                previousClassName={"page-item"}
                                                previousLinkClassName={"page-link"}
                                                nextClassName={"page-item"}
                                                nextLinkClassName={"page-link"}
                                                breakClassName={"page-item"}
                                                breakLinkClassName={"page-link"}
                                                activeClassName={"active"}
                                            />
                                        </div>
                                    ) : (
                                        <div>No Records Available</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InventoryView;
