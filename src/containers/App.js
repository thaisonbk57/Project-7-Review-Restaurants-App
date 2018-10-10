import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  saveRestaurantIDs,
  saveRestaurant,
  saveReviews,
  saveUserPosition,
  filterRestaurants
} from './../store/actions';

import gmaps from '@google/maps';

import { API_KEY } from './../store/actions';

import Header from '../components/Header/Header';
import RestaurantList from './RestaurantList/RestaurantList';
import AddCommentForm from './AddCommentForm/AddCommentForm';
import Map from './Map/Map';

export const TEMP_API_KEY = 'AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs';

// Create an object googleMapsClient using @google/maps library
const googleMapsClient = gmaps.createClient({
  key: TEMP_API_KEY
});

class App extends Component {
  componentDidMount = () => {
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
          // this.props.getRestIDs(this.props.userPos, 2000);

          // get Information from google API using @google/maps package
          googleMapsClient.placesNearby(
            {
              location: this.props.userPos,
              radius: 1000,
              type: 'restaurant'
            },
            (err, response) => {
              if (!err) {
                let data = response.json.results;
                // console.log(data);
                let restaurantIDs = data.map(restaurant => restaurant.place_id);
                // console.log(restaurantIDs);
                this.props.saveRestaurantIDs(restaurantIDs);
                // So, now we have all IDs from restaurants that we want. Next thing to do is how to fetch restaurant details of each one and then update the store
                // console.log(this.props.allRestaurantIDs);
                this.props.allRestaurantIDs.forEach(ID => {
                  googleMapsClient.place(
                    {
                      placeid: ID
                    },
                    (err, response) => {
                      if (!err) {
                        const result = response.json.result;
                        // console.log(result);
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
                        this.props.filterRestaurants(this.props.filterObject);
                      } else {
                        console.log(err);
                      }
                    }
                  );
                });
              } else {
                console.log('ERROR', err);
              }
            }
          );
        },
        err,
        option
      );
    } else {
      /* Geolocation not supported. */
      window.alert('Your device is not supported.');
    }
  };

  render() {
    return (
      <div className="App container-fluid mx-auto my-3 border rounded border-primary">
        <div className="row">
          <div className="col-12 px-0">
            <Header />
          </div>
        </div>
        <div className="row">
          <div className="col-9 px-0" style={{ position: 'relative' }}>
            <Map />
          </div>
          <div className="col-3 px-0">
            <RestaurantList />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <AddCommentForm />
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    userPos: state.userPos,
    allRestaurantIDs: state.allRestaurantIDs,
    filterObject: state.filterObject
  };
}

function mapDispatch(dispatch) {
  return {
    saveRestaurant: restaurant => {
      dispatch(saveRestaurant(restaurant));
    },
    saveUserPos: pos => {
      dispatch(saveUserPosition(pos));
    },
    saveRestaurantIDs: IDs => {
      dispatch(saveRestaurantIDs(IDs));
    },
    filterRestaurants: filterObject => {
      dispatch(filterRestaurants(filterObject));
    },
    saveReviews: (place_id, reviews) => {
      dispatch(saveReviews(place_id, reviews));
    }
  };
}

export default connect(
  mapState,
  mapDispatch
)(App);
