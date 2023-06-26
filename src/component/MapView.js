

import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
} from '@react-google-maps/api'
import { useState } from 'react'

const center = { lat: 48.8584, lng: 2.2945 }

function MapView(defaultProps, API_KEY) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        libraries: ['places'],
    })

    const [map, setMap] = useState(/** @type google.maps.Map */(null))

    if (!isLoaded) {
        return <>loading</>
    }



    return (
        <div style={{ width: 800, height: 500, marginTop: 10, justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <GoogleMap
                center={defaultProps.center}
                yesIWantToUseGoogleMapApiInternals
                resetBoundsOnResize
                mapContainerStyle={{ width: 800, height: 500 }}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
                onLoad={map => setMap(map)}
            >
                <Marker position={defaultProps.center} />
            </GoogleMap>

        </div>
    )
}

export default MapView
