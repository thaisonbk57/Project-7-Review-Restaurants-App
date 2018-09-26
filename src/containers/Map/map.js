/*global google*/

import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import {connect} from 'react-redux';
import {compose, withProps, withStateHandlers} from 'recompose';
import {InfoBox} from 'react-google-maps/lib/components/addons/InfoBox';
const userMarker= require("./../../img/user.png");
const restaurantMarker = require("./../../img/restaurant.png");


const MyMapComponent = compose(
    withScriptjs, 
    withGoogleMap,
    withStateHandlers(()=> ({
      infoBoxShown: false,
    }), {
      onToggleOpen: ({infoBoxShown}) => () => ({
        infoBoxShown: !infoBoxShown,
      })
    })
  )(props => {

    const markers = props.restaurantsInRange.map(restaurant => {
      return <Marker 
        label={{
          text: ''+ restaurant.rating,
          color: "orangered",
          fontSize: "16px"
        }} 
        position={restaurant.geometry.location} 
        icon={restaurantMarker}
        onClick={() => {console.log(props); props.onToggleOpen()}}
        >
          {props.infoBoxShown && <InfoBox visible={false}>
            <div>{restaurant.name}</div>
          </InfoBox>}
        </Marker>
  });
  
  return (
    <GoogleMap defaultZoom={13} defaultCenter={props.userPos}>
        <Marker title={"current position..."} icon={userMarker} position={props.userPos} zIndex={121} animation={google.maps.Animation.BOUNCE} />
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
