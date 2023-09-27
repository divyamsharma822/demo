import React, { useState } from "react";
import styles from "./BottomInfo.module.scss";
import { useFormik } from "formik";
import { usePostCropReportMutation } from "../../../../api/KisaanStationsApi";
import moment from "moment";
import * as Yup from "yup";
import { FaPlus, FaFileAlt, FaTrash } from "react-icons/fa";

const BottomInfo = ({ element, setConfirmDialog, setErrorDialog }) => {
    const [postCropReport] = usePostCropReportMutation();
    const [files, setFiles] = useState([]);

    const removeFile = (filename) => {
        setFiles(files.filter((file) => file.name !== filename));
    };
    const uploadHandler = (event) => {
        setFiles([...event.target.files]);
    };

    const deleteFileHandler = (_name) => {
        removeFile(_name);
    };

    const formik = useFormik({
        initialValues: {
            description: "",
        },
        validationSchema: Yup.object().shape({
            description: Yup.string().required("Required"),
        }),

        onSubmit: (values, { resetForm }) => {
            let formdata = new FormData();
            formdata.append("reqUserId", element.reqUserId);
            formdata.append("farmId", element._id);
            formdata.append("cropId", element.cropDetails[0]._id);
            formdata.append("reportDescription", values.description);
            for (let i = 0; i < files.length; i++) {
                formdata.append("reportPdf", files[i]);
            }
            formdata.append("date", moment().format());
            console.log(formdata.get("reportPdf"));

            postCropReport(formdata)
                .unwrap()
                .then((payload) => {
                    setConfirmDialog(true);
                    resetForm();
                })
                .catch((error) => {
                    setErrorDialog(true);
                });
        },
        onReset: () => {
            formik.setFieldValue("description", "");
            setFiles([]);
        },
    });

    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                method='post'
                encType='multipart/form-data'>
                <div className={`col-md-auto ${styles.BottomInfo}`}>
                    <div
                        className={`d-flex justify-content-between align-items-center flex-wrap ${styles.header}`}>
                        <div
                            className={`col-md-6 flex-md-grow-1 ${styles.heading}`}>
                            Generate Analysis Report
                        </div>
                        <div
                            className={`col-md-6 d-flex justify-content-end flex-grow-1`}>
                            <button
                                type='button'
                                onClick={formik.resetForm}
                                className={styles.historybtn}>
                                Clear
                            </button>
                            &nbsp;&nbsp;
                            <button
                                type='submit'
                                onClick={formik.handleSubmit}
                                className={styles.submitbtn}>
                                Submit Report
                            </button>
                        </div>
                    </div>
                    <div className={styles.hr}></div>

                    <div
                        className={`col-md-12 d-flex flex-row justify-content-between flex-wrap flex-sm-grow-1`}>
                        <div className={`col-md-6 ${styles.uploadfile}`}>
                            <div className={styles.fileCard}>
                                <div className={styles.fileInputs}>
                                    <input
                                        type='file'
                                        onChange={uploadHandler}
                                        accept='.pdf'
                                        multiple
                                    />
                                    <button>
                                        <i>
                                            <FaPlus />
                                        </i>
                                        Select Pdf
                                    </button>
                                </div>
                            </div>
                            <ul
                                className={styles.fileList}
                                style={{ listStyleType: "none" }}>
                                {files &&
                                    files.map((file) => (
                                        <li
                                            className={`d-flex flex-row justify-content-between align-items-center`}
                                            key={file.name}>
                                            <div className='d-flex flex-row align-items-center'>
                                                <FaFileAlt />
                                                <div
                                                    style={{
                                                        wordWrap: "break-word",
                                                    }}>
                                                    {file.name}
                                                </div>
                                            </div>

                                            <div
                                                className={`d-flex ${styles.actions}`}>
                                                {
                                                    <FaTrash
                                                        onClick={() =>
                                                            deleteFileHandler(
                                                                file.name
                                                            )
                                                        }
                                                    />
                                                }
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <div
                            className={`col-md-5 d-flex flex-column flex-md-grow-1$ ${styles.descriptionwrapper}`}
                            style={{ marginRight: "2em" }}>
                            <div className={`col-sm-12 ${styles.description}`}>
                                <textarea
                                    id='description'
                                    name='description'
                                    maxLength={60}
                                    type='description'
                                    placeholder='Write your Text here...'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                />
                                <div className={styles.charcount}>
                                    {formik.touched.description &&
                                    formik.errors.description && (
                                        <div>{formik.errors.description}</div>
                                    ) ? (
                                        <div className='text-danger'>
                                            {formik.errors.description}
                                        </div>
                                    ) : (
                                        <div>&nbsp;</div>
                                    )}
                                    <div>
                                        {60 - formik.values.description.length}
                                        /60
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default BottomInfo;
