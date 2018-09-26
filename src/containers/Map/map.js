/*global google*/

import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import {connect} from 'react-redux';
import {compose} from 'recompose';
const userMarker= require("./../../img/user.png");
const restaurantMarker = require("./../../img/restaurant.png");

const MyMapComponent = compose(
    withScriptjs, 
    withGoogleMap
  )(props => {

    const markers = props.restaurantsInRange.map(restaurant => {
      return <Marker position={restaurant.geometry.location} icon={restaurantMarker} />
  });
  
  return (
    <GoogleMap defaultZoom={13} defaultCenter={props.userPos}>
        <Marker icon={userMarker} position={props.userPos} zIndex={121} animation={google.maps.Animation.BOUNCE} />
        {markers}
    </GoogleMap>
  )
})

const mapState = state => {
  return {
    restaurantsInRange: state.restaurantsInRange,
    userPos: state.userPos
  }
};

const mapDispatch = dispatch => {
  return {

  }
};

export default connect(mapState, mapDispatch)(MyMapComponent);
