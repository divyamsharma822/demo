import React, { useState, useEffect } from "react";
import styles from "./Employees.module.scss";
import { SideDrawer } from "../../../components/KisaanStation";
import { IoSearch, IoNotificationsOutline } from "react-icons/io5";
import ReactPaginate from "react-paginate";

import { useAllDepartmentsQuery, useAllDesignationsQuery, useGetEmployeeListQuery, useGetEmployeeSearchQuery } from "../../../api/daybestApi";
import { Link } from "react-router-dom";

const Employees = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(sessionStorage.getItem("DM-EmployeeListPage") ? sessionStorage.getItem("DM-EmployeeListPage") : 1);
    const [currentPageSearch, setCurrentPageSearch] = useState(1);
    const [toggleState] = useState(1);
    const [data, setData] = useState([]);
    const [dept, setDept] = useState("All");
    const [apiDept, setApiDept] = useState("All");
    const [degn, setDegn] = useState("All");

    let {
        data: listdata,
        isLoading,
        isFetching,
        refetch,
    } = useGetEmployeeListQuery({
        page: currentPage,
        size: 20,
        dept: apiDept,
        degn: degn,
    });

    let {
        data: searchData,
        isLoading: searchLoading,
        isFetching: searchFetching,
        refetch: searchRefetch,
    } = useGetEmployeeSearchQuery({
        page: currentPageSearch,
        size: 20,
        key: search,
    });

    useEffect(() => {
        if (search.length === 0) {
            setData(listdata);
            // refetch();
        } else {
            setData(searchData);
        }
    }, [searchData, searchRefetch, search]);

    let { data: departments, isLoading: deapartmentLoading, isFetching: departmentFetching } = useAllDepartmentsQuery();

    let {
        data: designations,
        isLoading: designationsLoading,
        isFetching: designationsFetching,
        refetch: designationsRefetch,
    } = useAllDesignationsQuery({
        dept: apiDept,
    });

    if (isLoading || searchLoading) {
        return <div>Loading</div>;
    }

    const useHandlePageClick = async (data) => {
        setCurrentPage(data.selected + 1);
        sessionStorage.setItem("DM-EmployeeListPage", data.selected + 1);
        refetch();
    };

    const useHandlePageClickSearch = async (data) => {
        setCurrentPageSearch(data.selected + 1);
        refetch();
    };

    return (
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

                <div className={styles.blocTabs}>
                    <button className={toggleState === 1 ? `${styles.tabs} ${styles.activeTabs}` : `${styles.tabs}`}>Employee List</button>
                </div>
                <div className={styles.container}>
                    <div className={styles.contentTabs}>
                        <div className={toggleState === 1 ? `${styles.content}  ${styles.activeContent}` : `${styles.content}`}>
                            <div className={`col-md-12 w-100 ${styles.bottomWrapper}`}>
                                <div className={`col-md-12 ${styles.bottom}`}>
                                    <div className={`col-md-12 d-flex flex-wrap align-items-end justify-content-between ${styles.bottomTopbar}`}>
                                        <div className={`d-flex flex-grow-1 flex-md-grow-0 ${styles.searchWrapper}`}>
                                            <div className={` ${styles.search}`}>
                                                <input
                                                    className={styles.input}
                                                    placeholder='Search employee . . .'
                                                    onChange={(e) => setSearch(e.target.value)}
                                                />
                                                <IoSearch
                                                    size={25}
                                                    className={styles.searchsvg}
                                                />
                                            </div>
                                        </div>
                                        <div className='d-flex gap-3 align-items-end'>
                                            <div className={`d-flex flex-column ${styles.departmentWrapper}`}>
                                                <label htmlFor='standard-select'>Department</label>
                                                <div className={`${styles.selectWrapper} ${styles.select}`}>
                                                    <select
                                                        id='standard-select'
                                                        className='form-select'
                                                        style={{
                                                            padding: "0.4em 1em",
                                                            fontSize: "0.9em",
                                                        }}
                                                        defaultValue={dept}
                                                        onChange={(e) => {
                                                            sessionStorage.setItem("DM-EmployeeListPage", 1);
                                                            setDept(e.target.value);
                                                            if (e.target.value === "IT & Innovation") {
                                                                setApiDept("IT%20%26%20Innovation");
                                                            } else if (e.target.value === "R&D") {
                                                                setApiDept("R%26D");
                                                            } else {
                                                                setApiDept(e.target.value);
                                                            }
                                                            setCurrentPage(1);
                                                            setDegn("All");
                                                            designationsRefetch();
                                                        }}>
                                                        {!deapartmentLoading &&
                                                            !departmentFetching &&
                                                            departments.map((curr, index) => {
                                                                return (
                                                                    <option
                                                                        value={curr}
                                                                        key={index}>
                                                                        {curr}
                                                                    </option>
                                                                );
                                                            })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={`d-flex flex-column ${styles.departmentWrapper}`}>
                                                <label htmlFor='standard-select'>Designation</label>
                                                <div className={`${styles.selectWrapper} ${styles.select}`}>
                                                    <select
                                                        id='standard-select'
                                                        className='form-select'
                                                        style={{
                                                            padding: "0.4em 1em",
                                                            fontSize: "0.9em",
                                                        }}
                                                        value={degn}
                                                        onChange={(e) => {
                                                            setDegn(e.target.value);
                                                            sessionStorage.setItem("DM-EmployeeListPage", 1);
                                                            setCurrentPage(1);
                                                        }}>
                                                        {!designationsFetching &&
                                                            !designationsLoading &&
                                                            designations.map((curr, index) => {
                                                                return (
                                                                    <option
                                                                        value={curr}
                                                                        key={index}>
                                                                        {curr}
                                                                    </option>
                                                                );
                                                            })}
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
                                    {isLoading || isFetching || searchLoading || searchFetching ? (
                                        <div className='m-4 text-center'>Loading...</div>
                                    ) : (
                                        <div className={`col-md-auto ${styles.tableWrapper}`}>
                                            <table
                                                className={`container-fluid g-0 text-left ${styles.table}`}
                                                id='table'>
                                                <thead>
                                                    <tr>
                                                        <th
                                                            style={{
                                                                paddingLeft: "2em",
                                                            }}>
                                                            Employee ID
                                                        </th>
                                                        <th>Employee Name</th>
                                                        <th className='text-center'>Mobile No.</th>
                                                        <th className='text-center'>Department</th>
                                                        <th className='text-center'>Designation</th>
                                                        <th className='text-center'>Allocated Location</th>

                                                        <th>Details</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listdata?.employeesDetails &&
                                                        listdata?.employeesDetails.length !== 0 &&
                                                        listdata?.employeesDetails?.map((element, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{element?.employeeId}</td>
                                                                    <td>{element?.fullName}</td>
                                                                    <td className='text-center'>{element.mobileNo ? element.mobileNo : "-"}</td>
                                                                    <td className='text-center'>{element?.department}</td>
                                                                    <td className='text-center'>{element?.designation}</td>
                                                                    <td className='text-center'>{element.AllocatedLocation ? element?.AllocatedLocation : "-"}</td>
                                                                    <td>
                                                                        <Link
                                                                            to={"/admin/KisaanStation/DaybestManagement/Employees/View"}
                                                                            state={{
                                                                                data: element,
                                                                            }}
                                                                            style={{
                                                                                textDecoration: "none",
                                                                                color: "inherit",
                                                                            }}>
                                                                            <div className={styles.viewBtn}>View</div>
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    {listdata?.employeesDetails && listdata?.employeesDetails.length === 0 && (
                                                        <tr>
                                                            <td
                                                                colSpan='100%'
                                                                className='text-center'>
                                                                No record Found
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                            {listdata?.totalEmployees && search.length === 0 ? (
                                                <div className='pagination col-sm-12 d-flex justify-content-center mt-4 mb-2'>
                                                    <ReactPaginate
                                                        previousLabel={"previous"}
                                                        nextLabel={"next"}
                                                        breakLabel={"..."}
                                                        pageCount={Math.ceil(listdata.totalEmployees / 20)}
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
                                            ) : (
                                                ""
                                            )}

                                            {data?.totalResultFound && data.totalResultFound.length !== 0 && search.length !== 0 ? (
                                                <div className='pagination col-sm-12 d-flex justify-content-center mt-4 mb-2'>
                                                    <ReactPaginate
                                                        previousLabel={"previous"}
                                                        nextLabel={"next"}
                                                        breakLabel={"..."}
                                                        pageCount={Math.ceil(data.totalResultFound / 20)}
                                                        marginPagesDisplayed={2}
                                                        pageRangeDisplayed={1}
                                                        onPageChange={useHandlePageClickSearch}
                                                        forcePage={currentPageSearch - 1}
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
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employees;
