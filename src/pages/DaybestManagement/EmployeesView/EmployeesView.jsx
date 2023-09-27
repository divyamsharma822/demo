import React, { useState } from "react";
import { SideDrawer } from "../../../components/KisaanStation";
import styles from "./EmployeesView.module.scss";
import { IoSearch, IoNotificationsOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import moment from "moment";
import AttendanceHistory from "../../../components/KisaanStation/DaybestManagement/AttendanceHistory/AttendanceHistory";
import ProfileHeader from "../../../components/KisaanStation/DaybestManagement/ProfileHeader/ProfileHeader";
import TravelExpences from "../../../components/KisaanStation/DaybestManagement/TravelExpences/TravelExpences";
import DailyExpences from "../../../components/KisaanStation/DaybestManagement/DailyExpences/DailyExpences";
import DocumentsScetion from "../../../components/KisaanStation/DaybestManagement/DocumentsSection/DocumentsScetion";

const EditEmployeeModal = React.lazy(() =>
  import(
    "../../../components/KisaanStation/DaybestManagement/EditEmployeeModal/EditEmployeeModal"
  )
);

const EditBankModal = React.lazy(() =>
  import(
    "../../../components/KisaanStation/DaybestManagement/EditBankModal/EditBankModal"
  )
);

const capitalizeFirst = (str) => {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return "N/A";
};

const wrapper = (str) => {
  if (str) {
    return str;
  }
  return "N/A";
};
//
const EmployeesView = () => {
  const location = useLocation();
  const [currentSwitcherTab, setCurrentTab] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showBankDetailsModal, setShowBankDetailsModal] = useState(false);
  const [element] = useState(location.state?.data || {});

  // let { data } = useGetAttendanceListQuery({
  //     date: "12/12/2022",
  //     page: 1,
  //     size: 20,
  // });

  const renderSwitch = (currentSwitcherTab) => {
    switch (currentSwitcherTab) {
      case 1:
        return (
          <div className={`${styles.modal}`}>
            {[
              ["Employee ID", element?.employeeId],
              ["Employee Name", element?.fullName],
              [
                "DOB",
                element?.dateOfBirth
                  ? moment(element?.dateOfBirth, "YYYY-MM-DD").format(
                      "DD-MM-YYYY"
                    )
                  : "",
              ],
              ["Mobile Number", element?.mobileNo],
              ["Email", element?.email],
              ["Department", element?.department],
              ["Designation", element?.designation],
              [
                "Joining Date",
                element?.joiningDate
                  ? moment(element?.joiningDate, "YYYY-MM-DD").format(
                      "DD-MM-YYYY"
                    )
                  : "",
              ],
              ["CTC", element.ctc],
              ["Allocated Location", element.AllocatedLocation],
            ].map((curr, index) => {
              return (
                <div
                  className={`row g-0 d-flex justify-content-center ${styles.datarow}`}
                  key={index}
                >
                  <div className={`col-sm-12 col-md-4 ${styles.leftdata}`}>
                    {curr[0]}
                  </div>
                  <div
                    className={`col-sm-12 col-md-1 d-none d-md-block ${styles.leftdata}`}
                  >
                    :
                  </div>
                  <div className={`col-sm-12 col-md-6 ${styles.rightdata}`}>
                    {wrapper(curr[1])}
                  </div>
                </div>
              );
            })}
            <div
              className={`row g-0 d-flex justify-content-center ${styles.datarow}`}
            >
              <div className={`col-sm-12 col-md-4 ${styles.leftdata}`}>
                Address
              </div>
              <div
                className={`col-sm-12 col-md-1 d-none d-md-block ${styles.leftdata}`}
              >
                :
              </div>
              <div className={`col-sm-12 col-md-6 ${styles.rightdata}`}>
                {element?.address[0]?.houseNo
                  ? `${capitalizeFirst(element?.address[0]?.houseNo)}, `
                  : "-"}
                {element?.address[0]?.area
                  ? `${capitalizeFirst(element?.address[0]?.area)}, `
                  : "-"}
                {element?.address[0]?.district
                  ? `${capitalizeFirst(element?.address[0]?.district)}, `
                  : "-"}
                {element?.address[0]?.state
                  ? `${capitalizeFirst(element?.address[0]?.state)}`
                  : "-"}
                {element?.address[0]?.pinCode
                  ? ` - ${capitalizeFirst(element?.address[0]?.pinCode)}`
                  : ""}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={`${styles.modal}`}>
            {[
              ["Account No.", element?.accountNumber],
              ["Account Holder", element?.accountName],
              ["IFSC Code", element?.ifscCode],
              ["Bank Name", element?.bankName],
              ["Branch Name", element?.branch],
            ].map((curr, index) => {
              return (
                <div
                  className={`row g-0 d-flex justify-content-center ${styles.datarow}`}
                  key={index}
                >
                  <div className={`col-sm-12 col-md-4 ${styles.leftdata}`}>
                    {curr[0]}
                  </div>
                  <div
                    className={`col-sm-12 col-md-1 d-none d-md-block ${styles.leftdata}`}
                  >
                    :
                  </div>
                  <div className={`col-sm-12 col-md-6 ${styles.rightdata}`}>
                    {wrapper(curr[1])}
                  </div>
                </div>
              );
            })}
          </div>
        );
      case 3:
        return (
          <div className={`${styles.modal}`}>
            <AttendanceHistory
              heading={[
                "Date",
                "Work Hours",
                "First Sign In Time",
                "Last Sign In Time",
                "Details",
              ]}
              data={[
                [
                  "10 jan,2023",
                  "8 hours",
                  "10:56 AM",
                  "07:00 PM",
                  <button>view</button>,
                ],
                [
                  "10 jan,2023",
                  "8 hours",
                  "10:56 AM",
                  "07:00 PM",
                  <button>view</button>,
                ],
                [
                  "10 jan,2023",
                  "8 hours",
                  "10:56 AM",
                  "07:00 PM",
                  <button>view</button>,
                ],
              ]}
            />
          </div>
        );
      case 4:
        return (
          <div className={`${styles.modal}`}>
            <AttendanceHistory
              heading={[
                "Date",
                "Work Hours",
                "First Sign In Time",
                "Last Sign In Time",
                "Details",
              ]}
              data={[
                [
                  "10 jan,2023",
                  "8 hours",
                  "10:56 AM",
                  "07:00 PM",
                  <button>view</button>,
                ],
                [
                  "10 jan,2023",
                  "8 hours",
                  "10:56 AM",
                  "07:00 PM",
                  <button>view</button>,
                ],
                [
                  "10 jan,2023",
                  "8 hours",
                  "10:56 AM",
                  "07:00 PM",
                  <button>view</button>,
                ],
                [
                  "10 jan,2023",
                  "8 hours",
                  "10:56 AM",
                  "07:00 PM",
                  <button>view</button>,
                ],
              ]}
            />
          </div>
        );
      case 5:
        return (
          <div className={`${styles.modal}`}>
            <TravelExpences
              heading={[
                "Date",
                "Work Hours",
                "First Sign In Time",
                "Last Sign In Time",
                "Details",
              ]}
              data={[
                [
                  "10 jan,2023",
                  "8 hours",
                  "10:56 AM",
                  "07:00 PM",
                  <button>view</button>,
                ],
                [
                  "10 jan,2023",
                  "8 hours",
                  "10:56 AM",
                  "07:00 PM",
                  <button>view</button>,
                ],
                [
                  "10 jan,2023",
                  "8 hours",
                  "10:56 AM",
                  "07:00 PM",
                  <button>view</button>,
                ],
                [
                  "10 jan,2023",
                  "8 hours",
                  "10:56 AM",
                  "07:00 PM",
                  <button>view</button>,
                ],
              ]}
            />
          </div>
        );
      case 6:
        return (
          <div className={`${styles.modal}`}>
            <DailyExpences
              heading={[
                "Date",
                "Work Hours",
                "First Sign In Time",
                "Last Sign In Time",
                "Details",
              ]}
              data={[
                [
                  "10 jan,2023",
                  "8 hours",
                  "10:56 AM",
                  "07:00 PM",
                  <button>view</button>,
                ],
                [
                  "10 jan,2023",
                  "8 hours",
                  "10:56 AM",
                  "07:00 PM",
                  <button>view</button>,
                ],
                [
                  "10 jan,2023",
                  "8 hours",
                  "10:56 AM",
                  "07:00 PM",
                  <button>view</button>,
                ],
                [
                  "10 jan,2023",
                  "8 hours",
                  "10:56 AM",
                  "07:00 PM",
                  <button>view</button>,
                ],
              ]}
            />
          </div>
        );
      case 7:
        return (
          <div className={`${styles.modal}`}>
            <DocumentsScetion
              heading={["Document Name", "Action"]}
              data={[
                ["Name1", <button>View</button>],
                ["Name2", <button>View</button>],
                ["Name3", <button>View</button>],
                ["Name4", <button>View</button>],
              ]}
            />
          </div>
        );

      default:
        return <div>No Content Found</div>;
    }
  };

  return (
    <>
      {showModal && (
        <EditEmployeeModal element={element} setShowModal={setShowModal} />
      )}
      {showBankDetailsModal && (
        <EditBankModal
          element={element}
          setShowModal={setShowBankDetailsModal}
        />
      )}
      <div
        style={{
          height: "100vh",
          overflow: "auto",
          backgroundColor: "rgb(248,249,250)",
        }}
        className={`col p-0 m-0 ${styles.EmployeesView}`}
      >
        <div
          className={`col-sm-12 justify-content-end p-0 m-0 krishiBazaar d-flex flex-column ${styles.content}`}
        >
          {/* navbar */}
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
          {/* header */}
          {/* <div
                        className={`col-sm-12 d-flex justify-content-center ${styles.headerWrapper}`}
                    >
                        <div
                            className={`d-flex flex-row align-items-end justify-content-between flex-wrap ${styles.header}`}
                        >
                            <div
                                className={`col-sm-12 col-md-6 d-flex flex-row ${styles.left}`}
                            >
                                <div className={styles.imgwrapper}>
                                    {element?.profileImage?.imageUrl !==
                                        undefined && (
                                        <img
                                            src={
                                                element?.profileImage?.imageUrl
                                            }
                                            alt=''
                                            className={`img-fluid rounded ${styles.img}`}
                                            loading='lazy'
                                            height={100}
                                            width={100}
                                            onClick={(e) =>
                                                e.currentTarget.requestFullscreen()
                                            }
                                        />
                                    )}
                                    {element?.profileImage?.imageUrl ===
                                        undefined && "No Image"}
                                </div>
                                <div
                                    className={`d-flex flex-column justify-content-center ${styles.info}`}
                                >
                                    <div className={styles.employeeName}>
                                        {element?.fullName
                                            ? element.fullName
                                            : "Not Registered"}
                                    </div>
                                    <div className={styles.designation}>
                                        {element.department} -{" "}
                                        {element.designation}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`col-sm-12 col-md-6 d-flex justify-content-end flex-grow-1 ${styles.right}`}
                            >
                                <div
                                    className={`d-flex justify-content-center justify-content-sm-end w-100 ${styles.buttons}`}
                                >
                                    {currentSwitcherTab === 1 && (
                                        <button
                                            type='button'
                                            className={`d-flex flex-grow-1 flex-sm-grow-0 align-items-center justify-content-center ${styles.button}`}
                                            onClick={() => setShowModal(true)}
                                        >
                                            Edit Details
                                        </button>
                                    )}

                                    {currentSwitcherTab === 2 && (
                                        <button
                                            type='button'
                                            className={`d-flex flex-grow-1 flex-sm-grow-0 align-items-center justify-content-center ${styles.button}`}
                                            onClick={() =>
                                                setShowBankDetailsModal(true)
                                            }
                                        >
                                            Edit Bank Details
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div> */}
          <ProfileHeader />

          <div
            className={`col-sm-12 d-flex justify-content-center ${styles.bottomWrapper}`}
          >
            <div className={`d-flex ${styles.bottom}`}>
              <div className={`row g-0 w-100`}>
                <div className={`col-sm-3 ${styles.leftSwitcher}`}>
                  <ol className="d-flex flex-column gap-2 justify-content-start">
                    <li
                      className={`${
                        currentSwitcherTab === 1 ? styles.focus : ""
                      }`}
                      tabIndex="1"
                      onClick={() => setCurrentTab(1)}
                    >
                      Personal Information
                    </li>
                    <li
                      className={`${
                        currentSwitcherTab === 2 ? styles.focus : ""
                      }`}
                      tabIndex="1"
                      onClick={() => setCurrentTab(2)}
                    >
                      Bank Details
                    </li>
                    <li
                      className={`${
                        currentSwitcherTab === 3 ? styles.focus : ""
                      }`}
                      tabIndex="1"
                      onClick={() => setCurrentTab(3)}
                    >
                      Attendance History
                    </li>
                    <li
                      className={`${
                        currentSwitcherTab === 4 ? styles.focus : ""
                      }`}
                      tabIndex="1"
                      onClick={() => setCurrentTab(4)}
                    >
                      Leave Request
                    </li>
                    <li
                      className={`${
                        currentSwitcherTab === 5 ? styles.focus : ""
                      }`}
                      tabIndex="1"
                      onClick={() => setCurrentTab(5)}
                    >
                      Travel Expences
                    </li>
                    <li
                      className={`${
                        currentSwitcherTab === 6 ? styles.focus : ""
                      }`}
                      tabIndex="1"
                      onClick={() => setCurrentTab(6)}
                    >
                      Daily Expences
                    </li>
                    <li
                      className={`${
                        currentSwitcherTab === 7 ? styles.focus : ""
                      }`}
                      tabIndex="1"
                      onClick={() => setCurrentTab(7)}
                    >
                      Document
                    </li>
                  </ol>
                </div>
                <div className={`col-sm-9 ${styles.rightData}`}>
                  {renderSwitch(currentSwitcherTab)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesView;
