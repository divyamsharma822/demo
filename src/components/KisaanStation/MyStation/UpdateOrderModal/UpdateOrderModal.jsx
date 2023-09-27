import React, { useState } from "react";
import styles from "./UpdateOrderModal.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import {
    useGetAllKSQuery,
    useGetAllSellerPerKSQuery,
    useUpdateMyStationOrderMutation,
} from "../../../../api/KisaanStationsApi";

const UpdateOrderModal = ({
    setShowModal,
    element,
    setConfirmDialog,
    setErrorDialog,
}) => {
    const [dropShow, setDropShow] = useState(false);
    const [sellerDrop, setSellerDrop] = useState(false);

    const { data: allKSList, isLoading, isFetching } = useGetAllKSQuery();
    const [updateDetails] = useUpdateMyStationOrderMutation();

    const [localState, setLocalState] = useState({
        buyOrderId: element?.list?._id,
        estimatedPrice: element?.list?.estimatedPrice,
        paymentReceived: element?.list?.paymentReceived,
        remainingPayment: element?.list?.remainingPayment,
        sellerName: element.list?.sellerName
            ? element.list?.sellerName
            : "Select Seller",
        sellerContactNo: element.list?.sellerContactNo,
        remarks: element.list?.remarks,
        orderStatus: element.list?.orderStatus,
        addFarmDetails: element.list?.addFarmDetails,
        ksName: element.list?.ksName,
        stationId: element.list?.stationId,
        sellerId: element.list?.sellerId,
    });

    const {
        data: allSellerList,
        isLoading: sellerLoading,
        isFetching: sellerFetching,
    } = useGetAllSellerPerKSQuery({ stationId: localState.stationId });

    const UpdateItem = (e, index) => {
        let newArr = [...localState.addFarmDetails];
        newArr[0] = {
            ...localState.addFarmDetails[0],
            area: e.target.value,
        };
        console.log(newArr);
        setLocalState({
            ...localState,
            addFarmDetails: newArr,
            estimatedPrice: e.target.value * 450,
        });
    };

    const onSubmit = () => {
        if (
            localState.sellerName !== "Select Seller" &&
            localState.addFarmDetails[0].area > 0
        ) {
            const data = {
                buyOrderId: localState.buyOrderId,
                estimatedPrice: localState.estimatedPrice
                    ? localState.estimatedPrice
                    : 0,
                paymentReceived: localState.paymentReceived
                    ? localState.paymentReceived
                    : 0,
                remainingPayment: localState.remainingPayment,
                sellerName: localState.sellerName,
                sellerContactNo: localState.sellerContactNo,
                remarks: localState.remarks,
                orderStatus: localState.orderStatus,
                addFarmDetails: JSON.stringify(localState.addFarmDetails),
                stationId: localState.stationId,
                sellerId: localState.sellerId,
            };
            console.log(`data`, data);

            updateDetails(data)
                .unwrap()
                .then((payload) => {
                    setConfirmDialog(true);
                })
                .catch((error) => {
                    setErrorDialog(true);
                });
        }
    };

    return (
        <>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <div className={styles.header}>
                        <div>Update Details</div>
                        <IoCloseOutline
                            size={45}
                            className={styles.close}
                            onClick={() => setShowModal(false)}
                        />
                    </div>
                    <div className={styles.fromwrapper}>
                        <form method='post'>
                            <div className='row g-0 flex-wrap'>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Status
                                        </div>
                                        <select
                                            name='status'
                                            defaultValue={
                                                localState.orderStatus
                                            }
                                            style={{ display: "block" }}
                                            className={`${styles.select}`}
                                            onChange={(e) => {
                                                setLocalState({
                                                    ...localState,
                                                    orderStatus: e.target.value,
                                                });
                                            }}>
                                            <option disabled={true}>
                                                Select Status
                                            </option>
                                            <option value='Pending'>
                                                Pending
                                            </option>
                                            <option value='Approved'>
                                                Approved by Kisaan Station
                                            </option>
                                            <option value='On the way'>
                                                On the way
                                            </option>
                                            <option value='Delivered'>
                                                Delivered
                                            </option>
                                            <option value='Cancelled'>
                                                Cancelled
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Farm (Name:{" "}
                                            {
                                                localState?.addFarmDetails[0]
                                                    ?.farmName
                                            }
                                            )
                                        </div>
                                        <div
                                            className={`d-flex flex-row align-items-center ${styles.input}`}>
                                            <input
                                                type='number'
                                                className={
                                                    styles.leftInnerField
                                                }
                                                defaultValue={
                                                    localState.addFarmDetails[0]
                                                        .area
                                                }
                                                minLength={1}
                                                onChange={(e) => {
                                                    UpdateItem(e);
                                                }}
                                                required
                                            />
                                            <div
                                                className={
                                                    styles.RightInnerField
                                                }>
                                                acre
                                            </div>
                                        </div>
                                    </div>
                                    {localState.addFarmDetails[0].area <= 0 && (
                                        <div
                                            style={{
                                                color: "red",
                                                fontSize: "0.7em",
                                                paddingLeft: "2em",
                                                marginTop: "-1em",
                                            }}>
                                            should be greater than 0
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='row g-0 flex-wrap'>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Change KS
                                        </div>
                                        <div
                                            onClick={() => {
                                                setDropShow(!dropShow);
                                            }}
                                            className={`${styles.searchableInput}`}>
                                            <div>{localState.ksName}</div>
                                        </div>

                                        {dropShow && (
                                            <div
                                                className={
                                                    styles.dropdownContent
                                                }>
                                                <div
                                                    className={
                                                        styles.dropdownList
                                                    }>
                                                    {(isLoading ||
                                                        isFetching) && (
                                                        <div
                                                            className={`text-center ${styles.options}`}>
                                                            Loading
                                                        </div>
                                                    )}
                                                    {!isLoading &&
                                                        !isFetching &&
                                                        allKSList?.map(
                                                            (curr, index) => {
                                                                return (
                                                                    <div
                                                                        className={
                                                                            styles.options
                                                                        }
                                                                        onClick={() => {
                                                                            setLocalState(
                                                                                {
                                                                                    ...localState,
                                                                                    ksName: curr.ksName,
                                                                                    stationId:
                                                                                        curr._id,
                                                                                    sellerName:
                                                                                        "Select Seller",
                                                                                }
                                                                            );
                                                                            setDropShow(
                                                                                false
                                                                            );
                                                                        }}
                                                                        key={
                                                                            index
                                                                        }>
                                                                        <div>
                                                                            {
                                                                                curr?.ksName
                                                                            }
                                                                        </div>
                                                                        <div>
                                                                            {
                                                                                curr?.ksId
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Change Seller{" "}
                                            {localState.sellerName ===
                                                "Select Seller" && (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            )}
                                        </div>
                                        <div
                                            onClick={() => {
                                                setSellerDrop(!sellerDrop);
                                            }}
                                            className={`${styles.searchableInput}`}>
                                            <div>{localState.sellerName} </div>
                                        </div>

                                        {sellerDrop && (
                                            <div
                                                className={
                                                    styles.dropdownContent
                                                }>
                                                <div
                                                    className={
                                                        styles.dropdownList
                                                    }>
                                                    {(sellerFetching ||
                                                        sellerFetching) && (
                                                        <div
                                                            className={`text-center ${styles.options}`}>
                                                            Loading
                                                        </div>
                                                    )}
                                                    {!sellerFetching &&
                                                        !sellerLoading &&
                                                        allSellerList?.map(
                                                            (curr, index) => {
                                                                return (
                                                                    <div
                                                                        className={
                                                                            styles.options
                                                                        }
                                                                        onClick={() => {
                                                                            setLocalState(
                                                                                {
                                                                                    ...localState,
                                                                                    sellerName:
                                                                                        curr.fullName,
                                                                                    sellerContactNo:
                                                                                        curr.sellerContactNo,
                                                                                    sellerId:
                                                                                        curr.sellerId,
                                                                                }
                                                                            );
                                                                            setSellerDrop(
                                                                                false
                                                                            );
                                                                        }}
                                                                        key={
                                                                            index
                                                                        }>
                                                                        <div>
                                                                            {
                                                                                curr?.fullName
                                                                            }
                                                                        </div>
                                                                        <div>
                                                                            {
                                                                                curr?.sellerContactNo
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    {!sellerFetching &&
                                                        !sellerLoading &&
                                                        allSellerList?.length ===
                                                            0 && (
                                                            <div>
                                                                No Seller Found
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='row g-0 flex-wrap'>
                                <div className='col-sm-4'>
                                    <div
                                        className={`d-flex flex-column justify-content-end ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Payment Received
                                        </div>
                                        <input
                                            type='number'
                                            placeholder='Payment Received'
                                            className={`${styles.input}`}
                                            defaultValue={
                                                localState.paymentReceived
                                            }
                                            min='0'
                                            minLength={1}
                                            maxLength={25}
                                            onChange={(e) =>
                                                setLocalState({
                                                    ...localState,
                                                    paymentReceived: parseInt(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className='col-sm-4'>
                                    <div
                                        className={`d-flex flex-column justify-content-end ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Remaining Payment
                                        </div>
                                        <input
                                            type='number'
                                            defaultValue={
                                                localState.remainingPayment
                                            }
                                            className={`${styles.input}`}
                                            placeholder='Enter Remaining Payment'
                                            maxLength={25}
                                            min='0'
                                            minLength={1}
                                            onChange={(e) =>
                                                setLocalState({
                                                    ...localState,
                                                    remainingPayment: parseInt(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-4'>
                                    <div
                                        className={`d-flex flex-column justify-content-end ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Estimate Price
                                        </div>
                                        <input
                                            type='number'
                                            defaultValue=''
                                            className={`${styles.input}`}
                                            // placeholder='Enter Estimate Payment'
                                            placeholder={
                                                localState.estimatedPrice
                                                    ? localState.estimatedPrice
                                                    : 0
                                            }
                                            maxLength={25}
                                            min='0'
                                            minLength={1}
                                            onChange={(e) =>
                                                setLocalState({
                                                    ...localState,
                                                    estimatedPrice: parseInt(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row g-0 flex-wrap'>
                                <div className='col-sm-12'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Remarks
                                        </div>
                                        <input
                                            type='text'
                                            placeholder='Remarks'
                                            defaultValue={localState.remarks}
                                            className={`${styles.input}`}
                                            onChange={(e) => {
                                                console.log(localState);
                                                setLocalState({
                                                    ...localState,
                                                    remarks: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='row g-0 d-flex justify-content-start align-items-end flex-wrap'>
                                <div className='row g-0 d-flex justify-content-center align-items-end flex-wrap'>
                                    <div className='col-sm-6'>
                                        <div
                                            className={`d-flex flex-column ${styles.leftwrapper}`}>
                                            <button
                                                type='button'
                                                className={styles.submit}
                                                onClick={() => onSubmit()}>
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateOrderModal;
