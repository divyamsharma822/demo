import React from "react";
import styles from "./Page2.module.scss";

const Page2 = () => {
    return (
        <div className={`d-flex flex-column ${styles.Page2}`}>
            <div className='w-100 d-flex'>
                <div className={styles.topleft}>
                    <div className={styles.heading}>Farm Details</div>
                    <div className={styles.area}>Area (In Acre) : 23</div>
                </div>
                <div className={`row g-0 ${styles.topright}`}>
                    <div className='d-flex flex-row'>
                        <div className='col-5'>Plot ID</div>
                        <div className='col-7'>
                            : &nbsp;&nbsp;&nbsp;
                            <span style={{ fontWeight: "600" }}>9834534</span>
                        </div>
                    </div>
                    <div className='d-flex flex-row'>
                        <div className='col-5'>Khata No.</div>
                        <div className='col-7'>
                            : &nbsp;&nbsp;&nbsp;
                            <span style={{ fontWeight: "600" }}>9834534</span>
                        </div>
                    </div>
                    <div className='d-flex flex-row'>
                        <div className='col-5'>Khesra No.</div>
                        <div className='col-7'>
                            : &nbsp;&nbsp;&nbsp;
                            <span style={{ fontWeight: "600" }}>9834534</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`row g-0 ${styles.middle}`}>
                {[
                    {
                        name: "Geo Coordinate",
                        val: "28.535513247  | 28.535513247",
                    },
                    {
                        name: "Land Type",
                        val: "Black Soil",
                    },
                    {
                        name: "Current Crop",
                        val: "Wheat",
                    },
                    {
                        name: "Last Crop",
                        val: "Bajra",
                    },
                    {
                        name: "Address",
                        val: "Indirapuram, Ghaziabad",
                    },
                    {
                        name: "Panchayat",
                        val: "Mathura",
                    },
                    {
                        name: "District",
                        val: "Bareilly",
                    },
                    {
                        name: "Block",
                        val: "22",
                    },
                    {
                        name: "Block",
                        val: "22",
                    },
                    {
                        name: "Pin",
                        val: "222343",
                    },
                ].map((curr, index) => (
                    <div className={`col-12 d-flex`} key={index}>
                        <div className={`col-4 ${styles.left}`}>
                            {curr.name}
                        </div>
                        <div
                            className={`col-1`}
                            style={{ fontSize: "18px", fontWeight: "500" }}>
                            :
                        </div>
                        <div className={`col-7 ${styles.right}`}>
                            {curr.val}
                        </div>
                    </div>
                ))}
            </div>
            <div className={`${styles.bottom}`}>
                <div className={styles.head}>Location</div>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tr}>
                            <th className={styles.th}>Label</th>
                            <th className={styles.th}>Title</th>
                            <th className={styles.th}>Elevation</th>
                            <th
                                className={styles.th}
                                style={{ textAlign: "right" }}>
                                Coordinates
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            {
                                title: "Less Vegetation",
                                elevation: "264.23 ft",
                                coordinates: "28.535513247 , 28.535513247",
                            },
                            {
                                title: "Patlidar Agro",
                                elevation: "264.23 ft",
                                coordinates: "28.535513247 , 28.535513247",
                            },
                            {
                                title: "Potential Less Growth",
                                elevation: "264.23 ft",
                                coordinates: "28.535513247 , 28.535513247",
                            },
                            {
                                title: "Potential Stress",
                                elevation: "264.23 ft",
                                coordinates: "28.535513247 , 28.535513247",
                            },
                        ].map((curr, index) => (
                            <tr key={index}>
                                <td className={styles.td}>{index + 1}.</td>
                                <td className={styles.td}>{curr.title}</td>
                                <td className={styles.td}>{curr.elevation}</td>
                                <td
                                    className={styles.td}
                                    style={{ textAlign: "right" }}>
                                    {curr.coordinates}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={`${styles.bottom}`}>
                <div className={styles.head}>Area</div>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tr}>
                            <th className={styles.th}>Label</th>
                            <th className={styles.th}>Title</th>
                            <th className={styles.th}>Area</th>
                            <th
                                className={styles.th}
                                style={{ textAlign: "right" }}>
                                Surface Area
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            {
                                title: "No Crop/ Less Crop",
                                elevation: "2964.23 ft2",
                                coordinates: "1.40 Acres",
                            },
                        ].map((curr, index) => (
                            <tr key={index}>
                                <td className={styles.td}>{index + 1}.</td>
                                <td className={styles.td}>{curr.title}</td>
                                <td className={styles.td}>{curr.elevation}</td>
                                <td
                                    className={styles.td}
                                    style={{ textAlign: "right" }}>
                                    {curr.coordinates}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page2;
