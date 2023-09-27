import React, { useState } from "react";
import styles from "./SellerView.module.scss";
import {
    Breadcrumb,
    ConfirmDialog,
    DashboardCard,
    ErrorDialog,
} from "../../../components";
import {
    useSellerApprovalOrActiveOrInactiveMutation,
    useSellerListingsQuery,
    useSellerOrdersQuery,
} from "../../../api/KisaanStationsApi";
import { ReactComponent as Dashboard1Icon } from "../../../assests/chart-bar2.svg";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router-dom";
import { SideDrawer } from "../../../components/KisaanStation";
import SellerDetailsTable from "../../../components/KisaanStation/KisaanStation/SellerDetailsTable/SellerDetailsTable";
import SellerDetailsTableCard from "../../../components/KisaanStation/KisaanStation/SellerDetailsTableCard/SellerDetailsTableCard";

const SellerView = () => {
    const location = useLocation();

    const [rejectDialog, setRejectDialog] = useState(false);
    const [rejectResponse, setRejectResponse] = useState("");
    const [errorDialog, setErrorDialog] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [element] = useState(location.state?.data || {});
    const temp = element.status === "Active" ? false : true;
    const [checked, setChecked] = useState(temp);
    const [currentSwitcherTab, setCurrentTab] = useState(1);

    const [currentOrderPage, setCurrentOrderPage] = useState(1);
    const [currentListingPage, setCurrentListingPage] = useState(1);
    const [changeStatus] = useSellerApprovalOrActiveOrInactiveMutation();
    let {
        data: orderdata,
        isLoading: orderloading,
        isFetching: orderfetching,
        refetch: orderrefetch,
    } = useSellerOrdersQuery({
        currentPage: currentOrderPage,
        sellerId: element._id,
    });

    let {
        data: listingsdata,
        isLoading: listingsloading,
        isFetching: listingsfetching,
        refetch: listingsrefetch,
    } = useSellerListingsQuery({
        currentPage: currentListingPage,
        sellerId: element._id,
    });

    if (orderfetching || orderloading || listingsfetching || listingsloading) {
        return <div>Loading</div>;
    }

    const handleOrderPage = async (data) => {
        setCurrentOrderPage(data.selected + 1);
        orderrefetch();
    };
    const handleListingsPage = async (data) => {
        setCurrentListingPage(data.selected + 1);
        listingsrefetch();
    };

    const handleInActiveChange = () => {
        changeStatus({
            seller_id: element._id,
            status: "In-active",
            InActiveReason: rejectResponse,
        })
            .unwrap()
            .then((payload) => {
                setConfirmDialog(true);
            })
            .catch((error) => {
                setErrorDialog(true);
            });
    };

    const handleActiveChange = () => {
        changeStatus({
            seller_id: element._id,
            status: "Active",
        })
            .unwrap()
            .then((payload) => {
                setConfirmDialog(true);
            })
            .catch((error) => {
                setErrorDialog(true);
            });
    };

    const handleStatusChange = (val) => {
        if (val === true) {
            setChecked(true);
            setRejectDialog(true);
        } else {
            setChecked(false);
            handleActiveChange();
        }
    };

    const renderswitch = () => {
        switch (currentSwitcherTab) {
            case 1:
                return (
                    <>
                        <div className={`col-sm-12 w-100`}>
                            <div className={styles.krishiBazaarTable}>
                                <table
                                    className={`visibleTable container-fluid text-left d-none d-md-table ${styles.table}`}
                                    id='table'>
                                    <thead>
                                        <tr className='head'>
                                            <th>ID</th>
                                            <th>Service Name</th>
                                            <th className='text-center'>
                                                Booking Date
                                            </th>
                                            <th className='text-center'>
                                                Service
                                            </th>
                                            <th className='text-center'>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderdata?.list.length !== 0 &&
                                            orderdata?.list.map(
                                                (element, index) => {
                                                    return (
                                                        <SellerDetailsTable
                                                            element={element}
                                                            key={index}
                                                            className='pagination page-item page-link'
                                                            header={"Orders"}
                                                        />
                                                    );
                                                }
                                            )}
                                        {orderdata?.list.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan='5'
                                                    className='text-center'>
                                                    No record Found
                                                </td>
                                            </tr>
                                        )}
                                        {orderfetching && orderloading && (
                                            <tr>
                                                <td
                                                    colSpan='5'
                                                    className='text-center'>
                                                    Loading
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                <div className='krishiBazaar-cards d-block d-md-none'>
                                    {orderdata?.list.map((element, index) => {
                                        return (
                                            <SellerDetailsTableCard
                                                element={element}
                                                key={index}
                                                className='visiblecard page-item page-link'
                                                header={"Orders"}
                                            />
                                        );
                                    })}
                                </div>

                                <div className='pagination'>
                                    <ReactPaginate
                                        previousLabel={"previous"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        pageCount={Math.ceil(
                                            orderdata.totalOrdersFound / 20
                                        )}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={2}
                                        onPageChange={handleOrderPage}
                                        forcePage={currentOrderPage - 1}
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
                    </>
                );
            case 2:
                return (
                    <>
                        <div className={`col-sm-12 w-100`}>
                            <div className={styles.krishiBazaarTable}>
                                <table
                                    className={`visibleTable container-fluid text-left d-none d-md-table ${styles.table}`}
                                    id='table'>
                                    <thead>
                                        <tr className='head'>
                                            <th>ID</th>
                                            <th>Service Name</th>
                                            <th className='text-center'>
                                                Listing Date
                                            </th>
                                            <th className='text-center'>
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listingsdata?.list.length !== 0 &&
                                            listingsdata?.list.map(
                                                (element, index) => {
                                                    return (
                                                        <SellerDetailsTable
                                                            element={element}
                                                            key={index}
                                                            className='pagination page-item page-link'
                                                            header={"Listings"}
                                                        />
                                                    );
                                                }
                                            )}
                                        {listingsdata?.list.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan='5'
                                                    className='text-center'>
                                                    No record Found
                                                </td>
                                            </tr>
                                        )}
                                        {listingsfetching &&
                                            listingsloading && (
                                                <tr>
                                                    <td
                                                        colSpan='5'
                                                        className='text-center'>
                                                        Loading
                                                    </td>
                                                </tr>
                                            )}
                                    </tbody>
                                </table>

                                <div className='krishiBazaar-cards d-block d-md-none'>
                                    {listingsdata?.list.map(
                                        (element, index) => {
                                            return (
                                                <SellerDetailsTableCard
                                                    element={element}
                                                    key={index}
                                                    className='visiblecard page-item page-link'
                                                    header={"Listings"}
                                                />
                                            );
                                        }
                                    )}
                                </div>

                                <div className='pagination'>
                                    <ReactPaginate
                                        previousLabel={"previous"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        pageCount={Math.ceil(
                                            listingsdata.totalList / 20
                                        )}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={2}
                                        onPageChange={handleListingsPage}
                                        forcePage={currentOrderPage - 1}
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
                    </>
                );
            default:
                <div> List is Empty</div>;
        }
    };
    return (
        <>
            {errorDialog ? (
                <ErrorDialog
                    msg={"Something went wrong. Try Again."}
                    onConfirmFunc={() => {
                        setErrorDialog(false);
                        setRejectDialog(false);
                    }}
                />
            ) : (
                ""
            )}
            {confirmDialog ? (
                <ConfirmDialog
                    msg={"Successfully Changed"}
                    onConfirmFunc={() => {
                        setConfirmDialog(false);
                        setRejectDialog(false);
                    }}
                />
            ) : (
                ""
            )}
            {rejectDialog ? (
                <div className={styles.rejectMessageDialog}>
                    <div className={styles.rejectMessageDialoginfo}>
                        <span>Rejection Reason</span>
                        <textarea
                            placeholder='In-Active Resaon'
                            type='text'
                            onChange={(e) => setRejectResponse(e.target.value)}
                            maxLength={60}
                        />
                        <div className={styles.rejectMessageDialogbuttons}>
                            <span
                                onClick={() => {
                                    window.location.reload(false);
                                }}
                                className={styles.rejectMessageDialogbutton}>
                                Cancel
                            </span>
                            <span
                                onClick={() => handleInActiveChange()}
                                className={styles.rejectMessageDialogbutton}>
                                Confirm
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            <div className={`col p-0 m-0 g-0 ${styles.ApprovalsView}`}>
                <div className={`row g-0 h-100 overflow-auto`}>
                    <div className={`col-sm-12 p-0 m-0`}>
                        <div className={`row g-0`}>
                            <div
                                className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}>
                                <SideDrawer />
                                <Breadcrumb />
                                <div>image</div>
                            </div>
                            <div className='col-sm-12 d-flex flex-row justify-content-start flex-wrap mt-4'>
                                <DashboardCard
                                    title={"Total Orders"}
                                    data={
                                        !orderfetching && !orderloading
                                            ? orderdata.totalOrders
                                            : "Loading"
                                    }
                                    icon={<Dashboard1Icon />}
                                />
                                <DashboardCard
                                    title={"Completed Orders"}
                                    data={
                                        !orderfetching && !orderloading
                                            ? orderdata.totalCompleted
                                            : "Loading"
                                    }
                                    icon={<Dashboard1Icon />}
                                />
                                <DashboardCard
                                    title={"Total Listings"}
                                    data={
                                        !listingsfetching && !listingsloading
                                            ? listingsdata.totalCompleted
                                            : "Loading"
                                    }
                                    icon={<Dashboard1Icon />}
                                />
                            </div>
                            <div className={`col-sm-12`}>
                                <div className={`${styles.details}`}>
                                    <div
                                        className={`d-flex flex-row justify-content-between flex-wrap`}>
                                        <div
                                            className={`d-flex flex-row align-items-center ${styles.topleft}`}>
                                            <div className={styles.imgwrapper}>
                                                <img
                                                    src={
                                                        element.userProfileImage
                                                    }
                                                    alt=''
                                                    className={`${styles.img} rounded-circle`}
                                                    loading='lazy'
                                                    onClick={(e) => {
                                                        e.currentTarget.requestFullscreen();
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <div className={styles.heading}>
                                                    Seller Name
                                                </div>
                                                <div
                                                    className={`text-capitalize ${styles.sellerName}`}>
                                                    {element.fullName}
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className={`d-flex flex-column justify-content-center flex-grow-1 flex-md-grow-0 ${styles.topRight}`}>
                                            <div className={styles.heading}>
                                                Status
                                            </div>
                                            <input
                                                type='checkbox'
                                                id='switch'
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        e.target.checked
                                                    )
                                                }
                                                defaultChecked={checked}
                                                value={checked}
                                            />
                                            <label
                                                htmlFor='switch'
                                                className='d-flex justify-content-around align-items-center mx-auto mx-md-0'>
                                                <div className='col-6 text-center'>
                                                    Active
                                                </div>
                                                <div className='col-6 text-center'>
                                                    In-Active
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className={styles.hr}></div>
                                    <div className={styles.bottom}>
                                        <div className='col-md-7'>
                                            {[
                                                {
                                                    heading: "Seller ID :",
                                                    data: element?.SPID,
                                                },
                                                {
                                                    heading: "State :",
                                                    data: element?.address
                                                        ?.state,
                                                },
                                                {
                                                    heading: "Location :",
                                                    data: `${element?.address?.area}, ${element?.address?.district}`,
                                                },
                                                {
                                                    heading: "Contact No :",
                                                    data: element?.mobileNo,
                                                },
                                                {
                                                    heading: "E-mail :",
                                                    data: element?.email,
                                                },
                                                {
                                                    heading: "Description :",
                                                    data: element?.businessDetails,
                                                },
                                                {
                                                    heading: "Reason :",
                                                    data: element?.inActiveReason,
                                                },
                                            ].map((curr, index) => (
                                                <div
                                                    className={`row g-0 d-flex flex-wrap ${styles.row}`}
                                                    key={index}>
                                                    <div
                                                        className={`col-md-3 ${styles.left}`}>
                                                        {curr.heading}
                                                    </div>
                                                    <div
                                                        className={`col-md-9 ${styles.right}`}>
                                                        {curr.data}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='col-md-5'>
                                            <div
                                                className={`row g-0 d-flex flex-column flex-wrap ${styles.row}`}>
                                                <div
                                                    className={`col-md-12 ${styles.left}`}>
                                                    ID Proof :
                                                </div>
                                                <div className='col-md-auto d-flex flex-row gap-2'>
                                                    <img
                                                        src={
                                                            element
                                                                ?.documents[0]
                                                                ?.mediaUrl
                                                        }
                                                        alt=''
                                                        width={100}
                                                        className={
                                                            styles.docimg
                                                        }
                                                        onClick={(e) => {
                                                            e.currentTarget.requestFullscreen();
                                                        }}
                                                        loading='lazy'
                                                    />
                                                    <img
                                                        src={
                                                            element
                                                                ?.documents[1]
                                                                ?.mediaUrl
                                                        }
                                                        alt=''
                                                        width={100}
                                                        className={
                                                            styles.docimg
                                                        }
                                                        onClick={(e) => {
                                                            e.currentTarget.requestFullscreen();
                                                        }}
                                                        loading='lazy'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-sm-12 w-100`}>
                                <div
                                    className={`${styles.middlebar} mx-3 d-flex justify-content-between`}>
                                    <div
                                        className={`d-flex gap-2 justify-content-left ${styles.headerrow}`}>
                                        <li
                                            onClick={() => {
                                                setCurrentTab(1);
                                                setCurrentOrderPage(1);
                                                setCurrentListingPage(1);
                                            }}
                                            className={
                                                currentSwitcherTab === 1
                                                    ? `${styles.activemiddlebar} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`
                                                    : `${styles.button} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`
                                            }>
                                            Orders
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentTab(2);
                                                setCurrentOrderPage(1);
                                                setCurrentListingPage(1);
                                            }}
                                            className={
                                                currentSwitcherTab === 2
                                                    ? `${styles.activemiddlebar} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`
                                                    : `${styles.button} row g-0 d-flex gap-2 d-flex align-items-center justify-content-center`
                                            }>
                                            Listings
                                        </li>
                                    </div>
                                    {/* <div className='d-flex flex-row justify-content-end flex-grow-1 flex-md-grow-0 w-100'>
                                        <div className={`d-flex flex-grow-1 flex-md-grow-0 ${styles.search}`}>
                                            <Search />
                                            <input
                                                className={styles.input}
                                                placeholder='Search'
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            {renderswitch(currentSwitcherTab)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SellerView;
