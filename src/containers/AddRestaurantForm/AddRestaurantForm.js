/* global google */
import React, { Component, Fragment } from 'react';
import './AddRestaurantForm.css';
import { connect } from 'react-redux';
import {
  saveRestaurant,
  toggleAddRestaurantForm,
  saveRestaurantIDs,
  filterRestaurants,
  initializeReviewsForNewRestaurant
} from './../../store/actions';

class AddRestaurantForm extends Component {
  // the form only have too input fields allowing users to add name and telephone number of the restaurant. other information will be get from Google API
  state = {
    formatted_address: '',
    photos: [],
    formatted_phone_number: '',
    geometry: null,
    name: '',
    place_id: '',
    rating: 5,
    reviewAddable: true
  };

  componentDidMount() {}

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // we have now the location, at which we want to add a new restaurant to.
    const { newRestaurantLocation } = this.props;

    // using google places library to fetch data about the new restaurant
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: newRestaurantLocation }, (result, status) => {
      if (status === 'OK') {
        const { formatted_address, place_id } = result[0];
        this.props.saveRestaurantIDs([place_id]);
        this.props.initializeReviewsForNewRestaurant(place_id);

        const newRestaurant = {
          ...this.state,
          formatted_address,
          place_id,
          geometry: { location: newRestaurantLocation }
        };
        this.props.saveRestaurant(newRestaurant);
        this.props.filterRestaurants(this.props.filterObject);
      }
    });

    // toggle the AddRestaurantForm
    setTimeout(() => {
      this.props.toggleAddRestaurantForm();
    }, 1000);
  };

  render() {
    return (
      <div className="form-backdrop">
        <div
          onClick={() => {
            this.props.toggleAddRestaurantForm();
          }}
          className="close-btn"
        >
          <i className="far fa-window-close" />
        </div>
        <form
          autoComplete="off"
          className="AddCommentForm border border-success px-5 py-2 rounded"
          onSubmit={e => {
            this.onSubmit(e);
          }}
        >
          <div className="form-group">
            <label className="text-light" htmlFor="">
              Restaurant's Name: <span className="text-danger">*</span>
            </label>
            <input
              name="name"
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={e => {
                this.onChange(e);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-light" htmlFor="">
              Telephone:
            </label>
            <input
              className="form-control"
              name="formatted_phone_number"
              value={this.state.formatted_phone_number}
              onChange={e => {
                this.onChange(e);
              }}
            />
          </div>
          <input
            type="submit"
            className="btn btn-success btn-sm"
            value="Submit"
          />
        </form>
      </div>
    );
  }
}

const mapState = state => {
  return {
    newRestaurantLocation: state.newRestaurantLocation,
    active: state.activeAddRestaurantForm,
    filterObject: state.filterObject
  };
};

const mapDispatch = dispatch => {
  return {
    saveRestaurant: restaurant => {
      dispatch(saveRestaurant(restaurant));
    },
    toggleAddRestaurantForm: () => {
      dispatch(toggleAddRestaurantForm());
    },
    saveRestaurantIDs: IDs => {
      dispatch(saveRestaurantIDs(IDs));
    },
    filterRestaurants: filterObj => {
      dispatch(filterRestaurants(filterObj));
    },
    initializeReviewsForNewRestaurant: place_id => {
      dispatch(initializeReviewsForNewRestaurant(place_id));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(AddRestaurantForm);
