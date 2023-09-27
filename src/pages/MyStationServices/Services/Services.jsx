import React, { useEffect, useState } from "react";
import styles from "./Services.module.scss";
import { Breadcrumb, DashboardCard, Loader } from "../../../components";
import { ReactComponent as Dashboard1Icon } from "../../../assests/chart-bar2.svg";
import { NavLink, useParams, useNavigate, useMatch } from "react-router-dom";
import { SideDrawer } from "../../../components/KisaanStation";
import ReactPaginate from "react-paginate";
import { ReactComponent as Search } from "../../../assests/search.svg";
import { useGetMyStationServicesQuery } from "../../../api/KisaanStationsApi";
import ServicesDetailsTR from "../../../components/KisaanStation/MyStation/ServicesDetailsTR/ServicesDetailsTR";
import TableCard from "../../../components/KisaanStation/MyStation/TableCard/TableCard";
import { FiEdit } from "react-icons/fi";

const Services = () => {
    const [windowSize] = useState(window.innerWidth);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    let { status } = useParams();

    const matchPending = useMatch(
        "/admin/KisaanStation/MyStation/Services/Pending"
    );
    const matchDelivered = useMatch(
        "/admin/KisaanStation/MyStation/Services/Delivered"
    );
    const matchCancelled = useMatch(
        "/admin/KisaanStation/MyStation/Services/Cancelled"
    );
    const matchApproved = useMatch(
        "/admin/KisaanStation/MyStation/Services/Approved"
    );
    const matchOntheway = useMatch(
        "/admin/KisaanStation/MyStation/Services/On%20the%20way"
    );
    const matchAll = useMatch("/admin/KisaanStation/MyStation/Services");

    if (status === undefined) {
        status = "All";
    }

    const { data, isLoading, isFetching, refetch } =
        useGetMyStationServicesQuery(
            { currentPage, status },
            { refetchOnMountOrArgChange: true }
        );

    useEffect(() => {
        var item_value = sessionStorage.getItem("myStationOrdersCurrentPage");
        if (item_value) {
            setCurrentPage(item_value);
        } else {
            setCurrentPage(1);
        }
    }, []);
    if (isLoading) {
        return <Loader />;
    }
    if (isFetching) {
        return <Loader />;
    }

    const useHandlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
        sessionStorage.setItem("myStationOrdersCurrentPage", data.selected + 1);
        refetch();
    };

    return (
        <div
            style={{
                height: "100vh",
                overflow: "auto",
                backgroundColor: "rgb(248,249,250)",
            }}
            className={`col p-0 m-0 ${styles.Services}`}>
            <div className='row g-0 h-100 overflow-auto'>
                <div
                    className={`col-sm-12 p-0 m-0 krishiBazaar d-flex flex-column ${styles.content}`}>
                    <div
                        className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}>
                        <SideDrawer />
                        <Breadcrumb />
                        <div>&nbsp;</div>
                    </div>

                    {/* 4 Cards */}
                    <div className='col-sm-12 d-flex flex-row justify-content-around flex-wrap mt-4'>
                        <DashboardCard
                            title={"Total Orders"}
                            data={data.AllTotal + 27}
                            icon={<Dashboard1Icon />}
                        />
                        <DashboardCard
                            title={"Total Order Value"}
                            data={
                                <span>
                                    &#8377; {data.totalOrderValue + 35628}
                                </span>
                            }
                            icon={<Dashboard1Icon />}
                        />
                        <DashboardCard
                            title={"Total Area"}
                            data={
                                parseFloat(data.TotalArea + 74.67).toFixed(2) +
                                " acre"
                            }
                            icon={<Dashboard1Icon />}
                        />
                        <DashboardCard
                            title={"Remaining Payment"}
                            data={
                                <span>
                                    &#8377; {data.remainingPayment + 16700}
                                </span>
                            }
                            icon={<Dashboard1Icon />}
                        />
                    </div>
                    <div className='col-sm-12 d-flex flex-row justify-content-around flex-wrap mt-4'>
                        <DashboardCard
                            title={"Order Delivered"}
                            data={data.TotalDelivered + 33}
                            icon={<Dashboard1Icon />}
                        />
                        <DashboardCard
                            title={"Area Covered"}
                            data={`${data.TotalAreaCovered + 99} acre`}
                            icon={<Dashboard1Icon />}
                        />
                        <DashboardCard
                            title={"Online Payments"}
                            data={"0"}
                            icon={<Dashboard1Icon />}
                        />
                        <DashboardCard
                            title={"Cash Payments"}
                            data={
                                <span>&#8377; {data.CashPayments + 28088}</span>
                            }
                            icon={<Dashboard1Icon />}
                        />
                    </div>
                    <div className={`col-sm-12 w-100`}>
                        <div
                            className={`${styles.middlebar} mx-3 d-flex justify-content-between`}>
                            <div
                                className={`d-flex gap-2 justify-content-left ${styles.headerrow}`}>
                                <NavLink
                                    to='/admin/KisaanStation/MyStation/Services'
                                    end
                                    onClick={() => {
                                        setCurrentPage(1);
                                        sessionStorage.setItem(
                                            "myStationOrdersCurrentPage",
                                            1
                                        );
                                    }}
                                    className={
                                        matchAll !== null
                                            ? `${styles.activemiddlebar} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`
                                            : `${styles.button} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`
                                    }
                                    style={{
                                        textDecoration: "none",
                                    }}>
                                    All
                                </NavLink>
                                <NavLink
                                    to='/admin/KisaanStation/MyStation/Services/Pending'
                                    end
                                    onClick={() => {
                                        setCurrentPage(1);
                                        sessionStorage.setItem(
                                            "myStationOrdersCurrentPage",
                                            1
                                        );
                                    }}
                                    className={
                                        matchPending !== null
                                            ? `${styles.activemiddlebar} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`
                                            : `${styles.button} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`
                                    }
                                    style={{
                                        textDecoration: "none",
                                    }}>
                                    Pending
                                </NavLink>
                                <NavLink
                                    to='/admin/KisaanStation/MyStation/Services/On the way'
                                    onClick={() => {
                                        setCurrentPage(1);
                                        sessionStorage.setItem(
                                            "myStationOrdersCurrentPage",
                                            1
                                        );
                                    }}
                                    className={
                                        matchOntheway !== null
                                            ? `${styles.activemiddlebar} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`
                                            : `${styles.button} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`
                                    }
                                    style={{
                                        textDecoration: "none",
                                    }}>
                                    On the way
                                </NavLink>
                                <NavLink
                                    to='/admin/KisaanStation/MyStation/Services/Approved'
                                    onClick={() => {
                                        setCurrentPage(1);
                                        sessionStorage.setItem(
                                            "myStationOrdersCurrentPage",
                                            1
                                        );
                                    }}
                                    className={
                                        matchApproved !== null
                                            ? `${styles.activemiddlebar} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`
                                            : `${styles.button} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`
                                    }
                                    style={{
                                        textDecoration: "none",
                                    }}>
                                    Approved
                                </NavLink>
                                <NavLink
                                    to='/admin/KisaanStation/MyStation/Services/Delivered'
                                    onClick={() => {
                                        setCurrentPage(1);
                                        sessionStorage.setItem(
                                            "myStationOrdersCurrentPage",
                                            1
                                        );
                                    }}
                                    className={
                                        matchDelivered !== null
                                            ? `${styles.activemiddlebar} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`
                                            : `${styles.button} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`
                                    }
                                    style={{
                                        textDecoration: "none",
                                    }}>
                                    Delivered
                                </NavLink>
                                <NavLink
                                    to='/admin/KisaanStation/MyStation/Services/Cancelled'
                                    onClick={() => {
                                        setCurrentPage(1);
                                        sessionStorage.setItem(
                                            "myStationOrdersCurrentPage",
                                            1
                                        );
                                    }}
                                    className={
                                        matchCancelled !== null
                                            ? `${styles.activemiddlebar} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`
                                            : `${styles.button} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`
                                    }
                                    style={{
                                        textDecoration: "none",
                                    }}>
                                    Cancelled
                                </NavLink>
                            </div>
                            <div className='d-flex flex-row w-80 gap-2 justify-content-end'>
                                <div className={styles.search}>
                                    <Search />
                                    <input
                                        className={styles.input}
                                        placeholder='Search'
                                        // onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                                <div
                                    className={styles.updateButton}
                                    onClick={() =>
                                        navigate(
                                            "/admin/KisaanStation/MyStation/Services/UpdateServices/DroneSpray"
                                        )
                                    }>
                                    {windowSize < 576 ? (
                                        <FiEdit size={19} />
                                    ) : (
                                        <>
                                            <FiEdit
                                                size={19}
                                                className={styles.icon}
                                            />{" "}
                                            Update Services
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-sm-12 w-100`}>
                        {status === "All" && data.list.length !== 0 ? (
                            <div className={styles.krishiBazaarTable}>
                                <table
                                    className={`visibleTable container-fluid text-left d-none d-md-table ${styles.table}`}
                                    id='table'>
                                    <thead>
                                        <tr className='head'>
                                            <th>ID</th>
                                            <th>User Name</th>
                                            <th>Kisaan Station</th>
                                            <th>Service</th>
                                            <th>Booking Date</th>
                                            <th>Total Area</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.list.map((element, index) => {
                                            return (
                                                <ServicesDetailsTR
                                                    element={element}
                                                    key={index}
                                                    className='pagination page-item page-link'
                                                    header={"All"}
                                                />
                                            );
                                        })}
                                    </tbody>
                                </table>

                                <div className='krishiBazaar-cards d-block d-md-none'>
                                    {data?.list.map((element, index) => {
                                        return (
                                            <TableCard
                                                element={element}
                                                key={index}
                                                className='visiblecard page-item page-link'
                                                header={status}
                                            />
                                        );
                                    })}
                                </div>
                                <div className='pagination'>
                                    <ReactPaginate
                                        previousLabel={"previous"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        pageCount={Math.ceil(
                                            data.AllTotal / 10
                                        )}
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
                        ) : (
                            ""
                        )}
                        {status === "Pending" && data.list.length !== 0 ? (
                            <div className={styles.krishiBazaarTable}>
                                <table
                                    className={`visibleTable container-fluid text-left d-none d-md-table ${styles.table}`}
                                    id='table'>
                                    <thead>
                                        <tr className='head'>
                                            <th>ID</th>
                                            <th>User Name</th>
                                            <th>Kisaan Station</th>
                                            <th>Service</th>
                                            <th>Date</th>
                                            <th>Total Area</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.list.map((element, index) => {
                                            return (
                                                <ServicesDetailsTR
                                                    element={element}
                                                    key={index}
                                                    className='pagination page-item page-link'
                                                    header={status}
                                                />
                                            );
                                        })}
                                    </tbody>
                                </table>

                                <div className='krishiBazaar-cards d-block d-md-none'>
                                    {data?.list.length !== 0 &&
                                        data?.list.map((element, index) => {
                                            return (
                                                <TableCard
                                                    element={element}
                                                    key={index}
                                                    className='visiblecard page-item page-link'
                                                    header={status}
                                                />
                                            );
                                        })}
                                    {data?.list.length === 0 && (
                                        <div className='text-center'>
                                            No record Found
                                        </div>
                                    )}
                                </div>
                                <div className='pagination'>
                                    <ReactPaginate
                                        previousLabel={"previous"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        pageCount={Math.ceil(
                                            data.TotalPending / 10
                                        )}
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
                        ) : (
                            ""
                        )}
                        {status === "Delivered" && data.list.length !== 0 ? (
                            <div className={styles.krishiBazaarTable}>
                                <table
                                    className={`visibleTable container-fluid text-left d-none d-md-table ${styles.table}`}
                                    id='table'>
                                    <thead>
                                        <tr className='head'>
                                            <th>ID</th>
                                            <th>User Name</th>
                                            <th>Kisaan Station</th>
                                            <th>Service</th>
                                            <th>Date</th>
                                            <th>Total Area</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.list.map((element, index) => {
                                            return (
                                                <ServicesDetailsTR
                                                    element={element}
                                                    key={index}
                                                    className='pagination page-item page-link'
                                                    header={status}
                                                />
                                            );
                                        })}
                                    </tbody>
                                </table>

                                <div className='krishiBazaar-cards d-block d-md-none'>
                                    {data?.list.map((element, index) => {
                                        return (
                                            <TableCard
                                                element={element}
                                                key={index}
                                                className='visiblecard page-item page-link'
                                                header={status}
                                            />
                                        );
                                    })}
                                </div>

                                <div className='pagination'>
                                    <ReactPaginate
                                        previousLabel={"previous"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        pageCount={Math.ceil(
                                            data.TotalDelivered / 10
                                        )}
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
                        ) : (
                            ""
                        )}
                        {status === "Cancelled" && data.list.length !== 0 ? (
                            <div className={styles.krishiBazaarTable}>
                                <table
                                    className={`visibleTable container-fluid text-left d-none d-md-table ${styles.table}`}
                                    id='table'>
                                    <thead>
                                        <tr className='head'>
                                            <th>ID</th>
                                            <th>User Name</th>
                                            <th>Kisaan Station</th>
                                            <th>Service</th>
                                            <th>Date</th>
                                            <th>Total Area</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.list.map((element, index) => {
                                            return (
                                                <ServicesDetailsTR
                                                    element={element}
                                                    key={index}
                                                    className='pagination page-item page-link'
                                                    header={status}
                                                />
                                            );
                                        })}
                                    </tbody>
                                </table>

                                <div className='krishiBazaar-cards d-block d-md-none'>
                                    {data?.list.length !== 0 &&
                                        data?.list.map((element, index) => {
                                            return (
                                                <TableCard
                                                    element={element}
                                                    key={index}
                                                    className='visiblecard page-item page-link'
                                                    header={status}
                                                />
                                            );
                                        })}
                                    {data?.list.length === 0 && (
                                        <div className='text-center'>
                                            No record Found
                                        </div>
                                    )}
                                </div>

                                <div className='pagination'>
                                    <ReactPaginate
                                        previousLabel={"previous"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        pageCount={Math.ceil(
                                            data.TotalCancelled / 10
                                        )}
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
                        ) : (
                            ""
                        )}
                        {status === "Approved" && data.list.length !== 0 ? (
                            <div className={styles.krishiBazaarTable}>
                                <table
                                    className={`visibleTable container-fluid text-left d-none d-md-table ${styles.table}`}
                                    id='table'>
                                    <thead>
                                        <tr className='head'>
                                            <th>ID</th>
                                            <th>User Name</th>
                                            <th>Kisaan Station</th>
                                            <th>Service</th>
                                            <th>Date</th>
                                            <th>Total Area</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.list.map((element, index) => {
                                            return (
                                                <ServicesDetailsTR
                                                    element={element}
                                                    key={index}
                                                    className='pagination page-item page-link'
                                                    header={status}
                                                />
                                            );
                                        })}
                                    </tbody>
                                </table>

                                <div className='krishiBazaar-cards d-block d-md-none'>
                                    {data?.list.map((element, index) => {
                                        return (
                                            <TableCard
                                                element={element}
                                                key={index}
                                                className='visiblecard page-item page-link'
                                                header={status}
                                            />
                                        );
                                    })}
                                </div>

                                <div className='pagination'>
                                    <ReactPaginate
                                        previousLabel={"previous"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        pageCount={Math.ceil(
                                            data.TotalApproved / 10
                                        )}
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
                        ) : (
                            ""
                        )}
                        {status === "On the way" && data.list.length !== 0 ? (
                            <div className={styles.krishiBazaarTable}>
                                {windowSize >= 768 ? (
                                    <table
                                        className={`visibleTable container-fluid text-left ${styles.table}`}
                                        id='table'>
                                        <thead>
                                            <tr className='head'>
                                                <th>ID</th>
                                                <th>User Name</th>
                                                <th>Kisaan Station</th>
                                                <th>Service</th>
                                                <th>Date</th>
                                                <th>Total Area</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.list.map(
                                                (element, index) => {
                                                    return (
                                                        <ServicesDetailsTR
                                                            element={element}
                                                            key={index}
                                                            className='pagination page-item page-link'
                                                            header={
                                                                "On the way"
                                                            }
                                                        />
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className='krishiBazaar-cards d-block d-md-none'>
                                        {data?.list.map((element, index) => {
                                            return (
                                                <TableCard
                                                    element={element}
                                                    key={index}
                                                    className='visiblecard page-item page-link'
                                                    header={status}
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
                                        pageCount={Math.ceil(
                                            data.TotalOnTheWay / 10
                                        )}
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
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
