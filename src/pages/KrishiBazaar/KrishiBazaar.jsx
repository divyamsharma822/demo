import React, { useEffect, useState } from "react";
import {
    DashboardCard,
    Loader,
    Tr,
    KrishiBazaarTableCard,
    Breadcrumb,
} from "../../components";
import "./KrishiBazaar.scss";
import { ReactComponent as Dashboard1Icon } from "../../assests/chart-bar2.svg";
import { ReactComponent as Dashboard2Icon } from "../../assests/profile-icon2.svg";
import { ReactComponent as Search } from "../../assests/search.svg";
import { useGetProductListQuery } from "../../api/krishiBazaarApi";
import ReactPaginate from "react-paginate";
import { SideDrawer } from "../../components/KisaanStation";

const KrishiBazaar = () => {
    const [currentPage, setCurrentPage] = useState(1);
    let { data, isLoading, refetch } = useGetProductListQuery(currentPage);
    const [, setSearch] = useState("");
    const [windowSize, setWindowSize] = useState(window.innerWidth);

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
            className={`col p-0 m-0`}>
            <div className='row g-0 h-100 overflow-auto'>
                <div className='col-sm-12 p-0 m-0 krishiBazaar d-flex flex-column'>
                    <div
                        className={`col-sm-12 d-flex flex-row justify-content-between align-items-center krishiBazaar-navbar`}>
                        <SideDrawer />
                        <Breadcrumb arr={["Krishi Bazaar"]} />
                        <div>image</div>
                    </div>
                    <div className='cards d-flex flex-row justify-content-around flex-wrap mt-4'>
                        <DashboardCard
                            title={"Total Requests"}
                            data={"N/A"}
                            icon={<Dashboard1Icon />}
                            change={"+55%"}
                        />
                        <DashboardCard
                            title={"Total Product Listed"}
                            data={data.total}
                            icon={<Dashboard2Icon />}
                            change={"+3%"}
                        />
                        <DashboardCard
                            title={"Total Selling Product"}
                            data={data.total_sellproducts}
                            icon={<Dashboard1Icon />}
                            change={"-1%"}
                        />
                        <DashboardCard
                            title={"Total Rented Product"}
                            data={data.total_rentproducts}
                            icon={<Dashboard2Icon />}
                            change={"-1%"}
                        />
                    </div>
                    <div className='krishiBazaar-search-wrapper'>
                        <div>
                            <Search />
                            <input
                                className='krishiBazaar-search'
                                placeholder='Search'
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='krishiBazaar-table'>
                        {windowSize >= 768 ? (
                            <table
                                className='visibleTable container-fluid text-left'
                                id='table'>
                                <thead>
                                    <tr className='head'>
                                        <th>S.No</th>
                                        <th>Seller Name</th>
                                        <th>Product Name</th>
                                        <th>Date</th>
                                        <th>Quantity</th>
                                        <th>Trade</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.pushUserDetailInProduct.map(
                                        (element, index) => {
                                            return (
                                                <Tr
                                                    element={element}
                                                    key={index}
                                                    index={
                                                        (currentPage - 1) * 10 +
                                                        index
                                                    }
                                                    className='page-item page-link'
                                                />
                                            );
                                        }
                                    )}
                                    {data?.pushUserDetailInProduct.length ===
                                        0 && (
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
                        ) : (
                            <div className='krishiBazaar-cards'>
                                {data?.pushUserDetailInProduct.length !== 0 &&
                                    data?.pushUserDetailInProduct.map(
                                        (element, index) => {
                                            return (
                                                <KrishiBazaarTableCard
                                                    element={element}
                                                    key={index}
                                                    className='visiblecard page-item page-link'
                                                />
                                            );
                                        }
                                    )}
                                {data?.pushUserDetailInProduct.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan='100%'
                                            className='text-center'>
                                            No record Found
                                        </td>
                                    </tr>
                                )}
                            </div>
                        )}

                        <div className='pagination'>
                            <ReactPaginate
                                previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                pageCount={Math.ceil(data.total / 10)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
                                onPageChange={useHandlePageClick}
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
    );
};

export default KrishiBazaar;
