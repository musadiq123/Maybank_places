import './App.css';
import { AutoComplete, Col, Input, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import MapView from './component/MapView';
import { PageContainer } from '@ant-design/pro-components';
import { connect } from 'react-redux';
import { addPlaces, removePlaces } from './redux/places/actions';


let DEFAULT_OPTIONS = []


const App = ({ places, addPlaces, removePlaces }) => {
  const API_KEY = "AIzaSyAX5xXsDunAhn09Wac_LSRRiYOe6_h-hE8"
  const [address, setAddress] = useState("")
  const defaultProps = {
    center: {
      lat: 3.057818,
      lng: 101.586685
    },
    zoom: 15
  };

  useEffect(() => {
    getPlaces()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  const getPlaces = async () => {
    var config = {
      method: 'get',
      url: `/autocomplete/json?input=${address}&types=geocode&key=${API_KEY}`,
      headers: {},
      secure: false
    };

    await axios(config)
      .then(function (response) {
        if (response?.data?.predictions) {
          DEFAULT_OPTIONS = []
          response?.data?.predictions.map((item) => {
            DEFAULT_OPTIONS.push({
              label: item.description,
              value: item.description
            })

          })
          // result.length > 0 && addPlaces(result)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleAddressChange = (address) => {
    setAddress(address)
  }

  const handleSelect = (select, data) => {
    removePlaces()
    addPlaces(data)
  }

  return (
    <PageContainer
      title={"Google Map Places"}
      style={{ fontWeight: "400", alignItems: 'center', display: 'flex', flexDirection: 'column' }}
    >
      <Row gutter={24} style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <Col xl={18} lg={12} md={12} sm={24} xs={24} style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <AutoComplete
            style={{ width: 500, }}
            options={DEFAULT_OPTIONS}
            onChange={handleAddressChange}
            // placeholder="Search here"
            onSelect={handleSelect}
            filterOption={(inputValue, option) =>
              inputValue && option && option?.value?.toUpperCase().indexOf(inputValue?.toUpperCase()) !== -1
            }
          >
            <Input.Search size="large" placeholder="Search here" enterButton />
          </AutoComplete>

          <MapView loading={false} defaultProps={defaultProps} API_KEY={API_KEY} />

          {/* <div>
            <Typography style={{ color: "blue" }}>{place && place.length > 0 && place[0].label}</Typography>
          </div> */}
        </Col>
      </Row>
    </PageContainer>

  );

}

const mapStateToProps = (state) => {
  return {
    places: state.places.allPlaces
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addPlaces: (places) => {
      dispatch(addPlaces(places))
    },
    removePlaces: (places) => {
      dispatch(removePlaces(places))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
