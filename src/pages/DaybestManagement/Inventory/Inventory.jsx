import React, { useState, useEffect } from "react";
import styles from "./Inventory.module.scss";
import { IoSearch, IoNotificationsOutline } from "react-icons/io5";
import { SideDrawer } from "../../../components/KisaanStation";
import ReactPaginate from "react-paginate";
import { useGetInventoryListQuery, useGetAttendanceSearchQuery } from "../../../api/daybestApi";
import photo from "../../../assests/InventoryIcon.png";
import { BsPlusLg } from "react-icons/bs";
import DashboardCard from "../../../components/KisaanStation/DaybestManagement/DashboardCard/DashboardCard";
import InventoryTR from "../../../components/KisaanStation/DaybestManagement/InventoryTR/InventoryTR";

const AddItemModal = React.lazy(() => import("../../../components/KisaanStation/DaybestManagement/AddItemModal/AddItemModal"));

const Inventory = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    let {
        data: listdata,
        isLoading,
        isFetching,
        refetch,
    } = useGetInventoryListQuery({
        page: currentPage,
        size: 20,
    });

    let {
        data: searchData,
        isLoading: searchLoading,
        isFetching: searchFetching,
        refetch: searchRefetch,
    } = useGetAttendanceSearchQuery({
        key: search,
    });

    useEffect(() => {
        if (search.length === 0) {
            setData(listdata);
            console.log("listData");
            refetch();
        } else {
            setData(searchData);
            console.log("SearchData");
            searchRefetch();
        }
    }, [listdata, refetch, searchData, searchRefetch, search]);

    const setSearchFunc = (e) => {
        if (e.target.value.trim().length === 0) {
            setSearch("");
            refetch();
        } else {
            setSearch(e.target.value);
            searchRefetch();
        }
    };

    const useHandlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
        refetch();
    };

    return (
        <>
            {showModal && <AddItemModal setShowModal={setShowModal} />}
            <div
                style={{
                    height: "100vh",
                    overflow: "auto",
                    backgroundColor: "rgb(248,249,250)",
                }}
                className={`col p-0 m-0 ${styles.DaybestManagement}`}>
                <div className={`col-sm-12 justify-content-end p-0 m-0 krishiBazaar d-flex flex-column ${styles.content}`}>
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
                                <IoNotificationsOutline
                                    size={20}
                                    className={styles.icon}
                                />
                            </div>
                        </div>
                    </div>

                    {(!isFetching || !isLoading) && (
                        <DashboardCard
                            photo={photo}
                            photostyle={{ bottom: "8px" }}
                            isFetching={isFetching}
                            isLoading={isLoading}
                            arrleft={{
                                heading: "Total Items",
                                data: listdata.totalItems,
                            }}
                            arrright={[
                                {
                                    heading: "Working Items",
                                    data: listdata.totalWorkingItems,
                                },
                                {
                                    heading: "Non-Working Items",
                                    data: listdata.nonWorkingItems,
                                },
                            ]}
                        />
                    )}

                    <div className={styles.blocTabs}>
                        <button className={`${styles.tabs} ${styles.activeTabs}`}>Item List</button>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.contentTabs}>
                            <div className={`${styles.content}  ${styles.activeContent}`}>
                                <div className={`col-md-12 w-100 ${styles.bottomWrapper}`}>
                                    <div className={`col-md-12 ${styles.bottom}`}>
                                        <div className={`col-md-12 d-flex flex-wrap align-items-end justify-content-between ${styles.bottomTopbar}`}>
                                            <div className={`d-flex flex-grow-1 flex-md-grow-0 ${styles.searchWrapper}`}>
                                                <div className={` ${styles.search}`}>
                                                    <input
                                                        className={styles.input}
                                                        placeholder='Search employee . . .'
                                                        onChange={(e) => setSearchFunc(e)}
                                                    />
                                                    <IoSearch
                                                        size={25}
                                                        className={styles.searchsvg}
                                                    />
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-end d-flex flex-grow-1 flex-sm-grow-0 gap-sm-0'>
                                                <div className={`d-flex flex-grow-1 flex-sm-grow-0 mt-1 ${styles.buttons}`}>
                                                    <button
                                                        type='button'
                                                        className='d-flex flex-grow-1 flex-sm-grow-0 align-items-center justify-content-center gap-2'
                                                        onClick={() => setShowModal(true)}>
                                                        <BsPlusLg /> Add Items
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {isLoading || isFetching || searchLoading || searchFetching ? (
                                            <div className='m-4 text-center'>Loading...</div>
                                        ) : (
                                            <div className={`col-md-auto ${styles.tableWrapper}`}>
                                                <table
                                                    className={`container-fluid g-0 text-left ${styles.table}`}
                                                    id='table'>
                                                    <thead>
                                                        <tr className={styles.tr}>
                                                            <th
                                                                style={{
                                                                    paddingLeft: "2em",
                                                                }}>
                                                                Item ID
                                                            </th>
                                                            <th>Item Name</th>
                                                            <th>Current Holder</th>
                                                            <th>Current Location</th>
                                                            <th className='text-center'>Last handover Date</th>
                                                            <th className='text-center'>Status</th>
                                                            <th>Details</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data?.itemList && data?.itemList.length === 0 ? (
                                                            <tr>
                                                                <td
                                                                    colSpan='100%'
                                                                    className='text-center'>
                                                                    No record Found
                                                                </td>
                                                            </tr>
                                                        ) : (
                                                            data?.itemList?.map((element, index) => {
                                                                return (
                                                                    <InventoryTR
                                                                        element={element}
                                                                        key={index}
                                                                    />
                                                                );
                                                            })
                                                        )}
                                                    </tbody>
                                                </table>
                                                {data?.totalItems && search.length === 0 && (
                                                    <div className='pagination col-sm-12 d-flex justify-content-center mt-4 mb-2'>
                                                        <ReactPaginate
                                                            previousLabel={"previous"}
                                                            nextLabel={"next"}
                                                            breakLabel={"..."}
                                                            pageCount={Math.ceil(data.totalItems / 20)}
                                                            marginPagesDisplayed={2}
                                                            pageRangeDisplayed={1}
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
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Inventory;
