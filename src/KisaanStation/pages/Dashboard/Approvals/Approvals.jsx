// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import styles from "./Approvals.module.scss";

// import {
//     Sidebar,
//     SideDrawer,
//     DashboardCard,
// } from "../../../components/Dashboard";
// import { ReactComponent as Search } from "../../../assets/search.svg";
// import { ReactComponent as Dashboard1Icon } from "../../../assets/chart-bar2.svg";

// const Approvals = () => {
//     const [search, setSearch] = useState("");
//     const [windowSize, setWindowSize] = useState(window.innerWidth);
//     const [currentPage, setCurrentPage] = useState(1);

//     // let { data, error, isLoading, isFetching, refetch } =
//     //     useGetListForApprovalQuery({
//     //         type: "Approved",
//     //         currentPage,
//     //     });

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

//     const useHandlePageClick = async (data) => {
//         setCurrentPage(data.selected + 1);
//         console.log(currentPage);
//         // refetch();
//     };

//     return (
//         <div
//             style={{
//                 height: "100vh",
//                 overflow: "auto",
//                 backgroundColor: "rgb(248,249,250)",
//             }}
//             className={styles.kisaanStations}
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
//                         <div>Approvals</div>
//                         <div>image</div>
//                     </div>

//                     {/* 4 Cards */}
//                     <div className='col-sm-12 d-flex flex-row justify-content-around flex-wrap mt-4'>
//                         <DashboardCard
//                             title={"Total Kisaan Stations"}
//                             data={"325"}
//                             icon={<Dashboard1Icon />}
//                             change={"+55%"}
//                         />
//                         <DashboardCard
//                             title={"Total Requests"}
//                             data={45}
//                             icon={<Dashboard1Icon />}
//                             change={"+3%"}
//                         />
//                         <DashboardCard
//                             title={"Services Registered"}
//                             data={235}
//                             icon={<Dashboard1Icon />}
//                             change={"-1%"}
//                         />
//                         <DashboardCard
//                             title={"Orders Completed"}
//                             data={4215}
//                             icon={<Dashboard1Icon />}
//                             change={"-1%"}
//                         />
//                     </div>
//                     <div className={`col-sm-12 w-100 `}>
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
//                                     Sellers
//                                 </NavLink>
//                                 <NavLink
//                                     to='/admin/KisaanStation/KisaanStations/pending'
//                                     className={`${styles.button} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`}
//                                     style={{
//                                         textDecoration: "none",
//                                     }}
//                                 >
//                                     Buyers
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
//                         <div className={styles.krishiBazaarTable}>
//                             {/* {windowSize >= 768 ? (
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
//                             )} */}

//                             {/* <div className='pagination'>
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
//                             </div> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Approvals;
