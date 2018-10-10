/*global google*/

import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import { connect } from 'react-redux';
import { compose, withStateHandlers, withProps } from 'recompose';
import {
  updateMapBounds,
  updateMapCenterForFetchingRestaurants
} from '../../store/actions';
import Carousel from './Carousel/Carousel';
const userMarker = require('./../../img/user.png');
// const restaurantMarker = require("./../../img/restaurant.png");

// Using compose from 'recompose' to combine all HOC into one.
const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `calc(100vh - 180px)` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withStateHandlers(
    () => ({
      infoBoxShown: false, // if true, a InfoWindow will be shown, displaying informations of the current restaurant.
      currentRestaurant: {},
      map: undefined, // boundaries of the map. Used to filter the restaurant in bounds.
      restaurantsInBounds: []
    }),
    {
      onToggleOpen: props => restaurant => ({
        // this is a method, when user click on a marker, it will change the infoBoxShown to true, so display the InfoWindow related to the restaurant.
        infoBoxShown: true,
        // user clicks on a marker, the currentRestaurant will be set to the corresponding restaurant. And based on this currentRestaurant, we will have the infomation to display inside the InfoWindow.
        currentRestaurant: restaurant
      }),
      closeInfoWindow: props => () => ({
        // InfoWindow component has a close X  button. When use clicks on that. The InfoWindow will disappear
        infoBoxShown: false
      }),
      onMapMounted: props => ref => {
        return {
          map: ref
        };
      },
      onRightClick: props => e => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        console.log({
          lat,
          lng
        });
      }
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => {
  const markers = props.restaurantsInRange.map(restaurant => {
    const animation =
      restaurant.place_id === props.mapCenter.place_id
        ? google.maps.Animation.BOUNCE
        : null;

    const { place_id, rating } = restaurant;
    const { location } = restaurant.geometry;

    return (
      <Marker
        key={place_id}
        label={{
          text: '' + rating,
          color: 'black',
          fontSize: '16px'
        }}
        position={location}
        onClick={() => {
          props.onToggleOpen(restaurant);
        }}
        animation={animation}
      />
    );
  });

  const { userPos, map, currentRestaurant } = props;

  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={userPos}
      center={props.mapCenter.coords}
      ref={ref => {
        props.onMapMounted(ref);
      }}
      onCenterChanged={() => {
        let bounds = map.getBounds();
        props.updateMapBounds(bounds);

        if (map) {
          props.updateMapCenterForFetchingRestaurants(map.getCenter());
        }
      }}
      onZoomChanged={() => {
        let bounds = map.getBounds();
        props.updateMapBounds(bounds);
        if (map) {
          props.updateMapCenterForFetchingRestaurants(map.getCenter());
        }
      }}
      onTilesLoaded={() => {
        // When map get mounted successfully, we get the map bounds.
        if (map) {
          let bounds = map.getBounds();
          props.updateMapBounds(bounds);
          props.updateMapCenterForFetchingRestaurants(map.getCenter());
        }
      }}
      onRightClick={e => {
        props.onRightClick(e);
      }}
    >
      <Marker
        title={'current position...'}
        icon={userMarker}
        position={userPos}
        zIndex={121}
        animation={google.maps.Animation.BOUNCE}
      />

      {markers}

      {props.infoBoxShown && (
        <InfoWindow
          defaultPosition={userPos}
          position={currentRestaurant.geometry.location}
          onCloseClick={() => {
            props.closeInfoWindow();
          }}
        >
          <div style={{ maxWidth: 300 }}>
            <h3>{currentRestaurant.name}</h3>
            <p>{currentRestaurant.formatted_address}</p>
            <a href={`tel:${currentRestaurant.formatted_phone_number}`}>
              {currentRestaurant.formatted_phone_number}
            </a>{' '}
            <br />
            <Carousel
              restaurantName={currentRestaurant.name}
              allPhotos={currentRestaurant.photos}
            />
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
});

const mapState = state => {
  return {
    restaurantsInRange: state.restaurantsInRange,
    userPos: state.userPos,
    mapCenter: state.mapCenter,
    mapCenterForFetchingRestaurants: state.mapCenterForFetchingRestaurants
  };
};

const mapDispatch = dispatch => {
  return {
    updateMapBounds: bounds => {
      dispatch(updateMapBounds(bounds));
    },
    updateMapCenterForFetchingRestaurants: center => {
      dispatch(updateMapCenterForFetchingRestaurants(center));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(MyMapComponent);