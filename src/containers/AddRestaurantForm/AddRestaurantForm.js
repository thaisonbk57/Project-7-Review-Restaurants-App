import React, { Component } from 'react';
import './AddRestaurantForm.css';
import RatingStar from './RatingStar/RatingStar';

class AddRestaurantForm extends Component {
  render() {
    return (
      <div className="form-backdrop">
        <div className="close-btn">
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
              name="author"
              type="text"
              className="form-control"
              required
            />
          </div>
          <RatingStar onchange={this.onChangeHander} />
          <div className="form-group">
            <label className="text-light" htmlFor="">
              Comment:
            </label>
            <textarea className="form-control" name="comment_text" />
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

export default AddRestaurantForm;
