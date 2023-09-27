import React, { useState } from "react";
import styles from "./EditEmployeeModal.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import { useFormik } from "formik";

import {
    useAllDepartmentsQuery,
    useAllDesignationsQuery,
    useEditEmployeeDetailsMutation,
} from "../../../../api/daybestApi";
import { useNavigate } from "react-router-dom";

const ConfirmDialog = React.lazy(() =>
    import("../../../ConfirmDialog/ConfirmDialog")
);
const ErrorDialog = React.lazy(() =>
    import("../../../ErrorDialog/ErrorDialog")
);

const EditEmployeeModal = ({ setShowModal, element }) => {
    const [editEmployeeDetails] = useEditEmployeeDetailsMutation();
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [apiDept, setApiDept] = useState("All");
    const navigate = useNavigate();

    let {
        data: departments,
        isLoading: deapartmentLoading,
        isFetching: departmentFetching,
    } = useAllDepartmentsQuery();

    let {
        data: designations,
        isLoading: designationsLoading,
        isFetching: designationsFetching,
        refetch: designationsRefetch,
    } = useAllDesignationsQuery({
        dept: apiDept,
    });

    const formik = useFormik({
        initialValues: {
            empId: element?.employeeId ? element?.employeeId : "",
            dept: element?.department ? element?.department : "All",
            desig: element?.designation ? element?.designation : "All",
            joiningDate: element?.joiningDate ? element?.joiningDate : "",
            ctc: element?.ctc ? element?.ctc : "",
            AllocatedLocation: element?.AllocatedLocation
                ? element.AllocatedLocation
                : "",
            mobileNo: element?.mobileNo ? element?.mobileNo : "",
            emailId: element?.email ? element?.email : "",
            DOB: element.dateOfBirth ? element.dateOfBirth : "",
            address: {
                state: element?.address[0]?.state
                    ? element?.address[0]?.state
                    : "",
                district: element?.address[0]?.district
                    ? element?.address[0]?.district
                    : "",
                area: element?.address[0]?.area
                    ? element?.address[0]?.area
                    : "",
                houseNo: element?.address[0]?.houseNo
                    ? element?.address[0]?.houseNo
                    : "",
                pinCode: element?.address[0]?.pinCode
                    ? element.address[0].pinCode
                    : "",
            },
        },
        // validationSchema: Yup.object().shape({
        //     handoverDate: Yup.string().required("Required"),
        //     holderName: Yup.string().required("Required"),
        //     location: Yup.string().required("Required"),
        //     status: Yup.string().required("Required"),
        //     itemDescription: Yup.string().required("Required"),
        //     files: Yup.array().max(6, "Max files 6"),
        // }),

        onSubmit: (values, { resetForm }) => {
            let formdata = new FormData();
            formdata.append("empId", values.empId);
            formdata.append("userId", element._id);
            formdata.append("dept", values.dept);
            formdata.append("desig", values.designation);
            formdata.append("joiningDate", values.joiningDate);
            formdata.append("ctc", values.ctc);
            formdata.append("AllocatedLocation", values.AllocatedLocation);
            formdata.append("mobileNo", values.mobileNo);
            formdata.append("emailId", values.emailId);
            formdata.append("DOB", values.DOB);
            formdata.append("address", JSON.stringify(values.address));

            let data = {
                empId: values.empId,
                userId: element._id,
                dept: values.dept,
                desig: values.desig,
                joiningDate: values.joiningDate,
                ctc: values.ctc,
                AllocatedLocation: values.AllocatedLocation,
                mobileNo: values.mobileNo,
                emailId: values.emailId,
                DOB: values.DOB,
                address: JSON.stringify(values.address),
            };

            editEmployeeDetails(data)
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
                    }}
                />
            )}

            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <div className={styles.header}>
                        <div>Edit Details</div>
                        <IoCloseOutline
                            size={45}
                            className={styles.close}
                            onClick={() => setShowModal(false)}
                        />
                    </div>
                    <div className={styles.fromwrapper}>
                        <form
                            onSubmit={formik.handleSubmit}
                            method='put'
                            // encType='multipart/form-data'
                        >
                            <div className='row g-0 flex-wrap'>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Joining Date
                                            {formik.touched.joiningDate &&
                                            formik.errors.joiningDate ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <input
                                            type='date'
                                            name='joiningDate'
                                            className={styles.input}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.joiningDate}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Employee ID
                                            {formik.touched.empId &&
                                            formik.errors.empId ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <input
                                            type='text'
                                            name='empId'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.empId}
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
                                            Department
                                            {formik.touched.dept &&
                                            formik.errors.dept ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <select
                                            id='standard-select'
                                            className={styles.select}
                                            name='dept'
                                            style={{
                                                padding: "0.4em 1em",
                                            }}
                                            defaultValue={formik.values.dept}
                                            onChange={(e) => {
                                                formik.setFieldValue(
                                                    "dept",
                                                    e.target.value
                                                );
                                                formik.setFieldValue(
                                                    "desig",
                                                    "All"
                                                );
                                                if (
                                                    e.target.value ===
                                                    "IT & Innovation"
                                                ) {
                                                    setApiDept(
                                                        "IT%20%26%20Innovation"
                                                    );
                                                } else if (
                                                    e.target.value === "R&D"
                                                ) {
                                                    setApiDept("R%26D");
                                                } else {
                                                    setApiDept(e.target.value);
                                                }

                                                designationsRefetch();
                                            }}>
                                            {!deapartmentLoading &&
                                                !departmentFetching &&
                                                departments.map(
                                                    (curr, index) => {
                                                        return (
                                                            <option
                                                                value={curr}
                                                                key={index}>
                                                                {curr}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Designation
                                            {formik.touched.desig &&
                                            formik.errors.desig ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <select
                                            id='standard-select'
                                            className={styles.select}
                                            name='desig'
                                            style={{
                                                padding: "0.4em 1em",
                                            }}
                                            value={formik.values.desig}
                                            onChange={(e) => {
                                                formik.setFieldValue(
                                                    "desig",
                                                    e.target.value
                                                );
                                            }}>
                                            {!designationsFetching &&
                                                !designationsLoading &&
                                                designations.map(
                                                    (curr, index) => {
                                                        return (
                                                            <option
                                                                value={curr}
                                                                key={index}>
                                                                {curr}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row g-0 flex-wrap'>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            CTC
                                            {formik.touched.ctc &&
                                            formik.errors.ctc ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <div className='d-flex justify-content-betweeen align-items-center position-relative'>
                                            {" "}
                                            <input
                                                type='text'
                                                name='ctc'
                                                // min='0'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.ctc}
                                                className={`${styles.input}`}
                                            />
                                            {/* <span
                                                className={`position-absolute`}
                                                style={{ right: "3%" }}
                                            >
                                                LPA
                                            </span> */}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Allocated Location
                                            {formik.touched.AllocatedLocation &&
                                            formik.errors.AllocatedLocation ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <input
                                            type='text'
                                            name='AllocatedLocation'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={
                                                formik.values.AllocatedLocation
                                            }
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
                                            Email
                                            {formik.touched.emailId &&
                                            formik.errors.emailId ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <input
                                            type='email'
                                            name='emailId'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.emailId}
                                            className={`${styles.input}`}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            DOB
                                            {formik.touched.DOB &&
                                            formik.errors.DOB ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <input
                                            type='date'
                                            name='DOB'
                                            className={styles.input}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.DOB}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.addressheading}>
                                Employee Address
                            </div>
                            <div className='row g-0 flex-wrap'>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            House No
                                            {formik.touched[
                                                "address.houseNo"
                                            ] &&
                                            formik.errors["address.houseNo"] ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <input
                                            type='text'
                                            name='address.houseNo'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={
                                                formik.values.address.houseNo
                                            }
                                            className={`${styles.input}`}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Area
                                            {formik.touched["address.area"] &&
                                            formik.errors["address.area"] ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <input
                                            type='text'
                                            name='address.area'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.address.area}
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
                                            District
                                            {formik.touched[
                                                "address.district"
                                            ] &&
                                            formik.errors[
                                                "address.district"
                                            ] ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <input
                                            type='text'
                                            name='address.district'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={
                                                formik.values.address.district
                                            }
                                            className={`${styles.input}`}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            State
                                            {formik.touched["address.state"] &&
                                            formik.errors["address.state"] ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <input
                                            type='text'
                                            name='address.state'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.address.state}
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
                                            Mobile No.
                                            {formik.touched.mobileNo &&
                                            formik.errors.mobileNo ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <input
                                            type='number'
                                            name='mobileNo'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.mobileNo}
                                            className={`${styles.input}`}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Pin Code
                                            {formik.touched[
                                                "address.pinCode"
                                            ] &&
                                            formik.errors["address.pinCode"] ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <input
                                            type='text'
                                            name='address.pinCode'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={
                                                formik.values.address.pinCode
                                            }
                                            className={`${styles.input}`}
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

export default EditEmployeeModal;
