import React, { useState, useEffect } from "react";
import styles from "./DailyExpenses.module.scss";
import { SideDrawer } from "../../../components/KisaanStation";
import { IoSearch, IoNotificationsOutline } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import photo from "../../../assests/DailyExpenseIcon.png";
import moment from "moment";
import {
    useAllDepartmentsQuery,
    useGetAttendanceListQuery,
    useGetAttendanceSearchQuery,
} from "../../../api/daybestApi";
import ReactPaginate from "react-paginate";
import DashboardCard from "../../../components/KisaanStation/DaybestManagement/DashboardCard/DashboardCard";
import DailyExpensesModal from "../../../components/KisaanStation/DaybestManagement/DailyExpensesModal/DailyExpensesModal";

const DailyExpenses = () => {
    const getdate = () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;
        return dd + "/" + mm + "/" + yyyy;
    };

    const getdateInput = () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;
        return yyyy + "-" + mm + "-" + dd;
    };

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectdate, setDate] = useState(getdate());
    const [currentDate] = useState(getdateInput());
    const [toggleState] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);
    const [view, setView] = useState(0);

    let {
        data: listdata,
        isLoading,
        isFetching,
        refetch,
    } = useGetAttendanceListQuery({
        date: selectdate,
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
        date: selectdate,
    });

    useEffect(() => {
        if (search.length === 0) {
            setData(listdata);
            refetch();
        } else {
            setData(searchData);
            searchRefetch();
        }
    }, [listdata, refetch, searchData, searchRefetch, search]);

    let {
        data: designations,
        isLoading: deapartmentLoading,
        isFetching: departmentFetching,
    } = useAllDepartmentsQuery();

    const setSearchFunc = (e) => {
        if (e.target.value.trim().length === 0) {
            setSearch("");
            refetch();
        } else {
            setSearch(e.target.value);
            searchRefetch();
        }
    };

    const handleDateChange = (d) => {
        setDate(d);
        refetch();
    };

    const useHandlePageClick = async (data) => {
        setCurrentPage(data.selected + 1);
        refetch();
    };

    const capitalizeFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <>
            {showModal && (
                <DailyExpensesModal
                    setShowModal={setShowModal}
                    element={data[view]}
                />
            )}
            <div
                style={{
                    height: "100vh",
                    overflow: "auto",
                    backgroundColor: "rgb(248,249,250)",
                }}
                className={`col p-0 m-0 ${styles.DaybestManagement}`}
            >
                <div
                    className={`col-sm-12 justify-content-end p-0 m-0 krishiBazaar d-flex flex-column ${styles.content}`}
                >
                    <div
                        className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}
                    >
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
                                <IoMdContact
                                    size={20}
                                    className={styles.icon}
                                />
                            </div>
                        </div>
                    </div>

                    {(!isFetching || !isLoading) && (
                        <DashboardCard
                            photo={photo}
                            photostyle={{ bottom: "-10px" }}
                            isFetching={isFetching}
                            isLoading={isLoading}
                            arrleft={{
                                heading: "Total Requests",
                                data: listdata.totalEmployees,
                            }}
                            arrright={[
                                {
                                    heading: "Pending Request",
                                    data: listdata.activeEmployees,
                                },
                                {
                                    heading: "On Process Applications",
                                    data: listdata.EmployeesOnLeave,
                                },
                                {
                                    heading: "Reimbursed Applications",
                                    data: listdata.EmployeesOnLeave,
                                },
                            ]}
                        />
                    )}

                    <div className={styles.blocTabs}>
                        <button
                            className={
                                toggleState === 1
                                    ? `${styles.tabs} ${styles.activeTabs}`
                                    : `${styles.tabs}`
                            }
                        >
                            Attendance list
                        </button>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.contentTabs}>
                            <div
                                className={`${styles.content}  ${styles.activeContent}`}
                            >
                                <div
                                    className={`col-md-12 w-100 ${styles.bottomWrapper}`}
                                >
                                    <div
                                        className={`col-md-12 ${styles.bottom}`}
                                    >
                                        <div
                                            className={`col-md-12 d-flex flex-wrap align-items-end justify-content-between ${styles.bottomTopbar}`}
                                        >
                                            <div
                                                className={`d-flex flex-grow-1 flex-md-grow-0 ${styles.searchWrapper}`}
                                            >
                                                <div
                                                    className={` ${styles.search}`}
                                                >
                                                    <input
                                                        className={styles.input}
                                                        placeholder='Search employee . . .'
                                                        onChange={(e) =>
                                                            setSearchFunc(e)
                                                        }
                                                    />
                                                    <IoSearch
                                                        size={25}
                                                        className={
                                                            styles.searchsvg
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className='d-flex gap-3 align-items-end'>
                                                <div
                                                    className={`d-flex flex-column ${styles.dateWrapper}`}
                                                >
                                                    <label>Date</label>
                                                    <input
                                                        type='date'
                                                        defaultValue={
                                                            currentDate
                                                        }
                                                        onChange={(e) =>
                                                            handleDateChange(
                                                                moment(
                                                                    e.target
                                                                        .value,
                                                                    "YYYY-MM-DD"
                                                                ).format(
                                                                    "DD/MM/YYYY"
                                                                )
                                                            )
                                                        }
                                                        placeholder='DD-MM-YYYY'
                                                    />
                                                </div>
                                                {/* department wrapper */}
                                                <div
                                                    className={`d-flex flex-column ${styles.departmentWrapper}`}
                                                >
                                                    <label htmlFor='standard-select'>
                                                        Department
                                                    </label>
                                                    <div
                                                        className={`${styles.selectWrapper} ${styles.select}`}
                                                    >
                                                        <select
                                                            id='standard-select'
                                                            className='form-select'
                                                            style={{
                                                                padding:
                                                                    "0.4em 1em",
                                                            }}
                                                        >
                                                            {!deapartmentLoading &&
                                                                !departmentFetching &&
                                                                designations.map(
                                                                    (
                                                                        curr,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <option
                                                                                value={
                                                                                    curr
                                                                                }
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                {
                                                                                    curr
                                                                                }
                                                                            </option>
                                                                        );
                                                                    }
                                                                )}
                                                        </select>
                                                    </div>
                                                </div>
                                                {/* <div className={styles.buttons}>
                                                    <button type='button'>
                                                        Download
                                                    </button>
                                                    <button type='button'>
                                                        Print
                                                    </button>
                                                </div> */}
                                            </div>
                                        </div>
                                        {isLoading ||
                                        isFetching ||
                                        searchLoading ||
                                        searchFetching ? (
                                            <div className='m-4 text-center'>
                                                Loading...
                                            </div>
                                        ) : (
                                            <div
                                                className={`col-md-auto ${styles.tableWrapper}`}
                                            >
                                                <table
                                                    className={`container-fluid g-0 text-left ${styles.table}`}
                                                    id='table'
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th
                                                                style={{
                                                                    paddingLeft:
                                                                        "2em",
                                                                }}
                                                            >
                                                                Employee ID
                                                            </th>
                                                            <th>
                                                                Employee Name
                                                            </th>
                                                            <th className='text-center'>
                                                                Department
                                                            </th>
                                                            <th className='text-center'>
                                                                Date
                                                            </th>
                                                            <th className='text-center'>
                                                                Total Expenses
                                                            </th>
                                                            <th className='text-center'>
                                                                Status
                                                            </th>
                                                            <th>Details</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data?.attendenceDetails &&
                                                            data
                                                                ?.attendenceDetails
                                                                .length !== 0 &&
                                                            data?.attendenceDetails?.map(
                                                                (
                                                                    element,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <tr
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <td>
                                                                                {(currentPage -
                                                                                    1) *
                                                                                    10 +
                                                                                    (index +
                                                                                        1)}
                                                                            </td>
                                                                            <td>
                                                                                {element.fullName
                                                                                    ? capitalizeFirst(
                                                                                          element.fullName
                                                                                      )
                                                                                    : "N/A"}
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                {element.department
                                                                                    ? capitalizeFirst(
                                                                                          element.department
                                                                                      )
                                                                                    : "N/A"}
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                {element.designation
                                                                                    ? capitalizeFirst(
                                                                                          element.designation
                                                                                      )
                                                                                    : "N/A"}
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                {element
                                                                                    .attendence
                                                                                    .totalHoursLogged
                                                                                    ? element
                                                                                          .attendence
                                                                                          .totalHoursLogged
                                                                                    : "Signout Pending"}
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                {moment(
                                                                                    element
                                                                                        .attendence
                                                                                        .firstSignIn
                                                                                ).format(
                                                                                    "LT"
                                                                                )}
                                                                            </td>

                                                                            <td>
                                                                                <div
                                                                                    className={
                                                                                        styles.viewBtn
                                                                                    }
                                                                                    onClick={() => {
                                                                                        setView(
                                                                                            index
                                                                                        );
                                                                                        setShowModal(
                                                                                            true
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    View
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                }
                                                            )}
                                                        {data?.attendenceDetails &&
                                                            data
                                                                ?.attendenceDetails
                                                                .length ===
                                                                0 && (
                                                                <tr>
                                                                    <td
                                                                        colSpan='100%'
                                                                        className='text-center'
                                                                    >
                                                                        No
                                                                        record
                                                                        Found
                                                                    </td>
                                                                </tr>
                                                            )}
                                                    </tbody>
                                                </table>
                                                {data?.activeEmployees &&
                                                search.length === 0 ? (
                                                    <div className='pagination col-sm-12 d-flex justify-content-center mt-4 mb-2'>
                                                        <ReactPaginate
                                                            previousLabel={
                                                                "previous"
                                                            }
                                                            nextLabel={"next"}
                                                            breakLabel={"..."}
                                                            pageCount={Math.ceil(
                                                                data.activeEmployees /
                                                                    20
                                                            )}
                                                            marginPagesDisplayed={
                                                                2
                                                            }
                                                            pageRangeDisplayed={
                                                                2
                                                            }
                                                            onPageChange={
                                                                useHandlePageClick
                                                            }
                                                            forcePage={
                                                                currentPage - 1
                                                            }
                                                            containerClassName={
                                                                "pagination"
                                                            }
                                                            pageClassName={
                                                                "page-item"
                                                            }
                                                            pageLinkClassName={
                                                                "page-link"
                                                            }
                                                            previousClassName={
                                                                "page-item"
                                                            }
                                                            previousLinkClassName={
                                                                "page-link"
                                                            }
                                                            nextClassName={
                                                                "page-item"
                                                            }
                                                            nextLinkClassName={
                                                                "page-link"
                                                            }
                                                            breakClassName={
                                                                "page-item"
                                                            }
                                                            breakLinkClassName={
                                                                "page-link"
                                                            }
                                                            activeClassName={
                                                                "active"
                                                            }
                                                        />
                                                    </div>
                                                ) : (
                                                    ""
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

export default DailyExpenses;
