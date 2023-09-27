import React, { useEffect, useState } from "react";
import styles from "./Reports.module.scss";
import { Loader } from "../../components";
import { useGetAllStationsQuery } from "../../api/KisaanStationsApi";
import Table from "../../components/KisaanStation/Reports/Table/Table";
import TableCard from "../../components/KisaanStation/Reports/TableCard/TableCard";
import { SideDrawer } from "../../components/KisaanStation";
import ReactPaginate from "react-paginate";
import { ReactComponent as Search } from "../../assests/search.svg";
import { BiFilterAlt, BiSortUp } from "react-icons/bi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Empty } from "antd";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const KisaanStations = () => {
    const [, setSearch] = useState("");
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [currentPage, setCurrentPage] = useState(1);
    const [show, setShow] = useState(false);
    const [currentModalPage, setCurrentModalPage] = useState(1);

    let { data, isLoading, isFetching, refetch } =
        useGetAllStationsQuery(currentPage);

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(window.innerWidth);
        }
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [windowSize]);

    if (isLoading) {
        return <Loader />;
    }
    if (isFetching) {
        return <Loader />;
    }

    const useHandlePageClick = async (data) => {
        setCurrentPage(data.selected + 1);
        refetch();
    };

    const renderSwitch = (currentModalPage) => {
        // eslint-disable-next-line default-case
        switch (currentModalPage) {
            case 1:
                return (
                    <>
                        <Modal.Header
                            closeButton
                            style={{ padding: "1em 2em" }}
                        >
                            <Modal.Title
                                style={{
                                    color: "#563E1F",
                                    fontSize: "1.1em",
                                    fontWeight: "600",
                                }}
                            >
                                Report Type
                                <div
                                    style={{
                                        fontSize: "0.7em",
                                        color: "#E26B26",
                                        fontWeight: 400,
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setCurrentModalPage(4)}
                                >
                                    View Reasons &gt;
                                </div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div
                                className={`col-sm-12 overflow-auto d-flex flex-column justify-content-center align-items-center`}
                            >
                                <button
                                    type='button'
                                    onClick={() => setCurrentModalPage(2)}
                                    className={styles.button}
                                >
                                    <span>Block Permanently</span>
                                    <GrFormNext />
                                </button>
                                <button
                                    type='button'
                                    onClick={() => setCurrentModalPage(3)}
                                    className={styles.button}
                                >
                                    <span>Block for a time period</span>
                                    <GrFormNext />
                                </button>
                            </div>
                        </Modal.Body>
                    </>
                );
            case 2:
                return (
                    <>
                        <Modal.Header style={{ padding: "1em" }}>
                            <Modal.Title
                                style={{
                                    color: "#563E1F",
                                    fontSize: "1.1em",
                                    fontWeight: "600",
                                }}
                                className='d-flex align-items-center gap-2'
                            >
                                <GrFormPrevious
                                    onClick={() => setCurrentModalPage(1)}
                                    size={25}
                                />{" "}
                                Block User Permanently
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div
                                className={`col-sm-12 overflow-auto d-flex flex-column`}
                            >
                                <div className={styles.reason2}>Reason</div>
                                <textarea
                                    className={styles.textarea2}
                                    placeholder='Write your text here'
                                    maxLength={50}
                                />
                                <div
                                    className='d-flex justify-content-end align-items-center flex-row gap-2'
                                    style={{ margin: "1em" }}
                                >
                                    <button
                                        type='button'
                                        className={styles.btn2cancel}
                                        onClick={() => {
                                            setCurrentModalPage(1);
                                            setShow(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type='button'
                                        className={styles.btn2block}
                                    >
                                        Block Permanently
                                    </button>
                                </div>
                            </div>
                        </Modal.Body>
                    </>
                );
            case 3:
                return (
                    <>
                        <Modal.Header style={{ padding: "1em" }}>
                            <Modal.Title
                                style={{
                                    color: "#563E1F",
                                    fontSize: "1.1em",
                                    fontWeight: "600",
                                }}
                                className='d-flex align-items-center gap-2'
                            >
                                <GrFormPrevious
                                    onClick={() => setCurrentModalPage(1)}
                                    size={25}
                                />{" "}
                                Block User for time period
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div
                                className={`col-sm-12 overflow-auto d-flex flex-column`}
                            >
                                <div className={styles.reason2}>
                                    Time Period
                                </div>
                                <input
                                    className={styles.textarea2}
                                    placeholder='Select no of days'
                                    type='number'
                                    maxLength={10}
                                />
                                <div className={styles.reason2}>Reason</div>
                                <textarea
                                    className={styles.textarea2}
                                    placeholder='Write your text here'
                                    maxLength={50}
                                />
                                <div
                                    className='d-flex justify-content-end align-items-center flex-row gap-2'
                                    style={{ margin: "1em" }}
                                >
                                    <button
                                        type='button'
                                        className={styles.btn2cancel}
                                        onClick={() => {
                                            setCurrentModalPage(1);
                                            setShow(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type='button'
                                        className={styles.btn2block}
                                    >
                                        Block Temporarily
                                    </button>
                                </div>
                            </div>
                        </Modal.Body>
                    </>
                );
            case 4:
                return (
                    <>
                        <Modal.Header style={{ padding: "1em" }}>
                            <Modal.Title
                                style={{
                                    color: "#563E1F",
                                    fontSize: "1.1em",
                                    fontWeight: "600",
                                }}
                                className='d-flex align-items-center gap-2'
                            >
                                <GrFormPrevious
                                    onClick={() => setCurrentModalPage(1)}
                                    size={25}
                                />{" "}
                                Report Reasons
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div
                                className={`col-sm-12 overflow-auto d-flex flex-column`}
                            >
                                <div
                                    className={`progress ${styles.progress}`}
                                    style={{
                                        height: "40px",
                                        backgroundColor: "#F5F5F5CC",
                                    }}
                                >
                                    <div
                                        className={`progress-bar ${styles.progressbar}`}
                                        role='progressbar'
                                        aria-valuenow='10'
                                        aria-valuemin='0'
                                        aria-valuemax='100'
                                        style={{
                                            width: "10%",
                                            backgroundColor: "#E9E9E9",
                                            height: "40px",
                                        }}
                                    ></div>
                                    <span className={styles.progresstype}>
                                        False Information
                                    </span>
                                    <span className={styles.progresscompleted}>
                                        223
                                    </span>
                                </div>

                                <div
                                    className={`progress ${styles.progress}`}
                                    style={{
                                        height: "40px",
                                        backgroundColor: "#F5F5F5CC",
                                    }}
                                >
                                    <div
                                        className={`progress-bar ${styles.progressbar}`}
                                        role='progressbar'
                                        aria-valuenow='10'
                                        aria-valuemin='0'
                                        aria-valuemax='100'
                                        style={{
                                            width: "10%",
                                            backgroundColor: "#E9E9E9",
                                            height: "40px",
                                        }}
                                    ></div>
                                    <span className={styles.progresstype}>
                                        Scam or Fraud
                                    </span>
                                    <span className={styles.progresscompleted}>
                                        223
                                    </span>
                                </div>

                                <div
                                    className={`progress ${styles.progress}`}
                                    style={{
                                        height: "40px",
                                        backgroundColor: "#F5F5F5CC",
                                    }}
                                >
                                    <div
                                        className={`progress-bar ${styles.progressbar}`}
                                        role='progressbar'
                                        aria-valuenow='10'
                                        aria-valuemin='0'
                                        aria-valuemax='100'
                                        style={{
                                            width: "10%",
                                            backgroundColor: "#E9E9E9",
                                            height: "40px",
                                        }}
                                    >
                                        <span className='sr-only'>229</span>
                                    </div>
                                    <span className={styles.progresstype}>
                                        Nudity or sexual content
                                    </span>
                                    <span className={styles.progresscompleted}>
                                        223
                                    </span>
                                </div>

                                <div
                                    className={`progress ${styles.progress}`}
                                    style={{
                                        height: "40px",
                                        backgroundColor: "#F5F5F5CC",
                                    }}
                                >
                                    <div
                                        className={`progress-bar ${styles.progressbar}`}
                                        role='progressbar'
                                        aria-valuenow='10'
                                        aria-valuemin='0'
                                        aria-valuemax='100'
                                        style={{
                                            width: "10%",
                                            backgroundColor: "#E9E9E9",
                                            height: "40px",
                                        }}
                                    >
                                        <span className='sr-only'>229</span>
                                    </div>
                                    <span className={styles.progresstype}>
                                        Hate speech or symbols
                                    </span>
                                    <span className={styles.progresscompleted}>
                                        223
                                    </span>
                                </div>

                                <div
                                    className={`progress ${styles.progress}`}
                                    style={{
                                        height: "40px",
                                        backgroundColor: "#F5F5F5CC",
                                    }}
                                >
                                    <div
                                        className={`progress-bar ${styles.progressbar}`}
                                        role='progressbar'
                                        aria-valuenow='10'
                                        aria-valuemin='0'
                                        aria-valuemax='100'
                                        style={{
                                            width: "10%",
                                            backgroundColor: "#E9E9E9",
                                            height: "40px",
                                        }}
                                    >
                                        <span className='sr-only'>229</span>
                                    </div>
                                    <span className={styles.progresstype}>
                                        Bullying or harassment
                                    </span>
                                    <span className={styles.progresscompleted}>
                                        223
                                    </span>
                                </div>

                                <div
                                    className={`progress ${styles.progress}`}
                                    style={{
                                        height: "40px",
                                        backgroundColor: "#F5F5F5CC",
                                    }}
                                >
                                    <div
                                        className={`progress-bar ${styles.progressbar}`}
                                        role='progressbar'
                                        aria-valuenow='10'
                                        aria-valuemin='0'
                                        aria-valuemax='100'
                                        style={{
                                            width: "10%",
                                            backgroundColor: "#E9E9E9",
                                            height: "40px",
                                        }}
                                    >
                                        <span className='sr-only'>229</span>
                                    </div>
                                    <span className={styles.progresstype}>
                                        Others
                                    </span>
                                    <span className={styles.progresscompleted}>
                                        223
                                    </span>
                                </div>
                            </div>
                        </Modal.Body>
                    </>
                );
            default:
                return (
                    <>
                        <Modal.Header
                            closeButton
                            style={{ padding: "1em" }}
                        ></Modal.Header>
                        <Modal.Body>
                            <div
                                className={`col-sm-12 overflow-auto d-flex flex-column`}
                            >
                                <Empty description='Something went wrong, Try Again' />
                            </div>
                        </Modal.Body>
                    </>
                );
        }
    };

    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    setShow(false);
                    setCurrentModalPage(1);
                }}
                style={{ marginTop: "10vh" }}
            >
                {renderSwitch(currentModalPage)}
            </Modal>
            <div
                style={{
                    height: "100vh",
                    overflow: "auto",
                    backgroundColor: "rgb(248,249,250)",
                }}
                className={`col p-0 m-0 ${styles.kisaanStations}`}
            >
                <div className='row g-0 h-100 overflow-auto'>
                    <div
                        className={`col-sm-12 p-0 m-0 krishiBazaar d-flex flex-column ${styles.content}`}
                    >
                        <div
                            className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}
                        >
                            <SideDrawer />
                            <div>Reports</div>
                            <div>image</div>
                        </div>
                        <div className={`col-sm-12 m-3`}>
                            <div className={`d-flex gap-3 ${styles.switchbtn}`}>
                                <Link
                                    to='/admin/KisaanStation/Reports'
                                    className={styles.switchactive}
                                    style={{ textDecoration: "none" }}
                                >
                                    Account Report
                                </Link>
                                <Link
                                    to='/admin/KisaanStation/Reports/PostReports'
                                    className={styles.switchdisabled}
                                    style={{ textDecoration: "none" }}
                                >
                                    Post Report
                                </Link>
                            </div>
                        </div>

                        <div className={`col-sm-12 w-100 `}>
                            <div
                                className={`${styles.middlebar} mx-3 d-flex justify-content-between align-items-center`}
                            >
                                <div className={styles.search}>
                                    <Search />
                                    <input
                                        className={styles.input}
                                        placeholder='Search'
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                                <div className='d-flex gap-2 justify-content-end align-items-center'>
                                    <button
                                        className={`${styles.button} row g-0 d-flex flex-row gap-1 align-items-center justify-content-center`}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        <BiFilterAlt
                                            size={13}
                                            className={styles.svg}
                                        />{" "}
                                        <span
                                            className={`${styles.hideonsm}`}
                                            style={{ width: "fit-content" }}
                                        >
                                            Filter
                                        </span>
                                    </button>
                                    <button
                                        type='button'
                                        className={`${styles.button} row g-0 d-flex flex-row gap-1 align-items-center justify-content-center`}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        <BiSortUp
                                            size={13}
                                            className={styles.svg}
                                        />{" "}
                                        <span
                                            className={`${styles.hideonsm}`}
                                            style={{ width: "fit-content" }}
                                        >
                                            Sort
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={`col-sm-12 w-100`}>
                            <div className={styles.krishiBazaarTable}>
                                {windowSize >= 768 ? (
                                    <table
                                        className={`visibleTable container-fluid text-left ${styles.table}`}
                                        id='table'
                                    >
                                        <thead>
                                            <tr className='head'>
                                                <th>Reported Account</th>
                                                <th>No of Reports</th>
                                                <th>Reason</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.list.map(
                                                (element, index) => {
                                                    return (
                                                        <Table
                                                            element={element}
                                                            key={index}
                                                            className='pagination page-item page-link'
                                                            setShow={setShow}
                                                        />
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className='krishiBazaar-cards'>
                                        {data?.list.map((element, index) => {
                                            return (
                                                <TableCard
                                                    element={element}
                                                    key={index}
                                                    setShow={setShow}
                                                    className='visiblecard page-item page-link'
                                                />
                                            );
                                        })}
                                    </div>
                                )}

                                <div className='pagination'>
                                    <ReactPaginate
                                        previousLabel={"previous"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        pageCount={Math.ceil(data.Total / 10)}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default KisaanStations;
