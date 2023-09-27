// import React, { useEffect ,useState} from "react";

// import styles from "./ViewServiceProvider.module.scss";
// import SwitchSelector from "react-switch-selector";
// import { ReactComponent as Dashboard1Icon } from "../../../assests/chart-bar2.svg";
// import { ReactComponent as Search } from "../../../assests/search.svg";
// import { NavLink } from "react-router-dom";
// import { Sidebar, SideDrawer } from "../../KisaanStation";
// import DashbaordCardServiceProvider from "./DashbaordCardServiceProvider/DashbaordCardServiceProvider";

// import HeaderCardImage from "../../../assests/serviceProviderSymbol.png";

// const ViewServiceProvider = () => {
//     const [search, setSearch] = useState("");
//     const [windowSize, setWindowSize] = useState(window.innerWidth);
//     // const [currentPage, setCurrentPage] = useState(1);
//     // const [rejectDialog, setRejectDialog] = useState(false);
//     // const [rejectResponse, setRejectResponse] = useState("");

//     useEffect(() => {
//         function handleWindowResize() {
//             setWindowSize(window.innerWidth);
//         }
//         window.addEventListener("resize", handleWindowResize);

//         return () => {
//             window.removeEventListener("resize", handleWindowResize);
//         };
//     }, []);

//     // if (isLoading) {
//     //     return <Loader />;
//     // }
//     // if (isFetching) {
//     //     return <Loader />;
//     // }

//     // const useHandlePageClick = async (data) => {
//     //     setCurrentPage(data.selected + 1);
//     //     console.log(currentPage);
//     //     refetch();
//     // };

//     const options = [
//         {
//             label: "Active",
//             value: "Active",
//             selectedBackgroundColor: "#E26B26",
//             selectedFontColor: "#ffffff",
//             innerHeight: 50,
//         },
//         {
//             label: "InActive",
//             value: "InActive",
//             selectedFontColor: "#ffffff",
//             selectedBackgroundColor: "#979797",
//         },
//     ];

//     const initialSelectedIndex = options.findIndex(
//         ({ value }) => value === "Active"
//     );

//     const onChange = (newValue) => {
//         console.log(newValue);
//     };

//     return (
//         <div
//             style={{
//                 height: "100vh",
//                 overflow: "auto",
//                 backgroundColor: "#ffffff",
//             }}
//             className={styles.ViewServiceProvider}
//         >
//             <div className='row g-0 h-100 overflow-auto'>
//                 <Sidebar />
//                 <div
//                     className={`col-sm-9 col-md-10 p-0 m-0 krishiBazaar d-flex flex-column ${styles.content}`}
//                 >
//                     <div
//                         className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}
//                     >
//                         <SideDrawer />
//                         <div>Kisaan Station</div>
//                         <div>image</div>
//                     </div>

