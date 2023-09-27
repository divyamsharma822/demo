import React, { useState, useEffect } from "react";
import styles from "./DaybestManagement.module.scss";
import { SideDrawer } from "../../components/KisaanStation";
import { IoSearch, IoNotificationsOutline } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import photo from "../../assests/daybeastCardIcon.png";
import moment from "moment";
import {
  useAllDepartmentsQuery,
  useGetAttendanceListQuery,
  useGetAttendanceSearchQuery,
} from "../../api/daybestApi";
import ReactPaginate from "react-paginate";
import { IoCloseOutline } from "react-icons/io5";
import DashboardCard from "../../components/KisaanStation/DaybestManagement/DashboardCard/DashboardCard";

const DaybestManagement = () => {
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

  const openFullscreen = (e) => {
    e.currentTarget.requestFullscreen();
  };

  return (
    <>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.header}>
              <IoCloseOutline
                size={45}
                className={styles.close}
                onClick={() => setShowModal(false)}
              />
            </div>
            <div
              className={`row g-0 d-flex flex-column justify-content-between flex-wrap ${styles.heading}`}
            >
              <div className={`col-md-12 ${styles.heading1}`}>
                <div style={{ fontSize: "1.5em" }}>
                  {capitalizeFirst(data?.attendenceDetails[view]?.fullName)}
                </div>
                <div>{data?.attendenceDetails[view]?.attendence?.date}</div>
              </div>
              <div
                className={`col-md-12 d-flex flex-row flex-wrap ${styles.heading2}`}
              >
                <div>
                  {data?.attendenceDetails[view]?.department} -{" "}
                  {data?.attendenceDetails[view]?.designation}{" "}
                </div>
                <div>
                  <span style={{ color: "#276B9C" }}>Total Active Hours</span> -{" "}
                  {data?.attendenceDetails[view]?.attendence.totalHoursLogged
                    ? data?.attendenceDetails[view]?.attendence.totalHoursLogged
                    : "N/A"}{" "}
                </div>
              </div>
            </div>
            <div className={styles.tabs}>
              <div className={`row g-0 ${styles.tab}`}>
                {data?.attendenceDetails[view]?.attendence.signinArray.map(
                  (curr, index) => {
                    return (
                      <div
                        className={`d-flex flex-row gap-2 gap-md-0 flex-wrap py-1 ${styles.container}`}
                        key={index}
                      >
                        <div className="col-md-6 flex-grow-1 flex-md-grow-0 px-1">
                          <div className={styles.tableft}>
                            <div className={styles.heading}>SignIn</div>
                            <div className="row g-0 mt-1 d-flex justify-content-between">
                              <div className="col-8">
                                <div className="d-flex gap-2 flex-column">
                                  <div className={`${styles.time}`}>
                                    <div className="col d-flex align-items-start justify-content-center">
                                      <svg
                                        width="17"
                                        height="18"
                                        viewBox="0 0 17 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M11.7811 0.885498H4.65604C1.86359 0.885498 0 2.88484 0 5.74783V12.4611C0 15.3271 1.85806 17.3234 4.65604 17.3234H11.7802C14.5785 17.3234 16.4379 15.3268 16.4379 12.4611V5.74783C16.4379 2.8823 14.5786 0.885498 11.7811 0.885498ZM4.65757 2.11835H11.7826C13.8788 2.11835 15.2066 3.54431 15.2066 5.74784V12.4611C15.2066 14.6647 13.8787 16.0906 11.7818 16.0906H4.65757C2.56103 16.0906 1.23438 14.6652 1.23438 12.4611V5.74784C1.23438 3.54711 2.56612 2.11835 4.65757 2.11835ZM8.83269 5.43195C8.79187 5.13107 8.53396 4.89917 8.22189 4.89917C7.88145 4.89917 7.60547 5.17515 7.60547 5.51559V9.09988L7.61234 9.19172C7.63957 9.37258 7.74628 9.53393 7.90608 9.62925L10.6931 11.292L10.7678 11.33C11.0471 11.4491 11.3784 11.3464 11.5383 11.0784L11.5763 11.0037C11.6954 10.7244 11.5928 10.3931 11.3248 10.2332L8.83807 8.74918L8.83831 5.51559L8.83269 5.43195Z"
                                          fill="#828282"
                                        />
                                      </svg>
                                    </div>
                                    <div className="col-10">
                                      {" "}
                                      {curr?.signInTime &&
                                        moment(curr?.signInTime).format("LT")}
                                    </div>
                                  </div>

                                  <div className={styles.location}>
                                    <div className="col d-flex align-items-start justify-content-center">
                                      <svg
                                        width="20"
                                        height="20"
                                        viewBox="1 0 14 18"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={styles.svg}
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M7.00978 0.788615C3.22164 0.775746 0.127473 3.78961 0.00380358 7.56211L0 7.79627C0.0629645 9.64538 0.692096 11.408 1.80018 12.8603L2.06043 13.1999C3.11811 14.5447 4.37504 15.7252 5.78637 16.6981L6.12618 16.9268L6.17576 16.9658C6.65949 17.3133 7.31262 17.3133 7.79635 16.9658L7.83762 16.9319C8.95748 16.2056 9.99014 15.3523 10.9152 14.3887C12.7958 12.398 13.9293 10.1674 13.972 7.90207L13.9721 7.81796C13.985 4.0202 10.9804 0.916519 7.2195 0.792429L7.00978 0.788615ZM7.00442 2.03595C10.11 2.04657 12.6314 4.5279 12.725 7.61797L12.7277 7.89043C12.6917 9.78969 11.6973 11.7466 10.015 13.5274C9.15719 14.4209 8.19542 15.2151 7.15228 15.8906L7.08276 15.9429C7.02658 15.9916 6.94325 15.9916 6.88707 15.9429L6.8195 15.8919C5.26555 14.8773 3.90169 13.5964 2.79032 12.1077C1.89512 10.9344 1.36465 9.53158 1.25788 8.06819L1.24219 7.77476C1.25274 4.6617 3.72642 2.13253 6.807 2.03862L7.00442 2.03595ZM6.98566 5.22778C5.51579 5.22778 4.32422 6.42303 4.32422 7.89744C4.32422 9.37185 5.51579 10.5671 6.98566 10.5671C8.45553 10.5671 9.6471 9.37185 9.6471 7.89744C9.6471 6.42303 8.45553 5.22778 6.98566 5.22778ZM6.98452 6.47516C7.76772 6.47516 8.40263 7.11203 8.40263 7.89765C8.40263 8.68327 7.76772 9.32014 6.98452 9.32014C6.20132 9.32014 5.56641 8.68327 5.56641 7.89765C5.56641 7.11203 6.20132 6.47516 6.98452 6.47516Z"
                                          fill="#828282"
                                        />
                                      </svg>
                                    </div>
                                    <div className="col-10">
                                      {curr?.signInLocation}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 d-flex justify-content-end">
                                <img
                                  src={curr?.signInImage?.imageUrl}
                                  alt=""
                                  className={`rounded img-responsive ${styles.img}`}
                                  onClick={(e) => openFullscreen(e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 flex-grow-1 flex-md-grow-0 px-1">
                          <div className={styles.tabright}>
                            {curr.signOutTime ? (
                              <>
                                <div className={styles.heading}>SignOut</div>

                                <div className="row g-0 mt-1 d-flex justify-content-between">
                                  <div className="col-8">
                                    <div className="d-flex gap-2 flex-column">
                                      <div className={styles.time}>
                                        <div className="col d-flex align-items-start justify-content-center">
                                          <svg
                                            width="17"
                                            height="18"
                                            viewBox="0 0 17 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              clipRule="evenodd"
                                              d="M11.7811 0.885498H4.65604C1.86359 0.885498 0 2.88484 0 5.74783V12.4611C0 15.3271 1.85806 17.3234 4.65604 17.3234H11.7802C14.5785 17.3234 16.4379 15.3268 16.4379 12.4611V5.74783C16.4379 2.8823 14.5786 0.885498 11.7811 0.885498ZM4.65757 2.11835H11.7826C13.8788 2.11835 15.2066 3.54431 15.2066 5.74784V12.4611C15.2066 14.6647 13.8787 16.0906 11.7818 16.0906H4.65757C2.56103 16.0906 1.23438 14.6652 1.23438 12.4611V5.74784C1.23438 3.54711 2.56612 2.11835 4.65757 2.11835ZM8.83269 5.43195C8.79187 5.13107 8.53396 4.89917 8.22189 4.89917C7.88145 4.89917 7.60547 5.17515 7.60547 5.51559V9.09988L7.61234 9.19172C7.63957 9.37258 7.74628 9.53393 7.90608 9.62925L10.6931 11.292L10.7678 11.33C11.0471 11.4491 11.3784 11.3464 11.5383 11.0784L11.5763 11.0037C11.6954 10.7244 11.5928 10.3931 11.3248 10.2332L8.83807 8.74918L8.83831 5.51559L8.83269 5.43195Z"
                                              fill="#828282"
                                            />
                                          </svg>
                                        </div>
                                        <div className="col-10">
                                          {curr?.signOutTime &&
                                            moment(curr?.signOutTime).format(
                                              "LT"
                                            )}
                                        </div>
                                      </div>

                                      <div className={styles.location}>
                                        <div className="col d-flex align-items-start justify-content-center">
                                          <svg
                                            width="20"
                                            height="20"
                                            viewBox="1 0 14 18"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={styles.svg}
                                          >
                                            <path
                                              fillRule="evenodd"
                                              clipRule="evenodd"
                                              d="M7.00978 0.788615C3.22164 0.775746 0.127473 3.78961 0.00380358 7.56211L0 7.79627C0.0629645 9.64538 0.692096 11.408 1.80018 12.8603L2.06043 13.1999C3.11811 14.5447 4.37504 15.7252 5.78637 16.6981L6.12618 16.9268L6.17576 16.9658C6.65949 17.3133 7.31262 17.3133 7.79635 16.9658L7.83762 16.9319C8.95748 16.2056 9.99014 15.3523 10.9152 14.3887C12.7958 12.398 13.9293 10.1674 13.972 7.90207L13.9721 7.81796C13.985 4.0202 10.9804 0.916519 7.2195 0.792429L7.00978 0.788615ZM7.00442 2.03595C10.11 2.04657 12.6314 4.5279 12.725 7.61797L12.7277 7.89043C12.6917 9.78969 11.6973 11.7466 10.015 13.5274C9.15719 14.4209 8.19542 15.2151 7.15228 15.8906L7.08276 15.9429C7.02658 15.9916 6.94325 15.9916 6.88707 15.9429L6.8195 15.8919C5.26555 14.8773 3.90169 13.5964 2.79032 12.1077C1.89512 10.9344 1.36465 9.53158 1.25788 8.06819L1.24219 7.77476C1.25274 4.6617 3.72642 2.13253 6.807 2.03862L7.00442 2.03595ZM6.98566 5.22778C5.51579 5.22778 4.32422 6.42303 4.32422 7.89744C4.32422 9.37185 5.51579 10.5671 6.98566 10.5671C8.45553 10.5671 9.6471 9.37185 9.6471 7.89744C9.6471 6.42303 8.45553 5.22778 6.98566 5.22778ZM6.98452 6.47516C7.76772 6.47516 8.40263 7.11203 8.40263 7.89765C8.40263 8.68327 7.76772 9.32014 6.98452 9.32014C6.20132 9.32014 5.56641 8.68327 5.56641 7.89765C5.56641 7.11203 6.20132 6.47516 6.98452 6.47516Z"
                                              fill="#828282"
                                            />
                                          </svg>
                                        </div>
                                        <div className="col-10">
                                          {curr?.signOutLocation}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-4 d-flex justify-content-end">
                                    <img
                                      src={curr?.signOutImage?.imageUrl}
                                      alt=""
                                      className={`rounded img-responsive ${styles.img}`}
                                      onClick={(e) => openFullscreen(e)}
                                    />
                                  </div>
                                </div>
                                <div className={styles.remarks}>
                                  <div className={styles.heading}>Remarks</div>
                                  <div className={styles.remark}>
                                    {curr?.workDone}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className={styles.heading}>
                                SignOut Pending
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
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
            <div className="d-flex flex-row justify-content-end gap-3">
              <div className={styles.search}>
                <input
                  className={styles.input}
                  placeholder="Search anything..."
                />
                <IoSearch size={25} className={styles.searchsvg} />
              </div>
              <div className={styles.notiicon}>
                <IoNotificationsOutline size={20} className={styles.icon} />
              </div>
              <div className={styles.notiicon}>
                <IoMdContact size={20} className={styles.icon} />
              </div>
            </div>
          </div>

          {(!isFetching || !isLoading) && (
            <DashboardCard
              photo={photo}
              photostyle={{ bottom: "0px" }}
              isFetching={isFetching}
              isLoading={isLoading}
              arrleft={{
                heading: "Total Employees",
                data: listdata.totalEmployees,
              }}
              arrright={[
                {
                  heading: "Active Employees",
                  data: listdata.activeEmployees,
                },
                {
                  heading: "Employees On Leave",
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
              <div className={`${styles.content}  ${styles.activeContent}`}>
                <div className={`col-md-12 w-100 ${styles.bottomWrapper}`}>
                  <div className={`col-md-12 ${styles.bottom}`}>
                    <div
                      className={`col-md-12 d-flex flex-wrap align-items-end justify-content-between ${styles.bottomTopbar}`}
                    >
                      <div
                        className={`d-flex flex-grow-1 flex-md-grow-0 ${styles.searchWrapper}`}
                      >
                        <div className={` ${styles.search}`}>
                          <input
                            className={styles.input}
                            placeholder="Search employee . . ."
                            onChange={(e) => setSearchFunc(e)}
                          />
                          <IoSearch size={25} className={styles.searchsvg} />
                        </div>
                      </div>
                      <div className="d-flex gap-3 align-items-end">
                        <div
                          className={`d-flex flex-column ${styles.dateWrapper}`}
                        >
                          <label>Date</label>
                          <input
                            type="date"
                            defaultValue={currentDate}
                            onChange={(e) =>
                              handleDateChange(
                                moment(e.target.value, "YYYY-MM-DD").format(
                                  "DD/MM/YYYY"
                                )
                              )
                            }
                            placeholder="DD-MM-YYYY"
                          />
                        </div>
                        {/* department wrapper */}
                        <div
                          className={`d-flex flex-column ${styles.departmentWrapper}`}
                        >
                          <label htmlFor="standard-select">Department</label>
                          <div
                            className={`${styles.selectWrapper} ${styles.select}`}
                          >
                            <select
                              id="standard-select"
                              className="form-select"
                              style={{
                                padding: "0.4em 1em",
                              }}
                            >
                              {!deapartmentLoading &&
                                !departmentFetching &&
                                designations.map((curr, index) => {
                                  return (
                                    <option value={curr} key={index}>
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
                    {isLoading ||
                    isFetching ||
                    searchLoading ||
                    searchFetching ? (
                      <div className="m-4 text-center">Loading...</div>
                    ) : (
                      <div className={`col-md-auto ${styles.tableWrapper}`}>
                        <table
                          className={`container-fluid g-0 text-left ${styles.table}`}
                          id="table"
                        >
                          <thead>
                            <tr>
                              <th
                                style={{
                                  paddingLeft: "2em",
                                }}
                              >
                                Employee ID
                              </th>
                              <th>Employee Name</th>
                              <th className="text-center">Department</th>
                              <th className="text-center">Designation</th>
                              <th className="text-center">Work hours</th>
                              <th className="text-center">
                                First Sign In Time
                              </th>
                              <th className="text-center">
                                Last Sign Out Time
                              </th>
                              <th>Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.attendenceDetails &&
                              data?.attendenceDetails.length !== 0 &&
                              data?.attendenceDetails?.map((element, index) => {
                                return (
                                  <tr key={index}>
                                    <td>
                                      {(currentPage - 1) * 10 + (index + 1)}
                                    </td>
                                    <td>
                                      {element.fullName
                                        ? capitalizeFirst(element.fullName)
                                        : "N/A"}
                                    </td>
                                    <td className="text-center">
                                      {element.department
                                        ? capitalizeFirst(element.department)
                                        : "N/A"}
                                    </td>
                                    <td className="text-center">
                                      {element.designation
                                        ? capitalizeFirst(element.designation)
                                        : "N/A"}
                                    </td>
                                    <td className="text-center">
                                      {element.attendence.totalHoursLogged
                                        ? element.attendence.totalHoursLogged
                                        : "Signout Pending"}
                                    </td>
                                    <td className="text-center">
                                      {moment(
                                        element.attendence.firstSignIn
                                      ).format("LT")}
                                    </td>
                                    <td className="text-center">
                                      {element.attendence.lastSignOut
                                        ? moment(
                                            element.attendence.lastSignOut
                                          ).format("LT")
                                        : "Signout Pending"}
                                    </td>
                                    <td>
                                      <div
                                        className={styles.viewBtn}
                                        onClick={() => {
                                          setView(index);
                                          setShowModal(true);
                                        }}
                                      >
                                        View
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            {data?.attendenceDetails &&
                              data?.attendenceDetails.length === 0 && (
                                <tr>
                                  <td colSpan="100%" className="text-center">
                                    No record Found
                                  </td>
                                </tr>
                              )}
                          </tbody>
                        </table>
                        {data?.activeEmployees && search.length === 0 ? (
                          <div className="pagination col-sm-12 d-flex justify-content-center mt-4 mb-2">
                            <ReactPaginate
                              previousLabel={"previous"}
                              nextLabel={"next"}
                              breakLabel={"..."}
                              pageCount={Math.ceil(data.activeEmployees / 20)}
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

export default DaybestManagement;
