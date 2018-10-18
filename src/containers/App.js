import React, { Component } from "react";
import { connect } from "react-redux";
import {
  saveRestaurantIDs,
  saveRestaurant,
  saveReviews,
  filterRestaurants
} from "./../store/actions";

import Header from "../components/Header/Header";
import RestaurantList from "./RestaurantList/RestaurantList";
import AddCommentForm from "./AddCommentForm/AddCommentForm";
import AddRestaurantForm from "./AddRestaurantForm/AddRestaurantForm";
import Map from "./Map/MapContainer";

export const API_KEY = "AIzaSyAhqGGanA-hH9UQ1O96Y95h_kx-xfwkaU4";

class App extends Component {
  render() {
    return (
      <div className="App container-fluid mx-auto border rounded border-primary">
        <div className="row">
          <div className="col-12 px-0">
            <Header />
          </div>
        </div>
        <div className="row">
          <div className="col-9 px-0" style={{ position: "relative" }}>
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
