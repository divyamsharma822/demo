import React, { useState } from "react";
import { useFormik } from "formik";
import styles from "./Login.module.scss";
import * as Yup from "yup";
import Logo from "../../assets/logo.png";
import { AiOutlineEye } from "react-icons/ai";
import { BsExclamationTriangle } from "react-icons/bs";

const Login = () => {
    const [toggle, settoggle] = useState("password");

    const handletoggle = () => {
        if (toggle === "text") {
            settoggle("password");
        } else {
            settoggle("text");
        }
    };

    const formik = useFormik({
        initialValues: {
            memberId: "",
            password: "",
        },
        validationSchema: Yup.object({
            memberId: Yup.string()
                .min(10, "Must be 10 characters")
                .max(10, "Must be 10 characters")
                .required("Required"),
            password: Yup.string()
                .min(3, "Must be 3 characters or more")
                .max(15, "Must be 15 characters or less")
                .required("Required"),
        }),
        onSubmit: (values) => {
            let formdata = new FormData();
            formdata.append("memberId", values.memberId);
            formdata.append("password", values.password);

            console.log(formdata);
            console.log(values);
        },
    });
    return (
        <div className={`container-fluid ${styles.login}`}>
            <div className={`col-sm-12 ${styles.header}`}>
                <img
                    src={Logo}
                    alt=''
                    height='100'
                    width='100'
                    className={styles.img}
                />
                <div className={`${styles.headerText}`}>Kissan Station</div>
            </div>
            <div className={`${styles.formwrapper}`}>
                <form
                    onSubmit={formik.handleSubmit}
                    encType='multipart/form-data'
                    className={styles.form}
                >
                    <h1 className={styles.h1}>Login</h1>
                    <div className={styles.labelPadding}>
                        {" "}
                        <label htmlFor='memberId'>Member Id</label>
                        <input
                            id='memberId'
                            type='text'
                            className={styles.input}
                            {...formik.getFieldProps("memberId")}
                        />
                        {formik.touched.memberId && formik.errors.memberId ? (
                            <div className={styles.errorlabel}>
                                <BsExclamationTriangle />
                                {formik.errors.memberId}
                            </div>
                        ) : null}
                    </div>

                    <div className={styles.labelPadding}>
                        <label htmlFor='password'>Password</label>
                        <div
                            className={`d-flex flex-row align-items-center ${styles.eye} `}
                        >
                            <input
                                id='password'
                                name='password'
                                type={toggle}
                                className={styles.input}
                                {...formik.getFieldProps("password")}
                            />
                            <AiOutlineEye
                                className={styles.eyeicon}
                                onClick={handletoggle}
                            />
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className={styles.errorlabel}>
                                <BsExclamationTriangle />
                                {formik.errors.password}
                            </div>
                        ) : null}
                    </div>

                    <div className='forget'>Forget Password ?</div>
                    <button className={styles.submitbutton} type='submit'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
