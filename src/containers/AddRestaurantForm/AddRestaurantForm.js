/* global google */
import React, { Component, Fragment } from 'react';
import './AddRestaurantForm.css';
import { connect } from 'react-redux';
import { saveRestaurant, toggleAddRestaurantForm } from './../../store/actions';

class AddRestaurantForm extends Component {
  // the form only have too input fields allowing users to add name and telephone number of the restaurant. other information will be get from Google API
  state = {
    formatted_address: '',
    photos: [],
    formatted_phone_number: '',
    geometry: {
      location: {
        lat: null,
        lng: null
      }
    },
    name: '',
    place_id: '',
    rating: null,
    reviewAddable: true
  };

  componentDidMount() {
    console.log(google);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Fragment>
        {this.props.active && (
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
              onSubmit={e => {}}
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
        )}
      </Fragment>
    );
  }
}

const mapState = state => {
  return {
    newRestaurantLocation: state.newRestaurantLocation,
    active: state.activeAddRestaurantForm
  };
};

const mapDispatch = dispatch => {
  return {
    saveRestaurant: restaurant => {
      dispatch(saveRestaurant(restaurant));
    },
    toggleAddRestaurantForm: () => {
      dispatch(toggleAddRestaurantForm());
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(AddRestaurantForm);
