import React, { useEffect, useState } from "react";
import styles from "./FarmAnalysis.module.scss";
import { NavLink } from "react-router-dom";
import { SideDrawer } from "../../components/KisaanStation";
import ReactPaginate from "react-paginate";
import { ReactComponent as Search } from "../../assests/search.svg";
import { useGetAllFarmsQuery } from "../../api/KisaanStationsApi";
import Table from "../../components/KisaanStation/FarmAnalysis/Table/Table";
import TableCard from "../../components/KisaanStation/FarmAnalysis/TableCard/TableCard";
import { Breadcrumb } from "../../components";

const FarmAnalysis = () => {
    const [search, setSearch] = useState("");
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [currentPage, setCurrentPage] = useState(1);

    let { data, isLoading, isFetching, refetch } = useGetAllFarmsQuery({
        currentPage,
        search,
    });

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(window.innerWidth);
        }
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [windowSize]);

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
            className={`col p-0 m-0 ${styles.FarmAnalysis}`}>
            <div className={`col-sm-12 p-0 m-0 krishiBazaar d-flex flex-column ${styles.content}`}>
                <div className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}>
                    <SideDrawer />
                    <Breadcrumb />
                    <div>&nbsp;</div>
                </div>

                <div className={`col-sm-12 w-100 `}>
                    <div className={`${styles.middlebar} mx-3 d-flex justify-content-between`}>
                        <div className='d-flex gap-2 w-100 justify-content-left'>
                            <NavLink
                                to='/admin/KisaanStation/Farm%20Analysis'
                                className={`${styles.activemiddlebar} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`}
                                style={{
                                    textDecoration: "none",
                                }}>
                                Farms
                            </NavLink>
                            <NavLink
                                to='/admin/KisaanStation/Farm%20Analysis/Analysis%20Requests'
                                className={`${styles.button} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`}
                                style={{
                                    textDecoration: "none",
                                }}>
                                Analysis Requests
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

                {isLoading || isFetching ? (
                    <div className='m-4 text-center'>Loading</div>
                ) : (
                    <div className={`col-sm-12 w-100`}>
                        <div className={styles.krishiBazaarTable}>
                            {windowSize >= 768 ? (
                                <table
                                    className={`visibleTable container-fluid text-left ${styles.table}`}
                                    id='table'>
                                    <thead>
                                        <tr className='head'>
                                            <th>Name</th>
                                            <th>Farm Name</th>
                                            <th>Location</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.list.map((element, index) => {
                                            return (
                                                <Table
                                                    element={element}
                                                    key={index}
                                                    header='Farms'
                                                    className='pagination page-item page-link'
                                                />
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <div className='krishiBazaar-cards'>
                                    {data?.list
                                        .filter((element) => {
                                            return (
                                                (element?.name && element?.name.toLowerCase().includes(search.toLowerCase())) ||
                                                (element.farmDetails?.farmName &&
                                                    element.farmDetails?.farmName.toLowerCase().includes(search.toLowerCase())) ||
                                                (element?.farmDetails?.address &&
                                                    element?.farmDetails?.address.toLowerCase().includes(search.toLowerCase()))
                                            );
                                        })
                                        .map((element, index) => {
                                            return (
                                                <TableCard
                                                    element={element}
                                                    key={index}
                                                    className='visiblecard page-item page-link'
                                                    header={"Farms"}
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
                )}
            </div>
        </div>
    );
};

export default FarmAnalysis;
