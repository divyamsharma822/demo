import React, { useEffect, useState } from "react";
import styles from "./UserDetails.module.scss";
import { Breadcrumb, Loader } from "../../components";
import { SideDrawer } from "../../components/KisaanStation";
import ReactPaginate from "react-paginate";
import { ReactComponent as Search } from "../../assests/search.svg";
import { useUserDetailsListQuery } from "../../api/KisaanStationsApi";
import Table from "../../components/KisaanStation/UserDetails/Table/Table";
import TableCard from "../../components/KisaanStation/UserDetails/TableCard/TableCard";

const UserDetails = () => {
    const [search, setSearch] = useState("");
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [currentPage, setCurrentPage] = useState(1);

    let { data, isLoading, isFetching, refetch } = useUserDetailsListQuery(currentPage);

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(window.innerWidth);
        }
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [windowSize]);

    if (isLoading) {
        return <Loader />;
    }
    if (isFetching) {
        return <Loader />;
    }

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
            <div className='row g-0 h-100 overflow-auto no-scrollbar'>
                <div className={`col-sm-12 p-0 m-0 krishiBazaar d-flex flex-column ${styles.content}`}>
                    <div className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}>
                        <SideDrawer />
                        <Breadcrumb />
                        <div>&nbsp;</div>
                    </div>

                    <div className={`col-sm-12 w-100 `}>
                        <div className={`${styles.middlebar} mx-3 d-flex justify-content-end`}>
                            <div className={styles.search}>
                                <Search />
                                <input
                                    className={styles.input}
                                    placeholder='Search'
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`col-sm-12 w-100`}>
                        <div className={styles.krishiBazaarTable}>
                            {windowSize >= 768 ? (
                                <table
                                    className={`visibleTable container-fluid text-left ${styles.table}`}
                                    id='table'>
                                    <thead>
                                        <tr className='head'>
                                            <th>Serial No.</th>
                                            <th>Username</th>
                                            <th>Mobile</th>
                                            <th>Address</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.list
                                            ?.filter((element) => {
                                                return (
                                                    (element?.username && element?.username.toLowerCase().includes(search.toLowerCase())) ||
                                                    (element?.mobileNo && element?.mobileNo.toLowerCase().includes(search.toLowerCase())) ||
                                                    (element.address?.area && element.address?.area.toLowerCase().includes(search.toLowerCase()))
                                                );
                                            })
                                            .map((element, index) => {
                                                return (
                                                    <Table
                                                        element={element}
                                                        index={(currentPage - 1) * 20 + (index + 1)}
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
                                    {data.list
                                        ?.filter((element) => {
                                            return (
                                                (element?.username && element?.username.toLowerCase().includes(search.toLowerCase())) ||
                                                (element?.mobileNo && element?.mobileNo.toLowerCase().includes(search.toLowerCase())) ||
                                                (element.address?.area && element.address?.area.toLowerCase().includes(search.toLowerCase()))
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
                                    pageCount={Math.ceil(data.totalUsers / 20)}
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
        </div>
    );
};

export default UserDetails;
