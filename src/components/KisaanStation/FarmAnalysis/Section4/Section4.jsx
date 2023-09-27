import React, { useState } from "react";
import styles from "./Section4.module.scss";

import { BiEditAlt } from "react-icons/bi";
import { Form, Formik } from "formik";
import moment from "moment";

const Section4 = () => {
    const [editable, setEditable] = useState(false);

    return (
        <>
            <Formik
                initialValues={{
                    cropTimeline: [
                        {
                            heading: "Ploughing",
                            date: "2023-01-07",
                        },
                        {
                            heading: "Sowing",
                            date: "2023-01-22",
                        },
                        {
                            heading: "First day of Irrigation",
                            date: "2023-01-27",
                        },
                        {
                            heading: "Last day of Irrigation",
                            date: "2023-01-28",
                        },
                        {
                            heading: "Plant Treatment",
                            date: "2023-02-01",
                        },
                        {
                            heading: "Fertiliser used",
                            date: "2023-02-03",
                        },
                        {
                            heading: "Insectisides  used",
                            date: "2023-02-03",
                        },
                        {
                            heading: "Pestisides  used",
                            date: "2023-02-08",
                        },
                        {
                            heading: "Other Nutrients/ Treatments",
                            date: "2023-03-03",
                        },
                    ],
                }}
                onSubmit={(values, actions) => {
                    console.log(values);
                    setEditable(!editable);
                    actions.setSubmitting(false);
                }}>
                {(props) => (
                    <Form>
                        <div
                            className={`col-sm-auto Section4 ${styles.Section4}`}
                            style={{
                                cursor: props.isSubmitting ? "wait" : "auto",
                            }}>
                            {/* header */}
                            <div
                                className={`d-flex justify-content-between flex-row ${styles.header}`}>
                                <div className={`${styles.heading}`}>
                                    4. Crop Timeline
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

                            {/* Timeline UI */}
                            <div className={`row g-0 ${styles.formWrapper}`}>
                                {/* TextFields */}
                                <div
                                    className={`row g-0 d-flex flex-column ${styles.timelineWrapper}`}>
                                    {props.values.cropTimeline.map(
                                        (curr, index) => (
                                            <div
                                                className={styles.timelineRow}
                                                key={index}>
                                                <div className={styles.circle}>
                                                    <div
                                                        className={styles.date}>
                                                        {moment(
                                                            curr.date,
                                                            "YYYY-MM-DD"
                                                        ).format("DD")}
                                                    </div>
                                                    <div
                                                        className={styles.date}>
                                                        {moment(
                                                            curr.date,
                                                            "YYYY-MM-DD"
                                                        ).format("MMM")}
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        styles.line
                                                    }></div>

                                                <div
                                                    className={`d-flex flex-column ${styles.right}`}>
                                                    <div
                                                        className={styles.type}>
                                                        {curr.heading}
                                                    </div>
                                                    {editable && (
                                                        <div
                                                            className={
                                                                styles.dateWrapper
                                                            }>
                                                            <input
                                                                type='date'
                                                                defaultValue={
                                                                    curr.date
                                                                }
                                                                onChange={(e) =>
                                                                    props.setFieldValue(
                                                                        `cropTimeline.${index}.date`,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder='DD-MM-YYYY'
                                                            />
                                                        </div>
                                                    )}
                                                    {!editable && (
                                                        <div
                                                            className={
                                                                styles.date
                                                            }>
                                                            Process Duration: 8
                                                            Days
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Section4;
