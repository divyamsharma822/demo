import React, { useState } from "react";
import styles from "./TravelExpenses.module.scss";
import { SideDrawer } from "../../../components/KisaanStation";
import { IoSearch, IoNotificationsOutline } from "react-icons/io5";
import photo from "../../../assests/travelExpensesImage.png";
import { Pagination } from "antd";
import moment from "moment";
import DashboardCard from "../../../components/KisaanStation/DaybestManagement/DashboardCard/DashboardCard";
import TravelExpensesPopup from "../../../components/KisaanStation/DaybestManagement/TravelExpensesPopup/TravelExpensesPopup";
const pageSize = 10;

const TravelExpenses = () => {
  // const [search, setSearch] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [minIndex, setMinIndex] = useState(0);
  // const [maxIndex, setMaxIndex] = useState(1);
  const [, setSearch] = useState("");
  const [, setCurrentPage] = useState(1);
  const [, setMinIndex] = useState(0);
  const [, setMaxIndex] = useState(1);
  const [toggleState, setToggleState] = useState(1);
  const [travelPopup, setTravelPopup] = useState(false);

  const travelPopupFun = () => {
    setTravelPopup(!travelPopup);
    console.log(travelPopup);
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const setSearchFunc = (e) => {
    if (e.target.value.trim().length === 0) {
      setSearch("");
    } else {
      setSearch(`key=${e.target.value}`);
    }
  };

  const handleChange = (page) => {
    setCurrentPage(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
  };

  return (
    <>
      {travelPopup && (
        <TravelExpensesPopup
          travelPopupFun={travelPopupFun}
          setTravelPopup={setTravelPopup}
          travelPopup={travelPopup}
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
                <IoNotificationsOutline size={20} className={styles.icon} />
              </div>
            </div>
          </div>

          <DashboardCard
            photo={photo}
            photostyle={{ bottom: "0px" }}
            arrleft={{
              heading: "Total Travel Expenses Requests",
              data: 24,
            }}
            arrright={[
              {
                heading: "Pending Request of Travel Expenses",
                data: 5,
              },
              {
                heading: "Reimbursed Applications",
                data: 12,
              },
            ]}
          />
          <div className={styles.blocTabs}>
            <button
              className={
                toggleState === 1
                  ? `${styles.tabs} ${styles.activeTabs}`
                  : `${styles.tabs}`
              }
              onClick={() => toggleTab(1)}
            >
              Travel Expenses List
            </button>
            <button
              className={
                toggleState === 2
                  ? `${styles.tabs} ${styles.activeTabs}`
                  : `${styles.tabs}`
              }
              onClick={() => toggleTab(2)}
            >
              Status
            </button>
          </div>
          <div className={styles.container}>
            <div className={styles.contentTabs}>
              <div
                className={
                  toggleState === 1
                    ? `${styles.content}  ${styles.activeContent}`
                    : `${styles.content}`
                }
              >
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
                        <div
                          className={`d-flex flex-column ${styles.departmentWrapper}`}
                        >
                          <label htmlFor="standard-select">
                            Standard Select
                          </label>
                          <div
                            className={`${styles.selectWrapper} ${styles.select}`}
                          >
                            <select
                              id="standard-select"
                              className="form-select"
                            >
                              <option value="Option 1">All</option>
                              <option value="Option 2">Tech</option>
                            </select>
                          </div>
                        </div>
                        <div className={styles.buttons}>
                          <button type="button">Download</button>
                          <button type="button">Print</button>
                        </div>
                      </div>
                    </div>
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
                                    className={styles.viewBtn}
                                    onClick={travelPopupFun}
                                  >
                                    View
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div className="col-sm-12 d-flex justify-content-center mt-4 mb-2">
                        <Pagination
                          defaultCurrent={1}
                          total={500}
                          onChange={handleChange}
                          // style={{ bottom: "0px" }}
                          showSizeChanger={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={
                  toggleState === 2
                    ? `${styles.content}  ${styles.activeContent}`
                    : `${styles.content}`
                }
              >
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
                        <div
                          className={`d-flex flex-column ${styles.departmentWrapper}`}
                        >
                          <label htmlFor="standard-select">
                            Standard Select
                          </label>
                          <div
                            className={`${styles.selectWrapper} ${styles.select}`}
                          >
                            <select
                              id="standard-select"
                              className="form-select"
                            >
                              <option value="Option 1">All</option>
                              <option value="Option 2">Tech</option>
                            </select>
                          </div>
                        </div>
                        <div className={styles.buttons}>
                          <button type="button">Download</button>
                          <button type="button">Print</button>
                        </div>
                      </div>
                    </div>
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
                                  <div className={styles.viewBtn}>View</div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div className="col-sm-12 d-flex justify-content-center mt-4 mb-2">
                        <Pagination
                          defaultCurrent={1}
                          total={500}
                          onChange={handleChange}
                          // style={{ bottom: "0px" }}
                          showSizeChanger={false}
                        />
                      </div>
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

export default TravelExpenses;
