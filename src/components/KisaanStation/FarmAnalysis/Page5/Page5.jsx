import React from "react";
import styles from "./Page5.module.scss";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

const Page5 = () => {
    const barColors = [
        "#E26B26",
        "#CE9141",
        "#FAA326",
        "#563F1F",
        "#AECD31",
        "#E71292",
    ];
    const macroNutrients = [
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
    ];
    const microNutrients = [
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
    ];

    return (
        <div className={`d-flex flex-column ${styles.Page5}`}>
            <div className={styles.heading}>Soil Details</div>
            <div className='row g-0'>
                <div className={styles.left}>
                    <div className='d-flex flex-column'>
                        <div className={styles.head}>Soil Type :</div>
                        <div className={styles.soilType}>Clay + Loam</div>
                    </div>
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                        <svg
                            width='40'
                            height='40'
                            viewBox='0 0 32 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M15.7862 0C7.08233 0 0 7.08198 0 15.7862V19.1097C0 21.4008 1.86441 23.2635 4.1544 23.2635H27.4182C29.7079 23.2635 31.5723 21.4008 31.5723 19.1094V15.7859C31.5723 7.08205 24.4901 0.000427599 15.7861 0.000427599L15.7862 0ZM29.9103 19.1091C29.9103 20.4834 28.792 21.6016 27.4178 21.6016H4.15468C2.78045 21.6016 1.66216 20.4834 1.66216 19.1091V16.6166H4.15468C4.61341 16.6166 4.98562 16.2444 4.98562 15.7857C4.98534 15.3272 4.61313 14.955 4.15468 14.955H1.7036C1.89472 11.6864 3.19577 8.72035 5.24292 6.41918L6.88977 8.06439C7.05251 8.22713 7.26531 8.30835 7.47785 8.30835C7.69066 8.30835 7.90319 8.22685 8.0662 8.06578C8.39029 7.7417 8.39029 7.21512 8.0662 6.89102L6.41936 5.24581C8.72074 3.19866 11.6868 1.89593 14.9552 1.70479V4.15423C14.9552 4.61295 15.3274 4.98516 15.7861 4.98516C16.2448 4.98516 16.6171 4.61295 16.6171 4.15423V1.70315C19.8857 1.89426 22.8517 3.19532 25.1529 5.24417L23.506 6.88938C23.182 7.21347 23.182 7.74004 23.506 8.06414C23.6688 8.22716 23.8816 8.30839 24.0944 8.30839C24.3072 8.30839 24.5197 8.22688 24.6828 8.06582L26.3296 6.42061C28.5495 8.91648 29.9124 12.1915 29.9124 15.7875L29.9118 19.1093L29.9103 19.1091Z'
                                fill='#563E1F'
                            />
                            <path
                                d='M25.6188 13.3061L19.6517 14.3015C19.052 12.7445 17.5498 11.6328 15.785 11.6328C13.4953 11.6328 11.6309 13.4955 11.6309 15.7869C11.6309 18.0786 13.4953 19.9413 15.785 19.9413C18.0233 19.9413 19.8412 18.1601 19.9243 15.9399L25.8914 14.9445C26.3434 14.8697 26.6508 14.441 26.5743 13.989C26.4995 13.5352 26.0691 13.2295 25.6188 13.306L25.6188 13.3061ZM15.7847 18.2795C14.4105 18.2795 13.2922 17.1612 13.2922 15.7869C13.2922 14.4127 14.4105 13.2944 15.7847 13.2944C17.0193 13.2944 18.0396 14.1982 18.2358 15.3783C18.2591 15.5129 18.2772 15.6476 18.2772 15.7869C18.2772 17.1612 17.1589 18.2795 15.7847 18.2795L15.7847 18.2795Z'
                                fill='#563E1F'
                            />
                        </svg>
                        <div className={styles.ph}>6.7%</div>
                        <div className={styles.phHeading}>Soil pH</div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.head}>Soil Treatment :</div>
                    <div className='d-flex justify-content-around gap-2'>
                        <div className='d-flex flex-column align-items-center'>
                            <div className={styles.val}>8%</div>
                            <div className={styles.info}>Organic Matter</div>
                        </div>
                        <div className='d-flex flex-column align-items-center'>
                            <div className={styles.val}>
                                1244{" "}
                                <span
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "500",
                                    }}>
                                    µS/cm
                                </span>
                            </div>
                            <div className={styles.info}>Salt Content (EC)</div>
                        </div>
                        <div className='d-flex flex-column align-items-center'>
                            <div className={styles.val}>
                                578{" "}
                                <span
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "500",
                                    }}>
                                    meq/100g
                                </span>
                            </div>
                            <div className={styles.info}>CEC</div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`row g-0 d-flex justify-content-center ${styles.formWrapper}`}>
                {/* TextFields */}
                <div className='col-12' style={{ maxWidth: "500px" }}>
                    <div className={styles.heading}>Macro Nutrients</div>
                    <BarChart data={macroNutrients} height={250} width={440}>
                        <XAxis dataKey='name' dy={10} />
                        <YAxis tickFormatter={(tick) => `${tick}%`} dx={-10} />
                        <Tooltip
                            itemStyle={{
                                backgroundColor: "#a0a0a064",
                                padding: "5px",
                                borderRadius: "4px",
                            }}
                        />
                        <Bar
                            dataKey='amt'
                            radius={[5, 5, 5, 5]}
                            barSize={35}
                            isAnimationActive={false}>
                            {macroNutrients.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={barColors[index]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                    {/* </ResponsiveContainer> */}
                </div>
                <div className='col-12' style={{ maxWidth: "500px" }}>
                    <div className={styles.heading}>Micro Nutrients</div>
                    {/* <ResponsiveContainer width='100%' height={250}> */}
                    <BarChart data={microNutrients} height={250} width={440}>
                        <XAxis dataKey='name' dy={10} />
                        <YAxis tickFormatter={(tick) => `${tick}%`} dx={-10} />
                        <Tooltip
                            itemStyle={{
                                backgroundColor: "#a0a0a064",
                                padding: "5px",
                                borderRadius: "4px",
                            }}
                        />
                        <Bar
                            dataKey='amt'
                            radius={[5, 5, 5, 5]}
                            barSize={35}
                            isAnimationActive={false}>
                            {microNutrients.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={barColors[index]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                    {/* </ResponsiveContainer> */}
                </div>
            </div>
            <div style={{ color: "#828282", marginTop: "30px" }}>
                Soil Health is calculated on the amount of rich growth promoting
                minerals and nutritions and the moisture content .
            </div>
        </div>
    );
};

export default Page5;
