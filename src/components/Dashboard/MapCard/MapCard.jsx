import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MapCard = () => {
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627,
        },
        zoom: 11,
    };

    return (
        <div className='flex flex-col rounded-md dashboard-card-shadow p-4 gap-2 mt-3'>
            <div className='flex justify-between w-full mb-3'>
                <div className='text-lg text-brown font-bold'>Kisan Station Locations</div>
            </div>
            <div className='h-[300px] w-full'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}>
                    <AnyReactComponent
                        lat={30.4048233}
                        lng={78.0765924}
                        text='My Marker'
                    />
                </GoogleMapReact>
            </div>
        </div>
    );
};

export default MapCard;