//                     {/* 4 Cards */}
//                     <div className={`col-md-12 ${styles.dashboardCardWrapper}`}>
//                         <div className={`col-md-5 ${styles.col5wrapper}`}>
//                             <div className={`${styles.infocard}`}>
//                                 <div className={styles.header}>
//                                     <div className={styles.symbol}>
//                                         <img
//                                             src={HeaderCardImage}
//                                             alt=''
//                                             className={styles.imgheader}
//                                         />
//                                     </div>
//                                     <div
//                                         className={styles.toggle}
//                                         style={{
//                                             minWidth: "150px",
//                                             width: "12vw",
//                                             height: 40,
//                                             border: "1px solid rgb(214,214,214)",
//                                             borderRadius: "20px",
//                                         }}
//                                     >
//                                         <SwitchSelector
//                                             onChange={onChange}
//                                             options={options}
//                                             initialSelectedIndex={
//                                                 initialSelectedIndex
//                                             }
//                                             backgroundColor={"#ffffff"}
//                                             selectedBackgroundColor={"#E26B26"}
//                                             fontColor={"#979797"}
//                                             fontSize={"1vmax"}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className={`col-sm-12 ${styles.heading}`}>
//                                     Laalganj Kisaan Station, Mirzapur
//                                 </div>
//                                 <div className={`col-sm-12 ${styles.text}`}>
//                                     +919876543210
//                                 </div>
//                                 <div className={`col-sm-12 ${styles.text}`}>
//                                     34 SECTOR, Noida, Uttar Pradesh, 201307
//                                 </div>
//                             </div>
//                         </div>
//                         <div
//                             className={`col-md-auto d-flex flex-row flex-wrap flex-md-grow-1 ${styles.cardcol}`}
//                         >
//                             {/* <div className={`row g-0 row-cols-2 w-100 d-flex flex-row flex-wrap`}> */}
//                             <div className='col-md-6 d-flex flex-row w-50'>
//                                 <DashbaordCardServiceProvider
//                                     title={"Title"}
//                                     data={233}
//                                     icon={<Dashboard1Icon />}
//                                 />
//                             </div>
//                             <div className={`col-md-6 d-flex flex-row w-50`}>
//                                 <DashbaordCardServiceProvider
//                                     title={"Title"}
//                                     data={233}
//                                     icon={<Dashboard1Icon />}
//                                 />
//                             </div>
//                             <div className='col-md-6 d-flex flex-row w-50'>
//                                 <DashbaordCardServiceProvider
//                                     title={"Title"}
//                                     data={233}
//                                     icon={<Dashboard1Icon />}
//                                 />
//                             </div>
//                             <div className='col-md-6 d-flex flex-row w-50'>
//                                 <DashbaordCardServiceProvider
//                                     title={"Title"}
//                                     data={233}
//                                     icon={<Dashboard1Icon />}
//                                 />
//                             </div>
//                             {/* </div> */}
//                         </div>
//                     </div>
//                     <div className={`col-sm-12 w-100`}>
//                         <div
//                             className={`${styles.middlebar} mx-3 d-flex justify-content-between`}
//                         >
//                             <div className='d-flex gap-2 w-100 justify-content-left'>
//                                 <NavLink
//                                     to='/admin/KisaanStation/KisaanStations/approved'
//                                     className={`${styles.activemiddlebar} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`}
//                                     style={{
//                                         textDecoration: "none",
//                                     }}
//                                 >
//                                     All Stations
//                                 </NavLink>
//                                 <NavLink
//                                     to='/admin/KisaanStation/KisaanStations/pending'
//                                     className={`${styles.button} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`}
//                                     style={{
//                                         textDecoration: "none",
//                                     }}
//                                 >
//                                     Requests
//                                 </NavLink>
//                             </div>
//                             <div className={styles.search}>
//                                 <Search />
//                                 <input
//                                     className={styles.input}
//                                     placeholder='Search'
//                                     onChange={(e) => setSearch(e.target.value)}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <div className={`col-sm-12 w-100`}>
//                         {/* <div className={styles.krishiBazaarTable}>
//                             {windowSize >= 768 ? (
//                                 <table
//                                     className={`visibleTable container-fluid text-left ${styles.table}`}
//                                     id='table'
//                                 >
//                                     <thead>
//                                         <tr className='head'>
//                                             <th>Kisaan Station</th>
//                                             <th>Manager</th>
//                                             <th>State</th>
//                                             <th>Status</th>
//                                             <th>Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {data?.list
//                                             .filter((element) => {
//                                                 return (
//                                                     (element?.ksLocation
//                                                         ?.address &&
//                                                         element?.ksLocation?.address
//                                                             .toLowerCase()
//                                                             .includes(
//                                                                 search.toLowerCase()
//                                                             )) ||
//                                                     (element?.name &&
//                                                         element?.name
//                                                             .toLowerCase()
//                                                             .includes(
//                                                                 search.toLowerCase()
//                                                             )) ||
//                                                     (element?.status &&
//                                                         element?.status
//                                                             .toLowerCase()
//                                                             .includes(
//                                                                 search.toLowerCase()
//                                                             ))
//                                                 );
//                                             })
//                                             .map((element, index) => {
//                                                 return (
//                                                     <KSTable
//                                                         element={element}
//                                                         key={index}
//                                                         className='pagination page-item page-link'
//                                                         header={"Approved"}
//                                                     />
//                                                 );
//                                             })}
//                                     </tbody>
//                                 </table>
//                             ) : (
//                                 <div className='krishiBazaar-cards'>
//                                     {data?.list
//                                         .filter((element) => {
//                                             return (
//                                                 (element?.ksLocation?.address &&
//                                                     element?.ksLocation?.address
//                                                         .toLowerCase()
//                                                         .includes(
//                                                             search.toLowerCase()
//                                                         )) ||
//                                                 (element?.name &&
//                                                     element?.name
//                                                         .toLowerCase()
//                                                         .includes(
//                                                             search.toLowerCase()
//                                                         )) ||
//                                                 (element?.status &&
//                                                     element?.status
//                                                         .toLowerCase()
//                                                         .includes(
//                                                             search.toLowerCase()
//                                                         ))
//                                             );
//                                         })
//                                         .map((element, index) => {
//                                             return (
//                                                 <KSTableCard
//                                                     element={element}
//                                                     key={index}
//                                                     className='visiblecard page-item page-link'
//                                                     header={"Approved"}
//                                                 />
//                                             );
//                                         })}
//                                 </div>
//                             )}

