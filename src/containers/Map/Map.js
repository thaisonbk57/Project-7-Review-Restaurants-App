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
import { updateMapBounds } from '../../store/actions';
import Carousel from './Carousel/Carousel';
import {
  toggleAddRestaurantForm,
  getNewRestaurantLocation,
  saveRestaurantIDs,
  filterRestaurants,
  saveRestaurant,
  saveReviews,
  saveUserPosition
} from '../../store/actions';

import { searchNearby } from '../../utils/googleApiHelper';
import { mapStyles } from './MapStyles';
const userMarker = require('./../../img/user.png');

class MyMapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoBoxShown: false,
      currentRestaurant: {}
    };
    this.map = undefined;
  }

  onMapMounted = ref => {
    this.map = ref;
  };

  onToggleOpen = restaurant => {
    this.setState({
      infoBoxShown: true,
      currentRestaurant: restaurant
    });
  };

  closeInfoWindow = () => {
    this.setState({
      infoBoxShown: false
    });
  };

  loadData() {
    const map = this.map;
    if (map) {
      let center = map.getCenter() ? map.getCenter() : this.props.userPos;
      const mapObj = map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

      let zoom = map.getZoom();
      // variate the radius based on the zoom of the map
      let radius = 1000;
      switch (zoom) {
        case 16:
          radius = 500;
          break;
        case 17:
          radius = 300;
          break;
        case 18:
          radius = 200;
          break;
        default:
          radius = 500;
      }

      searchNearby(google, mapObj, {
        location: center,
        type: ['restaurant'],
        radius
      }).then((results, pagination) => {
        let restaurantIDs = results.map(restaurant => restaurant.place_id);
        this.props.saveRestaurantIDs(restaurantIDs);

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
              this.props.saveRestaurant(restaurant);

              // save Reviews in another place (flatten rootReducer)
              this.props.saveReviews(place_id, reviews);
              // by default, it will take all
              this.props.filterRestaurants(
                this.props.filterObject,
                map.getBounds()
              );
            });
        });
      });
    }
  }

  componentDidMount() {
    const option = {
      enableHighAccuracy: true,
      maximunAge: 30000,
      timeout: 30000
    };
    const err = () => {
      window.alert('Oops. Something went wrong!');
    };
    if (window.navigator.geolocation) {
      /* Geolocation is supported */
      window.navigator.geolocation.getCurrentPosition(
        position => {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
          let pos = {
            lat: lat,
            lng: lng
          };
          this.props.saveUserPos(pos);
          this.loadData();
        },
        err,
        option
      );
    } else {
      /* Geolocation not supported. */
      window.alert('Your device is not supported.');
    }
  }

  render() {
    const markers = this.props.restaurantsInRange.map(restaurant => {
      const animation =
        restaurant.place_id === this.props.mapCenter.place_id
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
            this.onToggleOpen(restaurant);
          }}
          animation={animation}
        />
      );
    });

    const { currentRestaurant } = this.state;
    const { userPos } = this.props;
    const map = this.map;

    return (
      <GoogleMap
        defaultZoom={17}
        defaultCenter={userPos}
        defaultOptions={{
          fullscreenControl: false,
          mapTypeControl: false,
          maxZoom: 18,
          minZoom: 16,
          styles: mapStyles
        }}
        center={this.props.mapCenter.coords}
        ref={this.onMapMounted}
        onCenterChanged={() => {
          let bounds = map.getBounds();
          this.props.updateMapBounds(bounds);
        }}
        onZoomChanged={() => {
          let bounds = map.getBounds();
          this.props.updateMapBounds(bounds);
        }}
        onRightClick={e => {
          this.props.toggleAddRestaurantForm();
          let location = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          };
          this.props.getNewRestaurantLocation(location);
        }}
        onTilesLoaded={() => {
          if (map) {
            let bounds = map.getBounds();
            this.props.updateMapBounds(bounds);
          }
        }}
        onDragEnd={() => {
          this.loadData();
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
        {this.state.infoBoxShown && (
          <InfoWindow
            defaultPosition={userPos}
            position={currentRestaurant.geometry.location}
            onCloseClick={() => {
              this.closeInfoWindow();
            }}
          >
            <div
              style={{
                maxWidth: 300,
                margin: 'auto'
              }}
            >
              <h3> {currentRestaurant.name} </h3>
              <p> {currentRestaurant.formatted_address} </p>
              <a
                className="d-block my-1"
                href={`tel:${currentRestaurant.formatted_phone_number}`}
              >
                {currentRestaurant.formatted_phone_number}
              </a>
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
  }
}

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
    },
    saveUserPos: pos => {
      dispatch(saveUserPosition(pos));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(withScriptjs(withGoogleMap(MyMapComponent)));
