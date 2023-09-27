import React, { useState } from "react";
import styles from "./Section5.module.scss";

import { BiEditAlt } from "react-icons/bi";
import { Form, Formik } from "formik";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
    ResponsiveContainer,
} from "recharts";

const Section5 = () => {
    const [editable, setEditable] = useState(false);
    const barColors = [
        "#E26B26",
        "#CE9141",
        "#FAA326",
        "#563F1F",
        "#AECD31",
        "#E71292",
    ];

    return (
        <>
            <Formik
                initialValues={{
                    macroNutrients: [
                        {
                            name: "N",
                            amt: 90,
                        },
                        {
                            name: "P",
                            amt: 85,
                        },
                        {
                            name: "K",
                            amt: 95,
                        },
                        {
                            name: "S",
                            amt: 60,
                        },
                        {
                            name: "Mg",
                            amt: 34,
                        },
                        {
                            name: "Ca",
                            amt: 12,
                        },
                    ],
                    microNutrients: [
                        {
                            name: "Fe",
                            amt: 90,
                        },
                        {
                            name: "Mo",
                            amt: 85,
                        },
                        {
                            name: "B",
                            amt: 95,
                        },
                        {
                            name: "Zn",
                            amt: 60,
                        },
                        {
                            name: "Mg",
                            amt: 34,
                        },
                        {
                            name: "Cu",
                            amt: 12,
                        },
                    ],
                }}
                onSubmit={(values, actions) => {
                    setEditable(!editable);
                    actions.setSubmitting(false);
                }}>
                {(props) => (
                    <Form>
                        <div
                            className={`col-sm-auto Section5 ${styles.Section5}`}
                            style={{
                                cursor: props.isSubmitting ? "wait" : "auto",
                            }}>
                            {/* header */}
                            <div
                                className={`d-flex justify-content-between flex-row ${styles.header}`}>
                                <div className={`${styles.heading}`}>
                                    5. Crop Info
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
                                    className='col-md-5'
                                    style={{ maxWidth: "500px" }}>
                                    <ResponsiveContainer
                                        width='100%'
                                        height={300}>
                                        <BarChart
                                            data={props.values.macroNutrients}>
                                            <XAxis dataKey='name' dy={10} />
                                            <YAxis
                                                tickFormatter={(tick) =>
                                                    `${tick}%`
                                                }
                                                dx={-10}
                                            />
                                            <Tooltip
                                                itemStyle={{
                                                    backgroundColor:
                                                        "#a0a0a064",
                                                    padding: "5px",
                                                    borderRadius: "4px",
                                                }}
                                            />
                                            <Bar
                                                dataKey='amt'
                                                radius={[5, 5, 5, 5]}
                                                barSize={
                                                    window.innerWidth > 768
                                                        ? 30
                                                        : 20
                                                }>
                                                {props.values.macroNutrients.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={
                                                                barColors[index]
                                                            }
                                                        />
                                                    )
                                                )}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                    <div className={styles.heading}>
                                        Macro Nutrients
                                    </div>
                                </div>
                                <div
                                    className='col-md-5'
                                    style={{ maxWidth: "500px" }}>
                                    <ResponsiveContainer
                                        width='100%'
                                        height={300}>
                                        <BarChart
                                            data={props.values.macroNutrients}>
                                            <XAxis dataKey='name' dy={10} />
                                            <YAxis
                                                tickFormatter={(tick) =>
                                                    `${tick}%`
                                                }
                                                dx={-10}
                                            />
                                            <Tooltip
                                                itemStyle={{
                                                    backgroundColor:
                                                        "#a0a0a064",
                                                    padding: "5px",
                                                    borderRadius: "4px",
                                                }}
                                            />
                                            <Bar
                                                dataKey='amt'
                                                radius={[5, 5, 5, 5]}
                                                barSize={
                                                    window.innerWidth > 768
                                                        ? 30
                                                        : 20
                                                }>
                                                {props.values.macroNutrients.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={
                                                                barColors[index]
                                                            }
                                                        />
                                                    )
                                                )}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                    <div className={styles.heading}>
                                        Micro Nutrients
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Section5;
