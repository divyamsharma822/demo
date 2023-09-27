import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import "./CreatePost.scss";
import {
    useCreateNewsMutation,
    useSaveToDraftThroughCreateMutation,
} from "../../api/newsApi";
import { ConfirmDialog, ErrorDialog } from "../../components";
import { SideDrawer } from "../KisaanStation";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import "antd/dist/antd.min.css";

const CreatePost = () => {
    const navigate = useNavigate();
    const [createPost] = useCreateNewsMutation();
    const [saveToDraft] = useSaveToDraftThroughCreateMutation();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [errorModal, setErroModal] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            image: [],
        },
        onSubmit: (values) => {
            let formdata = new FormData();
            formdata.append("title", values.title);
            formdata.append("description", values.description);
            formdata.append("status", "published");
            formdata.append("image", values.image);

            createPost(formdata)
                .unwrap()
                .then((payload) => {
                    // console.log("fulfilled", payload);
                    setShow(true);
                })
                .catch((error) => {
                    // console.error("rejected", error);
                    setErroModal(true);
                });
        },
    });

    const handleDraft = () => {
        const postData = {
            DraftThrough: "create",
            status: "draft",
            title: formik.values.title,
            description: formik.values.description,
            image: formik.values.image,
        };
        saveToDraft(postData);
        setShow2(true);
    };
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => resolve(reader.result);

            reader.onerror = (error) => reject(error);
        });

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList.length !== 0) {
            formik.setFieldValue("image", newFileList[0].originFileObj);
        }
    };

    const handleCancel = () => {
        setPreviewOpen(false);
    };

    const handleRemove = () => {
        formik.setFieldValue("image", []);
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
        );
    };

    const uploadButton = (
        <div
            style={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}>
            <PlusOutlined />
            <div>Upload</div>
        </div>
    );

    return (
        <>
            {show ? (
                <ConfirmDialog
                    msg={"Your News post has been successfully Published!"}
                    onConfirmFunc={function () {
                        setShow(false);
                        navigate("/admin/KisaanStation/krishiGyaan/AgriNews");
                    }}
                />
            ) : (
                ""
            )}
            {show2 ? (
                <ConfirmDialog
                    msg={"Your News Post Successfully Saved To Draft"}
                    onConfirmFunc={function () {
                        setShow2(false);
                        navigate(
                            "/admin/KisaanStation/krishiGyaan/AgriNews/draft"
                        );
                    }}
                />
            ) : (
                ""
            )}
            {errorModal ? (
                <ErrorDialog
                    msg={"Something went wrong, Try Again..."}
                    onConfirmFunc={function () {
                        setErroModal(false);
                        navigate("/admin/KisaanStation/krishiGyaan/AgriNews");
                    }}
                />
            ) : (
                ""
            )}
            <div
                style={{
                    height: "100vh",
                    overflow: "auto",
                    backgroundColor: "rgb(248,249,250)",
                }}
                className={`col p-0 m-0`}>
                <div className='row g-0 h-100 overflow-auto'>
                    <div
                        className={`col-sm-12 p-0 m-0 krishiBazaar d-flex flex-column`}>
                        <div
                            className={`col-sm-12 d-flex flex-row justify-content-between align-items-center agrinavbar`}>
                            <SideDrawer />
                            <div>Krishi Gyaan</div>
                            <div>image</div>
                        </div>

                        <div className='news-container d-flex justify-content-start m-2 mt-4'>
                            <div className='create-form mt-1 p-0 col-sm-12'>
                                <form
                                    onSubmit={formik.handleSubmit}
                                    encType='multipart/form-data'
                                    className='d-flex flex-column mx-3'>
                                    <div className='form-wrapper'>
                                        <div>
                                            <div>
                                                <Upload
                                                    listType='picture-card'
                                                    fileList={fileList}
                                                    onPreview={handlePreview}
                                                    onChange={handleChange}
                                                    onRemove={handleRemove}
                                                    beforeUpload={() => false}
                                                    accept='.png,.jpeg,.jpg,'>
                                                    {fileList.length < 1
                                                        ? uploadButton
                                                        : null}
                                                </Upload>
                                                <Modal
                                                    open={previewOpen}
                                                    title={previewTitle}
                                                    footer={null}
                                                    onCancel={handleCancel}>
                                                    <img
                                                        alt='example'
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        src={previewImage}
                                                    />
                                                </Modal>
                                            </div>
                                            <span>
                                                Max Length :{" "}
                                                <b>
                                                    {60 -
                                                        formik.values.title
                                                            .length}{" "}
                                                    Char
                                                </b>
                                            </span>
                                        </div>
                                        <textarea
                                            id='title'
                                            name='title'
                                            type='title'
                                            className='create-heading'
                                            maxLength={60}
                                            placeholder='Enter a Headline'
                                            onChange={formik.handleChange}
                                            value={formik.values.title}
                                        />
                                        <div className='hr'></div>
                                        <textarea
                                            id='description'
                                            name='description'
                                            className='create-description'
                                            type='description'
                                            placeholder='Write you post here...'
                                            maxLength={400}
                                            onChange={formik.handleChange}
                                            value={formik.values.description}
                                        />
                                        <span className='descriptionCount'>
                                            Max Length :{" "}
                                            <b>
                                                {400 -
                                                    formik.values.description
                                                        .length}{" "}
                                                Char
                                            </b>
                                        </span>
                                    </div>
                                    <div className='create-form--btn'>
                                        <button
                                            type='button'
                                            onClick={() =>
                                                navigate(
                                                    "/admin/KisaanStation/krishiGyaan/AgriNews"
                                                )
                                            }
                                            className='create-form--btn--cancel'>
                                            Cancel
                                        </button>
                                        <div className='savepublishgrp'>
                                            <button
                                                type='submit'
                                                className='create-form--btn--publish'>
                                                Publish Post
                                            </button>
                                            <button
                                                type='button'
                                                className='create-form--btn--save'
                                                onClick={handleDraft}>
                                                Save as Draft
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePost;
