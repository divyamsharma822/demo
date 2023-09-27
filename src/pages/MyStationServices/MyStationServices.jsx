import React from "react";
import styles from "./MyStationServices.module.scss";
import {
    MyStationServicesForm,
    SideDrawer,
} from "../../components/KisaanStation";
import {
    useGetDroneSprayFormDataQuery,
    useGetListOfServicesQuery,
} from "../../api/KisaanStationsApi";
import { Loader } from "../../components";
import Carousel from "react-grid-carousel";
import CarousalItem from "../../components/KisaanStation/MyStation/CarousalItem/CarousalItem";

const MyStationServices = () => {
    const { data, isLoading, isFetching } = useGetListOfServicesQuery();

    const { data: formdata } = useGetDroneSprayFormDataQuery();

    if (isLoading) {
        return <Loader />;
    }

    if (isFetching) {
        return <Loader />;
    }

    const arr = [
        "/admin/KisaanStation/MyStation/Services/UpdateServices/DroneSpray",
        "/admin/KisaanStation/MyStation/Services/UpdateServices/Transport",
        "/admin/KisaanStation/MyStation/Services/UpdateServices/Storage",
        "/admin/KisaanStation/MyStation/Services/UpdateServices/ManPower",
        "/admin/KisaanStation/MyStation/Services/UpdateServices/SoilTesting",
        "/admin/KisaanStation/MyStation/Services/UpdateServices/Others",
    ];

    return (
        <div
            style={{
                height: "100vh",
                overflow: "auto",
                backgroundColor: "rgb(248,249,250)",
            }}
            className={`col p-0 m-0 ${styles.MyStationServices}`}>
            <div className='row g-0 h-100 overflow-auto'>
                <div
                    className={`col-sm-12 p-0 m-0 krishiBazaar d-flex flex-column ${styles.content}`}>
                    <div
                        className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}>
                        <SideDrawer />
                        <div>My Station &gt; Update Services</div>
                        <div>image</div>
                    </div>
                    <Carousel
                        cols={5}
                        rows={1}
                        gap={10}
                        loop
                        containerClassName={`my-3 mx-3 p-4 bg-white col-sm-auto ${styles.carousel}`}>
                        {data.map((element, index) => (
                            <Carousel.Item key={index}>
                                <CarousalItem
                                    element={element}
                                    nav={arr[index]}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    {formdata && formdata.length !== 0 && false ? (
                        <div className={`col-sm-auto ${styles.submittedbar}`}>
                            <div
                                className={`row g-0 d-flex align-items-center flex-wrap ${styles.header}`}>
                                <h1 className={`col-sm-3 ${styles.h1}`}>
                                    Drone Spraying Services
                                </h1>
                                <div
                                    className={`col-sm-9 gap-4 d-flex ${styles.buttons}`}>
                                    <button
                                        type='button'
                                        className={styles.edit}>
                                        Edit Details
                                    </button>
                                </div>
                            </div>
                            <div className={styles.hr}></div>
                            <div className='row g-0 mt-4'>
                                <div className={`col-sm-4 ${styles.heading}`}>
                                    Basic Details
                                </div>
                                <div className={`col-sm-8 d-flex flex-column`}>
                                    <div className={`col-sm-12`}>
                                        <div className={styles.subheading}>
                                            Set Price
                                        </div>
                                        <div className={styles.text}>$699</div>
                                    </div>
                                    <div className={`col-sm-12`}>
                                        <div className={styles.subheading}>
                                            Description
                                        </div>
                                        <div className={styles.text}>
                                            dfdfdfns dfnsdfsdf sdfsdn
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row g-0 mt-4'>
                                <div className={`col-sm-4 ${styles.heading}`}>
                                    Additional Information
                                </div>
                                <div
                                    className={`col-sm-8 d-flex flex-column gap-4`}>
                                    <div className={`col-sm-12`}>
                                        <div className={styles.upperheading}>
                                            Spray Product
                                        </div>
                                        <br />
                                    </div>
                                    <div className={`col-sm-12`}>
                                        <div className={styles.subheading}>
                                            Insectisides | $688/Ltr
                                        </div>
                                        <div className={styles.text}>
                                            efejbfjwf wefwejfwe fwef we fwe
                                            fwefwefewf wfwef
                                        </div>
                                        <br />
                                        <div className={styles.subhr}></div>
                                    </div>
                                    <div className={`col-sm-12`}>
                                        <div className={styles.subheading}>
                                            Insectisides | $688/Ltr
                                        </div>
                                        <div className={styles.text}>
                                            efejbfjwf wefwejfwe fwef we fwe
                                            fwefwefewf wfwef
                                        </div>
                                        <br />
                                        <div className={styles.subhr}></div>
                                    </div>
                                </div>
                            </div>

                            <div className='row g-0 mt-4'>
                                <div className={`col-sm-4 ${styles.heading}`}>
                                    Crop Type
                                </div>
                                <div className={`col-sm-8 d-flex flex-column`}>
                                    <div className={styles.text}>$699</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <MyStationServicesForm />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyStationServices;
