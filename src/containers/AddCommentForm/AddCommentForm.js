import React, { Component } from 'react';
import RatingStar from './RatingStar/RatingStar';
import { connect } from 'react-redux';
import './AddCommentForm.css';
import {
  addComment,
  toggleCommentForm,
  turnOffAddCommentButton,
  filterRestaurants
} from '../../store/actions';

// this function generate unique key for each review of users
const getTimeStamp = () => {
  let now = new Date();
  return now.getTime();
};

class addCommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author_name: '',
      rating: 5,
      text: ''
    };
  }

  onChangeHander = e => {
    let value = e.target.value;
    switch (e.target.name) {
      case 'author':
        this.setState({
          author_name: value
        });
        break;
      case 'comment_text':
        this.setState({
          text: value
        });
        break;
      case 'star':
        this.setState({
          rating: parseInt(value, 10)
        });
        break;
      default:
        return null;
    }
  };

  onSubmitHandler = e => {
    e.preventDefault();
  };

  render() {
    let form = null;

    // properties
    const { active, targetRestaurant, filterObject } = this.props;

    // Methods
    const {
      toggleCommentForm,
      addComment,
      turnOffAddCommentButton,
      filterRestaurants
    } = this.props;

    if (active) {
      form = (
        <div className="form-backdrop">
          <div onClick={toggleCommentForm} className="close-btn">
            <i className="far fa-window-close" />
          </div>
          <form
            autoComplete="off"
            className="AddCommentForm border border-success px-5 py-2 rounded"
            onSubmit={e => {
              this.onSubmitHandler(e);
              addComment(
                { ...this.state, time: getTimeStamp() },
                targetRestaurant
              );
              turnOffAddCommentButton(targetRestaurant);
              filterRestaurants(filterObject);
            }}
          >
            <div className="form-group">
              <label className="text-light" htmlFor="">
                Name: <span className="text-danger">*</span>
              </label>
              <input
                name="author"
                type="text"
                className="form-control"
                onChange={e => {
                  this.onChangeHander(e);
                }}
                required
              />
            </div>
            <RatingStar onchange={this.onChangeHander} />
            <div className="form-group">
              <label className="text-light" htmlFor="">
                Comment:
              </label>
              <textarea
                className="form-control"
                name="comment_text"
                onChange={e => {
                  this.onChangeHander(e);
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
    return form;
  }
}

const mapState = state => {
  return {
    active: state.activeCommentForm,
    targetRestaurant: state.activeRestaurant,
    filterObject: state.filterObject
  };
};

const mapDispatch = dispatch => {
  return {
    addComment: (commentObject, targetRestaurant) => {
      dispatch(addComment(commentObject, targetRestaurant));
    },
    toggleCommentForm: () => {
      dispatch(toggleCommentForm());
    },
    turnOffAddCommentButton: activeRestaurant => {
      dispatch(turnOffAddCommentButton(activeRestaurant));
    },
    filterRestaurants: filterObj => {
      dispatch(filterRestaurants(filterObj));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(addCommentForm);
