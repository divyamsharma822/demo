import React, { useState } from "react";
import styles from "./Section2.module.scss";
import "./antdSection2.scss";

import { BiEditAlt } from "react-icons/bi";
import { useField, Form, Formik, FieldArray } from "formik";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Space, Upload } from "antd";
import { IoMdAdd } from "react-icons/io";

const Section2 = () => {
    const [editable, setEditable] = useState(false);

    let data = {
        plotId: 986235,
        area: 23.5,
        coordinate: "28.535513247324234  |  77.391023459",
        landType: "Black Soil",
        currentCrop: "Wheat",
        lastCrop: "Bajra",
        address: "Indirapuram, Ghaziabad",
        district: "Bareilly",
        block: "block",
        khesraNo: "11134588",
        khataNo: "1326",
        panchayat: "Mathura",
        pin: "22899",
        locations: [],
    };

    const TextField = ({ label, initialValue, ...props }) => {
        const [field, meta] = useField(props);

        return (
            <>
                <div
                    className={`row g-0 d-flex align-items-center ${styles.inputComponent}`}>
                    <div className={`col-lg-5 ${styles.label}`}>{label}</div>
                    <div
                        className={`col-lg-7 d-flex flex-column ${styles.toggle}`}>
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

    // const previewFileList = [
    //     {
    //         uid: "-1",
    //         name: "test1.png",
    //         url: "http://www.baidu.com/xxx.png",
    //         status: "done",
    //     },
    //     {
    //         uid: "-2",
    //         name: "test12.png",
    //         url: "http://www.baidu.com/xxx.png",
    //         status: "done",
    //     },
    // ];

    const handleChange = async ({ fileList: newFileList }) => {
        console.log(newFileList);
    };

    return (
        <>
            <Formik
                initialValues={{
                    plotId: data.plotId,
                    area: data.area,
                    coordinate: data.coordinate,
                    landType: data.landType,
                    currentCrop: data.currentCrop,
                    lastCrop: data.lastCrop,
                    address: data.address,
                    district: data.district,
                    block: data.block,
                    khesraNo: data.khesraNo,
                    khataNo: data.khataNo,
                    panchayat: data.panchayat,
                    pin: data.pin,
                    locations: [
                        {
                            title: "Less Vegetation",
                            elevation: "264.23 ft",
                            coordinates: "28.535513247 , 28.535513247",
                        },
                    ],
                    areaArray: [
                        {
                            title: "No Crop/Less Crop",
                            area: "2964.23 ft 2",
                            surfaceArea: "1.40 Acres",
                        },
                    ],
                }}
                onSubmit={(values, actions) => {
                    // console.log(values);
                    setEditable(!editable);
                    actions.setSubmitting(false);
                }}>
                {(props) => (
                    <Form>
                        <div
                            className={`col-sm-auto Section2 ${styles.Section2}`}
                            style={{
                                cursor: props.isSubmitting ? "wait" : "auto",
                            }}>
                            {/* header */}
                            <div
                                className={`d-flex justify-content-between flex-row ${styles.header}`}>
                                <div className={`${styles.heading}`}>
                                    2. Farm Details
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
                                                Save
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* form */}
                            <div className={`row g-0 ${styles.formWrapper}`}>
                                {editable && (
                                    <Space
                                        direction='vertical'
                                        className={styles.space}
                                        size='large'>
                                        <Upload
                                            // defaultFileList={previewFileList}
                                            onChange={handleChange}
                                            beforeUpload={() => false}
                                            listType='picture'
                                            maxCount={10}
                                            multiple>
                                            <Button icon={<UploadOutlined />}>
                                                Upload Files (Max: 10)
                                            </Button>
                                        </Upload>
                                    </Space>
                                )}

                                {/* TextFields */}
                                <div className='row g-0 d-flex justify-content-between'>
                                    <div className='col-md-6'>
                                        <TextField
                                            name='plotId'
                                            type='number'
                                            label='Plot ID'
                                        />
                                        <TextField
                                            name='area'
                                            type='number'
                                            label='Area( in Acre)'
                                        />
                                        <TextField
                                            name='coordinate'
                                            type='text'
                                            label='Geo Coordinate'
                                        />
                                        <TextField
                                            name='landType'
                                            type='text'
                                            label='Land Type'
                                        />
                                        <TextField
                                            name='currentCrop'
                                            type='text'
                                            label='Current Crop'
                                        />
                                        <TextField
                                            name='lastCrop'
                                            type='text'
                                            label='Last Crop'
                                        />
                                        <TextField
                                            name='address'
                                            type='text'
                                            label='Address'
                                        />
                                        <TextField
                                            name='district'
                                            type='text'
                                            label='District'
                                        />
                                    </div>
                                    <div className='col-md-5'>
                                        {" "}
                                        <TextField
                                            name='block'
                                            type='text'
                                            label='Block'
                                        />
                                        <TextField
                                            name='khesraNo'
                                            type='text'
                                            label='Khesra No.'
                                        />
                                        <TextField
                                            name='khataNo'
                                            type='text'
                                            label='Khata No.'
                                        />
                                        <TextField
                                            name='panchayat'
                                            type='text'
                                            label='Panchayat'
                                        />
                                        <TextField
                                            name='pin'
                                            type='number'
                                            label='Pin'
                                        />
                                    </div>
                                </div>

                                {/* Locations Table */}
                                <FieldArray
                                    name='locations'
                                    render={(arrayHelpers) => (
                                        <>
                                            <div
                                                className={
                                                    styles.subSectionHeader
                                                }>
                                                <span
                                                    className={styles.heading}>
                                                    Locations
                                                </span>
                                                {editable && (
                                                    <button
                                                        className={styles.btn}
                                                        type='button'
                                                        onClick={() =>
                                                            arrayHelpers.insert(
                                                                props.values
                                                                    .locations
                                                                    .length,
                                                                {
                                                                    sno: 1,
                                                                    title: "fdsf",
                                                                    elevation:
                                                                        "fsff",
                                                                    coordinates:
                                                                        "32434234",
                                                                }
                                                            )
                                                        } // insert an empty string at a position
                                                    >
                                                        <IoMdAdd size='1.1em' />
                                                        Add Row
                                                    </button>
                                                )}
                                            </div>
                                            <table className={styles.table}>
                                                <thead>
                                                    <tr className={styles.th}>
                                                        <td
                                                            className={`text-center ${styles.td}`}>
                                                            S No.
                                                        </td>
                                                        <td
                                                            className={
                                                                styles.td
                                                            }>
                                                            Title
                                                        </td>
                                                        <td
                                                            className={
                                                                styles.td
                                                            }>
                                                            Elevation
                                                        </td>
                                                        <td
                                                            className={
                                                                styles.td
                                                            }>
                                                            Coordinates
                                                        </td>
                                                        {editable && (
                                                            <td
                                                                className={`text-center ${styles.td}`}>
                                                                Action
                                                            </td>
                                                        )}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {props.values.locations &&
                                                    props.values.locations
                                                        .length > 0 ? (
                                                        props.values.locations.map(
                                                            (
                                                                tablerow,
                                                                index
                                                            ) => (
                                                                <tr
                                                                    key={index}
                                                                    className={
                                                                        styles.tr
                                                                    }>
                                                                    <td
                                                                        className={`text-center ${styles.td}`}>
                                                                        {index +
                                                                            1}
                                                                    </td>
                                                                    <td
                                                                        className={
                                                                            styles.td
                                                                        }>
                                                                        {
                                                                            tablerow.title
                                                                        }
                                                                    </td>
                                                                    <td
                                                                        className={
                                                                            styles.td
                                                                        }>
                                                                        {
                                                                            tablerow.elevation
                                                                        }
                                                                    </td>
                                                                    <td
                                                                        className={
                                                                            styles.td
                                                                        }>
                                                                        {
                                                                            tablerow.coordinates
                                                                        }
                                                                    </td>
                                                                    {editable && (
                                                                        <td
                                                                            className={`d-flex justify-content-center ${styles.td}`}>
                                                                            <button
                                                                                type='button'
                                                                                className={
                                                                                    styles.delBtn
                                                                                }
                                                                                onClick={() =>
                                                                                    arrayHelpers.remove(
                                                                                        index
                                                                                    )
                                                                                }>
                                                                                Delete
                                                                            </button>
                                                                        </td>
                                                                    )}
                                                                </tr>
                                                            )
                                                        )
                                                    ) : (
                                                        <tr>
                                                            <td
                                                                colSpan='100%'
                                                                className='text-center py-4'>
                                                                No Data Found
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </>
                                    )}
                                />

                                {/* Area Table */}
                                <FieldArray
                                    name='areaArray'
                                    render={(arrayHelpers) => (
                                        <>
                                            <div
                                                className={
                                                    styles.subSectionHeader
                                                }>
                                                <span
                                                    className={styles.heading}>
                                                    Area
                                                </span>
                                                {editable && (
                                                    <button
                                                        className={styles.btn}
                                                        type='button'
                                                        onClick={() =>
                                                            arrayHelpers.insert(
                                                                props.values
                                                                    .areaArray
                                                                    .length,
                                                                {
                                                                    sno: 1,
                                                                    title: "No Crop/Less Crop",
                                                                    area: "2964.23 ft 2",
                                                                    surfaceArea:
                                                                        "1.40 Acres",
                                                                }
                                                            )
                                                        } // insert an empty string at a position
                                                    >
                                                        <IoMdAdd size='1.1em' />
                                                        Add Row
                                                    </button>
                                                )}
                                            </div>
                                            <table className={styles.table}>
                                                <thead>
                                                    <tr className={styles.th}>
                                                        <td
                                                            className={`text-center ${styles.td}`}>
                                                            S No.
                                                        </td>
                                                        <td
                                                            className={
                                                                styles.td
                                                            }>
                                                            Title
                                                        </td>
                                                        <td
                                                            className={
                                                                styles.td
                                                            }>
                                                            Area
                                                        </td>
                                                        <td
                                                            className={
                                                                styles.td
                                                            }>
                                                            Surface Area
                                                        </td>
                                                        {editable && (
                                                            <td
                                                                className={`text-center ${styles.td}`}>
                                                                Action
                                                            </td>
                                                        )}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {props.values.areaArray &&
                                                    props.values.areaArray
                                                        .length > 0 ? (
                                                        props.values.areaArray.map(
                                                            (
                                                                tablerow,
                                                                index
                                                            ) => (
                                                                <tr
                                                                    key={index}
                                                                    className={
                                                                        styles.tr
                                                                    }>
                                                                    <td
                                                                        className={`text-center ${styles.td}`}>
                                                                        {index +
                                                                            1}
                                                                    </td>
                                                                    <td
                                                                        className={
                                                                            styles.td
                                                                        }>
                                                                        {
                                                                            tablerow.title
                                                                        }
                                                                    </td>
                                                                    <td
                                                                        className={
                                                                            styles.td
                                                                        }>
                                                                        {
                                                                            tablerow.area
                                                                        }
                                                                    </td>
                                                                    <td
                                                                        className={
                                                                            styles.td
                                                                        }>
                                                                        {
                                                                            tablerow.surfaceArea
                                                                        }
                                                                    </td>
                                                                    {editable && (
                                                                        <td
                                                                            className={`d-flex justify-content-center ${styles.td}`}>
                                                                            <button
                                                                                type='button'
                                                                                className={
                                                                                    styles.delBtn
                                                                                }
                                                                                onClick={() =>
                                                                                    arrayHelpers.remove(
                                                                                        index
                                                                                    )
                                                                                }>
                                                                                Delete
                                                                            </button>
                                                                        </td>
                                                                    )}
                                                                </tr>
                                                            )
                                                        )
                                                    ) : (
                                                        <tr>
                                                            <td
                                                                colSpan='100%'
                                                                className='text-center py-4'>
                                                                No Data Found
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Section2;
