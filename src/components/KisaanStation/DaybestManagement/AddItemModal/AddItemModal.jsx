import React, { useState } from "react";
import styles from "./AddItemModal.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useAddInventoryItemMutation, useGetEmployeeSearchQuery } from "../../../../api/daybestApi";
import { useFormik } from "formik";

const ConfirmDialog = React.lazy(() => import("../../../ConfirmDialog/ConfirmDialog"));
const ErrorDialog = React.lazy(() => import("../../../ErrorDialog/ErrorDialog"));

const AddItemModal = ({ setShowModal }) => {
    const [currPage] = useState(1);
    const [search, setSearch] = useState("");
    const [dropShow, setDropShow] = useState(false);
    const [holdername, setholdername] = useState("Select employee");
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    let { data } = useGetEmployeeSearchQuery({
        page: currPage,
        size: 20,
        key: search,
    });

    const [addItemToInventory] = useAddInventoryItemMutation();

    const uploadHandler = (event) => {
        formik.setFieldValue("files", event.target.files);
    };

    const formik = useFormik({
        initialValues: {
            itemName: "",
            itemId: "",
            location: "",
            status: "Active",
            description: "",
            holderName: "",
            itemType: "",
            itemImage: [],
            files: [],
        },
        validationSchema: Yup.object().shape({
            itemName: Yup.string().required("Required"),
            itemId: Yup.string().required("Required"),
            location: Yup.string().required("Required"),
        }),

        onSubmit: (values, { resetForm }) => {
            console.log("handler called");
            let formdata = new FormData();
            formdata.append("ItemID", values.itemId);
            formdata.append("ItemName", values.itemName);
            formdata.append("ItemType", values.itemType);
            formdata.append("HolderName", values.holderName);
            formdata.append("Status", values.status);
            formdata.append("Location", values.location);

            if (values.files.length !== 0) {
                for (let i = 0; i < values.files.length; i++) {
                    formdata.append("docs", values.files[i]);
                }
            }
            if (values.itemImage.length !== 0) {
                for (let i = 0; i < values.itemImage.length; i++) {
                    formdata.append("itemImg", values.itemImage[i]);
                }
            }

            console.log({
                ItemID: values.itemId,
                ItemName: values.itemName,
                HolderName: values.holderName,
                Status: values.status,
                Location: values.location,
            });
            console.log(formdata.getAll("docs"));
            console.log(formdata.getAll("itemImage"));

            addItemToInventory(formdata)
                .unwrap()
                .then((payload) => {
                    console.log(payload);
                    setConfirmDialog(true);
                    resetForm();
                })
                .catch((error) => {
                    console.log(error);
                    setErrorDialog(true);
                    resetForm();
                });
        },
    });

    return (
        <>
            {confirmDialog && (
                <ConfirmDialog
                    msg={"Successfully Added"}
                    onConfirmFunc={function () {
                        setConfirmDialog(false);
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
                        <div>Add Item Details</div>
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
                                    <div className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Item Name
                                            {formik.touched.itemName && formik.errors.itemName ? <sup style={{ color: "red" }}>*</sup> : null}
                                        </div>
                                        <input
                                            type='text'
                                            name='itemName'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.itemName}
                                            className={`${styles.input}`}
                                            placeholder='Enter Name'
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Item ID
                                            {formik.touched.itemId && formik.errors.itemId ? <sup style={{ color: "red" }}>*</sup> : null}
                                        </div>
                                        <input
                                            type='text'
                                            name='itemId'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.itemId}
                                            className={`${styles.input}`}
                                            placeholder='Enter item ID'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row g-0 flex-wrap'>
                                <div className='col-sm-6'>
                                    <div className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>Holder's Name</div>
                                        <div
                                            onClick={() => {
                                                setDropShow(!dropShow);
                                                setSearch("");
                                            }}
                                            className={`${styles.searchableInput}`}>
                                            <div>{holdername}</div>
                                        </div>

                                        {dropShow && (
                                            <div className={styles.dropdownContent}>
                                                <input
                                                    type='text'
                                                    className={styles.dropdownInput}
                                                    placeholder='Search'
                                                    onChange={(e) => setSearch(e.target.value)}
                                                />
                                                <div className={styles.dropdownList}>
                                                    {data?.employeesDetails?.map((curr, index) => {
                                                        return (
                                                            <div
                                                                className={styles.options}
                                                                onClick={() => {
                                                                    setholdername(curr.fullName);
                                                                    formik.setFieldValue("holderName", curr.fullName);
                                                                    setDropShow(false);
                                                                }}
                                                                key={index}>
                                                                {curr?.fullName}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={styles.label}>
                                            Location
                                            {formik.touched.location && formik.errors.location ? <sup style={{ color: "red" }}>*</sup> : null}
                                        </div>
                                        <input
                                            type='text'
                                            name='location'
                                            value={formik.values.location}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`${styles.input}`}
                                            placeholder='Enter Location'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='row g-0 d-flex justify-content-center align-items-end flex-wrap'>
                                <div className='col-sm-6'>
                                    <div className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={`${styles.label}`}>Upload Document {formik.touched.files && formik.errors.files ? <sup style={{ color: "red" }}>*</sup> : null}</div>
                                        <input
                                            type='file'
                                            // name='files'
                                            className={`${styles.input}`}
                                            placeholder='Upload a Document'
                                            id='inputGroupFile01'
                                            multiple
                                            onChange={(e) => {
                                                uploadHandler(e);
                                                formik.setFieldTouched("files", true);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className={`d-flex flex-column ${styles.leftwrapper}`}>
                                        <div className={`${styles.label}`}>Upload Item Image {formik.touched.files && formik.errors.files ? <sup style={{ color: "red" }}>*</sup> : null}</div>
                                        <input
                                            type='file'
                                            className={`${styles.input}`}
                                            placeholder='Upload a Document'
                                            id='inputGroupFile01'
                                            accept='image/*'
                                            onChange={(e) => {
                                                formik.setFieldValue("itemImage", [...e.target.files]);
                                                formik.setFieldTouched("itemImage", true);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='row g-0 flex-wrap'>
                                    <div className='col-sm-6'>
                                        <div className={`d-flex flex-column ${styles.leftwrapper}`}>
                                            <div className={styles.label}>Status</div>
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
                                    {/* <div className='col-sm-6'>
                                    <div
                                        className={`d-flex flex-column ${styles.leftwrapper}`}
                                    >
                                        <div className={styles.label}>
                                            Description
                                        </div>
                                        <input
                                            type='text'
                                            name='description'
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`${styles.input}`}
                                            placeholder='Enter description'
                                        />
                                    </div>
                                </div> */}
                                </div>
                                <div className='row g-0 d-flex flex-wrap'>
                                    {/* <div className='col-sm-6'>
                                        <div
                                            className={`d-flex flex-column ${styles.leftwrapper}`}
                                        >
                                            <div className={styles.label}>
                                                Item Type
                                            </div>
                                            <select
                                                name='itemType'
                                                value={formik.values.itemType}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                style={{ display: "block" }}
                                                className={`${styles.select}`}
                                            >
                                                <option
                                                    value='Active'
                                                    label='Active'
                                                >
                                                    Active
                                                </option>
                                                <option
                                                    value='In-store'
                                                    label='In-store'
                                                >
                                                    In-store
                                                </option>
                                                <option
                                                    value='Repairing'
                                                    label='Repairing'
                                                >
                                                    Repairing
                                                </option>
                                                <option
                                                    value='Damaged'
                                                    label='Damaged'
                                                >
                                                    Damaged
                                                </option>
                                                <option
                                                    value='On-site'
                                                    label='On-site'
                                                >
                                                    On-site
                                                </option>
                                            </select>
                                        </div>
                                    </div> */}
                                </div>
                                <div className='row g-0 d-flex justify-content-center align-items-end flex-wrap'>
                                    <div className='col-sm-6'>
                                        <div className={`d-flex flex-column ${styles.leftwrapper}`}>
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

export default AddItemModal;
