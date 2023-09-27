import React, { useState } from "react";
import styles from "./Section11.module.scss";
import { BiEditAlt } from "react-icons/bi";
import { useField, Form, Formik } from "formik";
import droneImg from "../../../../assests/droneImage.png";

const Section11 = () => {
    const [editable, setEditable] = useState(false);

    const TextAreaField = ({ label, droneImage, ...props }) => {
        const [field, meta] = useField(props);

        return (
            <>
                <div
                    className={`row g-0 d-flex align-items-start ${styles.inputComponent}`}>
                    {editable && (
                        <div className={`col-md-4 ${styles.label}`}>
                            {label}
                        </div>
                    )}
                    {!editable && (
                        <div className={`col-md-4 ${styles.imgWrapper}`}>
                            <img
                                src={droneImage}
                                alt='droneImage'
                                className={styles.img}
                            />
                        </div>
                    )}

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
                    posts: [
                        {
                            droneImage: droneImg,
                            content:
                                "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequatduis enim velit mollit. Exercitation veniam consesunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequatduis enim velit mollit. Exercitation veniam consesunt nostrud amet.",
                        },
                        {
                            droneImage: droneImg,
                            content:
                                "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequatduis enim velit mollit. Exercitation veniam consesunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequatduis enim velit mollit. Exercitation veniam consesunt nostrud amet.",
                        },
                        {
                            droneImage: droneImg,
                            content:
                                "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequatduis enim velit mollit. Exercitation veniam consesunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequatduis enim velit mollit. Exercitation veniam consesunt nostrud amet.",
                        },
                    ],
                }}
                onSubmit={(values, actions) => {
                    setEditable(!editable);

                    // console.log(values);
                    actions.setSubmitting(false);
                }}>
                {(props) => (
                    <Form>
                        <div
                            className={`col-sm-auto ${styles.Section11}`}
                            style={{
                                cursor: props.isSubmitting ? "wait" : "auto",
                            }}>
                            {/* header */}
                            <div
                                className={`d-flex justify-content-between flex-row ${styles.header}`}>
                                <div className={`${styles.heading}`}>
                                    11. Drone Captured images
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
                                    name='posts[0].content'
                                    type='text'
                                    label='Conclusion'
                                    rows='5'
                                    droneImage={
                                        props.values.posts[0].droneImage
                                    }
                                />
                                <TextAreaField
                                    name='posts[0].content'
                                    type='text'
                                    label='Conclusion'
                                    rows='5'
                                    droneImage={
                                        props.values.posts[1].droneImage
                                    }
                                />
                                <TextAreaField
                                    name='posts[0].content'
                                    type='text'
                                    label='Conclusion'
                                    rows='5'
                                    droneImage={
                                        props.values.posts[2].droneImage
                                    }
                                />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Section11;
