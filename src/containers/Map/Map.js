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

import { searchNearby } from '../../utils/googleApiHelper';
const userMarker = require('./../../img/user.png');

// Using compose from 'recompose' to combine all HOC into one.
const MyMapComponent = compose(
  withProps({
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
  }),
  withStateHandlers(
    () => ({
      infoBoxShown: false,
      currentRestaurant: {},
      map: undefined
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
      onMapMounted: () => ref => {
        return {
          map: ref
        };
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
          text: parseFloat(rating).toFixed(1),
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
      defaultZoom={16}
      defaultCenter={userPos}
      center={props.mapCenter.coords}
      ref={props.onMapMounted}
      onCenterChanged={() => {
        let bounds = map.getBounds();
        props.updateMapBounds(bounds);
        // @TODO: we can use google places library here to fetch data

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
        if (map) {
          let bounds = map.getBounds();
          props.updateMapBounds(bounds);
          let center = map.getCenter();
          const mapObj =
            map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

          searchNearby(google, mapObj, {
            location: center,
            type: ['restaurant'],
            bounds: bounds
          }).then((results, pagination) => {
            let restaurantIDs = results.map(restaurant => restaurant.place_id);
            props.saveRestaurantIDs(restaurantIDs);

            restaurantIDs.forEach(ID => {
              fetch(
                `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${ID}&fields=name,rating,formatted_phone_number,formatted_address,photos,geometry,place_id,reviews&key=AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs`
              )
                .then(response => response.json())
                .then(data => data.result)
                .then(result => {
                  const {
                    formatted_address,
                    formatted_phone_number,
                    photos,
                    geometry,
                    name,
                    place_id,
                    rating,
                    reviews
                  } = result;

                  // if true, then user can add new review to this restaurant.
                  let reviewAddable = true;

                  const restaurant = {
                    formatted_address,
                    photos,
                    formatted_phone_number,
                    geometry,
                    name,
                    place_id,
                    rating,
                    reviewAddable
                  };

                  // save Restaurants
                  props.saveRestaurant(restaurant);

                  // save Reviews in another place (flatten rootReducer)
                  props.saveReviews(place_id, reviews);
                  // by default, it will take all
                  props.filterRestaurants(props.filterObject, map.getBounds());
                });
            });
          });
        }
      }}
      onRightClick={e => {
        props.toggleAddRestaurantForm();

        let location = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        };
        props.getNewRestaurantLocation(location);
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
          <div
            style={{
              maxWidth: 300
            }}
          >
            <h3> {currentRestaurant.name} </h3>{' '}
            <p> {currentRestaurant.formatted_address} </p>{' '}
            <a href={`tel:${currentRestaurant.formatted_phone_number}`}>
              {' '}
              {currentRestaurant.formatted_phone_number}{' '}
            </a>{' '}
            <br />
            <Carousel
              restaurantName={currentRestaurant.name}
              allPhotos={currentRestaurant.photos}
            />{' '}
          </div>{' '}
        </InfoWindow>
      )}{' '}
    </GoogleMap>
  );
});

const mapState = state => {
  return {
    restaurantsInRange: state.restaurantsInRange,
    userPos: state.userPos,
    mapCenter: state.mapCenter,
    mapBounds: state.mapBounds,
    filterObject: state.filterObject
  };
};

const mapDispatch = dispatch => {
  return {
    updateMapBounds: bounds => {
      dispatch(updateMapBounds(bounds));
    },
    updateMapCenterForFetchingRestaurants: center => {
      dispatch(updateMapCenterForFetchingRestaurants(center));
    },
    toggleAddRestaurantForm: () => {
      dispatch(toggleAddRestaurantForm());
    },
    getNewRestaurantLocation: location => {
      dispatch(getNewRestaurantLocation(location));
    },
    saveReviews: (place_id, reviews) => {
      dispatch(saveReviews(place_id, reviews));
    },
    saveRestaurant: restaurant => {
      dispatch(saveRestaurant(restaurant));
    },
    filterRestaurants: (filterObj, bounds) => {
      dispatch(filterRestaurants(filterObj, bounds));
    },
    saveRestaurantIDs: IDs => {
      dispatch(saveRestaurantIDs(IDs));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(MyMapComponent);
