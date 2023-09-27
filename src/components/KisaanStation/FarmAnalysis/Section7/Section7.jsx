import React, { useState } from "react";
import styles from "./Section7.module.scss";
import { BiEditAlt } from "react-icons/bi";
import { useField, Form, Formik } from "formik";

const Section7 = () => {
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

    return (
        <>
            <Formik
                initialValues={{
                    estimatedCropInWeight: 24,
                    estimatedMarketPrice: 2122,
                    cropTreeCount: 2344,
                    stressedCrops: 14,
                    approxWastage: 4,
                    affectedCrops: 27,
                    healthyCrops: 73,
                    approxWeightLoss: 14,
                    totalYield: 600,
                    netYield: 104,
                }}
                onSubmit={(values, actions) => {
                    setEditable(!editable);

                    // const formdata = {
                    //     reqUserId: "63bd43e067559fe577ad232a",
                    //     name: values.farmerName,
                    // };
                    // console.log(formdata);
                    actions.setSubmitting(false);
                }}>
                {(props) => (
                    <Form>
                        <div
                            className={`col-sm-auto ${styles.Section7}`}
                            style={{
                                cursor: props.isSubmitting ? "wait" : "auto",
                            }}>
                            {/* header */}
                            <div
                                className={`d-flex justify-content-between flex-row ${styles.header}`}>
                                <div className={`${styles.heading}`}>
                                    7. Yield health Estimation
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
                            {editable && (
                                <div
                                    className={`row g-0 ${styles.formWrapper}`}>
                                    <TextField
                                        name='estimatedCropInWeight'
                                        type='number'
                                        label='Estimated Crop In Weight'
                                    />
                                    <TextField
                                        name='estimatedMarketPrice'
                                        type='number'
                                        label='Estimated Market Price'
                                    />
                                    <TextField
                                        name='cropTreeCount'
                                        type='number'
                                        label='Crop Tree Count'
                                    />
                                    <TextField
                                        name='approxWastage'
                                        type='number'
                                        label='Approx Wastage'
                                    />
                                    <TextField
                                        name='affectedCrops'
                                        type='number'
                                        label='Affected Crops'
                                    />
                                    <TextField
                                        name='healthyCrops'
                                        type='number'
                                        label='Healthy Crops'
                                    />
                                    <TextField
                                        name='approxWeightLoss'
                                        type='number'
                                        label='Approx Weight Loss'
                                    />
                                    <TextField
                                        name='totalYield'
                                        type='number'
                                        label='Total Yield'
                                    />
                                    <TextField
                                        name='netYield'
                                        type='number'
                                        label='Net Yield'
                                    />
                                </div>
                            )}

                            {/* display */}
                            {!editable && (
                                <div
                                    className={`row g-0 justify-content-center justify-content-md-start ${styles.cardWrapper}`}>
                                    <div className={styles.card}>
                                        <div className={`${styles.info}`}>
                                            {props.values.estimatedCropInWeight}{" "}
                                            <span
                                                style={{
                                                    fontSize: "0.8em",
                                                }}>
                                                Kg
                                            </span>
                                        </div>
                                        <div className={`${styles.heading}`}>
                                            Estimated Crop In Weight
                                        </div>
                                    </div>
                                    <div className={styles.card}>
                                        <div className={`${styles.info}`}>
                                            <span>&#8377; </span>
                                            2122
                                        </div>
                                        <div className={`${styles.heading}`}>
                                            Estimated Market Price
                                        </div>
                                    </div>
                                    <div className={styles.card}>
                                        <div className={`${styles.info}`}>
                                            2344
                                        </div>
                                        <div className={`${styles.heading}`}>
                                            Crop Tree Count
                                        </div>
                                    </div>
                                    <div className={`${styles.card}`}>
                                        <div className={`${styles.info}`}>
                                            14%
                                        </div>
                                        <div className={`${styles.heading}`}>
                                            Stressed Crops
                                        </div>
                                    </div>
                                    <div className={`${styles.card}`}>
                                        <div className={`${styles.info}`}>
                                            4{" "}
                                            <span
                                                style={{
                                                    fontSize: "0.8em",
                                                }}>
                                                Kg
                                            </span>
                                        </div>
                                        <div className={`${styles.heading}`}>
                                            Approx Wastage
                                        </div>
                                    </div>
                                    <div className={`${styles.card}`}>
                                        <div className={`${styles.info}`}>
                                            27%
                                        </div>
                                        <div className={`${styles.heading}`}>
                                            Affected Crops
                                        </div>
                                    </div>
                                    <div className={`${styles.card}`}>
                                        <div className={`${styles.info}`}>
                                            73%
                                        </div>
                                        <div className={`${styles.heading}`}>
                                            Healthy Crops
                                        </div>
                                    </div>
                                    <div className={`${styles.card}`}>
                                        <div className={`${styles.info}`}>
                                            14
                                            <span
                                                style={{
                                                    fontSize: "0.8em",
                                                }}>
                                                Kg
                                            </span>
                                        </div>
                                        <div className={`${styles.heading}`}>
                                            Approx Weight Loss
                                        </div>
                                    </div>
                                    <div className={`${styles.card}`}>
                                        <div className={`${styles.info}`}>
                                            600
                                            <span
                                                style={{
                                                    fontSize: "0.8em",
                                                }}>
                                                Kg
                                            </span>
                                        </div>
                                        <div className={`${styles.heading}`}>
                                            Total Yield
                                        </div>
                                    </div>
                                    <div className={`${styles.card}`}>
                                        <div className={`${styles.info}`}>
                                            104
                                            <span
                                                style={{
                                                    fontSize: "0.8em",
                                                }}>
                                                Kg
                                            </span>
                                        </div>
                                        <div className={`${styles.heading}`}>
                                            Net Yield/ Acre
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Section7;
