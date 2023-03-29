import './App.css';
import { AutoComplete, Input, Layout } from 'antd';
import React, { useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useEffect } from 'react';
import axios from 'axios';
import PlacesAutocomplete, { getLatLng, geocodeByAddress } from "react-places-autocomplete";

const DEFAULT_OPTIONS = [{
  label: "kuala Lumpur",
  value: "kuala Lumpur"
},
{
  label: "kuala Lumpur 1",
  value: "kuala Lumpur 1"
}]
const AnyReactComponent = ({ text }) => <div>{text}</div>;


const center = {
  lat: 3.057818,
  lng: 101.586685
}

function App() {
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [address, setAddress] = useState(null)
  const defaultProps = {
    center: {
      lat: 3.057818,
      lng: 101.586685
    },
    zoom: 15
  };
  useEffect(() => {
    setOptions(DEFAULT_OPTIONS)
  }, [])

  const handleApiLoaded = (map, maps) => {
    console.log("map:", map)
    console.log("maps:", maps)

  };

  useEffect(() => {
    var config = {
      method: 'get',
      url: `http://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&types=geocode&key=AIzaSyB2MHgsfNv6Gb1Cox4FJgWexogaYv62Wg0`,
      headers: {}
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [address])

  const handleAddressChange = (address) => {
    console.log("handle", address)
    setAddress(address)
    console.log(address)
  }

  const handleSelect = (address) => {
    setAddress(address)
    geocodeByAddress(address)
      .then(results => { getLatLng(results[0]) })
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  return (
    <div className="App" style={{ marginLeft: 100, marginTop: 100, textAlign: 'left' }} >
      Location:
      <PlacesAutocomplete onChange={handleAddressChange} onSelect={handleSelect} value={address}>
        {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
          <React.Fragment>
            <Input
              {...getInputProps({
                id: "address-input"
              })}
            />
            <div className="autocomplete-dropdown-container">
              {suggestions.map((suggestion) => {
                const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer", padding: 25 }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };

                const spread = {
                  ...getSuggestionItemProps(suggestion, {
                    className,
                    style
                  })
                };

                return (
                  <div {...spread} key={suggestion.id}>
                    <div>{suggestion.description}</div>
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        )}
      </PlacesAutocomplete>
      <div style={{ margin: 30, height: 400 }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "API key" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          // style={{ width: 20, height: 200 }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >

          <AnyReactComponent
            lat={3.057818}
            lng={101.586685}
            text="My Marker"
          />
        </GoogleMapReact>

      </div>
    </div>
  );

}

export default App;
