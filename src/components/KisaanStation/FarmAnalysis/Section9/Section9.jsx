import React, { useState } from "react";
import styles from "./Section9.module.scss";
import { BiEditAlt } from "react-icons/bi";
import { useField, Form, Formik } from "formik";

const Section9 = () => {
    const [editable, setEditable] = useState(false);

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

    const TextAreaField = ({ label, initialValue, ...props }) => {
        const [field, meta] = useField(props);

        return (
            <>
                <div
                    className={`row g-0 d-flex align-items-start ${styles.inputComponent}`}>
                    <div className={`col-md-4 ${styles.label}`}>{label}</div>
                    <div
                        className={`col-md-8 d-flex flex-column ${styles.toggle}`}>
                        {editable ? (
                            <>
                                <textarea
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
                    expectedPriceRangeMin: 12000,
                    expectedPriceRangeMax: 12000,
                    lastYearCropPrice: 14000,
                    expectedStorage: "AgroAcres",
                    expectedLogistics: "Fresh Fields",
                    potentialBuyers:
                        "Farm Fresh Agro | Agro Corporations | Fresh feilds",
                    description:
                        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam conse sunt nostrud amet.",
                }}
                onSubmit={(values, actions) => {
                    setEditable(!editable);

                    // console.log(values);
                    actions.setSubmitting(false);
                }}>
                {(props) => (
                    <Form>
                        <div
                            className={`col-sm-auto ${styles.Section9}`}
                            style={{
                                cursor: props.isSubmitting ? "wait" : "auto",
                            }}>
                            {/* header */}
                            <div
                                className={`d-flex justify-content-between flex-row ${styles.header}`}>
                                <div className={`${styles.heading}`}>
                                    9. Yield Health Estimation
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

                            {/* cards */}
                            <div className={`row g-0 ${styles.cardWrapper}`}>
                                <div className={styles.card}>
                                    <div className={styles.heading}>
                                        Expected Price Range
                                    </div>
                                    <div className={styles.data}>
                                        <span>&#8377; </span>
                                        {props.values.expectedPriceRangeMin}
                                        <span> - &#8377; </span>
                                        {props.values.expectedPriceRangeMax}
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.heading}>
                                        Last Year Crop Price
                                    </div>
                                    <div className={styles.data}>
                                        <span>&#8377; </span>
                                        {props.values.lastYearCropPrice}
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.heading}>
                                        Expected Storage
                                    </div>
                                    <div className={styles.data}>
                                        {props.values.expectedStorage}
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.heading}>
                                        Expected Logistics
                                    </div>
                                    <div className={styles.data}>
                                        {props.values.expectedLogistics}
                                    </div>
                                </div>
                            </div>

                            {/* form */}
                            <div className={`row g-0 ${styles.formWrapper}`}>
                                {editable === true && (
                                    <>
                                        <TextField
                                            name='expectedPriceRangeMin'
                                            type='number'
                                            label='Minimum Expected Price'
                                        />

                                        <TextField
                                            name='expectedPriceRangeMax'
                                            type='number'
                                            label='Maximum Expected Price'
                                        />
                                        <TextField
                                            name='lastYearCropPrice'
                                            type='number'
                                            label='Last Year Crop Price'
                                        />
                                        <TextField
                                            name='expectedStorage'
                                            type='text'
                                            label='Expected Storage'
                                        />
                                        <TextField
                                            name='expectedLogistics'
                                            type='text'
                                            label='Expected Logistics'
                                        />
                                    </>
                                )}

                                <TextField
                                    name='potentialBuyers'
                                    type='text'
                                    label='Potential Buyers'
                                />
                                <TextAreaField
                                    name='description'
                                    type='text'
                                    label='Description'
                                    rows='4'
                                />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Section9;
