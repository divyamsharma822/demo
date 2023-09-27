import React from "react";
import {
  IoSearch,
  IoNotificationsOutline,
} from "react-icons/io5";
import "./Leaves.scss";
import { SideDrawer } from "../../../components/KisaanStation";
import DashboardCard from "../../../components/KisaanStation/DaybestManagement/DashboardCard/DashboardCard";
import { useState } from "react";
import photo from "../../../assests/LeavesHeaderIcon.png";
import moment from "moment";
import {
  useGetAttendanceListQuery,
  useGetAttendanceSearchQuery,
} from "../../../api/daybestApi";
import ReactPaginate from "react-paginate";
import { useEffect } from "react";
import LeavesPopup from "../../../components/KisaanStation/DaybestManagement/LeavesPopup/LeavesPopup";

const Leaves = () => {
  const [leavesModal, setLeavesModal] = useState(false);

  const openModal = () => {
    setLeavesModal(!leavesModal);
    console.log(leavesModal);
  };

  const getdate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return dd + "/" + mm + "/" + yyyy;
  };

  // const getdateInput = () => {
  //   var today = new Date();
  //   var dd = today.getDate();
  //   var mm = today.getMonth() + 1;
  //   var yyyy = today.getFullYear();

  //   if (dd < 10) dd = "0" + dd;
  //   if (mm < 10) mm = "0" + mm;
  //   return yyyy + "-" + mm + "-" + dd;
  // };

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectdate] = useState(getdate());
  // const [currentDate] = useState(getdateInput());
  const [toggleState, setToggleState] = useState(1);
  // const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  // const [view, setView] = useState(0);

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
    // isLoading: searchLoading,
    // isFetching: searchFetching,
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
  
  const setSearchFunc = (e) => {
    if (e.target.value.trim().length === 0) {
      setSearch("");
      refetch();
    } else {
      setSearch(e.target.value);
      searchRefetch();
    }
  };

  // const handleDateChange = (d) => {
  //   setDate(d);
  //   refetch();
  // };

  const useHandlePageClick = async (data) => {
    setCurrentPage(data.selected + 1);
    refetch();
  };

  // const capitalizeFirst = (str) => {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // };

  // const openFullscreen = (e) => {
  //   e.currentTarget.requestFullscreen();
  // };

  return (
    <>
      {leavesModal && <LeavesPopup openModal={openModal} />}
      <div
        style={{
          height: "100vh",
          overflow: "auto",
          backgroundColor: "rgb(248,249,250)",
        }}
        className="col p-0 m-0 Leaves"
      >
        <div className="content col-sm-12 justify-content-end p-0 m-0 krishiBazaar d-flex flex-column">
          <div className="col-sm-12 d-flex flex-row justify-content-between align-items-center navbar">
            <SideDrawer /> <div>&nbsp;</div>
            <div className="d-flex flex-row justify-content-end gap-3">
              <div className="search">
                <input className="input" placeholder="Search anything..." />
                <IoSearch size={25} className="searchsvg" />
              </div>
              <div className="notiicon">
                <IoNotificationsOutline size={20} className="icon" />
              </div>
              <div className="notiicon">
                <IoNotificationsOutline size={20} className="icon" />
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
                heading: "Total Employees on Leave",
                data: 14,
              }}
              arrright={[
                {
                  heading: "Employee on Casual Leave",
                  data: 2,
                },
                {
                  heading: "Employee on Sick Leave",
                  data: 10,
                },
                {
                  heading: "Employee on Work From Home",
                  data: 2,
                },
              ]}
            />
          )}
          <div className="blocTabs">
            <button
              className={toggleState === 1 ? `tabs activeTabs` : `tabs`}
              onClick={() => setToggleState(1)}
            >
              Attendance list
            </button>
            <button
              className={toggleState === 2 ? `tabs activeTabs` : `tabs`}
              onClick={() => setToggleState(2)}
            >
              Status
            </button>
          </div>
          <div className="container">
            <div className="contentTabs">
              <div
                className={
                  toggleState === 1 ? `content activeContent` : `content`
                }
              >
                <div className="col-md-12 w-100 bottomWrapper">
                  <div className="col-md-12 bottom">
                    <div className="col-md-12 d-flex flex-wrap align-items-end justify-content-between bottomTopbar">
                      <div className="d-flex flex-grow-1 flex-md-grow-0 searchWrapper">
                        <div className="search">
                          <input
                            className="input"
                            placeholder="Search employee . . ."
                            onChange={(e) => setSearchFunc(e)}
                          />
                          <IoSearch size={25} className="searchsvg" />
                        </div>
                      </div>
                      <div className="d-flex gap-3 align-items-end">
                        <div className="d-flex flex-column dateWrapper">
                          <label>Date</label>
                          <input
                            type="date"
                            onChange={(e) => {
                              console.log(
                                moment(e.target.value, "YYYY-MM-DD").format(
                                  "DD/MM/YYYY"
                                )
                              );
                            }}
                            placeholder="DD-MM-YYYY"
                          />
                        </div>
                        <div className="d-flex flex-column departmentWrapper">
                          <label htmlFor="standard-select">
                            Standard Select
                          </label>
                          <div className="selectWrapper select">
                            <select
                              id="standard-select"
                              className="form-select"
                            >
                              <option value="Option 1">All</option>
                              <option value="Option 2">Tech</option>
                            </select>
                          </div>
                        </div>
                        <div className="buttons">
                          <button type="button">Download</button>
                          <button type="button">Print</button>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-auto tableWrapper">
                      <table
                        className="container-fluid g-0 text-left table"
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
                            <th className="text-center">First Sign In Time</th>
                            <th className="text-center">Last Sign Out Time</th>
                            <th>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                            16,
                          ].map((curr, index) => {
                            return (
                              <tr key={index}>
                                <td>51124</td>
                                <td>Ajay Kumar Dodiya</td>
                                <td className="text-center">Tech</td>
                                <td className="text-center">Analyst</td>
                                <td className="text-center">8 hours</td>
                                <td className="text-center">10:56 AM</td>
                                <td className="text-center">07:00 PM</td>
                                <td>
                                  <div className="viewBtn" onClick={openModal}>
                                    View
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      {/* {data?.activeEmployees && search.length === 0 ? ( */}
                      <div className="pagination col-sm-12 d-flex justify-content-center mt-4 mb-2">
                        <ReactPaginate
                          previousLabel={"previous"}
                          nextLabel={"next"}
                          breakLabel={"..."}
                          pageCount={Math.ceil(10 / 20)}
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

              <div
                className={
                  toggleState === 2 ? `content activeContent` : `content`
                }
              >
                <div className="col-md-12 w-100 bottomWrapper">
                  <div className="col-md-12 bottom">
                    <div className="col-md-12 d-flex flex-wrap align-items-end justify-content-between bottomTopbar">
                      <div className="d-flex flex-grow-1 flex-md-grow-0 searchWrapper">
                        <div className="search">
                          <input
                            className="input"
                            placeholder="Search employee . . ."
                            onChange={(e) => setSearchFunc(e)}
                          />
                          <IoSearch size={25} className="searchsvg" />
                        </div>
                      </div>
                      <div className="d-flex gap-3 align-items-end">
                        <div className="d-flex flex-column dateWrapper">
                          <label>Date</label>
                          <input
                            type="date"
                            onChange={(e) => {
                              console.log(
                                moment(e.target.value, "YYYY-MM-DD").format(
                                  "DD/MM/YYYY"
                                )
                              );
                            }}
                            placeholder="DD-MM-YYYY"
                          />
                        </div>
                        <div className="d-flex flex-column departmentWrapper">
                          <label htmlFor="standard-select">
                            Standard Select
                          </label>
                          <div className="selectWrapper select">
                            <select
                              id="standard-select"
                              className="form-select"
                            >
                              <option value="Option 1">All</option>
                              <option value="Option 2">Tech</option>
                            </select>
                          </div>
                        </div>
                        <div className="buttons">
                          <button type="button">Download</button>
                          <button type="button">Print</button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-auto tableWrapper">
                      <table
                        className="container-fluid g-0 text-left table"
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
                            <th className="text-center">First Sign In Time</th>
                            <th className="text-center">Last Sign Out Time</th>
                            <th>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                            16,
                          ].map((curr, index) => {
                            return (
                              <tr key={index}>
                                <td>51124</td>
                                <td>Ajay Kumar Dodiya</td>
                                <td className="text-center">Tech</td>
                                <td className="text-center">Analyst</td>
                                <td className="text-center">8 hours</td>
                                <td className="text-center">10:56 AM</td>
                                <td className="text-center">07:00 PM</td>
                                <td>
                                  <div
                                    className="viewBtn"
                                    onClick={leavesModal}
                                  >
                                    View
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
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

export default Leaves;
