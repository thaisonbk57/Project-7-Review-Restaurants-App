/*global google*/

import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import {connect} from 'react-redux';
import {compose, withStateHandlers} from 'recompose';
import {InfoBox} from 'react-google-maps/lib/components/addons/InfoBox';
const userMarker= require("./../../img/user.png");
const restaurantMarker = require("./../../img/restaurant.png");


const MyMapComponent = compose(
    withStateHandlers(()=> ({
      infoBoxShown: false,
      currentRestaurant: {}
    }), {
      onToggleOpen: (props) => (restaurant) => ({
        infoBoxShown: true,
        currentRestaurant: restaurant
      }),
      closeInfoWindow: (props) => () => ({
        infoBoxShown: false
      })
    }),
    withScriptjs, 
    withGoogleMap
  )(props => {
    const markers = props.restaurantsInRange.map(restaurant => {
      return <Marker 
        key={restaurant.place_id}
        label={{
          text: ''+ restaurant.rating,
          color: "orangered",
          fontSize: "16px"
        }} 
        position={restaurant.geometry.location} 
        icon={restaurantMarker}
        onMouseOver={() => {props.onToggleOpen(restaurant)}}
        /* onMouseOut={()=> {props.closeInfoWindow()}} */ />
  });
  
  return (
    <GoogleMap defaultZoom={14} defaultCenter={props.userPos}>
        <Marker title={"current position..."} icon={userMarker} position={props.userPos} zIndex={121} animation={google.maps.Animation.BOUNCE}>
        </Marker>
        {markers}
        {props.infoBoxShown && <InfoWindow defaultPosition={props.userPos} position={props.currentRestaurant.geometry.location}  
        onCloseClick={() => {props.closeInfoWindow()}} >
          <div>
            <h3>{props.currentRestaurant.name}</h3>
            <p>{props.currentRestaurant.formatted_address}</p>
          </div>
        </InfoWindow>}
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
