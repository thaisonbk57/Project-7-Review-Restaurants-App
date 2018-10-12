import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  saveRestaurantIDs,
  saveRestaurant,
  saveReviews,
  saveUserPosition,
  filterRestaurants
} from './../store/actions';

import Header from '../components/Header/Header';
import RestaurantList from './RestaurantList/RestaurantList';
import AddCommentForm from './AddCommentForm/AddCommentForm';
import AddRestaurantForm from './AddRestaurantForm/AddRestaurantForm';
import Map from './Map/Map';

export const TEMP_API_KEY = 'AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs';

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
            {this.props.active && <AddRestaurantForm />}
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
    filterObject: state.filterObject,
    active: state.activeAddRestaurantForm
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
