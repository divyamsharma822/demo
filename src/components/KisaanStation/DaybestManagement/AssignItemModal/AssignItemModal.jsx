import React, { useState } from "react";
import styles from "./AssignItemModal.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import * as Yup from "yup";
import {
    useAssignItemMutation,
    useGetEmployeeSearchQuery,
} from "../../../../api/daybestApi";
import { useFormik } from "formik";
import moment from "moment";

const ConfirmDialog = React.lazy(() =>
    import("../../../ConfirmDialog/ConfirmDialog")
);
const ErrorDialog = React.lazy(() =>
    import("../../../ErrorDialog/ErrorDialog")
);

const AssignItemModal = ({ setShowModal, element }) => {
    const [currPage] = useState(1);
    const [search, setSearch] = useState("");
    const [dropShow, setDropShow] = useState(false);
    const [holdername, setholdername] = useState("Select employee");
    const [userId, setUserId] = useState("");
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);

    let { data, isLoading, isFetching } = useGetEmployeeSearchQuery({
        page: currPage,
        size: 20,
        key: search,
    });

    const [assignItem] = useAssignItemMutation();

    const formik = useFormik({
        initialValues: {
            handoverDate: "",
            holderName: "",
            location: "",
            status: "Active",
            itemDescription: "",
            files: [],
        },
        validationSchema: Yup.object().shape({
            handoverDate: Yup.string().required("Required"),
            holderName: Yup.string().required("Required"),
            location: Yup.string().required("Required"),
            status: Yup.string().required("Required"),
            itemDescription: Yup.string().required("Required"),
            files: Yup.array().max(6, "Max files 6"),
        }),

        onSubmit: (values, { resetForm }) => {
            let formdata = new FormData();
            formdata.append("itemId", element._id);
            formdata.append("userId", userId);
            formdata.append("handoverDate", values.handoverDate);
            formdata.append("holderName", values.holderName);
            formdata.append("status", values.status);
            formdata.append("location", values.location);
            formdata.append("itemDescription", values.itemDescription);

            if (values.files.length !== 0) {
                for (let i = 0; i < values.files.length; i++) {
                    formdata.append("itemImgs", values.files[i]);
                }
            }

            console.log({
                itemId: element._id,
                userId: userId,
                handoverDate: values.handoverDate,
                holderName: values.holderName,
                status: values.status,
                location: values.location,
                itemDescription: values.itemDescription,
            });
            console.log(formdata.getAll("itemImgs"));

            assignItem(formdata)
                .unwrap()
                .then((payload) => {
                    setShowModal(false);
                })
                .catch((error) => {
                    setShowModal(false);
                });
        },
    });

    return (
        <>
            {confirmDialog && (
                <ConfirmDialog
                    msg={"Successfully Assigned"}
                    onConfirmFunc={function () {
                        setConfirmDialog(false);
                        setShowModal(false);
                    }}
                />
            )}

            {errorDialog && (
                <ErrorDialog
                    msg={"Something went wrong, Try Again..."}
                    onConfirmFunc={function () {
                        setErrorDialog(false);
                        setShowModal(false);
                    }}
                />
            )}

            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <div className={styles.header}>
                        <div>Assign Item Form</div>
                        <IoCloseOutline
                            size={45}
                            className={styles.close}
                            onClick={() => setShowModal(false)}
                        />
                    </div>
                    <div className={styles.fromwrapper}>
                        <form
                            onSubmit={formik.handleSubmit}
                            method='post'
                            encType='multipart/form-data'>
                            <div className='row g-0 flex-wrap'>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Handover Date
                                            {formik.touched.handoverDate &&
                                            formik.errors.handoverDate ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <input
                                            type='date'
                                            className={styles.input}
                                            onChange={(e) =>
                                                formik.setFieldValue(
                                                    "handoverDate",
                                                    moment(
                                                        e.target.value,
                                                        "YYYY-MM-DD"
                                                    ).format("DD-MM-YYYY")
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Assigned Location
                                            {formik.touched.location &&
                                            formik.errors.location ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <input
                                            type='text'
                                            name='location'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.location}
                                            className={`${styles.input}`}
                                            placeholder='Enter Location'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row g-0 flex-wrap'>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Holder's Name
                                            {formik.touched.holderName &&
                                            formik.errors.holderName ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <div
                                            onClick={() => {
                                                setDropShow(!dropShow);
                                                setSearch("");
                                            }}
                                            className={`${styles.searchableInput}`}>
                                            <div>{holdername}</div>
                                        </div>

                                        {dropShow && (
                                            <div
                                                className={
                                                    styles.dropdownContent
                                                }>
                                                <input
                                                    type='text'
                                                    className={
                                                        styles.dropdownInput
                                                    }
                                                    placeholder='Search'
                                                    onChange={(e) =>
                                                        setSearch(
                                                            e.target.value
                                                        )
                                                    }
                                                />
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
                                                        data?.employeesDetails?.map(
                                                            (curr, index) => {
                                                                return (
                                                                    <div
                                                                        className={
                                                                            styles.options
                                                                        }
                                                                        onClick={() => {
                                                                            formik.setFieldValue(
                                                                                "holderName",
                                                                                curr.fullName
                                                                            );
                                                                            setDropShow(
                                                                                false
                                                                            );
                                                                            setholdername(
                                                                                curr.fullName
                                                                            );
                                                                            setUserId(
                                                                                curr.userId
                                                                            );
                                                                        }}
                                                                        key={
                                                                            index
                                                                        }>
                                                                        {
                                                                            curr?.fullName
                                                                        }
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
                                            Status
                                        </div>
                                        <select
                                            name='status'
                                            value={formik.values.status}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            style={{ display: "block" }}
                                            className={`${styles.select}`}>
                                            <option
                                                value='Active'
                                                label='Active'>
                                                Active
                                            </option>
                                            <option
                                                value='In-store'
                                                label='In-store'>
                                                In-store
                                            </option>
                                            <option
                                                value='Repairing'
                                                label='Repairing'>
                                                Repairing
                                            </option>
                                            <option
                                                value='Damaged'
                                                label='Damaged'>
                                                Damaged
                                            </option>
                                            <option
                                                value='On-site'
                                                label='On-site'>
                                                On-site
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row g-0 flex-wrap'>
                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Description
                                            {formik.touched.itemDescription &&
                                            formik.errors.itemDescription ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <input
                                            type='text'
                                            name='itemDescription'
                                            value={
                                                formik.values.itemDescription
                                            }
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`${styles.input}`}
                                            placeholder='Enter description'
                                        />
                                    </div>
                                </div>

                                <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={`${styles.label}`}>
                                            Item Images (Max : 6){" "}
                                            {formik.touched.files &&
                                            formik.errors.files ? (
                                                <sup style={{ color: "red" }}>
                                                    *
                                                </sup>
                                            ) : null}
                                        </div>
                                        <input
                                            type='file'
                                            className={`${styles.input}`}
                                            accept='image/*'
                                            multiple
                                            onChange={(e) => {
                                                formik.setFieldValue("files", [
                                                    ...e.target.files,
                                                ]);
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

export default AssignItemModal;
