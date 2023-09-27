import React, { useState } from "react";
import { useFormik } from "formik";
import styles from "./AdminLogin.module.scss";
import * as Yup from "yup";
import { ReactComponent as Logo } from "../../assests/hallogo.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsExclamationTriangle } from "react-icons/bs";
import { useAdminLoginMutation } from "../../api/KisaanStationsApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ConfirmDialog, ErrorDialog } from "../../components";
import { useDispatch } from "react-redux";
import { add } from "../../redux/reducers/userSlice";

//admin
const AdminLogin = () => {
    const [toggle, settoggle] = useState("password");
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [searchParams] = useSearchParams();
    const [warning, setWarningDialog] = useState(searchParams.get("warning") ? true : false);
    const [adminLogin] = useAdminLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handletoggle = () => {
        if (toggle === "text") {
            settoggle("password");
        } else {
            settoggle("text");
        }
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required("Required"),
            password: Yup.string().min(3, "Must be 3 characters or more").max(15, "Must be 15 characters or less").required("Required"),
        }),
        onSubmit: (values) => {
            adminLogin({
                email: values.email,
                password: values.password,
            })
                .unwrap()
                .then((payload) => {
                    setConfirmDialog(true);
                    dispatch(
                        add({
                            UserId: payload.id,
                            JWT: payload.token,
                        })
                    );
                    window.sessionStorage.setItem("UserId", payload.id);
                    window.sessionStorage.setItem("JWT", payload.token);
                })
                .catch((error) => {
                    setErrorDialog(true);
                    formik.resetForm();
                });
        },
    });
    return (
        <div className={`container-fluid g-0 ${styles.login}`}>
            {confirmDialog ? (
                <ConfirmDialog
                    msg={"Login Successful"}
                    onConfirmFunc={function () {
                        setConfirmDialog(false);
                        navigate("/admin/KisaanStation/Overview");
                    }}
                />
            ) : (
                ""
            )}

            {errorDialog ? (
                <ErrorDialog
                    msg={"Incorrect Id or Password..."}
                    onConfirmFunc={function () {
                        setErrorDialog(false);
                    }}
                />
            ) : (
                ""
            )}
            {warning ? (
                <ErrorDialog
                    msg={
                        <div>
                            Your Session has Expired <br />
                            Login Again
                        </div>
                    }
                    onConfirmFunc={function () {
                        setWarningDialog(false);
                    }}
                />
            ) : (
                ""
            )}
            <div className={`col-sm-12 ${styles.header}`}>
                <Logo className='aspect-square w-[120px] fill-white text-white bg-white rounded-full p-3' />
            </div>
            <div className={`${styles.formwrapper}`}>
                <form
                    onSubmit={formik.handleSubmit}
                    // encType='multipart/form-data'
                    className={styles.form}>
                    <h1 className={styles.h1}>Login</h1>
                    <div className={styles.labelPadding}>
                        {" "}
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            type='email'
                            className={styles.input}
                            {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className={styles.errorlabel}>
                                <BsExclamationTriangle />
                                {formik.errors.email}
                            </div>
                        ) : null}
                    </div>

                    <div className={styles.labelPadding}>
                        <label htmlFor='password'>Password</label>
                        <div className={`d-flex flex-row align-items-center ${styles.eye} `}>
                            <input
                                id='password'
                                name='password'
                                type={toggle}
                                className={styles.input}
                                {...formik.getFieldProps("password")}
                            />
                            {toggle === "password" ? (
                                <AiOutlineEye
                                    className={styles.eyeicon}
                                    onClick={handletoggle}
                                />
                            ) : (
                                <AiOutlineEyeInvisible
                                    className={styles.eyeicon}
                                    onClick={handletoggle}
                                />
                            )}
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className={styles.errorlabel}>
                                <BsExclamationTriangle />
                                {formik.errors.password}
                            </div>
                        ) : null}
                    </div>

                    <div className='forget'>Forget Password ?</div>
                    <button
                        className={styles.submitbutton}
                        type='submit'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
