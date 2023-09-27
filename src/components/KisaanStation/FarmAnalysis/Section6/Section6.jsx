import React, { useState } from "react";
import styles from "./Section6.module.scss";

import { BiEditAlt } from "react-icons/bi";
import { Form, Formik, useField } from "formik";

const Section6 = () => {
    const [editable, setEditable] = useState(false);
    let data = {
        nameOfDisease: "Black Spot",
        cause: "A potassium deficiency that causes the leaves on a vine to turn purple and eventually black as chlorophyll is lost.",
        stage: "Initial Infection",
        effects: "Reduced crop yields & marketability of fruits. ",
        symptoms:
            "Potassium deficiency in plants including brown scorching and curling of leaf tips as well as yellowing between leaf veins. Purple spots may also appear on the leaf undersides.",
        treatment: `Use potassium chloride (muriate of potash)
Potassium nitrate
Potassium sulfate
Monopotassium phosphate`,
        description:
            "Potassium-rich treatments suitable for organic farming include feeding with home-made comfrey liquid, adding seaweed meal, vermiculite,",
        prepration:
            "Potassium-rich treatments suitable for organic farming include feeding with home-made comfrey liquid, adding seaweed meal, vermiculite,",
    };

    const TextField = ({ label, ...props }) => {
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
                    nameOfDisease: data.nameOfDisease,
                    cause: data.cause,
                    stage: data.stage,
                    effects: data.effects,
                    symptoms: data.symptoms,
                    treatment: data.treatment,
                    description: data.description,
                    prepration: data.prepration,
                }}
                onSubmit={(values, actions) => {
                    setEditable(!editable);

                    // const formdata = {
                    //     reqUserId: "63bd43e067559fe577ad232a",
                    //     name: values.farmerName,
                    // };
                    // console.log(formdata);
                }}>
                {(props) => (
                    <Form>
                        <div
                            className={`col-sm-auto ${styles.Section6}`}
                            style={{
                                cursor: props.isSubmitting ? "wait" : "auto",
                            }}>
                            {/* header */}
                            <div
                                className={`d-flex justify-content-between flex-row ${styles.header}`}>
                                <div className={`${styles.heading}`}>
                                    6. Disease Detection
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
                                <TextField
                                    name='nameOfDisease'
                                    type='text'
                                    label='Name of disease'
                                />
                                <TextField
                                    name='cause'
                                    type='text'
                                    label='Cause'
                                />
                                <TextField
                                    name='stage'
                                    type='text'
                                    label='Stage'
                                />
                                <TextField
                                    name='effects'
                                    type='text'
                                    label='Effects'
                                />
                                <TextAreaField
                                    name='symptoms'
                                    type='number'
                                    label='Symptoms'
                                    rows='4'
                                />
                                <TextAreaField
                                    name='treatment'
                                    type='text'
                                    label='Treatment'
                                    rows='4'
                                />
                                <TextAreaField
                                    name='description'
                                    type='text'
                                    label='Description'
                                    rows='4'
                                />
                                <TextAreaField
                                    name='prepration'
                                    type='text'
                                    label='Prepration'
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

export default Section6;