//                             <div className='pagination'>
//                                 <ReactPaginate
//                                     previousLabel={"previous"}
//                                     nextLabel={"next"}
//                                     breakLabel={"..."}
//                                     pageCount={Math.ceil(data.Total / 10)}
//                                     marginPagesDisplayed={2}
//                                     pageRangeDisplayed={2}
//                                     onPageChange={useHandlePageClick}
//                                     forcePage={currentPage - 1}
//                                     containerClassName={"pagination"}
//                                     pageClassName={"page-item"}
//                                     pageLinkClassName={"page-link"}
//                                     previousClassName={"page-item"}
//                                     previousLinkClassName={"page-link"}
//                                     nextClassName={"page-item"}
//                                     nextLinkClassName={"page-link"}
//                                     breakClassName={"page-item"}
//                                     breakLinkClassName={"page-link"}
//                                     activeClassName={"active"}
//                                 />
//                             </div>
//                         </div> */}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ViewServiceProvider;
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../KSViewProfile/KSViewProfile.module.scss";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import SideDrawer from "../SideDrawer/SideDrawer";

const ViewServiceProvider = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const element = location.state?.data;

    const openFullscreen1 = () => {
        document.getElementById("openFullscreen1")?.requestFullscreen();
    };

    const openFullscreen2 = () => {
        document.getElementById("openFullscreen2")?.requestFullscreen();
    };

    return (
        <>
            <div className={`col p-0 m-0 g-0 ${styles.KSViewProfile}`}>
                <div className={`row g-0 h-100 overflow-auto`}>
                    <div className={`col-sm-12 p-0 m-0`}>
                        <div className={`row g-0`}>
                            <div
                                className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}>
                                <SideDrawer />
                                <Breadcrumb />
                                <div>&nbsp;</div>
                            </div>
                            <div className={`col-sm-12`}>
                                <div className={`${styles.details}`}>
                                    <div className={styles.imgwrapper}>
                                        <img
                                            src={element.profileImage}
                                            alt=''
                                            className={`${styles.img} rounded-circle`}
                                        />
                                        <div>{element.ksName}</div>
                                        <div
                                            style={{
                                                fontSize: "0.9em",
                                                color: "gray",
                                            }}>
                                            Manager - {element.name}
                                        </div>
                                    </div>
                                    <br />
                                    <div className={styles.hr}></div>
                                    <div className={styles.bottom}>
                                        <div
                                            className={`row d-flex justify-content-between flex-wrap-reverse ${styles.row}`}>
                                            <div className='col-md-6'>
                                                <div
                                                    className={`row g-0 d-flex`}>
                                                    <div
                                                        className='col-md-4'
                                                        style={{
                                                            color: "rgb(161,161,161)",
                                                        }}>
                                                        Location :
                                                    </div>
                                                    <div
                                                        className='col-md-8'
                                                        style={{
                                                            color: "rgb(86,63,31)",
                                                        }}>
                                                        {
                                                            element?.ksLocation
                                                                ?.address
                                                        }
                                                    </div>
                                                    <div
                                                        className='col-md-12'
                                                        style={{
                                                            padding: "1vmax",
                                                        }}></div>
                                                    <div
                                                        className='col-md-4'
                                                        style={{
                                                            color: "rgb(161,161,161)",
                                                        }}>
                                                        State :
                                                    </div>
                                                    <div
                                                        className='col-md-8'
                                                        style={{
                                                            color: "rgb(86,63,31)",
                                                        }}>
                                                        {
                                                            element?.ksLocation
                                                                ?.state
                                                        }{" "}
                                                        {element.ksLocation
                                                            .pinCode
                                                            ? `- ${element?.ksLocation?.pinCode}`
                                                            : ""}
                                                    </div>
                                                    <div
                                                        className='col-md-12'
                                                        style={{
                                                            padding: "1vmax",
                                                        }}></div>
                                                    <div
                                                        className='col-md-4'
                                                        style={{
                                                            color: "rgb(161,161,161)",
                                                        }}>
                                                        Contact No :
                                                    </div>
                                                    <div
                                                        className='col-md-8'
                                                        style={{
                                                            color: "rgb(86,63,31)",
                                                        }}>
                                                        {element?.mobileNo}
                                                    </div>
                                                    <div
                                                        className='col-md-12'
                                                        style={{
                                                            padding: "1vmax",
                                                        }}></div>
                                                    <div
                                                        className='col-md-4'
                                                        style={{
                                                            color: "rgb(161,161,161)",
                                                        }}>
                                                        Email :
                                                    </div>
                                                    <div
                                                        className='col-md-8'
                                                        style={{
                                                            color: "rgb(86,63,31)",
                                                        }}>
                                                        {element?.mailId}
                                                    </div>
                                                    <div
                                                        className='col-md-12'
                                                        style={{
                                                            padding: "1vmax",
                                                        }}></div>
                                                    <div
                                                        className='col-md-4'
                                                        style={{
                                                            color: "rgb(161,161,161)",
                                                        }}>
                                                        KS ID :
                                                    </div>
                                                    <div
                                                        className='col-md-8'
                                                        style={{
                                                            color: "rgb(86,63,31)",
                                                        }}>
                                                        {element?.ksId}
                                                    </div>
                                                    <div
                                                        className='col-md-12'
                                                        style={{
                                                            padding: "1vmax",
                                                        }}></div>
                                                    <div
                                                        className='col-md-4'
                                                        style={{
                                                            color: "rgb(161,161,161)",
                                                        }}>
                                                        KS Name :
                                                    </div>
                                                    <div
                                                        className='col-md-8'
                                                        style={{
                                                            color: "rgb(86,63,31)",
                                                        }}>
                                                        {element?.ksName}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className='row g-0'>
                                                    <div
                                                        className='col-md-3'
                                                        style={{
                                                            color: "rgb(161,161,161)",
                                                        }}>
                                                        Id Proof :
                                                    </div>
                                                    <div className='col-md-9 d-flex flex-row'>
                                                        <img
                                                            src={
                                                                element
                                                                    ?.adhaarVerifiction[0]
                                                                    ?.mediaUrl
                                                            }
                                                            className={`${styles.adhaarimg} rounded`}
                                                            alt=''
                                                            id='openFullscreen1'
                                                            style={{
                                                                objectFit:
                                                                    "scale-down",
                                                                boxShadow:
                                                                    "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                                                            }}
                                                            onClick={() =>
                                                                openFullscreen1()
                                                            }
                                                            loading='lazy'
                                                        />
                                                        <img
                                                            src={
                                                                element
                                                                    ?.adhaarVerifiction[1]
                                                                    ?.mediaUrl
                                                            }
                                                            className={`${styles.adhaarimg} rounded`}
                                                            alt=''
                                                            id='openFullscreen2'
                                                            style={{
                                                                objectFit:
                                                                    "scale-down",
                                                            }}
                                                            onClick={() =>
                                                                openFullscreen2()
                                                            }
                                                            loading='lazy'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.buttons}`}>
                                    <button
                                        className={` ${styles.cancelButton}`}
                                        onClick={() => navigate(-1)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewServiceProvider;
