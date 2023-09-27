import React, { useState } from "react";
import styles from "../Section8/Section8.module.scss";
import { BiEditAlt } from "react-icons/bi";
import { useField, Form, Formik } from "formik";

const Section10 = () => {
    const [editable, setEditable] = useState(false);

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
                    conclusion:
                        "Potassium-rich treatments suitable for organic farming include feeding with home-made comfrey liquid, adding seaweed meal, vermiculite,Potassium-rich treatments suitable for organic farming include feeding with home-made comfrey liquid, adding seaweed meal, vermiculite,Potassium-rich treatments suitable for organic farming include feeding with home-made comfrey liquid, adding seaweed meal, vermiculite,",
                }}
                onSubmit={(values, actions) => {
                    setEditable(!editable);

                    // console.log(values);
                    actions.setSubmitting(false);
                }}>
                {(props) => (
                    <Form>
                        <div
                            className={`col-sm-auto ${styles.Section8}`}
                            style={{
                                cursor: props.isSubmitting ? "wait" : "auto",
                            }}>
                            {/* header */}
                            <div
                                className={`d-flex justify-content-between flex-row ${styles.header}`}>
                                <div className={`${styles.heading}`}>
                                    10. Conclusion
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
                                <TextAreaField
                                    name='conclusion'
                                    type='text'
                                    label='Conclusion'
                                    rows='7'
                                />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Section10;
