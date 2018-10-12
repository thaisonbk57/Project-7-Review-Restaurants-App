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
import {
  toggleAddRestaurantForm,
  getNewRestaurantLocation,
  saveRestaurantIDs,
  filterRestaurants,
  saveRestaurant,
  saveReviews
} from './../../store/actions';

import { searchNearby, getPlaceDetails } from '../../utils/googleApiHelper';
const userMarker = require('./../../img/user.png');

export default class MyMapComponent extends React.Component {}

MyMapComponent.defaultProps = {
  googleMapURL:
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs&v=3.exp&libraries=geometry,drawing,places',
  loadingElement: (
    <div
      style={{
        height: `100%`
      }}
    />
  ),
  containerElement: (
    <div
      style={{
        height: `calc(100vh - 180px)`
      }}
    />
  ),
  mapElement: (
    <div
      style={{
        height: `100%`
      }}
    />
  )
};
