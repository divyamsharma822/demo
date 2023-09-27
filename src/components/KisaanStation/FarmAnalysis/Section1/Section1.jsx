import React, { useState } from "react";
import styles from "./Section1.module.scss";
import { BiEditAlt } from "react-icons/bi";
import { useField, Form, Formik } from "formik";
import { useUpdateAnalysisReportMutation } from "../../../../api/KisaanStationsApi";

const Section1 = ({ setConfirmDialog, setErrorModal }) => {
    const [editable, setEditable] = useState(false);
    const [updateAnalysisReport] = useUpdateAnalysisReportMutation();

    let data = {
        farmerName: "Divyam Sharma",
        kisaanId: 123445,
        address: "Ithum Tower, Noida Electronic city Uttar Pardesh, 201203",
        emailId: "Anonymous@gmail.com",
        mobileNo: 7253446289,
        nearestKS: "Laalganj, Mirzapur",
        releasedBy: "",
    };

    const TextField = ({ label, initialValue, ...props }) => {
        const [field, meta] = useField(props);

        return (
            <>
                <div
                    className={`row g-0 d-flex align-items-center ${styles.inputComponent}`}>
                    <div className={`col-md-4 ${styles.label}`}>{label}</div>
                    <div
                        className={`col-md-8 d-flex flex-column ${styles.toggle}`}>
                        {editable ? (
                            <>
                                <input
                                    {...field}
                                    {...props}
                                    placeholder={label}
                                    className={styles.input}
                                    value={meta.value}
                                />
                                {meta.touched && meta.error ? (
                                    <div className={styles.error}>
                                        {meta.error}
                                    </div>
                                ) : null}
                            </>
                        ) : (
                            <>
                                <div className={styles.rightLabel}>
                                    {meta.value}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <Formik
                initialValues={{
                    farmerName: data.farmerName,
                    kisaanId: data.kisaanId,
                    address: data.address,
                    emailId: data.emailId,
                    mobileNo: data.mobileNo,
                    nearestKS: data.nearestKS,
                    releasedBy: data.releasedBy,
                }}
                onSubmit={(values, actions) => {
                    setEditable(!editable);

                    const formdata = {
                        reqUserId: "63bd43e067559fe577ad232a",
                        name: values.farmerName,
                    };
                    console.log(formdata);

                    updateAnalysisReport(formdata)
                        .unwrap()
                        .then((payload) => {
                            actions.setSubmitting(false);
                            setConfirmDialog(true);
                        })
                        .catch((error) => {
                            actions.setSubmitting(false);
                            setErrorModal(true);
                        });
                }}>
                {(props) => (
                    <Form>
                        <div
                            className={`col-sm-auto ${styles.Section1}`}
                            style={{
                                cursor: props.isSubmitting ? "wait" : "auto",
                            }}>
                            {/* header */}
                            <div
                                className={`d-flex justify-content-between flex-row ${styles.header}`}>
                                <div className={`${styles.heading}`}>
                                    1. Basic Details
                                </div>
                                {editable === false && (
                                    <button
                                        type='button'
                                        className={`${styles.edit}`}
                                        onClick={() => setEditable(!editable)}
                                        disabled={props.isSubmitting}>
                                        <BiEditAlt
                                            size={"1.3em"}
                                            className={styles.svg}
                                        />
                                        Edit
                                    </button>
                                )}
                                {editable === true && (
                                    <>
                                        <div className='d-flex gap-2'>
                                            <button
                                                type='reset'
                                                className={`${styles.cancel}`}
                                                onClick={() => {
                                                    setEditable(!editable);
                                                    props.handleReset();
                                                }}
                                                disabled={props.isSubmitting}>
                                                Cancel
                                            </button>
                                            <button
                                                type='submit'
                                                className={`${styles.save}`}
                                                disabled={props.isSubmitting}>
                                                {/* <FaRegSave
                                                    size={"1.3em"}
                                                    className={styles.svg}
                                                /> */}
                                                Save
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* form */}
                            <div className={`row g-0 ${styles.formWrapper}`}>
                                <TextField
                                    name='farmerName'
                                    type='text'
                                    label='Farmer Name'
                                />
                                <TextField
                                    name='kisaanId'
                                    type='text'
                                    label='Kisaan ID'
                                />
                                <TextField
                                    name='address'
                                    type='text'
                                    label='Address'
                                />
                                <TextField
                                    name='emailId'
                                    type='email'
                                    label='Email ID'
                                />
                                <TextField
                                    name='mobileNo'
                                    type='number'
                                    label='Mobile Number'
                                />
                                <TextField
                                    name='nearestKS'
                                    type='text'
                                    label='Nearest Kisaan Station'
                                />
                                <TextField
                                    name='releasedBy'
                                    type='text'
                                    label='Released By'
                                />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Section1;
