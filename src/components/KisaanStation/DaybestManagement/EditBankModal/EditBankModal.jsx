import React, { useEffect, useState } from "react";
import styles from "./EditBankModal.module.scss";
import { useFormik } from "formik";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEditBankDetailsMutation } from "../../../../api/daybestApi";
import * as Yup from "yup";
var ifsc = require("ifsc-finder");

const ConfirmDialog = React.lazy(() =>
    import("../../../ConfirmDialog/ConfirmDialog")
);
const ErrorDialog = React.lazy(() =>
    import("../../../ErrorDialog/ErrorDialog")
);

const EditBankModal = ({ setShowModal, element }) => {
    const [editEmployeeBankDetails] = useEditBankDetailsMutation();
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [ifscInfo, setIfscInfo] = useState({});
    const [ifscNumber, setIfscNumber] = useState("");
    const navigate = useNavigate();

    const getIfscInfo = (code) => {
        ifsc.get(code).then(function (res) {
            setIfscInfo(res);
        });
        setIfscNumber(code);
    };

    useEffect(() => {
        if (element.ifscCode !== "") {
            getIfscInfo(element.ifscCode);
        }
        setIfscNumber(element.ifscCode);
    }, [element.ifscCode, setIfscInfo]);

    const formik = useFormik({
        initialValues: {
            ifscCode: element?.ifscCode ? element.ifscCode : "",
            accountNo: element?.accountNumber ? element?.accountNumber : "",
            accountName: element?.accountName ? element?.accountName : "",
        },
        validationSchema: Yup.object().shape({
            ifscCode: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            let data = {
                userId: element._id,
                ifscCode: values.ifscCode,
                accountNo: values.accountNo,
                accountName: values.accountName,
                branch: ifscInfo.BRANCH ? ifscInfo.BRANCH : "",
                bankName: ifscInfo.BANK ? ifscInfo.BANK : "",
            };
            console.log(data);

            editEmployeeBankDetails(data)
                .unwrap()
                .then((payload) => {
                    setConfirmDialog(true);
                })
                .catch((error) => {
                    setErrorDialog(true);
                });
        },
    });

    return (
        <>
            {confirmDialog && (
                <ConfirmDialog
                    msg={"Successfully Updated"}
                    onConfirmFunc={function () {
                        setConfirmDialog(false);
                        navigate(
                            "/admin/KisaanStation/DaybestManagement/Employees"
                        );
                    }}
                />
            )}

            {errorDialog && (
                <ErrorDialog
                    msg={"Something went wrong, Try Again..."}
                    onConfirmFunc={function () {
                        setErrorDialog(false);
                        // setShowModal(false);
                    }}
                />
            )}

            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <div className={styles.header}>
                        <div>Edit Bank Details</div>
                        <IoCloseOutline
                            size={45}
                            className={styles.close}
                            onClick={() => setShowModal(false)}
                        />
                    </div>
                    <div className={styles.fromwrapper}>
                        <form onSubmit={formik.handleSubmit} method='put'>
                            <div className='row g-0 flex-wrap'>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Account Name
                                            {formik.touched.accountName &&
                                            formik.errors.accountName ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <input
                                            type='text'
                                            name='accountName'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.accountName}
                                            className={`${styles.input}`}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Account Number
                                            {formik.touched.accountNo &&
                                            formik.errors.accountNo ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <input
                                            type='number'
                                            maxLength={18}
                                            minLength={9}
                                            name='accountNo'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.accountNo}
                                            className={`${styles.input}`}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row g-0 flex-wrap'>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            IFSC Code
                                            {formik.touched.ifscCode &&
                                            formik.errors.ifscCode ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <input
                                            type='text'
                                            name='ifscCode'
                                            onChange={(e) => {
                                                getIfscInfo(e.target.value);
                                                formik.setFieldValue(
                                                    "ifscCode",
                                                    e.target.value
                                                );
                                            }}
                                            value={ifscNumber}
                                            className={`${styles.input}`}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Branch Name
                                        </div>
                                        <div className={`${styles.disabled}`}>
                                            {ifscInfo.BRANCH
                                                ? ifscInfo.BRANCH
                                                : "Wrong IFSC Code"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row g-0 flex-wrap'>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Bank Name
                                        </div>
                                        <div className={`${styles.disabled}`}>
                                            {ifscInfo.BANK
                                                ? ifscInfo.BANK
                                                : "Wrong IFSC Code"}
                                        </div>
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
                                                onClick={formik.handleSubmit}>
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

export default EditBankModal;
