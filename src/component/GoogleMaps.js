import React, { useEffect } from "react";
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = (props) => <div {...props}><img src="/public/logo192.png" alt="marker" /></div>;


export default function GoogleMaps(API_KEY, markerData) {
    let defaultProps = {
        center: {
            lat: 3.1319197,
            lng: 101.6840589
        },
        zoom: 13
    };
    useEffect(() => {
        if (markerData.lat) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            defaultProps = {
                center: {
                    lat: markerData.lat,
                    lng: markerData.lng
                },
                zoom: 13
            }
        }
    }, [markerData])

    return (
        <div style={{ height: '80vh', width: '180vh' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                resetBoundsOnResize
                yesIWantToUseGoogleMapApiInternals
            >
                {markerData.lat &&
                    <AnyReactComponent
                        lat={markerData.lat}
                        lng={markerData.lng}
                    />}
            </GoogleMapReact>
        </div>
    );
}