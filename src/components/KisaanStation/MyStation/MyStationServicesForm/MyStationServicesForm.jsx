import React, { useState } from "react";
import styles from "./MyStationServicesForm.module.scss";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
import { AiFillMinusCircle } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import * as Yup from "yup";
import { usePostDroneSprayFormDataMutation } from "../../../../api/KisaanStationsApi";

const MyStationServicesForm = () => {
    const [input, setInput] = useState("");
    const [tags, setTags] = useState([]);
    const [isKeyReleased, setIsKeyReleased] = useState(false);
    const [postData] = usePostDroneSprayFormDataMutation();

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const deleteTag = (index) => {
        setTags((prevState) => prevState.filter((tag, i) => i !== index));
    };

    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();

        if (
            key === "," &&
            trimmedInput.length &&
            !tags.includes(trimmedInput)
        ) {
            e.preventDefault();
            setTags((prevState) => [...prevState, trimmedInput]);
            setInput("");
        }

        if (
            key === "Backspace" &&
            !input.length &&
            tags.length &&
            isKeyReleased
        ) {
            e.preventDefault();
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();
            setTags(tagsCopy);
            setInput(poppedTag);
        }

        setIsKeyReleased(false);
    };

    const onKeyUp = () => {
        setIsKeyReleased(true);
    };

    return (
        <Formik
            initialValues={{
                basicDetails: {
                    price: "",
                    unit: "",
                    description: "",
                },
                sprayProducts: [
                    {
                        productName: "",
                        productPrice: "",
                        qtyUnit: "",
                        productDescription: "",
                    },
                ],
                tags: tags,
            }}
            validationSchema={Yup.object().shape({
                basicDetails: Yup.object().shape({
                    price: Yup.number()
                        .typeError("Price must be a number")
                        .required("Price is required"),
                    unit: Yup.string().required("Unit is required"),
                    description: Yup.string().required(
                        "Description is required"
                    ),
                }),
                sprayProducts: Yup.array().of(
                    Yup.object().shape({
                        productName: Yup.string().required("Name is required"),
                        productPrice: Yup.number()
                            .typeError("Price must be a number")
                            .required("Price is required"),
                        qtyUnit: Yup.string().required("Unit is required"),
                        productDescription: Yup.string(),
                    })
                ),
            })}
            onSubmit={(values) => {
                var formdata = new FormData();
                formdata.append("price", values.basicDetails.price);
                formdata.append("areaUnit", values.basicDetails.unit);
                formdata.append(
                    "droneDescription",
                    values.basicDetails.description
                );
                formdata.append(
                    "sprayProduct",
                    JSON.stringify(values.sprayProducts)
                );
                formdata.append("cropType", JSON.stringify(values.tags));

                postData(formdata)
                    .unwrap()
                    .then((payload) => {
                        console.log("fulfilled", payload);
                        alert("success");
                    })
                    .catch((error) => {
                        console.error("rejected", error);
                        alert("failed");
                    });
            }}
            enableReinitialize={true}>
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                resetForm,
            }) => (
                <div className={`col-sm-auto ${styles.MyStationServicesForm}`}>
                    <div
                        className={`d-flex align-items-center justify-content-between flex-row flex-wrap ${styles.header}`}>
                        <h1 className={`${styles.h1}`}>
                            Drone Spraying Services
                        </h1>
                        <div className={`gap-4 d-flex ${styles.buttons}`}>
                            <button
                                type='reset'
                                onClick={resetForm}
                                className={styles.reset}>
                                Reset
                            </button>
                            <button
                                type='submit'
                                onClick={handleSubmit}
                                className={styles.save}
                                // disabled={isSubmitting}
                            >
                                Save Record
                            </button>
                        </div>
                    </div>
                    <div className={styles.hr}></div>

                    <div className={`col-sm-12 d-flex justify-content-center`}>
                        <form
                            onSubmit={handleSubmit}
                            method='post'
                            encType='multipart/form-data'
                            className='col-sm-6 d-flex flex-column justify-content-center'>
                            <FieldArray
                                name='sprayProducts'
                                render={(arrayHelpers) => (
                                    <>
                                        <div
                                            className={`col-sm-12 ${styles.heading}`}>
                                            Basic Details
                                        </div>
                                        <div
                                            className={`col-sm-12 d-flex flex-wrap`}>
                                            <div
                                                className={`col-sm-12 w-100 ${styles.subheading}`}>
                                                Set Price
                                            </div>

                                            <div className='col-sm-12 d-flex w-100 justify-content-between gap-1'>
                                                <Field
                                                    name='basicDetails.price'
                                                    className={`col-sm-8 d-flex flex-grow-1 ${styles.input}`}
                                                    placeholder='Enter Price'
                                                />
                                                <Field
                                                    name='basicDetails.unit'
                                                    className={`col-sm-4 ${styles.input}`}
                                                    placeholder='Unit'
                                                />
                                            </div>
                                            <ErrorMessage
                                                component='div'
                                                className={`${styles.err} w-50`}
                                                name='basicDetails.price'
                                            />
                                            <ErrorMessage
                                                component='div'
                                                className={styles.err}
                                                name='basicDetails.unit'
                                            />
                                            <div
                                                className={`col-sm-12 w-100 ${styles.subheading}`}>
                                                Description
                                            </div>
                                            <div className='col-sm-12 d-flex w-100'>
                                                <Field
                                                    as='textarea'
                                                    name='basicDetails.description'
                                                    className={`col-sm-4 w-100 ${styles.input}`}
                                                    placeholder='Enter Description'
                                                />
                                            </div>
                                            <ErrorMessage
                                                component='div'
                                                className={styles.err}
                                                name='basicDetails.description'
                                            />
                                        </div>

                                        <div
                                            className={`col-sm-12 ${styles.heading}`}>
                                            Additional Information
                                        </div>

                                        <div className='col-sm-12 d-flex justify-content-between'>
                                            <div className={styles.subheading}>
                                                Spray Product
                                            </div>
                                            <button
                                                type='button'
                                                className={styles.addbtn}
                                                onClick={() =>
                                                    arrayHelpers.insert(
                                                        values.sprayProducts
                                                            .length,
                                                        {
                                                            productName: "",
                                                            productPrice: "",
                                                            qtyUnit: "",
                                                            productDescription:
                                                                "",
                                                        }
                                                    )
                                                } // insert an empty string at a position
                                            >
                                                + Add Item
                                            </button>
                                        </div>
                                        {values.sprayProducts &&
                                        values.sprayProducts.length > 0
                                            ? values.sprayProducts.map(
                                                  (product, index) => (
                                                      <div
                                                          key={index}
                                                          className={`d-flex align-items-center my-4 `}>
                                                          <div
                                                              className={`col-sm-12 w-100 ${styles.bg}`}>
                                                              <div className='col-sm-12 w-100 d-flex flex-wrap gap-1 justify-content-between'>
                                                                  <Field
                                                                      as='input'
                                                                      className={`col-md-4 ${styles.bginput}`}
                                                                      name={`sprayProducts.${index}.productName`}
                                                                      placeholder='Product Name'
                                                                  />
                                                                  <Field
                                                                      as='input'
                                                                      className={`col-md-3 ${styles.bginput}`}
                                                                      name={`sprayProducts.${index}.productPrice`}
                                                                      placeholder='Price'
                                                                  />
                                                                  <Field
                                                                      as='input'
                                                                      className={`col-md-4 ${styles.bginput}`}
                                                                      name={`sprayProducts.${index}.qtyUnit`}
                                                                      placeholder='Unit'
                                                                  />
                                                              </div>
                                                              <ErrorMessage
                                                                  component='div'
                                                                  className={
                                                                      styles.err
                                                                  }
                                                                  name={`sprayProducts.${index}.productName`}
                                                              />
                                                              <ErrorMessage
                                                                  component='div'
                                                                  className={
                                                                      styles.err
                                                                  }
                                                                  name={`sprayProducts.${index}.productPrice`}
                                                              />
                                                              <ErrorMessage
                                                                  component='div'
                                                                  className={
                                                                      styles.err
                                                                  }
                                                                  name={`sprayProducts.${index}.qtyUnit`}
                                                              />
                                                              <div className='col-sm-12 d-flex mt-2 gap-1'>
                                                                  <Field
                                                                      as='textarea'
                                                                      name={`sprayProducts.${index}.productDescription`}
                                                                      className={`col-sm-4 w-100 ${styles.bginput}`}
                                                                      placeholder='Enter Description'
                                                                  />
                                                              </div>
                                                          </div>

                                                          <div
                                                              className='m-4'
                                                              style={{
                                                                  color: "red",
                                                              }}>
                                                              <AiFillMinusCircle
                                                                  size={30}
                                                                  onClick={() =>
                                                                      arrayHelpers.remove(
                                                                          index
                                                                      )
                                                                  }
                                                              />
                                                          </div>
                                                      </div>
                                                  )
                                              )
                                            : null}

                                        <div
                                            className={`col-sm-12 ${styles.heading}`}>
                                            Crop Type
                                        </div>
                                        <div
                                            className={`col-sm-12 ${styles.subheading}`}>
                                            [ use "," as seperator ]
                                        </div>
                                        <div
                                            className={`col-sm-12 ${styles.tagcontainer}`}>
                                            {tags.map((tag, index) => (
                                                <div
                                                    className={styles.tag}
                                                    key={index}>
                                                    {tag}
                                                    <button
                                                        type='button'
                                                        onClick={() =>
                                                            deleteTag(index)
                                                        }>
                                                        <GrFormClose
                                                            style={{
                                                                color: "rgb(152,152,152)",
                                                            }}
                                                            size={20}
                                                        />
                                                    </button>
                                                </div>
                                            ))}
                                            <input
                                                className={styles.input}
                                                value={input}
                                                placeholder='Enter crop type'
                                                onKeyDown={onKeyDown}
                                                onKeyUp={onKeyUp}
                                                onChange={onChange}
                                            />
                                        </div>
                                    </>
                                )}
                            />
                        </form>
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default MyStationServicesForm;
