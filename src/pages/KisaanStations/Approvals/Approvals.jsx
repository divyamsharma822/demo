import React, { useState } from "react";
import styles from "./Approvals.module.scss";
import { Breadcrumb, DashboardCard } from "../../../components";
import { NavLink } from "react-router-dom";
import { ReactComponent as Dashboard1Icon } from "../../../assests/chart-bar2.svg";
import { SideDrawer } from "../../../components/KisaanStation";
import ReactPaginate from "react-paginate";
import { ReactComponent as Search } from "../../../assests/search.svg";
import { useSellerListandRequestListQuery } from "../../../api/KisaanStationsApi";
import AllSellerTable from "../../../components/KisaanStation/KisaanStation/AllSellerTable/AllSellerTable";
import TableCard from "../../../components/KisaanStation/KisaanStation/TableCard/TableCard";

const Approvals = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    let { data, isLoading, isFetching, refetch } =
        useSellerListandRequestListQuery({
            currentPage,
            status: "Approvals",
            search,
        });

    const setSearchFunc = (e) => {
        if (e.target.value.trim().length === 0) {
            setSearch("");
        } else {
            setSearch(`key=${e.target.value}`);
        }
    };

    const useHandlePageClick = async (data) => {
        setCurrentPage(data.selected + 1);
        refetch();
    };

    return (
        <div
            style={{
                height: "100vh",
                overflow: "auto",
                backgroundColor: "rgb(248,249,250)",
            }}
            className={`col p-0 m-0 ${styles.kisaanStations}`}>
            <div className='row g-0 h-100 overflow-auto'>
                <div
                    className={`col-sm-12 p-0 m-0 krishiBazaar d-flex flex-column ${styles.content}`}>
                    <div
                        className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}>
                        <SideDrawer />
                        <Breadcrumb />
                        <div>image</div>
                    </div>

                    {/* 4 Cards */}
                    <div className='col-sm-12 d-flex flex-row justify-content-around flex-wrap mt-4'>
                        <DashboardCard
                            title={"Total Sellers"}
                            data={
                                !isLoading && !isFetching
                                    ? data.totalSellers
                                    : "Loading"
                            }
                            icon={<Dashboard1Icon />}
                        />
                        <DashboardCard
                            title={"Active Sellers"}
                            data={
                                !isLoading && !isFetching
                                    ? data.totalActiveSellers
                                    : "Loading"
                            }
                            icon={<Dashboard1Icon />}
                        />
                        <DashboardCard
                            title={"Pending Requests"}
                            data={
                                !isLoading && !isFetching
                                    ? data.totalPendingRequests
                                    : "Loading"
                            }
                            icon={<Dashboard1Icon />}
                        />
                        <DashboardCard
                            title={"Rejected Requests"}
                            data={
                                !isLoading && !isFetching
                                    ? data.totalRejectedRequests
                                    : "Loading"
                            }
                            icon={<Dashboard1Icon />}
                        />
                    </div>
                    <div className={`col-sm-12 w-100 `}>
                        <div
                            className={`${styles.middlebar} mx-3 d-flex justify-content-between`}>
                            <div className='d-flex gap-2 w-100 justify-content-left'>
                                <NavLink
                                    end
                                    to='/admin/KisaanStation/Kisaan%20Station/Sellers'
                                    className={`${styles.button} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`}
                                    style={{
                                        textDecoration: "none",
                                    }}>
                                    All Sellers
                                </NavLink>
                                <NavLink
                                    end
                                    to='/admin/KisaanStation/Kisaan%20Station/Sellers/Approvals'
                                    className={`${styles.activemiddlebar} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`}
                                    style={{
                                        textDecoration: "none",
                                    }}>
                                    Approvals
                                </NavLink>
                            </div>
                            <div className={styles.search}>
                                <Search />
                                <input
                                    className={styles.input}
                                    placeholder='Search'
                                    onChange={(e) => setSearchFunc(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`col-sm-12 w-100`}>
                        <div className={styles.krishiBazaarTable}>
                            <table
                                className={`visibleTable container-fluid text-left d-none d-md-table ${styles.table}`}
                                id='table'>
                                <thead>
                                    <tr className='head'>
                                        <th>Username</th>
                                        <th>Location</th>
                                        <th>Date</th>
                                        <th className='text-center'>Status</th>
                                        <th className='text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.sellerList.length !== 0 &&
                                        data?.sellerList.map(
                                            (element, index) => {
                                                return (
                                                    <AllSellerTable
                                                        element={element}
                                                        key={index}
                                                        className='pagination page-item page-link'
                                                        header={"Approvals"}
                                                    />
                                                );
                                            }
                                        )}
                                    {data?.sellerList.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan='5'
                                                className='text-center'>
                                                No record Found
                                            </td>
                                        </tr>
                                    )}
                                    {isFetching && isLoading && (
                                        <tr>
                                            <td
                                                colSpan='5'
                                                className='text-center'>
                                                Loading
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div className='krishiBazaar-cards d-block d-md-none'>
                                {data?.sellerList.map((element, index) => {
                                    return (
                                        <TableCard
                                            element={element}
                                            key={index}
                                            className='visiblecard page-item page-link'
                                            header={"Approvals"}
                                        />
                                    );
                                })}
                            </div>

                            {data?.sellerList &&
                            data?.sellerList.length !== 0 ? (
                                <div className='pagination'>
                                    <ReactPaginate
                                        previousLabel={"previous"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        pageCount={Math.ceil(
                                            data.totalResultFound / 20
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
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Approvals;
